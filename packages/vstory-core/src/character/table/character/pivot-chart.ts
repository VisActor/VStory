import { cloneDeep } from '@visactor/vutils';
import type { IChartCharacterRuntime } from './../../chart/interface/runtime';
import type { IVChart } from '@visactor/vchart';
import { CharacterType } from '../../../constants/character';
import type { IPivotChartCharacterConfig } from '../../../interface/dsl/table';
import type { ITableGraphicAttribute } from '../graphic/vtable-graphic';
import type { ICharacterChart } from '../../chart/interface/character-chart';
import { ThemeManager } from '../../../theme/theme-manager';
import { RuntimeStore } from '../../../store';
import { CharacterTable } from '../character-table';

export class PivotChartCharacter extends CharacterTable<ITableGraphicAttribute> {
  static type = CharacterType.PIVOT_CHART;

  static ChartRuntimeMap: Record<string, boolean> = {
    CommonLayout: false
  };

  protected declare _config: IPivotChartCharacterConfig;

  protected _chartRuntime: IChartCharacterRuntime[] = [];

  protected _currentDrawVChart: IVChart;
  get currentDrawVChart() {
    return this._currentDrawVChart;
  }

  // table 的图表相关生命周期
  // spec 生成钩子
  // 交互模式
  // option.specFormat =>  applyConfigToAttribute
  // 绘图模式
  // option.beforeChartDraw => applyConfigToAttribute
  // 通用的 vchart 生命周期钩子透传
  // option.chartOption {
  //  performanceHook: {
  //    chart
  //    afterInitialize => afterInitialize
  //    beforeVRenderDraw => beforeVRenderDraw
  //  }
  // }

  getDefaultAttribute(): Partial<ITableGraphicAttribute> {
    const result = super.getDefaultAttribute();
    const option = result.spec;
    // 这个函数功能的意义，当 vchart 在 vrender 渲染图表时，如果指标不变，仅单元格进行切换，是不会触发 updateSpec 的
    // 我们但是不同的单元格支持独立配置chart属性后，需要 updateSpec。所以在这里补充判定。
    // 1. 当存在独立配置时，key 为 col_row，否则为 no
    // 2. 当前图表实例上增加一个 _story_render_key 字段，用于记录当前的 key
    // 3. 当 key 变化时，需要 updateSpec。key 变化可能是从 no => col_row，或者从 col_row => no
    option.specFormat = (spec: any, chartInstance: any, chart: any) => {
      const { col, row } = chart.attribute;
      const hasOption = !!this._getVChartOption(col, row);
      const key = hasOption ? `${col}_${row}` : 'no';
      const needFormatSpec =
        key !== 'no'
          ? chartInstance._story_render_key !== key
          : chartInstance._story_render_key !== key && chartInstance._story_render_key !== undefined;
      chartInstance._story_render_key = key;
      return {
        needFormatSpec,
        spec: spec,
        updateSpec: false
      };
    };
    // 每一个单元格生成独立spec时，会调用这个函数，对应图表元素的 spec处理阶段
    // 注意：此时 spec 中没有数据
    option.specTransformInCell = (spec: any, col: number, row: number) => {
      spec._stroy_pivot_chart_info = {
        col,
        row
      };
      const chartOption = this._getVChartOption(col, row);
      if (!chartOption) {
        return spec;
      }
      // 先生成当前 chart 的临时 runtimeConfig
      const options = { ...(this._getVChartOption(col, row) ?? {}), spec };
      const attribute = { spec: cloneDeep(spec) };
      const runTimeConfig = {
        config: {
          options
        },
        canvas: this.canvas,
        getAttribute: () => {
          return attribute;
        }
      };
      // 复用 chart 元素的 runtime 对 spec 进行处理
      this._chartRuntime.forEach(r => {
        r.applyConfigToAttribute?.({
          story: this.story,
          getRuntimeConfig: () => {
            return runTimeConfig;
          }
        } as ICharacterChart);
      });
      // 返回处理后的 spec
      return attribute.spec;
    };
    option.chartOption = option.chartOption || {};
    option.chartOption.performanceHook = option.chartOption.performanceHook || {};
    option.chartOption.performanceHook.afterInitializeChart = (vchart: IVChart) => {
      const col = vchart.getSpec()._stroy_pivot_chart_info.col;
      const row = vchart.getSpec()._stroy_pivot_chart_info.row;
      const chartOption = this._getVChartOption(col, row);
      if (!chartOption) {
        return;
      }
      this._chartRuntime.forEach(r => {
        r.afterInitialize?.(
          {
            story: this.story,
            getRuntimeConfig: () => {
              return {
                config: {
                  options: chartOption
                }
              };
            }
          } as ICharacterChart,
          vchart
        );
      });
    };
    option.chartOption.performanceHook.beforeDoRender = (vchart: IVChart) => {
      const col = vchart.getSpec()._stroy_pivot_chart_info.col;
      const row = vchart.getSpec()._stroy_pivot_chart_info.row;
      const chartOption = this._getVChartOption(col, row);
      if (!chartOption) {
        return;
      }
      this._chartRuntime.forEach(r => {
        r.beforeVRenderDraw?.(
          {
            story: this.story,
            getRuntimeConfig: () => {
              return {
                config: {
                  options: chartOption
                }
              };
            }
          } as ICharacterChart,
          vchart
        );
      });
    };
    return result;
  }

  protected _getVChartOption(col: number, row: number) {
    return this._config.options.chartOptions?.[`${col}_${row}`]?.options;
  }

  protected _initRuntime(): void {
    super._initRuntime();
    const runtimeList = ThemeManager.getAttribute([this.theme, this.story.theme], `character.VChart.runtime.list`);
    this._chartRuntime.push(
      ...(RuntimeStore.getList(PivotChartCharacter.ChartRuntimeMap, runtimeList) as IChartCharacterRuntime[])
    );
  }
}
