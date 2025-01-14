import type { IGroup } from '@visactor/vrender-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { PopTipComponent } from './LabelItemComponent';
import type { ILabelItemComponentAttributes } from './label-item-interface';
import { LABEL_ITEM } from './constant';

export class LabelItemCharacter extends CharacterComponent<PopTipComponent, ILabelItemComponentAttributes> {
  static type = LABEL_ITEM;

  static RuntimeMap: { [key: string]: any } = {
    BaseGraphic: true
  };

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: ILabelItemComponentAttributes): void {
    this._graphic = new PopTipComponent(attribute);
    this.canvas.addGraphic(this._graphic);
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
