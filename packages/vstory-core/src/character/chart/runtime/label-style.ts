import { ThemeManager } from './../../../theme/theme-manager';
import { array, isNil, isValid, merge } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import {
  STACK_FIELD_END,
  STACK_FIELD_END_PERCENT,
  STACK_FIELD_START,
  STACK_FIELD_START_PERCENT,
  STACK_FIELD_TOTAL,
  type ISeries,
  type IVChart,
  type IRegion
} from '@visactor/vchart';
import type { Label as VChartLabelComponent } from '@visactor/vchart-types/types/component/label/label';
import type { ILabelInfo } from '@visactor/vchart-types/types/component/label';
import { MarkStyleRuntime } from './mark-style';
import { findSingleConfig, getSeriesKeyScalesMap, isSeriesMatch, matchDatumWithScaleMap } from './utils';
import type { IGraphic } from '@visactor/vrender-core';
import type { IChartCharacterConfig, ITextAttribute } from '../../../interface/dsl/chart';
import { StroyAllDataGroup } from '../../../interface/dsl/chart';
import type { IMark } from '@visactor/vchart-types/types/mark/interface';
import { CommonMarkAttributeMap, fillMarkAttribute, SeriesMarkStyleMap } from './const';
import { formatConfigKey } from '../../../constants/format';
import type { FormatContentType, IFormatConfig } from '../../../interface/dsl/common';
import type { FormatValueFunction } from '../../common/utils/format';
import { getTextWithFormat } from '../../common/utils/format';
import { validNumber } from '../../../utils/type';
import { getRegionStackGroup } from '@visactor/vchart';
import { stack } from '@visactor/vchart';
export class LabelStyleRuntime implements IChartCharacterRuntime {
  type = 'LabelStyle';

  applyConfigToAttribute(character: ICharacterChart) {
    // 设置 visible 为 true 关闭标签能力放到分组上
    // 当前 dataGroupStyle 中有 label.visible 配置，在这里添加上 visible = true
    const config = character.getRuntimeConfig().config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    if (!dataGroupStyle) {
      return;
    }
    let hasLabelVisible = false;
    Object.keys(dataGroupStyle).forEach(key => {
      if (hasLabelVisible) {
        return;
      }
      if (isValid(dataGroupStyle[key]?.label?.visible)) {
        hasLabelVisible = true;
      }
    });
    // 如果没有设置 visible，不处理
    if (!hasLabelVisible) {
      return;
    }
    // 否则全部设置为 true
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    if (!spec.label) {
      spec.label = { visible: true };
    } else {
      spec.label.visible = true;
    }
    spec.series?.forEach((s: any) => {
      if (!s.label) {
        s.label = { visible: true };
      } else {
        s.label.visible = true;
      }
    });
  }

  /**
   * 处理 fill stroke 之外的样式
   * format 在这里处理，否则防重叠会无法正确使用format之后的值进行计算
   * @param character
   * @param vchart
   * @returns
   */
  afterInitialize(character: ICharacterChart, vchart: IVChart) {
    const labelComponent = vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    this._setDataGroupStyle(character, vchart, labelComponent);
  }

