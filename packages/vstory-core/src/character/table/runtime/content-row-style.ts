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
        const row = parseInt(key, 10);
        const styleKey = `contentRowStyle-${row}`;
        const rowStyle = options.contentRowStyle[row];
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
                col: rowHeaderCount
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

export const ContentRowStyleRuntimeInstance = new ContentRowStyleRuntime();
