import type { IRect } from '../../type/space';
import type { ILayoutAttribute, IWidgetData } from '../character';

export function getLayoutFromWidget(w: Partial<IWidgetData> | IRect): Partial<ILayoutAttribute> {
  return {
    x: 'x' in w ? w.x : w.left,
    y: 'y' in w ? w.y : w.top,
    width: 'width' in w ? w.width : <number>(w as any).right - <number>w.left,
    height: 'height' in w ? w.height : <number>(w as any).bottom - <number>w.top
  };
}
