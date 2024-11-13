import type {
  IGroupGraphicAttribute,
  IImageGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

// graphic 配置
export interface IImageComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: IImageGraphicAttribute;
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

interface IImageCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & IImageComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterImage extends ICharacter {
  config: IImageCharacterConfig;
}
