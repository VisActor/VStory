import type { ICharacter } from './character';
import type { ICharacterConfig } from './dsl/dsl';

export interface ICharacterTree {
  getCharacters: () => { [key: string]: ICharacter };
  getCharacterList: () => ICharacter[];
  getCharactersByType: (type: string) => ICharacter[];
  getCharacterById: (key: string) => ICharacter | null;
  addCharacter: (config: ICharacterConfig) => ICharacter;
  removeCharacter: (cId: string) => void;
  initCharacters: (spec: ICharacterConfig[]) => void;
  reset: () => void;
  toDSL: () => ICharacterConfig[];
}
