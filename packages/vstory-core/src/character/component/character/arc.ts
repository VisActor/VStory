import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { ArcComponent } from '../graphic/ArcComponent';
import type { IArcComponentAttributes } from '../interface/character-arc';
import { ArcRuntimeInstance } from '../runtime/arc';

export class ArcCharacter extends CharacterComponent<ArcComponent, IArcComponentAttributes> {
  static type = CharacterType.ARC;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IArcComponentAttributes): void {
    this._graphic = new ArcComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(ArcRuntimeInstance);
  }
  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
