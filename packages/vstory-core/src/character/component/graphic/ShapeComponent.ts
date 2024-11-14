import type { ComponentOptions } from '@visactor/vrender-components';
import { isArray, merge } from '@visactor/vutils';
import type { IShapeComponentAttributes } from '../interface/character-shape';
import type { ISymbol } from '@visactor/vrender-core';
import { BaseComponentWithText } from './BaseComponentWithText';

const shapeMap: any = {
  star: 'M0 -1L0.22451398828979266 -0.3090169943749474L0.9510565162951535 -0.30901699437494745L0.3632712640026804 0.1180339887498948L0.5877852522924732 0.8090169943749473L8.326672684688674e-17 0.3819660112501051L-0.587785252292473 0.8090169943749476L-0.3632712640026804 0.11803398874989487L-0.9510565162951536 -0.30901699437494723L-0.22451398828979274 -0.30901699437494734Z'
};

export class ShapeComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IShapeComponentAttributes> = {
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

  constructor(attributes: IShapeComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, ShapeComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderShape();
  }
  protected renderShape() {
    const { graphic, padding, width, height } = this.attribute as IShapeComponentAttributes;
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }
    let dx = 0;
    let dy = 0;
    if (!attrs.size) {
      const w = width - padding.left - padding.right;
      const h = height - padding.top - padding.bottom;
      attrs.size = [w, h];
      dx = w / 2;
      dy = h / 2;
    } else if (isArray(attrs.size)) {
      dx = attrs.size[0] / 2;
      dy = attrs.size[1] / 2;
    } else {
      dx = attrs.size / 2;
      dy = attrs.size / 2;
    }

    this.createOrUpdateChild(
      'symbol',
      {
        ...attrs,
        symbolType: shapeMap[attrs.symbolType] ?? attrs.symbolType,
        dx,
        dy,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        postMatrix: null
      },
      'symbol'
    ) as ISymbol;
  }
}
