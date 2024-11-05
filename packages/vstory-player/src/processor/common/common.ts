import type { IGraphic } from '@visactor/vrender-core';
import type { ICharacter } from '@visactor/vstory-core';

export function getCharacterParentGraphic(character: ICharacter) {
  return character.graphic;
}

export function getCharacterGraphic(character: ICharacter) {
  return character.graphic.getChildren() as IGraphic[];
}

export function getCharacterByEffect(character: ICharacter, effect: 'move' | string) {
  // move效果, 一定是对parent的操作
  return getCharacterGraphic(character);
}
