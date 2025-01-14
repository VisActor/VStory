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
        const col = parseInt(key, 10);
        const styleKey = `colStyle-${col}`;
        const colStyle = options.colStyle[col];
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
                row: 0
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

export const ColStyleRuntimeInstance = new ColStyleRuntime();
