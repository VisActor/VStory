import type { IRect } from '@visactor/vrender-core';
import type { IWidgetData } from '../interface/dsl/dsl';
import type { ICharacter, ILayoutLine } from '../interface/character';
import type { IAABBBounds } from '@visactor/vutils';

export interface ILayoutAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  anchor?: [number | string, number | string];
  dx?: number;
  dy?: number;
  // shapePoints?: IPointLike[];
}

export function getLayoutFromWidget(w: Partial<IWidgetData> | IRect, character: ICharacter): Partial<ILayoutAttribute> {
  let x = 'x' in w ? w.x : w.left;
  let y = 'y' in w ? w.y : w.top;
  let width = (w as any).width;
  let height = (w as any).height;

  if ('x1' in w && 'x2' in w && 'y1' in w && 'y2' in w) {
    x = w.x1;
    y = w.y1;
    width = w.x2 - w.x1;
    height = w.y2 - w.y1;
  }

  const stage = character.canvas.getStage();
  if (!Number.isFinite(width)) {
    width = stage.width - x - ((w as any).right ?? 0);
  }
  if (!Number.isFinite(height)) {
    height = stage.height - y - ((w as any).bottom ?? 0);
  }
  // const width = 'width' in w ? w.width : <number>(w as any).right - <number>w.left;
  // const height = 'height' in w ? w.height : <number>(w as any).bottom - <number>w.top;

  return {
    x,
    y,
    width: isFinite(width) ? width : void 0,
    height: isFinite(height) ? height : void 0,
    angle: (w as any).angle ?? 0,
    anchor: [x + width / 2, y + height / 2].map(item => (isFinite(item) ? item : 0)) as [number, number]
  };
}

export function getLayoutLine(b: IAABBBounds, opt: any, orient: 'x' | 'y' | 'xy' = 'xy') {
  const result: ILayoutLine[] = [];
  if (orient === 'y' || orient === 'xy') {
    const commonInY: Omit<ILayoutLine, 'value' | 'type'> = {
      orient: 'y',
      start: b.x1,
      end: b.x1 + b.width(),
      bounds: b.clone(),
      ...opt
    };
    // top
    result.push({
      value: b.y1,
      type: 'start',
      ...commonInY
    });
    // bottom
    result.push({
      value: b.y2,
      type: 'end',
      ...commonInY
    });
    // middle
    result.push({
      value: (b.y1 + b.y2) * 0.5,
      type: 'middle',
      ...commonInY
    });
  }

  if (orient === 'x' || orient === 'xy') {
    const commonInX: Omit<ILayoutLine, 'value' | 'type'> = {
      orient: 'x',
      start: b.y1,
      end: b.y2,
      bounds: b.clone(),
      ...opt
    };
    // left
    result.push({
      value: b.x1,
      type: 'start',
      ...commonInX
    });
    // right
    result.push({
      value: b.x2,
      type: 'end',
      ...commonInX
    });
    // middle
    result.push({
      value: (b.x1 + b.x2) * 0.5,
      type: 'middle',
      ...commonInX
    });
  }
  return result;
}
