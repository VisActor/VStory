import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable, IVTable } from '../interface/character-table';

export class CellStyleRuntime implements ITableCharacterRuntime {
  type = 'CellStyle';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const config = character.getRuntimeConfig().config;
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    if (!config.options.cellStyle) {
      return;
    }

    const colHeaderCount = vTable.columnHeaderLevelCount;
    const rowHeaderCount = vTable.rowHeaderLevelCount;

    spec.customCellStyle = spec.customCellStyle ?? [];
    spec.customCellStyleArrangement = spec.customCellStyleArrangement ?? [];
    Object.values(config.options.cellStyle).forEach(({ col, row, style }) => {
      if (!style) {
        return;
      }
      const customStyleId = `__story_cell_Style_${col}_${row}`;
      vTable.registerCustomCellStyle(customStyleId, style);
      // 匹配样式
      vTable.arrangeCustomCellStyle(
        {
          range: vTable.getCellRange(col + rowHeaderCount, row + colHeaderCount)
        },
        customStyleId
      );
    });
  }
}

export const CellStyleRuntimeInstance = new CellStyleRuntime();
