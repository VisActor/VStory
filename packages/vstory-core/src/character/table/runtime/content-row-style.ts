import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable, IVTable } from '../interface/character-table';

export class ContentRowStyleRuntime implements ITableCharacterRuntime {
  type = 'ContentRowStyle';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const options = character.getRuntimeConfig().config.options;
    const rowHeaderCount = vTable.rowHeaderLevelCount;
    const colHeaderCount = vTable.columnHeaderLevelCount;
    const colCount = vTable.colCount;

    if (options.contentRowStyle && Object.keys(options.contentRowStyle).length > 0) {
      Object.keys(options.contentRowStyle).forEach(key => {
        const rowStyle = options.contentRowStyle[key as unknown as number];
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
                col: rowHeaderCount
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

export const ContentRowStyleRuntimeInstance = new ContentRowStyleRuntime();
