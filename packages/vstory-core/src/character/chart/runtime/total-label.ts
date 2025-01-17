import { ThemeManager } from './../../../theme/theme-manager';
import { array, isValid, merge, isValidNumber } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import type { IVChart } from '@visactor/vchart';
import { type ISeries, PREFIX } from '@visactor/vchart';
import type { ITotalLabelConfig } from '../../../interface/dsl/chart';
import type { FormatContentType, IFormatConfig } from '../../../interface/dsl/common';
import type { FormatValueFunction } from '../../common/utils/format';
import { getTextWithFormat } from '../../common/utils/format';
import { VSTORY_PREFIX } from '../../../constants/config';
import { getSeriesKeyScalesMap, matchDatumWithScaleMap } from './utils';
import type { IText } from '@visactor/vrender-core';
import { SeriesAxisOrientKey } from '../../../constants/character';

const totalLabelTempValueKey = `${VSTORY_PREFIX}_totalLabel`;

// 这里的到的 stackValue 与 vchart 中并不一致
// 直角坐标系下 vchart series 的默认 stackValue 使用了对应的轴 Id 这个轴Id在spec生成阶段无法获取搭配
// vchart 直角坐标系下默认 stackValue = `${PREFIX}_series_${this.type}_${axisId}`
export function getStackValueFromSeriesSpec(seriesSpec: any) {
  if (seriesSpec.stackValue) {
    return seriesSpec.stackValue;
  }
  return `${PREFIX}_series_${seriesSpec.type}_${seriesSpec[SeriesAxisOrientKey]}`;
}

export class TotalLabelRuntime implements IChartCharacterRuntime {
  type = 'TotalLabel';

  applyConfigToAttribute(character: ICharacterChart) {
    // 将总计标签的 visible 配置和组样式设置到 spec 上
    // 设置 visible 为 true 关闭标签能力放到分组上
    const config = character.getRuntimeConfig().config;
    const totalLabel = config.options?.totalLabel;
    if (!totalLabel) {
      return;
    }
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;

    const formatValue = ThemeManager.getAttribute(
      [character.theme, character.story.theme],
      'character.VChart.runtime.functions.formatValue'
    );

    if (spec.series) {
      // 符合配置的系列都要设置 totalLabel ，因为一组 totalLabel 可能是多个不同系列的 totalLabel 组成的
      spec.series?.forEach((s: any) => {
        const stackValue = getStackValueFromSeriesSpec(s);
        if (!totalLabel[stackValue]) {
          return;
        }
        this._mergeTotalLabelConfigToSpec(s, totalLabel[stackValue], formatValue);
      });
    } else {
      // 如果 spec 中没有 series
      // 如果 spec 上有stackValue
      if (spec.stackValue) {
        if (!totalLabel[spec.stackValue]) {
          return;
        }
        this._mergeTotalLabelConfigToSpec(spec, totalLabel[spec.stackValue], formatValue);
      } else {
        // 如果 spec 上没有, 那么将 totalLabel 中的第一个key作为stackValue 设置到 spec 上
        const stackValue = Object.keys(totalLabel)[0];
        if (!isValid(stackValue)) {
          return;
        }
        spec.stackValue = stackValue;
        this._mergeTotalLabelConfigToSpec(spec, totalLabel[stackValue], formatValue);
      }
    }
  }

  private _mergeTotalLabelConfigToSpec(
    spec: any,
    totalLabelConfig: ITotalLabelConfig,
    formatValue: FormatValueFunction
  ) {
    spec.totalLabel = spec.totalLabel ?? {};
    if (totalLabelConfig.visible) {
      spec.totalLabel.visible = totalLabelConfig.visible;
    }
    if (totalLabelConfig.style) {
      spec.totalLabel.style = spec.totalLabel.style ?? {};
      merge(spec.totalLabel.style, totalLabelConfig.style);
    }
    this._doFormat(totalLabelConfig, spec, formatValue);
  }

