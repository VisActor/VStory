import type { IGraphic } from '@visactor/vrender';
import type { IAABBBounds, IPointLike } from '@visactor/vutils';
import { isValid } from '@visactor/vutils';
import type { IWidgetData } from '../dsl-interface';
import { getLayoutFromWidget } from '../../utils/layout';

export abstract class BaseGraphic {
  readonly containsShapePoints: boolean = false;
  type: string;

  protected _character: any;
  protected _graphic: IGraphic<any>;
  get graphic() {
    return this._graphic;
  }
  // protected _group: IGraphic<any>;

  constructor(type: string, character: any) {
    this.type = type;
    this._character = character;
  }

  abstract init(): void;

  getBounds(): IAABBBounds {
    return this._graphic.AABBBounds;
  }

  release() {
    if (this._graphic) {
      this._graphic.parent.removeChild(this._graphic);
      this._graphic = null;
    }
  }

  getInitialAttributes(): any {
    return {
      x: 0,
      y: 0,
      width: 120,
      height: 80,
      angle: 0,
      anchor: [60, 40],
      lineWidth: 2,
      stroke: '#000000',
      shapePoints: [] as IPointLike[]
    };
  }

  setAttributes(attr: Record<string, any>): void {
    if (!this._graphic) {
      return;
    }
    this._graphic.setAttributes(attr);
  }

  show(): void {
    this._graphic.setAttributes({
      visible: true,
      visibleAll: true
    });
  }
  hide(): void {
    this._graphic.setAttributes({
      visible: false,
      visibleAll: false
    });
  }

  getGraphicAttribute(): any {
    return this._graphic?.attribute;
  }

  applyGraphicAttribute(graphicAttribute: any): void {
    this._graphic.setAttributes(
      this._transformAttributes({
        ...graphicAttribute
      })
    );
  }

  getPositionData() {
    return {
      x: this._graphic.attribute.x,
      y: this._graphic.attribute.y,
      width: this._graphic.attribute.width,
      height: this._graphic.attribute.height,
      angle: this._graphic.attribute.angle,
      shapePoints: this._graphic.attribute.shapePoints
    };
  }

  applyLayoutData(layoutData: Partial<IWidgetData>): void {
    this._graphic.setAttributes(
      this._transformAttributes({
        ...getLayoutFromWidget(layoutData),
        shapePoints: this._character.config.options.shapePoints
      })
    );
  }

  protected _transformAttributes(attributes: any): any {
    const width = attributes.width ?? this._graphic?.attribute.width;
    const height = attributes.height ?? this._graphic?.attribute.height;

    const transformedAttributes = Object.assign({}, attributes);
    Object.keys(transformedAttributes).forEach(key => {
      if (!isValid(attributes[key])) {
        delete transformedAttributes[key];
      }
    });
    transformedAttributes.anchor = [width / 2, height / 2];
    transformedAttributes.scaleCenter = [width / 2, height / 2];
    transformedAttributes.x = 0;
    transformedAttributes.y = 0;
    transformedAttributes.angle = 0;
    return transformedAttributes;
  }
}
