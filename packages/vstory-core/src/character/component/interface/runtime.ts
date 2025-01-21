import type { ICharacter } from '../../../interface/character';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
export interface IComponentCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacter) => void;
}

export interface IComponentCharacterRuntimeConstructor {
  new (): IComponentCharacterRuntime;
}
