import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChartRuntimeConfig } from '../interface/character-chart';
import type { ISeries, IVChart } from '@visactor/vchart';
import { getSeriesKeyScalesMap, GetVChartSeriesWithMatch, matchDatumWithScaleMap } from './utils';
import type { IChartCharacterConfig } from '../../../interface/dsl/chart';
import { StroyAllDataGroup } from '../../../interface/dsl/chart';
import type { IMark } from '@visactor/vchart/esm/mark/interface';
import {
  CommonMarkAttributeMap,
  EDITOR_SERIES_MARK_SINGLE_LEVEL,
  EDITOR_SERIES_MARK_STYLE_LEVEL,
  fillMarkAttribute,
  SeriesMarkStyleMap,
  UseDefaultSeriesStyle
} from './const';
import { isArray, merge, isValid } from '@visactor/vutils';

export class MarkStyleRuntime implements IChartCharacterRuntime {
  type = 'MarkStyle';

  static getMarkStyle(
    mark: IMark,
    dataGroupStyle: IChartCharacterConfig['options']['dataGroupStyle'],
    key: string,
    datum: any,
    seriesField: string,
    markName?: string
  ) {
    if (!dataGroupStyle) {
      return null;
    }
    const value =
      dataGroupStyle[datum[seriesField]]?.[markName ?? mark.name]?.style?.[key] ??
      dataGroupStyle[StroyAllDataGroup]?.[markName ?? mark.name]?.style?.[key];

    if (value === UseDefaultSeriesStyle) {
      return null;
    }
    return value;
  }

  applyConfigToAttribute(character: ICharacterChartRuntimeConfig) {
    // visible
    // 如果 dataGroupStyle 中有 visible 配置，在这里添加上 visible = true
    // 具体 visible 的逻辑在下方 afterInitialize 中设置到 mark 上
    const config = character.config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    // 没有的话，忽略
    if (!dataGroupStyle) {
      return;
    }
    const rawAttribute = character.getAttribute();
    const { spec } = rawAttribute;
    const visibleMarkNames: string[] = [];
    // 得到全部被设置过 visible 的 markName
    Object.values(dataGroupStyle).forEach(groupConfig => {
      Object.keys(groupConfig).forEach(markName => {
        if (isValid(groupConfig[markName]?.visible)) {
          visibleMarkNames.push(markName);
        }
      });
    });
    // 设置到 spec 上
    if (spec.series) {
      spec.series.forEach((s: any) => {
        visibleMarkNames.forEach(name => {
          s[name] = s[name] || { visible: true };
          s[name].visible = true;
        });
      });
    } else {
      visibleMarkNames.forEach(name => {
        spec[name] = spec[name] || { visible: true };
        spec[name].visible = true;
      });
    }

    return;
  }

  afterInitialize(character: ICharacterChartRuntimeConfig, vchart: IVChart) {
    this._setDataGroupStyle(character, vchart);
    this._setMarkStyle(character, vchart);
    return;
  }

  private _setDataGroupStyle(character: ICharacterChartRuntimeConfig, vchart: IVChart) {
    const config = character.config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    if (!dataGroupStyle) {
      return;
    }

    // seriesStyle
    const seriesList = vchart.getChart().getAllSeries();
    if (!seriesList?.length) {
      return;
    }
    seriesList.forEach(s => {
      // 一个 series 对应一组数据
      // 系列分组key
      const seriesField = s.getSeriesField();
      const groupValueList = s.getRawDataStatisticsByField(seriesField)?.values;
      const groupValue = groupValueList?.[0];
      s.getMarks().forEach(m => {
        // set visible first
        const visible =
          dataGroupStyle[groupValue]?.[m.name]?.visible ?? dataGroupStyle[StroyAllDataGroup]?.[m.name]?.visible;
        if (isValid(visible)) {
          m.setVisible(visible);
        }
        // 系列分组key
        if (groupValueList && groupValueList.length === 1) {
          // 一个 series 对应一组数据 简化处理，优化性能
          if (!dataGroupStyle[groupValue]?.[m.name]?.style && !dataGroupStyle[StroyAllDataGroup]?.[m.name]?.style) {
            return;
          }
          const markStyle = merge(
            {},
            dataGroupStyle[StroyAllDataGroup][m.name].style ?? {},
            dataGroupStyle[groupValue][m.name].style ?? {}
          );
          if (Object.keys(markStyle).length === 0) {
            return;
          }
          m.setStyle(
            {
              ...markStyle
            },
            'normal',
            EDITOR_SERIES_MARK_STYLE_LEVEL
          );
        } else {
          // 如果有 style map 的话, 只有这些属性可以被设置
          const styleKeys =
            SeriesMarkStyleMap[s.type]?.[m.name]?.style ?? CommonMarkAttributeMap[m.type] ?? fillMarkAttribute;

          // 多组数据在同一个系列，使用后处理
          styleKeys.forEach(key => {
            if (!m.stateStyle.normal?.[key]) {
              // TODO VChart bug。如果直接设置属性为 undefined 会报错
              // 默认值 还必须这样写
              m.setAttribute(key, (): any => undefined);
            }

            m.setPostProcess(key, (result, datum) => {
              const temp = MarkStyleRuntime.getMarkStyle(m, dataGroupStyle, key, datum, seriesField) ?? result;
              if (s.type === 'area' && key === 'stroke' && m.name === 'area') {
                if (!isArray(temp)) {
                  return [temp, false, false, false];
                }
              }
              return temp;
            });
          });
        }
      });
    });
  }

  private _setMarkStyle(character: ICharacterChartRuntimeConfig, vchart: IVChart) {
    const config = character.config;
    const markStyle = config.options?.markStyle;
    if (!markStyle) {
      return;
    }
    const chart = vchart.getChart();
    Object.values(markStyle).forEach(i => {
      const series = GetVChartSeriesWithMatch(chart, i.seriesMatch) as ISeries;
      if (!series) {
        return;
      }
      const mark = series.getMarkInName(i.markName);
      if (!mark) {
        return;
      }
      const keyScaleMap = getSeriesKeyScalesMap(series);
      const stateKey = i.id;
      mark.setStyle(
        {
          ...i.style
        },
        stateKey,
        EDITOR_SERIES_MARK_SINGLE_LEVEL
      );
      chart.updateState({
        [stateKey]: {
          filter: (datum: any) => {
            return matchDatumWithScaleMap(i.itemKeys, i.itemKeyMap, keyScaleMap, datum);
          },
          level: 10
        }
      });
    });
  }
}

export const MarkStyleRuntimeInstance = new MarkStyleRuntime();
