import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IRectComponentAttributes } from '../interface/character-rect';
import type { IRect } from '@visactor/vrender-core';
import { BaseComponent } from './BaseComponent';

export class RectComponent extends BaseComponent {
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
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }
    if (!attrs.width) {
      attrs.width = width - padding.left - padding.right;
    }
    if (!attrs.height) {
      attrs.height = height - padding.top - padding.bottom;
    }
    this.createOrUpdateChild('rect', { ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null }, 'rect') as IRect;
  }
}
