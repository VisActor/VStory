import type { ICharacterConfigBase, IEditorTextGraphicAttribute } from './dsl';

export interface IComponentCharacterConfig extends ICharacterConfigBase {
  options: {
    // 主图元的配置
    graphic: any;
    // 面板配置
    panel?: any;
    // 文字配置
    text?: IEditorTextGraphicAttribute;
    // 边距
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}
