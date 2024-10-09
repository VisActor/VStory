import type { ICartesianSeries, ISeries, IVChart } from '@visactor/vchart';
import { isContinuous } from '@visactor/vscale';
import type { Matrix } from '@visactor/vutils';
import { isArray } from '@visactor/vutils';
import { VCHART_DATA_INDEX } from '../const';
import type { ICharacter } from '../../story/character';
import type { VChartGraphic } from '../../story/character/chart/graphic/vrender/vchart-graphic';

// 特殊系列，会在获取系列数据的唯一key时，增加index
const SpecialSeriesMap: { [key: string]: boolean } = {
  sankey: true,
  map: true,
  wordCloud: true,
  scatter: true
};

export function getSeriesKeyField(series: ISeries) {
  const dimensionFields = [...series.getDimensionField()];

  const seriesField = series.getSeriesField();
  if (!dimensionFields.includes(seriesField)) {
    dimensionFields.push(seriesField);
  }
  if (SpecialSeriesMap[series.type] === true) {
    dimensionFields.push(VCHART_DATA_INDEX);
  }
  return dimensionFields;
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

export function getKeyValueMapWithScaleMap(keys: string[], scaleMap: { [key: string]: any } = {}, datum: any) {
  if (isArray(datum)) {
    datum = datum[0];
  }
  const result: { [key: string]: any } = {};
  keys.forEach(key => {
    const scale = scaleMap[key];
    if (!scale) {
      result[key] = datum[key];
    } else if (isContinuous(scale.type)) {
      result[VCHART_DATA_INDEX] = datum[VCHART_DATA_INDEX];
    } else if (scale._index) {
      result[key] = scale._index.get(`${datum[key]}`);
    } else {
      result[key] = datum[key];
    }
  });
  return result;
}

export function getVChartFromCharacter(character: ICharacter): IVChart {
  return character.graphic.graphic.vchart;
}

export function getChartRenderMatrix(chart: VChartGraphic): Matrix {
  const matrix = chart.globalTransMatrix.clone();
  const stageMatrix = chart.stage.window.getViewBoxTransform().clone();
  stageMatrix.multiply(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
  return stageMatrix;
}
