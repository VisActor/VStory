import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterRect } from '../interface/character-rect';

export class RectRuntime implements IComponentCharacterRuntime {
  type = 'Rect';

  protected declare _character: ICharacterRect;

  constructor(character: ICharacterRect) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const rawAttribute = this._character.getAttribute();
    const { options, position } = this._character.config;
    const layout = getLayoutFromWidget(position);

    const { graphic = {}, text = {} } = options;

    merge(rawAttribute, graphic);
    merge(rawAttribute, layout);
    if (!rawAttribute.textStyle) {
      rawAttribute.textStyle = {};
    }
    merge(rawAttribute.textStyle, text);
  }
}
