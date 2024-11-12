import type { ComponentOptions } from '@visactor/vrender-components';
import type { ITextComponentAttributes } from '../interface/character-text';
import { merge } from '@visactor/vutils';
import { TextComponent } from './TextComponent';

export class RectComponent extends TextComponent {
  static defaultAttributes: Partial<ITextComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    fill: 'green',
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  constructor(attributes: ITextComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, RectComponent.defaultAttributes, attributes));
  }
}
