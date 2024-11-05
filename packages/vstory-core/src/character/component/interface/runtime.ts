import type { ICharacter } from '../../../interface/character';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
export interface IComponentCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: () => void;
}

export interface IComponentCharacterRuntimeConstructor {
  new (character: ICharacter): IComponentCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
