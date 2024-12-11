import type { IGroup } from '@visactor/vrender-core';
import type { IComponentCharacterRuntimeConstructor } from '@visactor/vstory-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { PopTipComponent } from './PopTipComponent';
import type { IPopTipComponentAttributes } from './poptip-interface';
import { PopTipRuntime } from './poptip-runtime';
import { POPTIP } from './constant';

export class PopTipCharacter extends CharacterComponent<PopTipComponent, IPopTipComponentAttributes> {
  static type = POPTIP;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [PopTipRuntime];

  protected createAndAddGraphic(attribute: IPopTipComponentAttributes): void {
    this._graphic = new PopTipComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    PopTipCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<IPopTipComponentAttributes> {
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
