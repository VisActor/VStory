import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { ImageComponent } from '../graphic/ImageComponent';
import type { IImageComponentAttributes } from '../interface/character-image';

export class ImageCharacter extends CharacterComponent<ImageComponent, IImageComponentAttributes> {
  static type = CharacterType.IMAGE;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IImageComponentAttributes): void {
    this._graphic = new ImageComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected getDefaultAttribute(): Partial<IImageComponentAttributes> {
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
