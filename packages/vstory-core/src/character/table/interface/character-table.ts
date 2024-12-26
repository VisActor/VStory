import type { ICharacter, ICharacterRuntimeConfig } from '../../../interface/character';
import type { ITableCharacterConfig } from '../../../interface/dsl/table';
import type { ListTableAPI, PivotTableAPI, PivotChartAPI } from '@visactor/vtable/es/ts-types';

export type IVTable = ListTableAPI | PivotTableAPI | PivotChartAPI;

export interface ICharacterTable extends ICharacter {
  config: ITableCharacterConfig;
  getRuntimeConfig: () => ICharacterTableRuntimeConfig;
}

export interface ICharacterTableRuntimeConfig extends ICharacterRuntimeConfig {
  config: ITableCharacterConfig;
}
