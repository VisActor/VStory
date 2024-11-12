import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import { RectComponent } from '../graphic/RectComponent';
import { RectRuntime } from '../runtime/rect';
import type { IRectComponentAttributes } from '../interface/character-rect';

export class RectCharacter extends CharacterComponent<RectComponent, IRectComponentAttributes> {
  static type = CharacterType.RECT;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [RectRuntime];

  protected createAndAddGraphic(attribute: IRectComponentAttributes): void {
    this._graphic = new RectComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    RectCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<IRectComponentAttributes> {
    return {
      visible: true,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
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
