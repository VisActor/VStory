import { StoryFactory } from '@visactor/vstory-core';
import { SinglePieCharacter } from './single-pie-character';

export function registerSinglePie() {
  StoryFactory.registerCharacter(SinglePieCharacter.type, SinglePieCharacter);
}
