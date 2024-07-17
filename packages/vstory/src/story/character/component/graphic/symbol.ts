import type { ISymbol } from '@visactor/vrender';
import { createSymbol } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import { Graphic } from './graphic';

export class GraphicSymbol extends Graphic {
  protected _graphic: ISymbol;

  getInitialAttributes() {
    return {
      x: 0,
      y: 0,
      width: 120,
      height: 80,
      angle: 0,
      anchor: [60, 40],
      lineWidth: 2,
      stroke: '#000000',
      shapePoints: [] as IPointLike[],
      symbolType: 'circle'
    };
  }

  init() {
    if (!this._graphic) {
      this._graphic = createSymbol(
        this._transformAttributes({
          ...this.getInitialAttributes(),
          ...(this._character.spec.options?.graphic ?? {})
        })
      );
      this._graphic.name = `graphic-symbol-${this._character.id}`;
      this._character.getGraphicParent().add(this._graphic);
    }
  }
}
