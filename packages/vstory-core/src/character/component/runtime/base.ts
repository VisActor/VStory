import { merge } from '@visactor/vutils';
import type { IComponentCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterComponent } from '../interface/character-component';

export class BaseGraphicRuntime implements IComponentCharacterRuntime {
  type = 'BaseGraphic';

  applyConfigToAttribute(character: ICharacterComponent): void {
    const rawAttribute = character.getAttribute();
    const { options, locked } = character.config;
    const layout = getLayoutFromWidget(character.config, character);

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

export const BaseGraphicRuntimeInstance = new BaseGraphicRuntime();
