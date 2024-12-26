import type { IChartCharacterRuntime } from './../../chart/interface/runtime';
import type { IVChart } from '@visactor/vchart';
import { CharacterType } from '../../../constants/character';
import type { IPivotChartCharacterConfig } from '../../../interface/dsl/table';
import { CharacterTable } from '../character-table';
import type { ITableGraphicAttribute } from '../graphic/vtable-graphic';
import type { ICharacterChart } from '../../chart/interface/character-chart';

export class PivotChartCharacter extends CharacterTable<ITableGraphicAttribute> {
  static type = CharacterType.PIVOT_CHART;

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
    // option.specFormat = () => {
    //   // console.log('specFormat!');
    //   return {
    //     a: true
    //   };
    // };
    option.chartOption = option.chartOption || {};
    option.chartOption.performanceHook = option.chartOption.performanceHook || {};
    option.chartOption.performanceHook.afterInitializeChart = (vchart: IVChart) => {
      this._currentDrawVChart = vchart;
      this._chartRuntime.forEach(r => {
        // console.log('afterInitializeChart!');
        r.afterInitialize?.(
          {
            getRuntimeConfig: () => {
              return {
                config: {
                  options: { ...(this._getCurrentVChartOption() ?? {}) }
                },
                canvas: this.canvas,
                getAttribute: () => {
                  return this.getRuntimeConfig().getAttribute();
                }
              };
            }
          } as ICharacterChart,
          vchart
        );
      });
    };
    option.chartOption.performanceHook.beforeVRenderDraw = () => {
      // console.log('beforeVRenderDraw!');
    };
    return result;
  }

  protected _getCurrentVChartOption() {
    const col = 0;
    const row = 1;
    return this._config.options.cellStyle?.[`${col}_${row}`]?.chartOptions;
  }
}
