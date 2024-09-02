import type { IPoint } from '@visactor/vutils';
import { inject, injectable, getTheme, CircleRender, getScaledStroke, CIRCLE_NUMBER_TYPE } from '@visactor/vrender';
import type {
  IGraphicAttribute,
  ICircle,
  IContext2d,
  IMarkAttribute,
  IThemeAttribute,
  IGraphicPicker,
  IGraphicRender,
  IPickParams
} from '@visactor/vrender';
import type { Chart } from './vchart-graphic';
import { CHART_NUMBER_TYPE } from './vchart-graphic';

@injectable()
export class VChartPicker implements IGraphicPicker {
  type = 'chart';
  numberType: number = CHART_NUMBER_TYPE;

  contains(chart: any, point: any, params?: IPickParams): boolean | any {
    // 将当前的point转化到global
    const matrix = chart.transMatrix.clone();
    const stageMatrix = chart.stage.window.getViewBoxTransform();
    matrix.multiply(stageMatrix.a, stageMatrix.b, stageMatrix.c, stageMatrix.d, stageMatrix.e, stageMatrix.f);
    const toGlobalMatrix = matrix.getInverse();
    const nextP = { x: 0, y: 0 };
    toGlobalMatrix.transformPoint(point, nextP);

    // 得到 vchart stage
    const vChart = (chart as Chart).vchart;
    const vchartStage = vChart.getStage();
    vchartStage.dirtyBounds?.clear();
    const graphic = vchartStage.pick(nextP.x, nextP.y);
    return graphic;
  }
}
