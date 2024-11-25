import type { IGroup } from '@visactor/vrender-core';
import type { IComponentCharacterRuntimeConstructor } from '@visactor/vstory-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { LOTTIE } from './constant';
import { LottieComponent } from './LottieComponent';
import type { ILottieComponentAttributes } from './lottie-interface';
import { LottieRuntime } from './lottie-runtime';

export class LottieCharacter extends CharacterComponent<LottieComponent, ILottieComponentAttributes> {
  static type = LOTTIE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [LottieRuntime];

  protected createAndAddGraphic(attribute: ILottieComponentAttributes): void {
    this._graphic = new LottieComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    LottieCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
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
