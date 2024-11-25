import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { BaseComponentWithText } from '../BaseComponentWithText';
import type { IUnitComponentAttributes } from './interface';
import { Unit } from './Unit';

export class UnitComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<IUnitComponentAttributes> = {
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

  unit: Unit;

  constructor(attributes: IUnitComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, UnitComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderUnit();
  }
  protected renderUnit() {
    const { graphic, padding, width, height } = this.attribute as IUnitComponentAttributes;
    const attrs: any = { ...graphic, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null };
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
    if (!this.unit) {
      this.unit = new Unit(attrs);
      this.add(this.unit);
    } else {
      this.unit.setAttributes(attrs);
    }
  }
}
