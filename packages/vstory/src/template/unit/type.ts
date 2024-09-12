import type { ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { IEditorTextGraphicAttribute } from '../../story/character';

export interface IUnitTemplateSpec {
  layout?: {
    width?: number;
    height?: number;
    title?: {
      height?: number;
      backgroundColor?: string;
      style?: IEditorTextGraphicAttribute;
      padding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    };
    viz?: {
      backgroundColor?: string;
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
    gap?: [number, number];
    aspect?: number;
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

export interface UnitNode {
  style?: ISymbolGraphicAttribute;
  count: number;
  children?: UnitNode[];
}
