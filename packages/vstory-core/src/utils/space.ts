import type { IRect, graphicCreator, IGraphic, ILayer, ITextAttribute, IText } from '@visactor/vrender';
import { getTextBounds } from '@visactor/vrender';
import type { IBoundsLike, Matrix, IPointLike } from '@visactor/vutils';

export function isPointInBounds(point: IPointLike, rect: IBoundsLike) {
  const { x1, y1, x2, y2 } = rect;
  const { x, y } = point;
  return x <= x2 && x >= x1 && y <= y2 && y >= y1;
}

export function isRectConnectRect(a: IRect, b: IRect) {
  return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
}

export function isPointInRect(point: IPointLike, rect: IRect) {
  const { x, y, width, height } = rect;
  const { x: x0, y: y0 } = point;
  return x0 <= x + width && y0 <= y + height && y0 >= y && x0 >= x;
}

export function SamePointApproximate(a: IPointLike, b: IPointLike, accuracy: number = 3) {
  return SameValueApproximate(a.x, b.x, accuracy) && SameValueApproximate(a.y, b.y, accuracy);
}

export function SameValueApproximate(a: number, b: number, accuracy: number = 3) {
  return Math.floor(a * 10 ** accuracy) === Math.floor(b * 10 ** accuracy);
}

export function transformPointWithMatrix(m: Matrix, pos: IPointLike) {
  return {
    x: m.a * pos.x + m.c * pos.y + m.e,
    y: m.b * pos.x + m.d * pos.y + m.f
  };
}

export function transformBoundsWithMatrix(m: Matrix, b: IBoundsLike) {
  return {
    x1: m.a * b.x1 + m.c * b.y1 + m.e,
    y1: m.b * b.x1 + m.d * b.y1 + m.f,
    x2: m.a * b.x2 + m.c * b.y2 + m.e,
    y2: m.b * b.x2 + m.d * b.y2 + m.f
  };
}

export function transformPointWithLayer(pos: IPointLike, layer: ILayer) {
  return transformPointWithMatrix(layer.globalTransMatrix.getInverse(), pos);
}

export function transformBoundsWithLayer(b: IBoundsLike, layer: ILayer) {
  return transformBoundsWithMatrix(layer.globalTransMatrix.getInverse(), b);
}

export function fontSizeToRectSize(fontSize: number, textAttribute: Partial<ITextAttribute>) {
  return getTextBounds({ ...textAttribute, fontSize }).height();
}

export function getItemBoundsRectWithSpace(
  item: IGraphic,
  transformPos: (point: IPointLike) => IPointLike,
  space: number = 0
) {
  const bounds = item.globalAABBBounds;
  const pos = transformPos({ x: bounds.x1, y: bounds.y1 });
  const rect = {
    x: pos.x - space,
    y: pos.y - space,
    width: bounds.width() + space * 2,
    height: bounds.height() + space * 2
  };
  return rect;
}

export function isBoundsLikeEqual(a: IBoundsLike, b: IBoundsLike) {
  return a.x1 === b.x1 && a.x2 === b.x2 && a.y1 === b.y1 && a.y2 === b.y2;
}
