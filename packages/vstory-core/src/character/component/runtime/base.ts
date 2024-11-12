import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterComponent } from '../interface/character-component';

export class BaseRuntime implements IComponentCharacterRuntime {
  type = 'Base';

  protected declare _character: ICharacterComponent;

  constructor(character: ICharacterComponent) {
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
