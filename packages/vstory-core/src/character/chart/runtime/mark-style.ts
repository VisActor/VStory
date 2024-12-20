import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
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

  onConfigReady() {
    return;
  }

  afterInitialize(character: ICharacterChart, vchart: IVChart) {
    this._setDataGroupStyle(character, vchart);
    this._setMarkStyle(character, vchart);
    return;
  }

  private _setDataGroupStyle(character: ICharacterChart, vchart: IVChart) {
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
          if (!dataGroupStyle[groupValue] && !dataGroupStyle[StroyAllDataGroup]) {
            return;
          }
          const seriesStyle = merge({}, dataGroupStyle[StroyAllDataGroup] ?? {}, dataGroupStyle[groupValue] ?? {});
          const markStyle = seriesStyle[m.name]?.style;
          if (!markStyle) {
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

  private _setMarkStyle(character: ICharacterChart, vchart: IVChart) {
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
