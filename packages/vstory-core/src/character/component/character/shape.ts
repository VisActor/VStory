import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import { ShapeComponent } from '../graphic/ShapeComponent';
import type { IShapeComponentAttributes } from '../interface/character-shape';
import { ShapeRuntime } from '../runtime/shape';

export class ShapeCharacter extends CharacterComponent<ShapeComponent, IShapeComponentAttributes> {
  static type = CharacterType.SHAPE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [ShapeRuntime];

  protected createAndAddGraphic(attribute: IShapeComponentAttributes): void {
    this._graphic = new ShapeComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    ShapeCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<IShapeComponentAttributes> {
    return {
      visible: true,
      x: 0,
      y: 0,
      textStyle: {}
    };
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