  private _doFormat(totalLabelConfig: ITotalLabelConfig, spec: any, formatValue: FormatValueFunction) {
    if (!totalLabelConfig.formatConfig && !totalLabelConfig.single) {
      return;
    }
    spec.totalLabel.formatMethod = (value: number, datum: any, ctx: { series: ISeries }) => {
      const keyScaleMap = getSeriesKeyScalesMap(ctx.series);
      let result: number | string | string[] = value;
      // 先进行单个匹配
      // 在这里处理可以避免放重叠开启后无法正常躲避
      if (
        Object.keys(totalLabelConfig.single).some(k => {
          const config = totalLabelConfig.single[k];
          config.itemKeys;
          if (matchDatumWithScaleMap(config.itemKeys, config.itemKeyMap, keyScaleMap, datum)) {
            // 匹配成功 设置结果
            result = getLabelTextWithFormat(value, datum, ctx.series, config.formatConfig, formatValue);
            return true;
          }
          return false;
        })
      ) {
        // 返回单个匹配结果
        return result;
      }
      // 整组匹配
      return getLabelTextWithFormat(value, datum, ctx.series, totalLabelConfig.formatConfig, formatValue);
    };
  }

  /**
   * 处理单个总计标签样式
   * @param character
   * @param vchart
   * @returns
   */
  beforeVRenderDraw(character: ICharacterChart, vchart: IVChart) {
    const config = character.getRuntimeConfig().config;
    const totalLabel = config.options?.totalLabel;
    if (!totalLabel) {
      return;
    }
    if (Object.values(totalLabel).every(v => !v.single)) {
      return;
    }

    const components = vchart.getChart().getComponentsByKey('totalLabel');
    components.forEach(component => {
      // @ts-ignore
      const series = component._getSeries();
      const totalLabelConfig = totalLabel[getStackValueFromSeriesSpec(series.getSpec())];
      if (!totalLabelConfig?.single) {
        return;
      }
      const keyScaleMap = getSeriesKeyScalesMap(series);
      component.getVRenderComponents().forEach(dataLabel => {
        dataLabel.getElementsByName('label').forEach(label => {
          (label.getElementsByType('text') as IText[]).forEach(text => {
            Object.values(totalLabelConfig.single).forEach(singleConfig => {
              if (
                matchDatumWithScaleMap(
                  singleConfig.itemKeys,
                  singleConfig.itemKeyMap,
                  keyScaleMap,
                  (text.attribute as any).data
                )
              ) {
                text.setAttributes(singleConfig.style);
              }
            });
          });
        });
      });
    });
    return;
  }
}

// 得到标签经过 format 处理后的值
function getLabelTextWithFormat(
  value: number,
  datum: any,
  series: ISeries,
  formatConfig: IFormatConfig,
  formatValue: FormatValueFunction
) {
  const opt = {
    value,
    datum,
    series
  };
  return getTextWithFormat(formatConfig, array(formatConfig.content), getTotalContentValue, formatValue, opt);
}

function getTotalContentValue(
  {
    value,
    datum,
    series
  }: {
    value: number;
    datum: any;
    series: ISeries;
  },
  content: FormatContentType
) {
  const dimensionField = series.getDimensionField()[0];
  switch (content) {
    case 'dimension':
      return datum[dimensionField];
    case 'percentage':
      return computeTotalPercentage(value, series);
    case 'value':
    default:
      return value;
  }
}

// 计算系列百分比
function computeTotalPercentage(value: any, series: ISeries) {
  const chart = series.getChart();
  // 先获取全部值总合
  let totalValue = 1;
  if (isValidNumber(chart.getSpec()[totalLabelTempValueKey])) {
    totalValue = chart.getSpec()[totalLabelTempValueKey];
  } else {
    totalValue = series
      .getChart()
      .getAllSeries()
      .reduce((totalValue, series) => {
        const data: any[] = series.getViewData().latestData;
        const measureField = series.getMeasureField()[0];
        const seriesTotalValue = data.reduce((sum: number, d: any) => {
          return sum + Number.parseFloat(d[measureField]);
        }, 0);
        return totalValue + seriesTotalValue;
      }, 0);
    chart.getSpec()[totalLabelTempValueKey] = totalValue;
  }
  if (totalValue === 0) {
    return 0;
  }
  return (value / totalValue) * 100;
}

export const TotalLabelRuntimeInstance = new TotalLabelRuntime();