  private _setDataGroupStyle(character: ICharacterChart, vchart: IVChart, labelComponent: VChartLabelComponent) {
    const config = character.getRuntimeConfig().config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    if (!dataGroupStyle) {
      return;
    }

    const formatValue = ThemeManager.getAttribute(
      [character.theme, character.story.theme],
      'character.VChart.runtime.functions.formatValue'
    );

    const singleLabelStyleKeys: { [key: string]: boolean } = {};
    const hasLabelStyle = !!config.options?.labelStyle;
    if (hasLabelStyle) {
      Object.values(config.options?.labelStyle).forEach(ls => {
        Object.keys(ls.style).forEach(k => (singleLabelStyleKeys[k] = true));
      });
    }

    labelComponent.getMarks().forEach(componentMark => {
      // @ts-ignore
      const infos = labelComponent._labelComponentMap.get(componentMark)();
      if (!infos) {
        return;
      }
      array(infos).forEach(info => {
        const { series, labelMark } = info as { series: ISeries; labelMark: IMark };
        const keyScaleMap = getSeriesKeyScalesMap(series);
        // 先看当前系列是否存在单标签样式
        const hasSingleStyle = hasLabelStyle
          ? isValid(
              Object.keys(config.options.labelStyle).find(k =>
                isSeriesMatch(config.options.labelStyle[k].seriesMatch, series)
              )
            )
          : false;
        // 系列分组key
        const seriesField = series.getSeriesField();
        // style Map 是 能设置的样式
        const styleKeys =
          SeriesMarkStyleMap[series.type]?.label?.style ?? CommonMarkAttributeMap.text ?? fillMarkAttribute;

        // 多组数据在同一个系列，使用vchart mark后处理。这里只有常规属性，如果发现某些属性设置不上，考虑styleKeys缺少
        styleKeys.forEach((key: keyof ITextAttribute) => {
          // fill 和 stroke 使用vrender后处理
          if (key === 'fill' || key === 'stroke') {
            return;
          }
          if (!labelMark.stateStyle.normal?.[key]) {
            // TODO VChart bug。如果直接设置属性为 undefined 会报错
            // 默认值 还必须这样写
            labelMark.setAttribute(key, (): any => undefined);
          }
          // 如果当前系列是有单标签样式的
          if (singleLabelStyleKeys[key] && hasSingleStyle) {
            labelMark.setPostProcess(key, (result, datum) => {
              return (
                // 如果匹配到单标签样式
                findSingleConfig(config.options.labelStyle, series, keyScaleMap, datum)?.style?.[key] ??
                // 否则匹配组样式
                MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ??
                result
              );
            });
          } else {
            // 没有单标签样式的
            // 直接匹配组样式
            labelMark.setPostProcess(key, (result, datum) => {
              return (
                MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ?? result
              );
            });
          }
        });

        // format
        // 如果是有单标签样式的
        if (hasSingleStyle) {
          labelMark.setPostProcess('text', (result, datum) => {
            const formatConfig = (
              findSingleConfig(config.options.labelStyle, series, keyScaleMap, datum) as unknown as {
                [formatConfigKey]: IFormatConfig;
              }
            )?.[formatConfigKey];
            if (isValid(formatConfig)) {
              return (
                getLabelTextWithFormat(datum, seriesField, series, vchart, character, formatConfig, formatValue) ??
                result
              );
            }
            // 否则匹配组样式
            return (
              getTextWithGroupFormat(datum, seriesField, series, vchart, character, dataGroupStyle, formatValue) ??
              result
            );
          });
        } else {
          // 没有单标签样式的
          // 直接匹配组样式
          labelMark.setPostProcess('text', (result, datum) => {
            return (
              getTextWithGroupFormat(datum, seriesField, series, vchart, character, dataGroupStyle, formatValue) ??
              result
            );
          });
        }

        // format结束

        // visible 单独设置
        if (!labelMark.stateStyle.normal?.visible) {
          // TODO VChart bug。如果直接设置属性为 undefined 会报错
          // 默认值 还必须这样写
          labelMark.setAttribute('visible', (): any => undefined);
        }
        const spec = config.options.spec;
        labelMark.setPostProcess('visible', (result, datum) => {
          return (
            // 如果匹配到单标签样式
            findSingleConfig(config.options.labelStyle, series, keyScaleMap, datum)?.style?.visible ??
            // 否则匹配组样式
            dataGroupStyle[datum[seriesField]]?.label?.visible ?? // 单组 visible
            dataGroupStyle[StroyAllDataGroup]?.label?.visible ?? // 全部组visible
            spec?.series?.[series.getSpecIndex()]?.label?.visible ?? // 单系列 visible
            spec?.label?.visible ?? // 全局 visible
            result
          );
        });
        // visible 结束
      });
    });
  }

