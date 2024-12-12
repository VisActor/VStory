import { StoryFactory } from '@visactor/vstory-core';
import { LabelItemCharacter } from './label-item-character';

export function registerLabelItem() {
  StoryFactory.registerCharacter(LabelItemCharacter.type, LabelItemCharacter);
}
