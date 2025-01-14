import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable, IVTable } from '../interface/character-table';

export class RowStyleRuntime implements ITableCharacterRuntime {
  type = 'RowStyle';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const options = character.getRuntimeConfig().config.options;
    const colHeaderCount = vTable.columnHeaderLevelCount;
    const colCount = vTable.colCount;

    if (options.rowStyle && Object.keys(options.rowStyle).length > 0) {
      Object.keys(options.rowStyle).forEach(key => {
        const row = parseInt(key, 10);
        const styleKey = `rowStyle-${row}`;
        const rowStyle = options.rowStyle[row];
        if (!rowStyle) {
          return;
        }
        // 声明样式
        vTable.registerCustomCellStyle(styleKey, rowStyle);
        // 匹配样式
        vTable.arrangeCustomCellStyle(
          {
            range: {
              start: {
                row: row + colHeaderCount,
                col: 0
              },
              end: {
                row: row + colHeaderCount,
                col: colCount - 1
              }
            }
          },
          styleKey
        );
      });
    }
  }
}

export const RowStyleRuntimeInstance = new RowStyleRuntime();
