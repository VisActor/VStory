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
        const rowStyle = options.rowStyle[key as unknown as number];
        if (!rowStyle) {
          return;
        }
        // 声明样式
        vTable.registerCustomCellStyle(key, rowStyle.style);
        // 匹配样式
        vTable.arrangeCustomCellStyle(
          {
            range: {
              start: {
                row: rowStyle.row + colHeaderCount,
                col: 0
              },
              end: {
                row: rowStyle.row + colHeaderCount,
                col: colCount - 1
              }
            }
          },
          key
        );
      });
    }
  }
}

export const RowStyleRuntimeInstance = new RowStyleRuntime();
