import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';
import { isValid, merge } from '@visactor/vutils';

export class TableThemeRuntime implements ITableCharacterRuntime {
  type = 'TableTheme';

  applyConfigToAttribute(character: ICharacterTable): void {
    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;
    const tableType = character.getAttribute().tableType;

    if (!spec.theme) {
      spec.theme = {};
    }
    if (isValid(options.theme)) {
      spec.theme = merge(spec.theme, options.theme);
    }
    // 设置明细表的表头 & body 样式
    if (tableType === 'ListTable') {
      if (options.theme?.headerStyle && spec.columns) {
        spec.columns.forEach((col: any) => {
          if (!col.headerStyle) {
            return;
          }
          col.headerStyle = merge(col.headerStyle, options.theme.headerStyle);
        });
      }
      if (options.theme?.bodyStyle && spec.columns) {
        spec.columns.forEach((col: any) => {
          if (!col.style) {
            return;
          }
          col.style = merge(col.style, options.theme.bodyStyle);
        });
      }
    }
  }
}

export const TableThemeRuntimeInstance = new TableThemeRuntime();
