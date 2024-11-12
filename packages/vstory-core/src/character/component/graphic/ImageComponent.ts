import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IImage } from '@visactor/vrender-core';
import type { IImageComponentAttributes } from '../interface/character-image';
import { TextComponent } from './TextComponent';

export class ImageComponent extends TextComponent {
  static defaultAttributes: Partial<IImageComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    clip: true,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  constructor(attributes: IImageComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, ImageComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderImage();
  }
  protected renderImage() {
    const { graphic, padding, width, height } = this.attribute as IImageComponentAttributes;
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
    this.createOrUpdateChild(
      'image',
      { ...graphic, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null },
      'image'
    ) as IImage;
  }
}
