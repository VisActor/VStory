import type { IGroup } from '@visactor/vrender';
import { createGroup, createSymbol, type IRect, type ISymbolGraphicAttribute } from '@visactor/vrender';
import { Graphic } from './graphic';
import type { IPointLike } from '@visactor/vutils';
import { getLayoutFromWidget } from '../../../utils/layout';

interface IGraphicUnitAttributes {
  width: number;
  height: number;
  padding: {
    top: number;
    bottom: number;
    right: number;
    left: number;
  };
  count: number;
  unitStyle?: (index: number) => ISymbolGraphicAttribute;
  gap?: [number, number];
  aspect?: number;
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
      width: 1920,
      height: 600,
      padding: {
        top: 50,
        bottom: 50,
        right: 100,
        left: 100
      },
      count: 1,
      unitStyle: (index: number) => ({
        symbolType: 'rect',
        fill: '#4e8ae0'
      }),
      gap: [0.5, 1],
      aspect: 2,
      direction: 'horizontal'
    };
  }

  init() {
    if (!this._graphic) {
      const attributes = { ...this.getInitialAttributes(), ...this._character.spec.options?.graphic };
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

    const primaryOffset =
      secondaryCount <= 1
        ? count <= 1
          ? (primaryLength - unitPrimarySize) / 2
          : (primaryLength - count * unitPrimarySize - (count - 1) * unitPrimarySize * adjustedGap[1]) / (count - 1)
        : 0;
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
    const { count, unitStyle, padding, gap, direction } = attributes;
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
