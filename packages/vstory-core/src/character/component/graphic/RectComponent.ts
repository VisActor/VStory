import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { TextComponent } from './TextComponent';
import type { IRectComponentAttributes } from '../interface/character-rect';
import type { IRect } from '@visactor/vrender-core';

export class RectComponent extends TextComponent {
  static defaultAttributes: Partial<IRectComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  constructor(attributes: IRectComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, RectComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderRect();
  }
  protected renderRect() {
    const { graphic, padding, width, height } = this.attribute as IRectComponentAttributes;
    if (!graphic.x) {
      graphic.x = padding.left;
    }
    if (!graphic.y) {
      graphic.y = padding.top;
    }
    if (!graphic.width) {
      graphic.width = width - padding.left - padding.right;
    }
    if (!graphic.height) {
      graphic.height = height - padding.top - padding.bottom;
    }
    this.createOrUpdateChild('rect', { ...graphic, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null }, 'rect') as IRect;
  }
}
