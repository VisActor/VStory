import type { IGroupGraphicAttribute, IRichTextAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import { IRectGraphicAttribute } from '@visactor/vrender-core';
import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

// graphic 配置
export interface ITextComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<
    ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] } & {
      align: 'left' | 'center' | 'right' | 'start' | 'end';
      baseline: 'top' | 'middle' | 'bottom';
    }
  >;
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

interface ITextCharacterConfig extends IComponentCharacterConfig {
  options: {
    graphic: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterText extends ICharacter {
  config: ITextCharacterConfig;
}
