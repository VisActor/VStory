import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IImage } from '@visactor/vrender-core';
import type { IImageComponentAttributes } from '../interface/character-image';
import { BaseComponentWithText } from './BaseComponentWithText';

export class ImageComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IImageComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    clip: true,
    graphic: {
      image:
        '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 10V38C5 39.1046 5.89543 40 7 40H14H18L15 29L22 27L21 20L29 16L27 13L30 8H7C5.89543 8 5 8.89543 5 10Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 38V10C43 8.89543 42.1046 8 41 8H38L34 14L37 19L28 23L29 31L22 33L24 40H41C42.1046 40 43 39.1046 43 38Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    },
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  mainGraphic: IImage;

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
    this.mainGraphic = this.createOrUpdateChild(
      'image',
      { ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null },
      // @ts-ignore
      graphic.subType === 'gif' ? 'gif' : 'image'
    ) as IImage;
  }
}
