import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { ILineComponentAttributes } from '../interface/character-line';
import { LineComponent } from '../graphic/LineComponent';
import { LineRuntimeInstance } from '../runtime/line';

export class LineCharacter extends CharacterComponent<LineComponent, ILineComponentAttributes> {
  static type = CharacterType.LINE;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: ILineComponentAttributes): void {
    this._graphic = new LineComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(LineRuntimeInstance);
  }

  protected getDefaultAttribute(): Partial<ILineComponentAttributes> {
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
