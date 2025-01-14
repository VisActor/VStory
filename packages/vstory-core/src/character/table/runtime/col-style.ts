import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable, IVTable } from '../interface/character-table';

export class ColStyleRuntime implements ITableCharacterRuntime {
  type = 'ColStyle';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const options = character.getRuntimeConfig().config.options;
    const rowHeaderCount = vTable.rowHeaderLevelCount;
    const rowCount = vTable.rowCount;

    if (options.colStyle && Object.keys(options.colStyle).length > 0) {
      Object.keys(options.colStyle).forEach(key => {
        const colStyle = options.colStyle[key as unknown as number];
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
                row: 0
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

export const ColStyleRuntimeInstance = new ColStyleRuntime();
