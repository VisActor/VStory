import type { ISymbol } from '@visactor/vrender';
import { createSymbol } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import { Graphic } from './graphic';
import type { IWidgetData } from '../../dsl-interface';
import { getLayoutFromWidget } from '../../../utils/layout';

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
      const attributes = this._transformAttributes({
        ...this.getInitialAttributes(),
        ...(this._character.config.options?.graphic ?? {})
      });
      this._graphic = createSymbol(attributes);
      this._graphic.name = `graphic-symbol-${this._character.id}`;
      this._character.getGraphicParent().add(this._graphic);
    }
  }

  applyLayoutData(layoutData: Partial<IWidgetData>): void {
    const attributes = this._transformAttributes({
      ...getLayoutFromWidget(layoutData),
      shapePoints: this._character.config.options.shapePoints
    });
    attributes.size = Math.min(attributes.width, attributes.height);

    this._graphic.setAttributes(attributes);
  }

  protected _transformAttributes(attributes: any): any {
    const data = super._transformAttributes(attributes);
    const { width, height } = attributes;
    data.x = width / 2;
    data.y = height / 2;
    return data;
  }
}
