import { createGroup, createSymbol, type IGroup, type ISymbolGraphicAttribute } from '@visactor/vrender';
import { Graphic } from './graphic';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { IWidgetData } from '../../dsl-interface';
import { logger } from '../../../../util/output';

interface IGraphicUnitAttributes {
  /**
   * The width of the container.
   * Defaults to the width defined by the position of the character.
   */
  width?: number;

  /**
   * The height of the container.
   * Defaults to the height defined by the position of the character.
   */
  height?: number;

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
   * A function defining the style of each unit based on its index.
   * @default { symbolType: 'circle', fill: '#4e8ae0' }
   */
  styleFunc?: (index: number) => ISymbolGraphicAttribute;

  /**
   * The gap between units, represented as a percentage of the unit's width and height.
   * The first value specifies the horizontal gap, and the second value specifies the vertical gap.
   * @default [0.5, 0.5]
   */
  gap?: [number, number];

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
}

interface IGridConfig {
  rows: number;
  cols: number;
  unitWidth: number;
  unitHeight: number;
  offsetX: number;
  offsetY: number;
}

export class GraphicUnit extends Graphic {
  protected _graphic: IGroup;

  getInitialAttributes(): IGraphicUnitAttributes {
    return {
      padding: {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
      },
      count: 250,
      styleFunc: (index: number) => ({
        symbolType: 'circle',
        fill: '#4e8ae0'
      }),
      gap: [0.5, 0.5],
      aspect: 1,
      direction: 'horizontal'
    };
  }

  init() {
    if (!this._graphic) {
      const { width, height } = this._getContainerSize(
        this._character.spec.position,
        this._character.spec.options?.graphic
      );
      const attributes = { ...this.getInitialAttributes(), ...this._character.spec.options?.graphic, width, height };
      const gridConfig = this._calculateGrid(attributes);
      this._graphic = createGroup({
        ...getLayoutFromWidget(this._character.spec.position),
        angle: this._character.spec.options.angle,
        zIndex: this._character.spec.zIndex
      });
      this._addUnitsToGraphic(gridConfig, attributes);
      this._character.getGraphicParent().add(this._graphic);
    }
  }

  private _getContainerSize(position: IWidgetData, graphic: IGraphicUnitAttributes) {
    if (graphic.width && graphic.height) {
      return { width: graphic.width, height: graphic.height };
    }
    if ('width' in position && 'height' in position) {
      return { width: position.width, height: position.height };
    }
    if ('bottom' in position && 'right' in position) {
      return { width: position.right - position.left, height: position.bottom - position.top };
    }
    logger('error', 'Invalid IWidgetData type');
  }

  private _calculateGrid(attributes: IGraphicUnitAttributes): IGridConfig {
    const { width, height, padding, count, gap, aspect, direction } = attributes;
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const isHorizontal = direction === 'horizontal';
    const primaryLength = isHorizontal ? innerHeight : innerWidth;
    const secondaryLength = isHorizontal ? innerWidth : innerHeight;
    const adjustedAspect = isHorizontal ? aspect : 1 / aspect;
    const adjustedGap: [number, number] = isHorizontal ? gap : [gap[1], gap[0]];

    const minPrimaryCount = this._calculateMinPrimaryCount(
      primaryLength,
      secondaryLength,
      adjustedAspect,
      adjustedGap,
      count
    );
    const { primaryCount, secondaryCount, unitPrimarySize, unitSecondarySize } = this._convergeGrid(
      minPrimaryCount,
      count,
      primaryLength,
      secondaryLength,
      adjustedAspect,
      adjustedGap
    );

    const offset =
      (secondaryLength -
        secondaryCount * unitSecondarySize -
        (secondaryCount - 1) * adjustedGap[0] * unitSecondarySize) /
      (secondaryCount - 1);

    let primaryOffset;
    if (secondaryCount <= 1) {
      if (count <= 1) {
        primaryOffset = (primaryLength - unitPrimarySize) / 2;
      } else {
        primaryOffset =
          (primaryLength - count * unitPrimarySize - (count - 1) * unitPrimarySize * adjustedGap[1]) / (count - 1);
      }
    } else {
      primaryOffset = 0;
    }
    const secondaryOffset = secondaryCount <= 1 ? (secondaryLength - unitSecondarySize) / 2 : offset;

    return isHorizontal
      ? {
          rows: primaryCount,
          cols: secondaryCount,
          unitWidth: unitSecondarySize,
          unitHeight: unitPrimarySize,
          offsetX: secondaryOffset,
          offsetY: primaryOffset
        }
      : {
          rows: secondaryCount,
          cols: primaryCount,
          unitWidth: unitPrimarySize,
          unitHeight: unitSecondarySize,
          offsetX: primaryOffset,
          offsetY: secondaryOffset
        };
  }

  private _calculateMinPrimaryCount(
    primaryLength: number,
    secondaryLength: number,
    aspect: number,
    gap: [number, number],
    count: number
  ): number {
    const a = Math.pow(secondaryLength * (1 + gap[1]), 2);
    const b = gap[0] * aspect * primaryLength - secondaryLength * gap[1];
    const c = -count * primaryLength * aspect * (1 + gap[0]) * (1 + gap[1]);
    const delta = Math.sqrt(b * b - 4 * a * c);
    return Math.ceil((-b + delta) / (2 * a));
  }

  private _convergeGrid(
    minPrimaryCount: number,
    count: number,
    primaryLength: number,
    secondaryLength: number,
    aspect: number,
    gap: [number, number]
  ) {
    let primaryCount = minPrimaryCount;
    let unitPrimarySize;
    let unitSecondarySize;
    let secondaryCount;
    let totalWidth;

    do {
      unitPrimarySize = primaryLength / (primaryCount * (1 + gap[1]) - gap[1]);
      unitSecondarySize = aspect * unitPrimarySize;
      secondaryCount = Math.ceil(count / primaryCount);
      totalWidth = secondaryCount * unitSecondarySize + (secondaryCount - 1) * gap[0] * unitSecondarySize;
    } while (totalWidth > secondaryLength && primaryCount++);

    return { primaryCount, secondaryCount, unitPrimarySize, unitSecondarySize };
  }

  private _addUnitsToGraphic(gridConfig: IGridConfig, attributes: IGraphicUnitAttributes) {
    const { rows, cols, unitWidth, unitHeight, offsetX, offsetY } = gridConfig;
    const { count, styleFunc: unitStyle, padding, gap, direction } = attributes;
    const startX = padding.left + unitWidth / 2;
    const startY = padding.top + unitHeight / 2;
    const isHorizontal = direction === 'horizontal';

    for (let i = 0; i < count; i++) {
      const col = isHorizontal ? Math.floor(i / rows) : i % cols;
      const row = isHorizontal ? i % rows : Math.floor(i / cols);
      const dx =
        startX +
        col * (unitWidth + gap[0] * unitWidth + offsetX) +
        (isHorizontal && cols <= 1 ? offsetX : 0) +
        (!isHorizontal && rows <= 1 ? offsetX : 0);
      const dy =
        startY +
        row * (unitHeight + gap[1] * unitHeight + offsetY) +
        (!isHorizontal && rows <= 1 ? offsetY : 0) +
        (isHorizontal && cols <= 1 ? offsetY : 0);

      const graphic = createSymbol({ ...unitStyle!(i), dx, dy, size: Math.max(unitWidth, unitHeight) });
      graphic.name = `unit-${i}`;
      this._graphic.add(graphic);
    }
  }
}
