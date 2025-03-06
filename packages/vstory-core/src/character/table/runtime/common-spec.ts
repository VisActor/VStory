import { array, isValid } from '@visactor/vutils';
import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';

export class CommonSpecRuntime implements ITableCharacterRuntime {
  type = 'TableCommonSpec';

  applyConfigToAttribute(character: ICharacterTable): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const config = character.getRuntimeConfig().config;
    const { spec } = rawAttribute;
    spec.canvas = character.canvas.getNativeCanvas();
    // 编辑模式关闭
    // if (isEditor) {
    // disable select cell visible for editor mode
    spec.select = Object.assign({}, spec.select ?? {}, {
      makeSelectCellVisible: false
    });
    // spec.hover = spec.hover ?? {};
    // // spec.select.disableSelect = true;
    // // spec.hover.disableHover = true;
    // spec.columnResizeMode = 'none';
    // spec.rowResizeMode = 'none';
    /** 控制拖拽表头移动位置顺序开关 */
    // spec.dragHeaderMode = 'none';

    if (spec.legends) {
      array(spec.legends).forEach(l => {
        l.interactive = false;
      });
    }
    // }
    // 风神的特殊位置设置去掉，避免布局小数
    delete spec.theme?.cellInnerBorder;
    delete spec.theme?.cellBorderClipDirection;
    delete spec.theme?._contentOffset;
    delete spec.customConfig;

    isValid(config.options.spec.animation)
      ? (spec.animation = config.options.spec.animation)
      : (spec.animation = false);
    isValid(config.options.spec.disableDirtyBounds)
      ? (spec.disableDirtyBounds = config.options.spec.disableDirtyBounds)
      : (spec.disableDirtyBounds = false);
    isValid(config.options.spec.interactive)
      ? (spec.interactive = config.options.spec.interactive)
      : (spec.interactive = true);
  }
}

export const CommonSpecRuntimeInstance = new CommonSpecRuntime();
