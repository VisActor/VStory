import { isValidNumber } from '@visactor/vutils';
import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class ColWidthRuntime implements ITableCharacterRuntime {
  type = 'ColWidth';

  applyConfigToAttribute(character: ICharacterTable): void {
    // TODO: only handle list table for now
    const tableType = character.getAttribute().tableType;
    if (tableType !== 'ListTable') {
      return;
    }

    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (options.colWidth && Object.keys(options.colWidth).length > 0) {
      // record visible indexes
      const lastColVisible = Object.values(options.colVisible ?? {}) ?? [];
      const visibleIndexes: number[] = [];
      for (let i = 0; i <= lastColVisible.length + spec.columns.length; i += 1) {
        const colVisible = lastColVisible[i];
        if (colVisible === false) {
          continue;
        }
        visibleIndexes.push(i);
      }
      spec.columns = spec.columns.map((column: any, index: number) => {
        const colWidth = options.colWidth[visibleIndexes[index]];
        if (!isValidNumber(colWidth)) {
          return column;
        }
        return Object.assign({}, column, { width: colWidth });
      });
    }
  }
}

export const ColWidthRuntimeInstance = new ColWidthRuntime();
