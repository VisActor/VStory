import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IPolygon } from '@visactor/vrender-core';
import { BaseComponentWithText } from './BaseComponentWithText';
import type { IPolygonComponentAttributes } from '../interface/character-polygon';

export class PolygonComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IPolygonComponentAttributes> = {
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

  constructor(attributes: IPolygonComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, PolygonComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    this.renderPolygon();
  }
  protected renderPolygon() {
    const { graphic, padding } = this.attribute as IPolygonComponentAttributes;
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }

    this.createOrUpdateChild(
      'polygon',
      {
        ...attrs,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        postMatrix: null
      },
      'polygon' as any
    ) as IPolygon;
  }
}
