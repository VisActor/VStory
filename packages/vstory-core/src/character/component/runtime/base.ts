import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterComponent } from '../interface/character-component';

export class BaseRuntime implements IComponentCharacterRuntime {
  type = 'Base';

  applyConfigToAttribute(character: ICharacterComponent): void {
    const rawAttribute = character.getAttribute();
    const { options, position, locked } = character.config;
    const layout = getLayoutFromWidget(position, character);

    const { graphic = {}, text = {}, panel = {}, padding } = options;

    merge(rawAttribute, panel);
    rawAttribute.padding = padding;
    merge(rawAttribute, layout);
    if (!rawAttribute.textStyle) {
      rawAttribute.textStyle = {};
    }
    merge(rawAttribute.textStyle, text);
    if (!rawAttribute.graphic) {
      rawAttribute.graphic = {};
    }
    if (locked) {
      rawAttribute.pickable = false;
      rawAttribute.childrenPickable = false;
    }
    merge(rawAttribute.graphic, graphic);
  }
}
