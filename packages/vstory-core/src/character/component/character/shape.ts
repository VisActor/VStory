import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { ShapeComponent } from '../graphic/ShapeComponent';
import type { IShapeComponentAttributes } from '../interface/character-shape';

export class ShapeCharacter extends CharacterComponent<ShapeComponent, IShapeComponentAttributes> {
  static type = CharacterType.SHAPE;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IShapeComponentAttributes): void {
    this._graphic = new ShapeComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
  }

  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
