import type { ILine, IRect } from '@visactor/vrender-core';
import { createLine, createRect, type IGraphic, type IGraphicAttribute } from '@visactor/vrender-core';
import { isValidNumber, type Matrix } from '@visactor/vutils';
import { transformBoundsWithMatrix, transformPointWithMatrix } from './space';
import { PickGraphicAttribute } from '../const';

export function cloneEditGraphic(graphic: IGraphic, matrix: Matrix, attribute?: Partial<IGraphicAttribute>) {
  const cloneItem = copyGraphicToGlobal(graphic, {
    ...PickGraphicAttribute,
    // 矩形通用
    // @ts-ignore
    cornerRadius: 0,
    ...attribute
  });
  transformGraphicWithMatrix(cloneItem, matrix);
  if (cloneItem.type === 'text') {
    return createRect({
      ...PickGraphicAttribute,
      ...attribute,
      x: cloneItem.AABBBounds.x1,
      y: cloneItem.AABBBounds.y1,
      width: cloneItem.AABBBounds.width(),
      height: cloneItem.AABBBounds.height()
    });
  }
  return cloneItem;
}

export function copyGraphicToGlobal(graphic: IGraphic, attribute?: Partial<IGraphicAttribute>) {
  let item = graphic.clone();
  if (item.type === 'area') {
    item = createLine(item.attribute);
  }
  attribute && item.setAttributes(attribute);
  transformGraphicWithMatrix(item, graphic.parent.globalTransMatrix.getInverse());
  return item;
}

export function transformGraphicWithMatrix(graphic: IGraphic, m: Matrix) {
  if (graphic.type === 'rect') {
    transformRectMarkAttributeWithMatrix(graphic, m);
  }
  // 如果转换了自身坐标，就不应该转换 points
  if (isValidNumber(graphic.attribute.x)) {
    graphic.setAttributes(transformPointWithMatrix(m, { x: graphic.attribute.x, y: graphic.attribute.y }));
  } else {
    transformPointAttributeWithMatrix(graphic, m);
  }
}

export function transformRectMarkAttributeWithMatrix(item: IRect, m: Matrix) {
  const x = item.attribute.x;
  const y = item.attribute.y;
  const width = item.attribute.width;
  const height = item.attribute.height;
  let x1 = item.attribute.x1;
  let y1 = item.attribute.y1;
  if (!isValidNumber(x1)) {
    x1 = item.attribute.x + item.attribute.width;
  }
  if (!isValidNumber(y1)) {
    y1 = item.attribute.y + item.attribute.height;
  }
  const tempBounds = transformBoundsWithMatrix(m, { x1: x, y1: y, x2: x1, y2: y1 });
  // set size
  if (isValidNumber(width)) {
    item.setAttribute('width', tempBounds.x2 - tempBounds.x1);
  }
  if (isValidNumber(height)) {
    item.setAttribute('height', tempBounds.y2 - tempBounds.y1);
  }
  // set pos
  if (isValidNumber(item.attribute.x1)) {
    item.setAttribute('x1', tempBounds.x2);
  }
  if (isValidNumber(item.attribute.y1)) {
    item.setAttribute('y1', tempBounds.y2);
  }
}

export function transformPointAttributeWithMatrix(item: ILine, m: Matrix) {
  if (!item.attribute.points) {
    return;
  }
  const newPoints = item.attribute.points.map(p => {
    const tempBounds = transformBoundsWithMatrix(m, { x1: p.x, y1: p.y, x2: p.x1 ?? p.x, y2: p.y1 ?? p.y });
    return {
      context: p.context,
      x: tempBounds.x1,
      y: tempBounds.y1,
      x1: p.x1 ? tempBounds.x2 : undefined,
      y1: p.y1 ? tempBounds.y2 : undefined
    };
  });
  item.setAttribute('points', newPoints);
}
