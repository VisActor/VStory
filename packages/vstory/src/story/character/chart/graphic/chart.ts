import type { ILineGraphicAttribute } from '@visactor/vrender';
import { createLine } from '@visactor/vrender';
import type { IBoundsLike, IPointLike } from '@visactor/vutils';
import { BaseGraphic } from '../../base/graphic';
import type { IChartGraphicAttribute } from './vrender/vchart-graphic';
import { VChartGraphic } from './vrender/vchart-graphic';

export class Chart extends BaseGraphic {
  protected _graphic: VChartGraphic;

  constructor(type: string, character: any, params: IChartGraphicAttribute) {
    super(type, character);
    this._graphic = new VChartGraphic(params);
  }

  updateViewBox(viewBox: IBoundsLike) {
    this._graphic.updateViewBox(viewBox);
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
