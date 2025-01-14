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
        const colStyle = options.contentColStyle[key as unknown as number];
        if (!colStyle) {
          return;
        }
        // 声明样式
        vTable.registerCustomCellStyle(key, colStyle.style);
        // 匹配样式
        vTable.arrangeCustomCellStyle(
          {
            range: {
              start: {
                col: colStyle.col + rowHeaderCount,
                row: colHeaderCount
              },
              end: {
                col: colStyle.col + rowHeaderCount,
                row: rowCount - 1
              }
            }
          },
          key
        );
      });
    }
  }
}

export const ContentColStyleRuntimeInstance = new ContentColStyleRuntime();
