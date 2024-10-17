import { isArray, isValid } from '@visactor/vutils';
import type { IComponentMatch } from '../../dsl-interface';
import type { IChart } from '@visactor/vchart/esm/chart/interface';
import type { ICartesianSeries, ISeries } from '@visactor/vchart';
import { isContinuous } from '@visactor/vscale';
import { VCHART_DATA_INDEX, ValueLink, FieldLink } from './const';
import type { IMarkStyle } from '../spec-process/interface';

export function ChartSpecMatch(rawSpec: any, index: number, matchInfo: IComponentMatch) {
  if (!matchInfo) {
    return false;
  }
  if (isValid(matchInfo.usrId)) {
    return rawSpec.id === matchInfo.usrId;
  } else if (isValid(matchInfo.specIndex)) {
    return matchInfo.specIndex === 'all' || index === matchInfo.specIndex;
  }

  return false;
}

export function GetVChartSeriesWithMatch(vchart: IChart, seriesMatch: IComponentMatch & { type: string }) {
  if (!isValid(seriesMatch.specIndex) && seriesMatch.type) {
    return vchart.getAllSeries().filter(s => s.type === seriesMatch.type);
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
  if (!isValid(seriesMatch.type) && series.type !== seriesMatch.type) {
    return false;
  }
  if (!isValid(seriesMatch.usrId) && series.userId !== seriesMatch.usrId) {
    return false;
  }
  if (!isValid(seriesMatch.specIndex) && series.getSpecIndex() !== seriesMatch.specIndex) {
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
    return keyValueMap[key] === scaleMap[key]._index.get(`${datum[key]}`);
  });
}

export function getMarkStyleId(markName: string, itemKeys: string[], itemKeyMap: { [key: string]: any }) {
  return itemKeys.reduce((pre, cur) => {
    return pre + `${FieldLink}${cur}${ValueLink}${itemKeyMap[cur]}`;
  }, markName);
}
