import type { ILayoutAttribute, IWidgetData } from '../character';

export function getLayoutFromWidget(w: Partial<IWidgetData>): Partial<ILayoutAttribute> {
  return {
    x: w.x ?? w.left,
    y: w.y ?? w.top,
    width: 'width' in w ? w.width : <number>(w as any).right - <number>w.left,
    height: 'height' in w ? w.height : <number>(w as any).bottom - <number>w.top
  };
}
