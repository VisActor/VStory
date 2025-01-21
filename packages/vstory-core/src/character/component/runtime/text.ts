import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterComponent } from '../interface/character-component';

export class TextRuntime implements IComponentCharacterRuntime {
  type = 'Text';

  applyConfigToAttribute(character: ICharacterComponent): void {
    const rawAttribute = character.getAttribute();
    const { options, position } = character.config;
    const layout = getLayoutFromWidget(position, character);

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

export const TextRuntimeInstance = new TextRuntime();
