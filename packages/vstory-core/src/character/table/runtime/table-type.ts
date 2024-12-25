import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class TableTypeRuntime implements ITableCharacterRuntime {
  type = 'CommonSpec';

  applyConfigToAttribute(character: ICharacterTable): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    if (!spec.indicators) {
      rawAttribute.tableType = 'ListTable';
      return;
    }
    // 如果有图表
    if (spec.indicators.some((i: { chartSpec: object }) => !!i.chartSpec)) {
      rawAttribute.tableType = 'PivotChart';
      return;
    }
    rawAttribute.tableType = 'PivotTable';
  }
}

export const TableTypeRuntimeInstance = new TableTypeRuntime();
