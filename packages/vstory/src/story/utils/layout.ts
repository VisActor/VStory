import type { IRect } from '../../type/space';
import type { ILayoutAttribute, IWidgetData } from '../character';

export function getLayoutFromWidget(w: Partial<IWidgetData> | IRect): Partial<ILayoutAttribute> {
  const x = 'x' in w ? w.x : w.left;
  const y = 'y' in w ? w.y : w.top;
  const width = 'width' in w ? w.width : <number>(w as any).right - <number>w.left;
  const height = 'height' in w ? w.height : <number>(w as any).bottom - <number>w.top;
  return {
    x,
    y,
    width,
    height,
    angle: (w as any).angle ?? 0,
    anchor: [x + width / 2, y + height / 2]
  };
}
