import type {
  IArcGraphicAttribute,
  IGroupGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { ICharacter, IComponentCharacterConfig } from '@visactor/vstory-core';

export interface ISinglePieGraphicAttribute extends IGroupGraphicAttribute {
  trackPie?: IArcGraphicAttribute;
  pie?: IArcGraphicAttribute;
}

// graphic 配置
export interface ISinglePieComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: ISinglePieGraphicAttribute;
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

interface ISinglePieCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & ISinglePieComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterSinglePie extends ICharacter {
  config: ISinglePieCharacterConfig;
}
