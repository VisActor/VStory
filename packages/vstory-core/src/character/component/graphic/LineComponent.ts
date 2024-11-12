import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IImage, ILine } from '@visactor/vrender-core';
import type { ILineComponentAttributes } from '../interface/character-line';
import { TextComponent } from './TextComponent';

export class LineComponent extends TextComponent {
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
    if (!graphic.x) {
      graphic.x = padding.left;
    }
    if (!graphic.y) {
      graphic.y = padding.top;
    }
    this.createOrUpdateChild('line', { ...graphic, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null }, 'line') as ILine;
  }
}
