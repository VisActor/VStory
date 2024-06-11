import { type IPointLike, Matrix } from '@visactor/vutils';
import type { IRect } from '../type/space';

export function normalizeAngle(angle: number): number {
  while (angle < 0) {
    angle += Math.PI * 2;
  }
  while (angle >= Math.PI * 2) {
    angle -= Math.PI * 2;
  }
  return angle;
}

export function rotatePoint(point: IPointLike, angle: number, anchor: IPointLike): IPointLike {
  const matrix = new Matrix().rotateByCenter(angle, anchor.x, anchor.y);
  const target: IPointLike = { x: point.x, y: point.y };
  matrix.transformPoint(point, target);
  return target;
}

export function rotateRect(rect: IRect, angle: number, anchor: IPointLike): IRect {
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = rect.x + rect.width;
  const y2 = rect.y + rect.height;
  // left & right & top & bottom points
  const ltPoint = rotatePoint({ x: x1, y: y1 }, angle, anchor);
  const rtPoint = rotatePoint({ x: x2, y: y1 }, angle, anchor);
  const rbPoint = rotatePoint({ x: x2, y: y2 }, angle, anchor);
  const lbPoint = rotatePoint({ x: x1, y: y2 }, angle, anchor);
  const minX = Math.min(ltPoint.x, rtPoint.x, rbPoint.x, lbPoint.x);
  const minY = Math.min(ltPoint.y, rtPoint.y, rbPoint.y, lbPoint.y);
  const maxX = Math.max(ltPoint.x, rtPoint.x, rbPoint.x, lbPoint.x);
  const maxY = Math.max(ltPoint.y, rtPoint.y, rbPoint.y, lbPoint.y);
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
