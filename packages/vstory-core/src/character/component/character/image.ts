import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import { ImageComponent } from '../graphic/ImageComponent';
import type { IImageComponentAttributes } from '../interface/character-image';
import { ImageRuntime } from '../runtime/image';

export class ImageCharacter extends CharacterComponent<ImageComponent, IImageComponentAttributes> {
  static type = CharacterType.IMAGE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [ImageRuntime];

  protected createAndAddGraphic(attribute: IImageComponentAttributes): void {
    this._graphic = new ImageComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    ImageCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<IImageComponentAttributes> {
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
