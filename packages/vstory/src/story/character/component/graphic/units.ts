import type { IGroup } from '@visactor/vrender';
import { createGroup, createSymbol, type IRect, type ISymbolGraphicAttribute } from '@visactor/vrender';
import { Graphic } from './graphic';
import type { IPointLike } from '@visactor/vutils';
import { getLayoutFromWidget } from '../../../utils/layout';

interface IGraphicUnitsAttributes {
  width: number;
  height: number;
  padding: {
    top: number;
    bottom: number;
    right: number;
    left: number;
  };
  unitList: ISymbolGraphicAttribute[];
  gap: [number, number];
  aspect: number;
  direction: 'horizontal' | 'vertical';
}

interface IMatrix {
  numRows: number;
  numCols: number;
  unitWidth: number;
  unitHeight: number;
  offset: number;
}

export class GraphicUnits extends Graphic {
  protected _graphic: IGroup;

  getInitialAttributes(): IGraphicUnitsAttributes {
    return {
      width: 1920,
      height: 600,
      padding: {
        top: 50,
        bottom: 50,
        right: 100,
        left: 100
      },
      unitList: Array.from({ length: 100 }, () => ({
        symbolType: 'rect',
        fill: 'black'
      })) as ISymbolGraphicAttribute[], // TODO: Pick don't allow size related attributes
      // ! use number
      // TODO: add unit style function, input: index, output: style
      gap: [0.5, 0.5],
      aspect: 2,
      direction: 'horizontal'
    };
  }

  init() {
    if (!this._graphic) {
      const matrix = this._getMatrix({
        ...this.getInitialAttributes(),
        ...(this._character.spec.options?.graphic ?? {})
      });
      // this._graphic = createSymbol(
      //   {
      //     // this._transformAttributes({
      //     x: 100,
      //     y: 100,
      //     dx: 100,
      //     dy: 100,
      //     size: 100,
      //     angle: 0,
      //     anchor: [60, 40],
      //     lineWidth: 2,

      //     symbolType: 'rect',
      //     // ...(this._character.spec.options?.graphic ?? {}),
      //     fill: 'white'
      //   }
      //   // })
      // );
      // this._graphic.name = `graphic-rect-${this._character.id}`;
      // // ? graphic  IRect anymore?
      this._graphic = createGroup({
        ...getLayoutFromWidget(this._character.spec.position),
        angle: this._character.spec.options.angle,
        zIndex: this._character.spec.zIndex
      });
      // TODO: add id to graphic
      // this._graphic.add(graphic);

      this._addUnitsToGraphic(matrix);
      this._character.getGraphicParent().add(this._graphic);
    }
  }

  private _getMatrix(attributes: IGraphicUnitsAttributes) {
    if (attributes.direction === 'horizontal') {
      return this._calculateMatrix(attributes);
    }
    const reversedAttributes = {
      ...attributes,
      width: attributes.height,
      height: attributes.width,
      padding: {
        top: attributes.padding.left,
        bottom: attributes.padding.right,
        right: attributes.padding.top,
        left: attributes.padding.bottom
      },
      gap: [attributes.gap[1], attributes.gap[0]] as [number, number],
      aspect: 1 / attributes.aspect
    };
    return this._calculateMatrix(reversedAttributes);
  }

  private _calculateMatrix(attributes: IGraphicUnitsAttributes) {
    const { width, height, padding, unitList, gap, aspect } = attributes;
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const unitCount = unitList.length;
    const numRowsLowerBound = this._calNumRowsLowerBound(innerWidth, innerHeight, aspect, gap, unitCount);
    const { numRows, numCols, unitWidth, unitHeight } = this._convergeMatrix(
      numRowsLowerBound,
      unitCount,
      innerWidth,
      innerHeight,
      aspect,
      gap
    );

    const offset = (innerWidth - numCols * unitWidth - (numCols - 1) * gap[0] * unitWidth) / (numCols - 1);
    return {
      numRows,
      numCols,
      unitWidth,
      unitHeight,
      offset
    };
  }

  private _calNumRowsLowerBound(w: number, h: number, aspect: number, gap: [number, number], count: number): number {
    const a = Math.pow(w * (1 + gap[1]), 2);
    const b = gap[0] * aspect * h - w * gap[1];
    const c = -count * h * aspect * (1 + gap[0]) * (1 + gap[1]);
    const delta = Math.sqrt(b * b - 4 * a * c);
    return Math.ceil((-b + delta) / (2 * a));
  }

  private _convergeMatrix(
    numRowsLowerBound: number,
    count: number,
    w: number,
    h: number,
    aspect: number,
    gap: [number, number]
  ) {
    let numRows = numRowsLowerBound;
    let numCols;
    let unitHeight;
    let unitWidth;
    let totalWidth;
    do {
      unitHeight = h / (numRows * (1 + gap[1]) - gap[1]);
      unitWidth = aspect * unitHeight;
      numCols = Math.ceil(count / numRows);
      totalWidth = numCols * unitWidth + (numCols - 1) * gap[0] * unitWidth;
    } while (totalWidth > w && numRows++);
    return {
      numRows,
      numCols,
      unitHeight,
      unitWidth
    };
  }

  private _addUnitsToGraphic(matrix: IMatrix) {
    const attributes = { ...this.getInitialAttributes(), ...this.getGraphicAttribute() };
    const { numRows, numCols, unitWidth, unitHeight, offset } = matrix;
    const startX = attributes.padding.left + unitWidth / 2;
    const startY = attributes.padding.top + unitHeight / 2;
    const unitList = attributes.unitList;
    const gap = attributes.gap;
    for (let i = 0; i < unitList.length; i++) {
      // TODO: direction for vertical
      const col = Math.floor(i / numRows);
      const row = i % numRows;
      const id = `unit-${i}`;
      const graphic = createSymbol({
        ...unitList[i],
        dx: startX + col * (unitWidth + gap[0] * unitWidth + offset),
        dy: startY + row * (unitHeight + gap[1] * unitHeight),
        // ? for rect? how to determine the size
        // width: unitWidth,
        // height: unitHeight
        size: Math.max(unitWidth, unitHeight)
      });
      graphic.name = id;
      this._graphic.add(graphic);
    }
  }
}
