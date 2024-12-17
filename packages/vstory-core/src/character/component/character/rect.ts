import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { RectComponent } from '../graphic/RectComponent';
import { RectRuntimeInstance } from '../runtime/rect';
import type { IRectComponentAttributes } from '../interface/character-rect';

export class RectCharacter extends CharacterComponent<RectComponent, IRectComponentAttributes> {
  static type = CharacterType.RECT;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IRectComponentAttributes): void {
    this._graphic = new RectComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(RectRuntimeInstance);
  }

  protected getDefaultAttribute(): Partial<IRectComponentAttributes> {
    return {
      ...super.getDefaultAttribute(),
      width: 100,
      height: 100
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
