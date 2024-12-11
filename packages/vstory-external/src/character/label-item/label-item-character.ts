import type { IGroup } from '@visactor/vrender-core';
import type { IComponentCharacterRuntimeConstructor } from '@visactor/vstory-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { PopTipComponent } from './LabelItemComponent';
import type { ILabelItemComponentAttributes } from './label-item-interface';
import { LabelItemRuntime } from './label-item-runtime';
import { LABEL_ITEM } from './constant';

export class LabelItemCharacter extends CharacterComponent<PopTipComponent, ILabelItemComponentAttributes> {
  static type = LABEL_ITEM;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [LabelItemRuntime];

  protected createAndAddGraphic(attribute: ILabelItemComponentAttributes): void {
    this._graphic = new PopTipComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    LabelItemCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ILabelItemComponentAttributes> {
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
