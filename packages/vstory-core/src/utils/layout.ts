import type { IRect } from '@visactor/vrender-core';
import type { IWidgetData } from '../interface/dsl/dsl';

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

export function getLayoutFromWidget(w: Partial<IWidgetData> | IRect): Partial<ILayoutAttribute> {
  const x = 'x' in w ? w.x : w.left;
  const y = 'y' in w ? w.y : w.top;
  const width = 'width' in w ? w.width : <number>(w as any).right - <number>w.left;
  const height = 'height' in w ? w.height : <number>(w as any).bottom - <number>w.top;
  return {
    x,
    y,
    width: isFinite(width) ? width : void 0,
    height: isFinite(height) ? height : void 0,
    angle: (w as any).angle ?? 0,
    anchor: [x + width / 2, y + height / 2].map(item => (isFinite(item) ? item : 0)) as [number, number]
  };
}
