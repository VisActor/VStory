import type {
  IGroupGraphicAttribute,
  IPolygonGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

// graphic 配置
export interface IPolygonComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: IPolygonGraphicAttribute;
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

interface IPolygonCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & IPolygonComponentAttributes;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterPolygon extends ICharacter {
  config: IPolygonCharacterConfig;
}
