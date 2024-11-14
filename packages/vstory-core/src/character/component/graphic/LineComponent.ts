import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IImage, ILine } from '@visactor/vrender-core';
import type { ILineComponentAttributes } from '../interface/character-line';
import { BaseComponentWithText } from './BaseComponentWithText';

export class LineComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ILineComponentAttributes> = {
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

  constructor(attributes: ILineComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, LineComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderLine();
  }
  protected renderLine() {
    const { graphic, padding } = this.attribute as ILineComponentAttributes;
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }
    this.createOrUpdateChild('line', { ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null }, 'line') as ILine;
  }
}
