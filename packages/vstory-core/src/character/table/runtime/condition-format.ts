import { merge } from '@visactor/vutils';
import type { ICharacterTable, IVTable } from '../interface/character-table';
import type { ITableCharacterRuntime } from '../interface/runtime';
import { checkStyleCondition, transformStyleFormatToTableStyle } from '../utils/condition';

export class ConditionFormat implements ITableCharacterRuntime {
  type = 'ConditionFormat';

  afterInitialize(character: ICharacterTable, vTable: IVTable): void {
    const config = character.getRuntimeConfig().config;
    const conditionFormats = config.options.conditionFormat;
    if (!conditionFormats || config.options.enableConditionFormat === false) {
      return;
    }

    const rowCount = vTable.rowCount;
    const colCount = vTable.colCount;

    const styleConditionFormatKey = 'condition_style';
    vTable.registerCustomCellStyle(styleConditionFormatKey, (styleArg: any) => {
      const mergedStyle = conditionFormats
        .map(conditionFormat => {
          const { condition, format, range } = conditionFormat;
          if (!conditionFormat.type || !condition || !format) {
            return {};
          }
          if (conditionFormat.type === 'style') {
            const style = transformStyleFormatToTableStyle(format);
            const { row, col, value } = styleArg;
            if (
              range &&
              range !== 'all' &&
              (row < range.startRow || row > range.endRow || col < range.startCol || col > range.endCol)
            ) {
              return null;
            }
            if (!checkStyleCondition(value, condition)) {
              return {};
            }
            return style;
          }
          return {};
        })
        .reduce((acc, curr) => {
          return merge(acc, curr);
        }, {});
      return mergedStyle;
    });

    vTable.arrangeCustomCellStyle(
      {
        range: {
          start: { row: 0, col: 0 },
          end: { row: rowCount - 1, col: colCount - 1 }
        }
      },
      styleConditionFormatKey
    );
  }
}

export const ConditionFormatRuntimeInstance = new ConditionFormat();
