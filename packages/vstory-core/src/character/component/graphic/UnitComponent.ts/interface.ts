import type {
  IGroupAttribute,
  IGroupGraphicAttribute,
  IRichTextAttribute,
  ISymbolGraphicAttribute,
  ITextGraphicAttribute
} from '@visactor/vrender-core';

export interface IUnitItemAttributes {
  style: ISymbolGraphicAttribute;
  range: [number, number];
}

export interface IUnitGraphicAttributes extends IGroupAttribute {
  /**
   * The width of the container.
   * Defaults to the width defined by the position of the character.
   */
  width: number;

  /**
   * The height of the container.
   * Defaults to the height defined by the position of the character.
   */
  height: number;

  /**
   * The padding inside the container, specifying space between the container border and its content.
   * @default { top: 50, bottom: 50, right: 50, left: 50 }
   */
  padding?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };

  /**
   * The total number of units to be rendered within the container.
   * @default 250
   */
  count?: number;

  /**
   * 每个symbol代表多少数量
   * @default 1
   */
  countPerSymbol?: number;

  /**
   * The gap between units, represented as a percentage of the unit's width and height.
   * The first value specifies the horizontal gap, and the second value specifies the vertical gap.
   * @default [0.5, 0.5]
   */
  gap?: [number, number];

  units: IUnitItemAttributes[];

  /**
   * The aspect ratio of the units, defined as width divided by height.
   * @default 1
   */
  aspect?: number;

  /**
   * The direction in which units are laid out within the container.
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';

  duration?: number;
}

export interface IUnitComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: IUnitGraphicAttributes;
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
