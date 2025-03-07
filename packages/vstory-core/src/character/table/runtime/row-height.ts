import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class RowHeightRuntime implements ITableCharacterRuntime {
  type = 'RowHeight';

  applyConfigToAttribute(character: ICharacterTable): void {
    // TODO: only handle list table for now
    const tableType = character.getRuntimeConfig().getAttribute().tableType;
    if (tableType !== 'ListTable') {
      return;
    }

    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (options.rowHeight && Object.keys(options.rowHeight).length > 0) {
      spec.customComputeRowHeight = (args: { row: number }) => {
        return options.rowHeight[args.row] ?? undefined;
      };
    }
  }
}

export const RowHeightRuntimeInstance = new RowHeightRuntime();
