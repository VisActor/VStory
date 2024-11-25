import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterText } from '../interface/character-text';

export class TextRuntime implements IComponentCharacterRuntime {
  type = 'Text';

  protected declare _character: ICharacterText;

  constructor(character: ICharacterText) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const rawAttribute = this._character.getAttribute();
    const { options, position } = this._character.config;
    const layout = getLayoutFromWidget(position);

    const { graphic = {}, panel = {}, padding } = options;

    merge(rawAttribute, panel);
    merge(rawAttribute, layout);
    rawAttribute.padding = padding;
    if (!rawAttribute.textStyle) {
      rawAttribute.textStyle = {};
    }
    merge(rawAttribute.textStyle, graphic);
  }
}
