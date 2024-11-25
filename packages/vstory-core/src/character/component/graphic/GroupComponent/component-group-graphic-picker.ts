// import type { IPoint } from '@visactor/vutils';
// import { inject, injectable, getTheme, CircleRender, getScaledStroke, CIRCLE_NUMBER_TYPE } from '@visactor/vrender';
// import type {
//   IGraphicAttribute,
//   ICircle,
//   IContext2d,
//   IMarkAttribute,
//   IThemeAttribute,
//   IGraphicPicker,
//   IGraphicRender,
//   IPickParams
// } from '@visactor/vrender';
// import { CHART_NUMBER_TYPE } from './component-group-graphic';

// @injectable()
// export class VChartPicker extends DefaultCanvasGroupPicker implements IGraphicPicker {
//   type = 'vstory-component-group';
//   numberType: number = CHART_NUMBER_TYPE;

//   contains(chart: any, point: any, params?: IPickParams): boolean | any {
//     const vChart = (chart as Chart).vchart;
//     const chartStage = vChart.getStage();
//     // @ts-ignore
//     chartStage._editor_needRender = true;
//     const matrix = chart.globalTransMatrix.clone();
//     const stageMatrix = chart.stage.window.getViewBoxTransform();
//     matrix.multiply(stageMatrix.a, stageMatrix.b, stageMatrix.c, stageMatrix.d, stageMatrix.e, stageMatrix.f);
//     chartStage.window.setViewBoxTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
//     chartStage.dirtyBounds?.clear();
//     const nextP = { x: 0, y: 0 };
//     matrix.transformPoint(point, nextP);
//     const graphic = chartStage.pick(nextP.x, nextP.y);

//     return graphic;
//   }
// }
