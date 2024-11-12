import type { IGroupGraphicAttribute, IRichTextAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

// graphic 配置
export interface IRectComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
}

interface IRectCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute;
  };
}

export interface ICharacterRect extends ICharacter {
  config: IRectCharacterConfig;
}
