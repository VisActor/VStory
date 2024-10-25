import type { IGraphic } from '@visactor/vrender-core';

export function findLabelGraphic(g: IGraphic, list: IGraphic[]) {
  if (g.type === 'text' || g.type === 'richtext') {
    list.push(g);
    return;
  }
  if (g.children) {
    g.children.forEach((child: IGraphic) => findLabelGraphic(child, list));
  }
}
