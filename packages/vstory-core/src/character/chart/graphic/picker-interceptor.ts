import type { IPickerService, IPickParams, PickResult } from '@visactor/vrender-core';
import { injectable } from '@visactor/vrender-core';
import type { IMatrix, IPointLike } from '@visactor/vutils';

@injectable()
export class VChartPickServiceInterceptorContribution {
  order: number = 1;
  afterPickItem(
    result: PickResult,
    pickerService: IPickerService,
    point: IPointLike,
    pickParams: IPickParams,
    params?: {
      parentMatrix: IMatrix;
    }
  ): null | PickResult {
    // 点击到图表的空白区域了，那么就判断该位置是否有其他图元，如果有，那就返回false，否则还是认为选中了图表
    if (
      result.graphic === null &&
      result.group &&
      (result.group as any).stage &&
      (result.group as any).stage.id === 'vstory'
    ) {
      // console.log('aaaa', result);
      const stage = (result.group as any).stage;
      const charts = stage.getElementsByType('chart');
      const nextPoint = { x: point.x, y: point.y };
      if (params && params.parentMatrix) {
        params.parentMatrix.transformPoint(point, nextPoint);
      }

      for (let i = charts.length - 1; i >= 0; i--) {
        const chart = charts[i];
        const pointInChart = { x: nextPoint.x, y: nextPoint.y };
        chart.globalTransMatrix.transformPoint(pointInChart, pointInChart);
        const viewBox = chart._vchart.getStage().viewBox;
        // console.log(chart);
        if (viewBox.contains(pointInChart.x, pointInChart.y)) {
          result.graphic = chart;
          result.group = null;
          // result.group =
          return result;
        }
      }
    }

    return result;
  }
}
