import { StoryFactory } from '@visactor/vstory-core';
import { PopTipCharacter } from './poptip-character';

export function registerPopTip() {
  StoryFactory.registerCharacter(PopTipCharacter.type, PopTipCharacter);
}
