import type { ComponentOptions } from '@visactor/vrender-components';
import type { ITextComponentAttributes } from '../interface/character-text';
import { merge } from '@visactor/vutils';
import { RectComponent } from './RectComponent';
import type { IImage } from '@visactor/vrender-core';

export class ImageComponent extends RectComponent {
  static defaultAttributes: Partial<ITextComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    clip: true
  };

  constructor(attributes: ITextComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, ImageComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderImage();
  }
  protected renderImage() {
    this.createOrUpdateChild(
      'image',
      { ...this.attribute, x: 0, y: 0, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null },
      'image'
    ) as IImage;
  }
}
