import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IArc, IArcGraphicAttribute } from '@visactor/vrender-core';
import { BaseComponentWithText } from './BaseComponentWithText';
import type { IArcComponentAttributes } from '../interface/character-arc';

export class ArcComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IArcComponentAttributes> = {
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

  constructor(attributes: IArcComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, ArcComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    this.renderPolygon();
  }
  protected renderPolygon() {
    const { graphic, padding, width, height } = this.attribute as IArcComponentAttributes;
    const attrs = { ...graphic };

    if (!attrs.x) {
      attrs.x = width / 2;
    }
    if (!attrs.y) {
      attrs.y = height / 2;
    }

    if (!(attrs as IArcGraphicAttribute).outerRadius) {
      attrs.outerRadius = Math.min(width - padding.left - padding.right, height - padding.top - padding.bottom) / 2;
    }

    this.createOrUpdateChild(
      'arc',
      {
        ...attrs,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        postMatrix: null
      },
      'arc'
    ) as IArc;
  }
}
