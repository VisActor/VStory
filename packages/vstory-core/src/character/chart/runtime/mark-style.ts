import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import type { ISeries, IVChart } from '@visactor/vchart';
import {
  getGroupConfigWithDatum,
  getGroupStyleWithDatum,
  getGroupWithDatum,
  getSeriesKeyScalesMap,
  GetVChartSeriesWithMatch,
  matchDatumWithScaleMap
} from './utils';
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
    markName: string,
    keyScaleMap: Record<string, any>
  ) {
    if (!dataGroupStyle) {
      return null;
    }
    const value = getGroupStyleWithDatum(dataGroupStyle, datum, seriesField, keyScaleMap, markName ?? mark.name, key);

    if (value === UseDefaultSeriesStyle) {
      return null;
    }
    return value;
  }

  applyConfigToAttribute(character: ICharacterChart) {
    // visible
    // 如果 dataGroupStyle 中有 visible 配置，在这里添加上 visible = true
    // 具体 visible 的逻辑在下方 afterInitialize 中设置到 mark 上
    const config = character.getRuntimeConfig().config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    // 没有的话，忽略
    if (!dataGroupStyle) {
      return;
    }
    const rawAttribute = character.getRuntimeConfig().getAttribute();
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

  afterInitialize(character: ICharacterChart, vchart: IVChart) {
    this._setDataGroupStyle(character, vchart);
    this._setMarkStyle(character, vchart);
    return;
  }

  private _setDataGroupStyle(character: ICharacterChart, vchart: IVChart) {
    const config = character.getRuntimeConfig().config;
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
      const keyScaleMap = getSeriesKeyScalesMap(s);
      s.getMarks().forEach(m => {
        const groupConfig = getGroupConfigWithDatum(
          dataGroupStyle,
          { [seriesField]: groupValue },
          seriesField,
          keyScaleMap,
          m.name
        );
        // set visible first
        const visible = groupConfig?.visible;
        if (isValid(visible)) {
          m.setVisible(visible);
        }
        // 系列分组key
        if (groupValueList && groupValueList.length === 1) {
          // 一个 series 对应一组数据 简化处理，优化性能
          if (!groupConfig?.style) {
            return;
          }
          const markStyle = merge(
            {},
            dataGroupStyle[StroyAllDataGroup]?.[m.name]?.style ?? {},
            getGroupConfigWithDatum(
              dataGroupStyle,
              { [seriesField]: groupValue },
              seriesField,
              keyScaleMap,
              m.name,
              false
            )?.style ?? {}
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
              const temp =
                MarkStyleRuntime.getMarkStyle(m, dataGroupStyle, key, datum, seriesField, m.name, keyScaleMap) ??
                result;
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
    const config = character.getRuntimeConfig().config;
    const markStyle = config.options?.markStyle;
    if (!markStyle) {
      return;
    }
    const chart = vchart.getChart();
    Object.keys(markStyle).forEach(key => {
      const config = markStyle[key];
      const series = GetVChartSeriesWithMatch(chart, config.seriesMatch) as ISeries;
      if (!series) {
        return;
      }
      const mark = series.getMarkInName(config.markName);
      if (!mark) {
        return;
      }
      const keyScaleMap = getSeriesKeyScalesMap(series);
      const stateKey = key;
      mark.setStyle(
        {
          ...config.style
        },
        stateKey,
        EDITOR_SERIES_MARK_SINGLE_LEVEL
      );
      chart.updateState({
        [stateKey]: {
          filter: (datum: any) => {
            return matchDatumWithScaleMap(config.itemKeys, config.itemKeyMap, keyScaleMap, datum);
          },
          level: 10
        }
      });
    });
  }
}

export const MarkStyleRuntimeInstance = new MarkStyleRuntime();
