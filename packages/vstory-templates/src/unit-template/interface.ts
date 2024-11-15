import type { ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { IEditorTextGraphicAttribute } from '@visactor/vstory-core';

export interface IUnitTemplateSpec {
  layout?: {
    width?: number;
    height?: number;
    title?: {
      height?: number;
      background?: string;
      style?: IEditorTextGraphicAttribute;
      padding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    };
    viz?: {
      background?: string;
      direction?: 'horizontal' | 'vertical';
      padding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    };
  };
  unit?: {
    gap?: number[];
    aspect?: number;
    countPerSymbol?: number;
    defaultStyle?: ISymbolGraphicAttribute | ((index: number) => ISymbolGraphicAttribute);
  };
  data: Record<string, any>[];
  scenes: {
    title: ITextGraphicAttribute[];
    sceneDuration?: number;
    animationDuration?: number;
    nodes: QueryNode[];
  }[];
}

export interface QueryNode {
  query?: (datum: any) => boolean;
  style?: ISymbolGraphicAttribute;
  children?: QueryNode[];
}
