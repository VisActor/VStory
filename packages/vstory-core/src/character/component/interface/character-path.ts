import type {
  IGroupGraphicAttribute,
  IPathGraphicAttribute,
  IRichTextAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';
import type { ICharacter } from '../../../interface/character';
import type { IComponentCharacterConfig } from '../../../interface/dsl/component';

export interface IPathComponentAttributes extends IGroupGraphicAttribute {
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: IPathGraphicAttribute;
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

interface IPathCharacterConfig extends IComponentCharacterConfig {
  options: {
    text?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
    graphic: IGroupGraphicAttribute & IPathGraphicAttribute;
    panel?: IGroupGraphicAttribute;
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}

export interface ICharacterPath extends ICharacter {
  config: IPathCharacterConfig;
}
