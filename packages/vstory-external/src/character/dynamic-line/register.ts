import { StoryFactory } from '@visactor/vstory-core';
import { DynamicLineCharacter } from './dynamic-line-character';

export function registerDynamicLine() {
  StoryFactory.registerCharacter(DynamicLineCharacter.type, DynamicLineCharacter);
}
