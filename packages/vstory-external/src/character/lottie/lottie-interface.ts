import type { IGroupGraphicAttribute, IRichTextAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { ILottieGraphicAttribute } from '@visactor/vrender-kits';
import type { ICharacter, IComponentCharacterConfig } from '@visactor/vstory-core';

// graphic 配置
export interface ILottieComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: ILottieGraphicAttribute;
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

interface ILottieCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & ILottieComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterLottie extends ICharacter {
  config: ILottieCharacterConfig;
}
