import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';
import { getTableTypeFromSpec } from '../../../utils/table';

export class TableTypeRuntime implements ITableCharacterRuntime {
  type = 'TableType';

  applyConfigToAttribute(character: ICharacterTable): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    rawAttribute.tableType = getTableTypeFromSpec(rawAttribute.spec);
  }
}

export const TableTypeRuntimeInstance = new TableTypeRuntime();
