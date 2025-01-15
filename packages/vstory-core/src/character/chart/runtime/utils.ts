import { array, isArray, isString, isValid, merge } from '@visactor/vutils';
import type { IChart } from '@visactor/vchart/esm/chart/interface';
import type { ICartesianSeries, ISeries } from '@visactor/vchart';
import { isContinuous } from '@visactor/vscale';
import { VCHART_DATA_INDEX, ValueLink, FieldLink, lineSymbolPathMap, LineSymbolType } from './const';
import type { IChartCharacterConfig, IComponentMatch, IMarkStyle } from '../../../interface/dsl/chart';

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
  keyValueMap: { [key: string]: number },
  scaleMap: { [key: string]: any } = {},
  datum: any
) {
  if (isArray(datum)) {
    datum = datum[0];
  }
  return keys.every(key => {
    const scale = scaleMap[key];
    if (!scale) {
      return keyValueMap[key] === datum[key];
    }
    if (isContinuous(scale.type)) {
      return keyValueMap[VCHART_DATA_INDEX] === datum[VCHART_DATA_INDEX];
    }
    return keyValueMap[key] === scale._index.get(`${datum[key]}`);
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

export function transformMarkerSymbolAttributeByKey(attr: any, key: string) {
  if (attr[key]?.originSymbolType) {
    attr[key].symbolType = lineSymbolPathMap[attr[key].originSymbolType as LineSymbolType];
    attr[key].refX = 0;
    const symbolStyle = attr[key].style ?? {};
    const color =
      symbolStyle.color ??
      (isString(symbolStyle.fill) ? symbolStyle.fill : isString(symbolStyle.stroke) ? symbolStyle.stroke : '#000');
    if (attr[key].originSymbolType === LineSymbolType.arrow) {
      attr[key].style = merge({}, symbolStyle, {
        fill: false,
        stroke: color,
        lineWidth: 1,
        color
      });
      attr[key].symbolType = '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>';
    } else if (
      attr[key].originSymbolType === LineSymbolType.solidArrow ||
      attr[key].originSymbolType === LineSymbolType.solidCircle
    ) {
      attr[key].style = merge({}, symbolStyle, {
        fillOpacity: 1,
        fill: color,
        color,
        lineWidth: 0
      });
    } else if (
      attr[key].originSymbolType === LineSymbolType.hollowArrow ||
      attr[key].originSymbolType === LineSymbolType.hollowCircle
    ) {
      attr[key].style = merge({}, symbolStyle, {
        fillOpacity: 1,
        fill: '#fff',
        stroke: color,
        color,
        lineWidth: 1
      });
    }
  }

  return attr;
}

export function getChartType(options: IChartCharacterConfig['options']) {
  const { chartType, spec = {} } = options;

  if (chartType) {
    return chartType;
  }

  if (spec.series && spec.series.length) {
    // whether all series types are consistent.
    const seriesTypes = spec.series.map((s: ISeries) => s.type);
    if (seriesTypes.every((t: string) => t === seriesTypes[0])) {
      return seriesTypes[0];
    }
  }
  return spec.type ?? 'common';
}
