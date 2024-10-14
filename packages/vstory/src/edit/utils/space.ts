import type { Edit } from './../edit';
import type { IBoundsLike, IPointLike } from '@visactor/vutils';
import type { Matrix } from '@visactor/vutils';
import type { CharacterChart } from './../../story/character/chart/character';

// character.graphic.graphic.vchart

// export function getChartToGlobalMatrix(character: CharacterChart, edit: Edit): Matrix {
//   if (!character.graphic?.graphic?.vchart) {
//     return new Matrix();
//   }
//   const vchartStage = character.graphic.graphic.vchart.getStage();
//   const chartToView = vchartStage.window.getViewBoxTransform().getInverse();
//   const viewToLayer = edit.getEditGroup().globalTransMatrix.getInverse();
//   viewToLayer.multiply(chartToView.a, chartToView.b, chartToView.c, chartToView.d, chartToView.e, chartToView.f);
//   return viewToLayer;
// }

export function transformBoundsWithMatrix(m: Matrix, b: IBoundsLike) {
  const next1 = { x: 0, y: 0 };
  m.transformPoint({ x: b.x1, y: b.y1 }, next1);
  const next2 = { x: 0, y: 0 };
  m.transformPoint({ x: b.x2, y: b.y2 }, next2);
  return {
    x1: next1.x,
    y1: next1.y,
    x2: next2.x,
    y2: next2.y,
    width: Math.abs(next2.x - next1.x),
    height: Math.abs(next2.y - next1.y)
  };
}

export function transformPointWithMatrix(m: Matrix, point: IPointLike): IPointLike {
  const nextP = { x: 0, y: 0 };
  m.transformPoint(point, nextP);
  return nextP;
}

export function transformPointToEditGroup(edit: Edit, point: IPointLike): IPointLike {
  const viewToLayer = edit.getEditGroup().globalTransMatrix.getInverse();
  return transformPointWithMatrix(viewToLayer, point);
}
