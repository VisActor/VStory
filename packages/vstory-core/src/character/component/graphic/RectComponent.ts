import type { ComponentOptions } from '@visactor/vrender-components';
import { merge } from '@visactor/vutils';
import { TextComponent } from './TextComponent';
import type { IRectComponentAttributes } from '../interface/character-rect';

export class RectComponent extends TextComponent {
  static defaultAttributes: Partial<IRectComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100
  };

  constructor(attributes: IRectComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, RectComponent.defaultAttributes, attributes));
  }
}
