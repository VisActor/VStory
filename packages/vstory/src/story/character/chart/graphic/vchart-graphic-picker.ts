import type { IPoint } from '@visactor/vutils';
import {
  inject,
  injectable,
  getTheme,
  CircleRender,
  getScaledStroke,
  CIRCLE_NUMBER_TYPE
} from '@visactor/vrender-core';
import type {
  IGraphicAttribute,
  ICircle,
  IContext2d,
  IMarkAttribute,
  IThemeAttribute,
  IGraphicPicker,
  IGraphicRender,
  IPickParams
} from '@visactor/vrender-core';
import type { Chart } from './vchart-graphic';
import { CHART_NUMBER_TYPE } from './vchart-graphic';

@injectable()
export class VChartPicker implements IGraphicPicker {
  type = 'chart';
  numberType: number = CHART_NUMBER_TYPE;

  contains(chart: any, point: any, params?: IPickParams): boolean | any {
    const vChart = (chart as Chart).vchart;
    const chartStage = vChart.getStage();
    // point转成全局坐标
    const globalPoint = { x: 0, y: 0 };
    chart.parent.globalTransMatrix().getInverse().transformPoint(point, globalPoint);
    // @ts-ignore
    chartStage._editor_needRender = true;
    const matrix = chart.globalTransMatrix.clone();
    const stageMatrix = chart.stage.window.getViewBoxTransform();
    matrix.multiply(stageMatrix.a, stageMatrix.b, stageMatrix.c, stageMatrix.d, stageMatrix.e, stageMatrix.f);
    chartStage.window.setViewBoxTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    chartStage.dirtyBounds?.clear();
    const nextP = { x: 0, y: 0 };
    matrix.transformPoint(globalPoint, nextP);
    const graphic = chartStage.pick(nextP.x, nextP.y);

    return graphic;
  }
}
