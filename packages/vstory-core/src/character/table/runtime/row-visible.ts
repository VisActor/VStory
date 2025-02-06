import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class RowVisibleRuntime implements ITableCharacterRuntime {
  type = 'RowVisible';

  applyConfigToAttribute(character: ICharacterTable): void {
    // TODO: only handle list table for now
    const tableType = character.getRuntimeConfig().getAttribute().tableType;
    if (tableType !== 'ListTable') {
      return;
    }

    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (options.rowVisible && Object.keys(options.rowVisible).length > 0) {
      const records: any[] = [];
      const headerRowVisible = options.rowVisible[-1];
      spec.showHeader = headerRowVisible !== false && options.showHeader !== false;
      options.spec.records.forEach((record: any, index: number) => {
        const rowVisible = options.rowVisible[index];
        if (rowVisible === false) {
          return;
        }
        records.push(record);
      });
      spec.records = records;
    }
  }
}

export const RowVisibleRuntimeInstance = new RowVisibleRuntime();
