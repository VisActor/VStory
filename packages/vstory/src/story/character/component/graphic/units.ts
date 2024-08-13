import { createSymbol, type IRect, type ISymbolGraphicAttribute } from '@visactor/vrender';
import { Graphic } from './graphic';
import type { IPointLike } from '@visactor/vutils';

export class GraphicUnits extends Graphic {
  protected _graphic: IRect;

  getInitialAttributes() {
    return {
      unitList: [
        {
          symbolType: 'circle'
        }
      ] as ISymbolGraphicAttribute[],
      gap: [0.5, 0.5],
      aspect: 1
    };
  }

  init() {
    if (!this._graphic) {
      // this._graphic = createRect(
      //   this._transformAttributes({
      //     ...this.getInitialAttributes(),
      //     ...(this._character.spec.options?.graphic ?? {})
      //   })
      // );
      // this._graphic = createRect({
      //   ...this.getInitialAttributes(),
      //   ...(this._character.spec.options?.graphic ?? {})
      // });
      this._graphic = createSymbol(
        {
          // this._transformAttributes({
          dx: 0,
          dy: 0,
          size: 100,
          angle: 0,
          anchor: [60, 40],
          lineWidth: 2,
          stroke: '#000000',
          symbolType: 'circle',
          // ...(this._character.spec.options?.graphic ?? {}),
          fill: 'white'
        }
        // })
      );
      this._graphic.name = `graphic-rect-${this._character.id}`;
      this._character.getGraphicParent().add(this._graphic);
    }
  }
}
