import type {
  IArcGraphicAttribute,
  IGroupGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { IStoryLabelItemAttrs, PopTipAttributes } from '@visactor/vrender-components';
import type { ICharacter, IComponentCharacterConfig } from '@visactor/vstory-core';

// graphic 配置
export interface ILabelItemComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: IStoryLabelItemAttrs;
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

interface ILabelItemCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & ILabelItemComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterLabelItem extends ICharacter {
  config: ILabelItemCharacterConfig;
}
