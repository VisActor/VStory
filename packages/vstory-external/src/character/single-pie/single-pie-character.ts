import type { IGroup } from '@visactor/vrender-core';
import { CharacterComponent } from '@visactor/vstory-core';
import { SinglePieComponent } from './SinglePieComponent';
import type { ISinglePieComponentAttributes } from './single-pie-interface';
import { SINGLE_PIE } from './constant';

export class SinglePieCharacter extends CharacterComponent<SinglePieComponent, ISinglePieComponentAttributes> {
  static type = SINGLE_PIE;

  static RuntimeMap: { [key: string]: any } = {
    BaseGraphic: true
  };

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: ISinglePieComponentAttributes): void {
    this._graphic = new SinglePieComponent(attribute);
    this.canvas.addGraphic(this._graphic);
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
