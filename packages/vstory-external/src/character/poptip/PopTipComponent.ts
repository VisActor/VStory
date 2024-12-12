import { AbstractComponent, PopTip, type ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { BaseComponentWithText } from '@visactor/vstory-core';
import type { IPopTipComponentAttributes } from './poptip-interface';

export class PopTipComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IPopTipComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    graphic: {
      panel: {
        visible: true
      }
    }
  };

  vrComponent: PopTip;

  constructor(attributes: IPopTipComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, PopTipComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加pie
    this.renderPopTip();
  }
  protected renderPopTip() {
    const { graphic, padding, width, height } = this.attribute as IPopTipComponentAttributes;
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
    const attribute: any = { ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null };
    if (!this.vrComponent) {
      const poptip = new PopTip(attribute);
      this.vrComponent = poptip;
      this.addChild(poptip);
    } else {
      this.vrComponent.setAttributes(attribute);
    }
  }
}
