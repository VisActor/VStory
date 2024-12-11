import { StoryLabelItem, type ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { BaseComponentWithText } from '@visactor/vstory-core';
import type { ILabelItemComponentAttributes } from './label-item-interface';

export class PopTipComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ILabelItemComponentAttributes> = {
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

  vrComponent: StoryLabelItem;

  constructor(attributes: ILabelItemComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, PopTipComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加pie
    this.renderPopTip();
  }
  protected renderPopTip() {
    const { graphic, padding, width, height } = this.attribute as ILabelItemComponentAttributes;
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
      const labelItem = new StoryLabelItem(attribute);
      this.vrComponent = labelItem;
      this.addChild(labelItem);
    } else {
      this.vrComponent.setAttributes(attribute);
    }
  }
}
