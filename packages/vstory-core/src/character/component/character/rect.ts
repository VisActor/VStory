import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { RectComponent } from '../graphic/RectComponent';
import type { IRectComponentAttributes } from '../interface/character-rect';
import type { ICharacterPickInfo, IStoryEvent } from '../../../interface/event';

export class RectCharacter extends CharacterComponent<RectComponent, IRectComponentAttributes> {
  static type = CharacterType.RECT;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IRectComponentAttributes): void {
    this._graphic = new RectComponent(attribute);
    this.canvas.addGraphic(this._graphic);
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

  checkEvent(event: IStoryEvent): false | ICharacterPickInfo {
    const info = super.checkEvent(event);
    if (info && event.path[event.path.length - 1] === this._group) {
      return false;
    }
    return info;
  }
}
