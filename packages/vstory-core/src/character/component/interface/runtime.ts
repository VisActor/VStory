import type { ICharacter } from '../../../interface/character';
export interface IComponentCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacter) => void;
}

export interface IComponentCharacterRuntimeConstructor {
  new (): IComponentCharacterRuntime;
}
