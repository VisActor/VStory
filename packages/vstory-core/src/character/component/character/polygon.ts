import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { PolygonComponent } from '../graphic/PolygonComponent';
import type { IPolygonComponentAttributes } from '../interface/character-polygon';
import { PolygonRuntimeInstance } from '../runtime/polygon';

export class PolygonCharacter extends CharacterComponent<PolygonComponent, IPolygonComponentAttributes> {
  static type = CharacterType.POLYGON;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IPolygonComponentAttributes): void {
    this._graphic = new PolygonComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(PolygonRuntimeInstance);
  }
  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
