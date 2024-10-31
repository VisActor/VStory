import { StroyAllDataGroup } from './../../dsl-interface';
import { isArray } from '@visactor/vutils';
import type { CharacterChart } from '../character';
import type { IChartCharacterRuntime } from './interface';
import type { ISeries, IVChart } from '@visactor/vchart';
import type { IMark } from '@visactor/vchart/esm/mark/interface';
import type { IChartCharacterConfig } from '../../dsl-interface';
import {
  CommonMarkAttributeMap,
  EDITOR_SERIES_MARK_SINGLE_LEVEL,
  EDITOR_SERIES_MARK_STYLE_LEVEL,
  fillMarkAttribute,
  SeriesMarkStyleMap,
  UseDefaultSeriesStyle
} from './const';
import { getSeriesKeyScalesMap, GetVChartSeriesWithMatch, matchDatumWithScaleMap } from './utils';

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

  protected declare _character: CharacterChart;

  constructor(character: CharacterChart) {
    this._character = character;
  }

  onConfigReady() {
    return;
  }

  afterInitialize(vchart: IVChart) {
    this._setDataGroupStyle(vchart);
    this._setMarkStyle(vchart);
    return;
  }

  private _setDataGroupStyle(vchart: IVChart) {
    const config = this._character.config;
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
        // 系列分组key
        if (groupValueList && groupValueList.length === 1) {
          // 一个 series 对应一组数据 简化处理，优化性能
          const seriesStyle = dataGroupStyle[groupValue] ?? dataGroupStyle[StroyAllDataGroup];
          if (!seriesStyle) {
            return;
          }
          const markStyle = seriesStyle[m.name]?.style;
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
              m.setAttribute(key, () => undefined);
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

  private _setMarkStyle(vchart: IVChart) {
    const config = this._character.config;
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

  afterVRenderDraw() {
    return;
  }
}
