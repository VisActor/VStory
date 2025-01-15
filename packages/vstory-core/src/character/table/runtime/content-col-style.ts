import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable, IVTable } from '../interface/character-table';

export class ContentColStyleRuntime implements ITableCharacterRuntime {
  type = 'ContentColStyle';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const options = character.getRuntimeConfig().config.options;
    const rowHeaderCount = vTable.rowHeaderLevelCount;
    const rowCount = vTable.rowCount;
    const colHeaderCount = vTable.columnHeaderLevelCount;

    if (options.contentColStyle && Object.keys(options.contentColStyle).length > 0) {
      Object.keys(options.contentColStyle).forEach(key => {
        const col = parseInt(key, 10);
        const styleKey = `contentColStyle-${col}`;
        const colStyle = options.contentColStyle[col];
        if (!colStyle) {
          return;
        }
        // 声明样式
        vTable.registerCustomCellStyle(styleKey, colStyle);
        // 匹配样式
        vTable.arrangeCustomCellStyle(
          {
            range: {
              start: {
                col: col + rowHeaderCount,
                row: colHeaderCount
              },
              end: {
                col: col + rowHeaderCount,
                row: rowCount - 1
              }
            }
          },
          styleKey
        );
      });
    }
  }
}

export const ContentColStyleRuntimeInstance = new ContentColStyleRuntime();
