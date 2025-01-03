import type { IRect } from '@visactor/vrender-core';
import type { IWidgetData } from '../interface/dsl/dsl';
import type { ICharacter } from '../interface/character';

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
  const x = 'x' in w ? w.x : w.left;
  const y = 'y' in w ? w.y : w.top;
  let width = (w as any).width;
  let height = (w as any).height;
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
