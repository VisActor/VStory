import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

export interface ICharacterComponent extends ICharacter {
  config: IComponentCharacterConfig;
}