  /**
   * 只处理 fill stroke 值，
   * 因为智能反色逻辑会修改它们，在 afterInitialize 中设置无效。
   * @param character
   * @param vchart
   * @returns
   */
  beforeVRenderDraw(character: ICharacterChart, vchart: IVChart) {
    const config = character.getRuntimeConfig().config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    const labelStyle = config.options?.labelStyle;
    if (!labelStyle && !dataGroupStyle) {
      return;
    }

    const labelComponent = vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    // 遍历mark
    labelComponent.getMarks().forEach(componentMark => {
      // @ts-ignore
      const infos = labelComponent._labelComponentMap.get(componentMark)();
      array(infos).forEach(info => {
        const { series: series } = info as { series: ISeries; labelMark: IMark };
        const keyScaleMap = getSeriesKeyScalesMap(series);
        const labelGraphics: IGraphic[] = [];
        findLabelGraphicWithInfo(componentMark.getProduct().graphicItem, info, labelGraphics);

        // 先设置分组样式
        if (dataGroupStyle) {
          const seriesField = series.getSeriesField();
          const groupValueList = series.getRawDataStatisticsByField(seriesField)?.values as string[];
          groupValueList.forEach(groupValue => {
            // 是否存在分组样式
            if (!dataGroupStyle[groupValue]?.label?.style && !dataGroupStyle[StroyAllDataGroup]?.label?.style) {
              return;
            }
            const style = merge(
              {},
              dataGroupStyle[StroyAllDataGroup]?.label?.style ?? {},
              dataGroupStyle[groupValue]?.label?.style ?? {}
            );
            // 只设置 fill 和 stroke 颜色
            if (!isValid(style.fill) && !isValid(style.stroke)) {
              return;
            }
            const labels = labelGraphics.filter(l => (l.attribute as any).data[seriesField] === groupValue);
            labels.forEach(l => {
              isValid(style.fill) && l.setAttribute('fill', style.fill);
              isValid(style.stroke) && l.setAttribute('stroke', style.stroke);
            });
          });
        }

        //  再设置单标签样式
        if (labelStyle) {
          const findKeys = !!labelStyle
            ? Object.keys(labelStyle).filter(k => isSeriesMatch(labelStyle[k].seriesMatch, series))
            : null;
          findKeys.forEach(findKey => {
            const item = labelStyle[findKey];
            // 只设置 fill 和 stroke 颜色
            if (!isValid(item.style.fill) && !isValid(item.style.stroke)) {
              return;
            }
            // 找到对应的标签
            const label = labelGraphics.find(l =>
              matchDatumWithScaleMap(item.itemKeys, item.itemKeyMap, keyScaleMap, (l.attribute as any).data as any)
            );
            if (!label) {
              return;
            }
            isValid(item.style.fill) && label.setAttribute('fill', item.style.fill);
            isValid(item.style.stroke) && label.setAttribute('stroke', item.style.stroke);
          });
        }
      });
    });
    return;
  }
}

/**
 * 将标签graphic放入数组
 * @param g graphic 父节点
 * @param list 将graphic放入数组
 * @returns
 */
function _collectAllLabelGraphic(g: IGraphic, list: IGraphic[]) {
  if (g.type === 'text' || g.type === 'richtext') {
    list.push(g);
    return;
  }
  if (g.children) {
    g.children.forEach((child: IGraphic) => _collectAllLabelGraphic(child, list));
  }
}

/**
 * 找到对应的全部标签绘图节点
 * @param g
 * @param info
 * @param list
 * @returns
 */
function findLabelGraphicWithInfo(g: IGraphic, info: ILabelInfo, list: IGraphic[]) {
  const matchLabel = g.children[0].children.find(
    // @ts-ignore
    (c: IGraphic) => c.attribute.baseMarkGroupName === info.baseMark.getProduct().graphicItem.name
  );
  if (!matchLabel) {
    return;
  }
  _collectAllLabelGraphic(matchLabel, list);
}

// 得到标签经过分组配置中的 format 处理后的值
function getTextWithGroupFormat(
  datum: any,
  seriesField: string,
  series: ISeries,
  vchart: IVChart,
  character: ICharacterChart,
  dataGroupStyle: IChartCharacterConfig['options']['dataGroupStyle'],
  formatValue: FormatValueFunction
) {
  if (!dataGroupStyle) {
    return null;
  }
  const formatConfig =
    dataGroupStyle[datum[seriesField]]?.label?.formatConfig ?? dataGroupStyle[StroyAllDataGroup]?.label?.formatConfig;

  if (!formatConfig) {
    return null;
  }

  return getLabelTextWithFormat(datum, seriesField, series, vchart, character, formatConfig, formatValue);
}

