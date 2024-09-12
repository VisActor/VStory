import { injectable } from '@visactor/vrender';
import type { IGraphicPicker, IPickParams } from '@visactor/vrender';
import type { Chart } from './vchart-graphic';
import { CHART_NUMBER_TYPE } from './vchart-graphic';

@injectable()
export class VChartPicker implements IGraphicPicker {
  type = 'chart';
  numberType: number = CHART_NUMBER_TYPE;

  contains(chart: any, point: any, params?: IPickParams): boolean | any {
    // 将当前的point转化到global
    const matrix = chart.parent.globalTransMatrix.clone();
    const stageMatrix = chart.stage.window.getViewBoxTransform();
    matrix.multiply(stageMatrix.a, stageMatrix.b, stageMatrix.c, stageMatrix.d, stageMatrix.e, stageMatrix.f);
    const toGlobalMatrix = matrix.getInverse();
    const nextP = { x: 0, y: 0 };
    toGlobalMatrix.transformPoint(point, nextP);

    // 得到 vchart stage
    const vChart = (chart as Chart).vchart;
    const vchartStage = vChart.getStage();
    vchartStage.dirtyBounds?.clear();
    const toChartMatrix = vchartStage.window.getViewBoxTransform();
    toChartMatrix.transformPoint(nextP, nextP);
    const pick = vchartStage.pick(nextP.x, nextP.y);
    // @ts-ignore
    if (pick.graphic === null && pick.group.name === 'root' && chart.attribute.enablePickBounds !== true) {
      return false;
    }
    return pick;
  }
}
