import type { ICharacter, ICharacterRuntimeConfig } from '../../../interface/character';
import type { ITableCharacterConfig } from '../../../interface/dsl/table';
import type { TYPES } from '@visactor/vtable';

export type IVTable = TYPES.ListTableAPI | TYPES.PivotTableAPI | TYPES.PivotChartAPI;

export interface ICharacterTable extends ICharacter {
  config: ITableCharacterConfig;
  getRuntimeConfig: () => ICharacterTableRuntimeConfig;
}

export interface ICharacterTableRuntimeConfig extends ICharacterRuntimeConfig {
  config: ITableCharacterConfig;
}
