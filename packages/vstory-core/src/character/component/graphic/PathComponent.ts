import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import type { IPath } from '@visactor/vrender-core';
import { BaseComponentWithText } from './BaseComponentWithText';
import type { IPathComponentAttributes } from '../interface/character-path';

export class PathComponent extends BaseComponentWithText {
  type: string = 'PathComponent';
  mainGraphic: IPath;
  static defaultAttributes: Partial<IPathComponentAttributes> = {
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

  constructor(attributes: IPathComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, PathComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    this.renderPath();
  }

  protected renderPath() {
    const { graphic, padding } = this.attribute as IPathComponentAttributes;
    const attrs = { ...graphic };

    if (attrs.x == null) {
      attrs.x = padding?.left ?? 0;
    }
    if (attrs.y == null) {
      attrs.y = padding?.top ?? 0;
    }

    // Path data keeps its own geometry. Here we only provide default placement
    // and reset transforms so runtime actions start from a stable baseline.
    this.mainGraphic = this.createOrUpdateChild(
      'path',
      {
        ...attrs,
        scaleX: 1,
        scaleY: 1,
        angle: 0,
        postMatrix: null
      },
      'path'
    ) as IPath;
  }
}
