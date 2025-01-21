import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class ColVisibleRuntime implements ITableCharacterRuntime {
  type = 'ColVisible';

  applyConfigToAttribute(character: ICharacterTable): void {
    // TODO: only handle list table for now
    const tableType = character.getRuntimeConfig().getAttribute().tableType;
    if (tableType !== 'ListTable') {
      return;
    }

    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (options.colVisible && Object.keys(options.colVisible).length > 0) {
      spec.columns = spec.columns.map((column: any, index: number) => {
        const colVisible = options.colVisible[index];
        const hide = colVisible === false;
        return Object.assign({}, column, { hide });
      });
    }
  }
}

export const ColVisibleRuntimeInstance = new ColVisibleRuntime();
