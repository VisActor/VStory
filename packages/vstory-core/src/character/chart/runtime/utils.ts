import { isArray, isValid } from '@visactor/vutils';
import type { IChart } from '@visactor/vchart/esm/chart/interface';
import type { ICartesianSeries, ISeries } from '@visactor/vchart';
import { isContinuous } from '@visactor/vscale';
import { VCHART_DATA_INDEX, ValueLink, FieldLink } from './const';
import {
  StroyAllDataGroup,
  type IChartCharacterConfig,
  type IComponentMatch,
  type IMarkStyle
} from '../../../interface/dsl/chart';

export function GetVChartSeriesWithMatch(vchart: IChart, seriesMatch: IComponentMatch & { type: string }) {
  if (!isValid(seriesMatch.specIndex) && seriesMatch.type) {
    return vchart.getAllSeries().filter(s => s.type === seriesMatch.type)[0];
  }
  if (!isValid(seriesMatch.specIndex)) {
    return null;
  }
  return vchart
    .getAllSeries()
    .find(s =>
      isValid(seriesMatch.usrId) ? s.userId === seriesMatch.usrId : s.getSpecIndex() === seriesMatch.specIndex
    );
}

export function isSeriesMatch(seriesMatch: IComponentMatch & { type: string }, series: ISeries) {
  if (isValid(seriesMatch.type) && series.type !== seriesMatch.type) {
    return false;
  }
  if (isValid(seriesMatch.usrId) && series.userId !== seriesMatch.usrId) {
    return false;
  }
  if (isValid(seriesMatch.specIndex) && series.getSpecIndex() !== seriesMatch.specIndex) {
    return false;
  }
  return true;
}

export function getSeriesKeyScalesMap(series: ISeries) {
  let axisHelper: any;
  let fields: string[];
  const map: { [key: string]: any } = {};
  if ((<ICartesianSeries>series).direction) {
    if ((<ICartesianSeries>series).direction === 'vertical') {
      axisHelper = (<ICartesianSeries>series).getXAxisHelper();
      fields = (<ICartesianSeries>series).fieldX;
    } else {
      axisHelper = (<ICartesianSeries>series).getYAxisHelper();
      fields = (<ICartesianSeries>series).fieldY;
    }
    if (axisHelper?.getScale) {
      fields.forEach((f, i) => {
        map[f] = axisHelper.getScale(i);
      });
    }
  }

  const seriesField = series.getSeriesField();
  if (!map[seriesField]) {
    if (seriesField) {
      if (series.getOption().globalScale.getScale('color')) {
        map[seriesField] = series.getOption().globalScale.getScale('color');
      }
    }
  }

  return map;
}

export function matchDatumWithScaleMap(
  keys: string[],
  keyValueMap: { [key: string]: { value?: any; scaleIndex?: number } },
  scaleMap: { [key: string]: any } = {},
  datum: any
) {
  if (isArray(datum)) {
    datum = datum[0];
  }
  return keys.every(key => {
    if (!keyValueMap[key]) {
      return true;
    }

    // 1. 直接匹配
    const { value, scaleIndex } = keyValueMap[key];
    if (isValid(value)) {
      if (datum[key] === value) {
        return true;
      }
    }

    // 2. 通过 scale 匹配
    const scale = scaleMap[key];
    if (!scale || isContinuous(scale.type)) {
      // 2.1 没有 scale 或者 scale 是连续的
      return datum[key] === value;
    }

    // 2.2 通过 scale._index 匹配
    return scale._index.get(`${datum[key]}`) === scaleIndex;
  });
}

export function isSingleMarkMatch(
  config: IMarkStyle<any>,
  series: ISeries,
  scaleMap: { [key: string]: any } = {},
  datum: any
) {
  return (
    isSeriesMatch(config.seriesMatch, series) &&
    matchDatumWithScaleMap(config.itemKeys, config.itemKeyMap, scaleMap, datum)
  );
}

export function findSingleConfig(
  config: { [key: string]: IMarkStyle<any> },
  series: ISeries,
  scaleMap: { [key: string]: any } = {},
  datum: any
) {
  if (!config) {
    return null;
  }
  return Object.values(config).find(v => {
    return isSingleMarkMatch(v, series, scaleMap, datum);
  });
}

export function getMarkStyleId(markName: string, itemKeys: string[], itemKeyMap: { [key: string]: any }) {
  return itemKeys.reduce((pre, cur) => {
    return pre + `${FieldLink}${cur}${ValueLink}${itemKeyMap[cur]}`;
  }, markName);
}

export function getGroupWithDatum(
  dataGroupStyle: IChartCharacterConfig['options']['dataGroupStyle'],
  datum: any,
  seriesField: string,
  scaleMap: Record<string, any>,
  includeAllDataGroup: boolean = true
) {
  const groupStyleKey = Object.keys(dataGroupStyle).find(key => {
    const groupStyle = dataGroupStyle[key];
    if (!groupStyle.seriesFieldMatch) {
      return datum[seriesField] === key;
    }
    const { value, scaleIndex } = groupStyle.seriesFieldMatch;
    if (isValid(value) && value === datum[seriesField]) {
      return true;
    }
    const scale = scaleMap[seriesField];
    if (scale && scale._index.get(`${datum[seriesField]}`) === scaleIndex) {
      return true;
    }
    return false;
  });
  return groupStyleKey ? dataGroupStyle[groupStyleKey] : includeAllDataGroup ? dataGroupStyle[StroyAllDataGroup] : null;
}

export function getGroupStyleWithDatum(
  dataGroupStyle: IChartCharacterConfig['options']['dataGroupStyle'],
  datum: any,
  seriesField: string,
  scaleMap: Record<string, any>,
  markName: string,
  key: string,
  includeAllDataGroup: boolean = true
) {
  return getGroupConfigWithDatum(dataGroupStyle, datum, seriesField, scaleMap, markName, includeAllDataGroup)?.style?.[
    key
  ];
}

export function getGroupConfigWithDatum(
  dataGroupStyle: IChartCharacterConfig['options']['dataGroupStyle'],
  datum: any,
  seriesField: string,
  scaleMap: Record<string, any>,
  markName: string,
  includeAllDataGroup: boolean = true
) {
  return getGroupWithDatum(dataGroupStyle, datum, seriesField, scaleMap, includeAllDataGroup)?.[markName];
}
