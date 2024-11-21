import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { BaseComponentWithText } from '@visactor/vstory-core';
import type { ILottieComponentAttributes } from './lottie-interface';
import { Lottie } from '@visactor/vrender-kits';

export class LottieComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ILottieComponentAttributes> = {
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

  lottieInstance: Lottie;

  constructor(attributes: ILottieComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, LottieComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderLottie();
  }
  protected renderLottie() {
    const { graphic, padding, width, height } = this.attribute as ILottieComponentAttributes;
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
    if (!this.lottieInstance) {
      const lottie = new Lottie({});
      this.lottieInstance = lottie;
      this.addChild(lottie);
    }
    this.lottieInstance.setAttributes({ ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null });
  }
}
