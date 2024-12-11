import type {
  IArcGraphicAttribute,
  IGroupGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { PopTipAttributes } from '@visactor/vrender-components';
import type { ICharacter, IComponentCharacterConfig } from '@visactor/vstory-core';

// graphic 配置
export interface IPopTipComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: PopTipAttributes;
  /**
   * 内部边距
   */
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

interface IPopTipCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & IPopTipComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterPopTip extends ICharacter {
  config: IPopTipCharacterConfig;
}
