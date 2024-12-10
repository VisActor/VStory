import type { IGroup } from '@visactor/vrender-core';
import type { IComponentCharacterRuntimeConstructor } from '@visactor/vstory-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { SinglePieComponent } from './SinglePieComponent';
import type { ISinglePieComponentAttributes } from './single-pie-interface';
import { SinglePieRuntime } from './single-pie-runtime';
import { SINGLE_PIE } from './constant';

export class SinglePieCharacter extends CharacterComponent<SinglePieComponent, ISinglePieComponentAttributes> {
  static type = SINGLE_PIE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [SinglePieRuntime];

  protected createAndAddGraphic(attribute: ISinglePieComponentAttributes): void {
    this._graphic = new SinglePieComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    SinglePieCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ISinglePieComponentAttributes> {
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
