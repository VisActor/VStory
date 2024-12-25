import type { ICharacter, ICharacterRuntimeConfig } from '../../../interface/character';
import type { ITableCharacterConfig } from '../../../interface/dsl/table';

export interface ICharacterTable extends ICharacter {
  config: ITableCharacterConfig;
  getRuntimeConfig: () => ICharacterTableRuntimeConfig;
}

export interface ICharacterTableRuntimeConfig extends ICharacterRuntimeConfig {
  config: ITableCharacterConfig;
}
