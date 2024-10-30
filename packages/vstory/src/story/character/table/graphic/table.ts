import type { ILineGraphicAttribute } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import { BaseGraphic } from '../../base/graphic';
import type { ITableGraphicAttribute } from './vtable/vtable-graphic';
import { VTableGraphic } from './vtable/vtable-graphic';

export class Table extends BaseGraphic {
  protected _graphic: VTableGraphic;

  setAttributes(attr: Record<string, any>): void {
    if (!this._graphic) {
      return;
    }
    if (attr.spec) {
      this._graphic.updateSpec(attr.spec);
    }
    this._graphic.setAttributes(attr);
  }

  constructor(type: string, character: any, params: ITableGraphicAttribute) {
    super(type, character);
    this._graphic = new VTableGraphic(params);
  }

  getInitialAttributes(): Record<string, any> {
    return {
      x: 0,
      y: 0,
      points: [] as ILineGraphicAttribute['points'],
      angle: 0,
      lineWidth: 2,
      stroke: '#000000',
      shapePoints: [] as IPointLike[]
    };
  }

  init() {
    if (!this._graphic) {
    }
  }

  release(): void {
    if (this._graphic) {
      this._graphic.vProduct.release();
    }
    super.release();
    // this._graphic.parent.removeChild(this._graphic);
  }
}
