import { merge, array, isArray } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import type { IChartCharacterConfig, ModelSelector } from '../../../interface/dsl/chart';
import { isIDSelector, isSpecIndexSelector } from '../../../utils/type';

export class CommonSpecRuntime implements IChartCharacterRuntime {
  type = 'CommonSpec';

  applyConfigToAttribute(character: ICharacterChart): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const config = character.getRuntimeConfig().config;
    const { spec } = rawAttribute;
    const options = config.options;
    const { data, color, rootConfig = {}, padding } = options;

    this._mergeComponentSpec(spec, options, 'title');
    this._mergeComponentSpec(spec, options, 'legends');
    this._mergeComponentSpec(spec, options, 'axes');
    this._mergeSeriesSpec(spec, options);
    if (data) {
      merge(spec, {
        data
      });
    }
    if (color) {
      merge(spec, { color });
    }
    if (padding) {
      merge(spec, { padding });
    }
    spec.animation = true;
    // 关闭默认的入场动画
    spec.animationAppear = false;
    // TODO 这个先不关闭，ADD的时候会调用
    // spec.animationEnter = false;
    merge(spec, { ...rootConfig });
    // 保证 data 的 values 有内容，避免 vchart 处理过程中报错
    this._fillDataValues(spec);
  }

  protected _mergeComponentSpec(
    rawSpec: any,
    options: IChartCharacterConfig['options'],
    key: 'title' | 'legends' | 'axes' | 'series'
  ) {
    if (!options[key]) {
      return;
    }
    if (!rawSpec[key]) {
      rawSpec[key] = [];
    }
    // 转化为数组
    rawSpec[key] = array(rawSpec[key]);
    (Object.keys(options[key]) as ModelSelector[]).forEach((selector: ModelSelector) => {
      if (selector === '*') {
        // 全部
        rawSpec[key].forEach((s: any) => {
          merge(s, options[key][selector]);
        });
      } else if (isSpecIndexSelector(selector)) {
        // 匹配索引
        const s = rawSpec[key][+selector];
        if (s) {
          merge(s, options[key][selector]);
        }
      } else if (isIDSelector(selector)) {
        // 匹配id
        const userId = selector.substring(1);
        const s = rawSpec[key].find((a: any) => {
          return a.id === userId;
        });
        if (s) {
          merge(s, options[key][selector]);
        } else {
          const s = options[key][selector];
          s.id = userId;
          rawSpec[key].push(s);
        }
      }
    });
  }

  protected _mergeSeriesSpec(rawSpec: any, options: IChartCharacterConfig['options']) {
    if (!options.series) {
      return;
    }
    // 如果原始spec没有series，并且seriesSpec只有一项
    const optionSeries = options.series;
    if (!rawSpec.series && (options.series[0] || options.series['0'])) {
      merge(rawSpec, optionSeries[0] ?? optionSeries['0']);
      return;
    }
    // 其他情况同普通组件
    this._mergeComponentSpec(rawSpec, options, 'series');
  }

  private _fillSpecData(spec: any) {
    if (!spec.data) {
      return;
    }
    if (isArray(spec.data)) {
      spec.data.forEach(d => {
        if (!d.values) {
          d.values = [];
        }
      });
    } else {
      if (!spec.data.values) {
        spec.data.values = [];
      }
    }
  }

  protected _fillDataValues(spec: any) {
    this._fillSpecData(spec);
    if (spec.series) {
      spec.series.forEach(s => this._fillSpecData(s));
    }
  }
}

export const CommonSpecRuntimeInstance = new CommonSpecRuntime();