// 得到标签经过 format 处理后的值
function getLabelTextWithFormat(
  datum: any,
  seriesField: string,
  series: ISeries,
  vchart: IVChart,
  character: ICharacterChart,
  formatConfig: IFormatConfig,
  formatValue: FormatValueFunction
) {
  // 去掉非百分百情况下的 percentdiff 内容
  const formatContents = array(formatConfig.content).filter(content =>
    series.getPercent() ? true : content !== 'percentdiff'
  );
  const opt = {
    datum,
    seriesField,
    series,
    vchart,
    character
  };
  return getTextWithFormat(formatConfig, formatContents, getSeriesContentValue, formatValue, opt);
}

function getSeriesContentValue(
  {
    datum,
    seriesField,
    series,
    vchart
  }: {
    datum: any;
    seriesField: string;
    series: ISeries;
    vchart: IVChart;
  },
  content: FormatContentType
) {
  const dimensionField = series.getDimensionField()[0];
  const measureField = series.getMeasureField()[0];
  switch (content) {
    case 'dimension':
      return datum[dimensionField];
    case 'abs':
      return Math.abs(datum[measureField]);
    case 'percentage':
      // TODO: i18n
      return validNumber(computeSeriesPercentage(vchart, datum, series)) ?? '百分比';
    case 'series':
      return datum[seriesField];
    case 'value':
    default:
      return Number.parseFloat(datum[measureField]);
  }
}

// 计算系列百分比
function computeSeriesPercentage(vchart: IVChart, datum: any, series: ISeries) {
  // TODO: calculate stack & percentage before format method
  // calculate percentage for specified series
  if (
    series.type === 'pie' ||
    series.type === 'rose' ||
    series.type === 'scatter' ||
    series.type === 'map' ||
    series.type === 'funnel'
  ) {
    const data: any[] = series.getViewData().latestData;
    const measureField = series.getMeasureField()[0];
    const totalValue = data.reduce((sum: number, d: any) => {
      return sum + Number.parseFloat(d[measureField]);
    }, 0);
    const percentage = Number.parseFloat(datum[measureField]) / totalValue;
    return percentage * 100;
  }
  // TODO: unite the percentage calculation for different series
  // for now, line & waterfall & group bar series cannot get correct stack data
  if (
    series.type === 'line' ||
    series.type === 'waterfall' ||
    // group bar chart
    (series.type === 'bar' && series.getDimensionField().length > 1)
  ) {
    const seriesAxisOrient = series.getSpec()._editor_axis_orient;
    const allSeries = vchart
      .getChart()
      .getAllSeries()
      .filter((s: ISeries) => s.getSpec()._editor_axis_orient === seriesAxisOrient);
    const data = allSeries.reduce((data, series) => {
      return data.concat(series.getViewData().latestData);
    }, []);
    const dimensionField = series.getDimensionField()[0];
    const measureField = series.getMeasureField()[0];
    const totalValue = data.reduce((sum: number, d: any) => {
      if (d[dimensionField] === datum[dimensionField]) {
        const parsedValue = Number.parseFloat(d[measureField]);
        return sum + (Number.isNaN(parsedValue) ? 0 : parsedValue);
      }
      return sum;
    }, 0);
    const currentValue = Number.parseFloat(datum[measureField]);
    const percentage = Number.isNaN(currentValue) ? 0 : currentValue / totalValue;
    return percentage * 100;
  }
  // calculate stack
  const chart = vchart.getChart();
  chart.getAllRegions().forEach((region: IRegion) => {
    const stackValueGroup = getRegionStackGroup(region, true);
    for (const stackValue in stackValueGroup) {
      for (const key in stackValueGroup[stackValue].nodes) {
        stack(stackValueGroup[stackValue].nodes[key], region.getStackInverse(), true);
      }
    }
  });

  if (!isNil(datum[STACK_FIELD_TOTAL])) {
    return ((datum[STACK_FIELD_END] - datum[STACK_FIELD_START]) / datum[STACK_FIELD_TOTAL]) * 100;
  }
  if (!isNil(datum[STACK_FIELD_END_PERCENT]) && !isNil(datum[STACK_FIELD_START_PERCENT])) {
    return (datum[STACK_FIELD_END_PERCENT] - datum[STACK_FIELD_START_PERCENT]) * 100;
  }
  return NaN;
}

export const LabelStyleRuntimeInstance = new LabelStyleRuntime();
