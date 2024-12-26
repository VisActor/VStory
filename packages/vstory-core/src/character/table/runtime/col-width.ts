import { isValidNumber } from '@visactor/vutils';
import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class ColWidthRuntime implements ITableCharacterRuntime {
  type = 'ColWidth';

  applyConfigToAttribute(character: ICharacterTable): void {
    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (options.colWidth && Object.keys(options.colWidth).length > 0) {
      spec.columns = spec.columns.map((column: any, index: number) => {
        const width = +options.colWidth[index];
        if (!isValidNumber(width)) {
          return column;
        }
        return Object.assign({}, column, { width });
      });
    }
  }
}

export const ColWidthRuntimeInstance = new ColWidthRuntime();
