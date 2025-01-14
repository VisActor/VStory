import type { IGroup } from '@visactor/vrender-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { LOTTIE } from './constant';
import { LottieComponent } from './LottieComponent';
import type { ILottieComponentAttributes } from './lottie-interface';
import './lottie-runtime';

export class LottieCharacter extends CharacterComponent<LottieComponent, ILottieComponentAttributes> {
  static type = LOTTIE;

  static RuntimeMap: { [key: string]: any } = {
    BaseGraphic: true,
    Lottie: true
  };

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: ILottieComponentAttributes): void {
    this._graphic = new LottieComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected getDefaultAttribute(): Partial<ILottieComponentAttributes> {
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
