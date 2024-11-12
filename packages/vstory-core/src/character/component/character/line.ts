import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import type { ILineComponentAttributes } from '../interface/character-line';
import { LineComponent } from '../graphic/LineComponent';
import { LineRuntime } from '../runtime/line';

export class LineCharacter extends CharacterComponent<LineComponent, ILineComponentAttributes> {
  static type = CharacterType.LINE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [LineRuntime];

  protected createAndAddGraphic(attribute: ILineComponentAttributes): void {
    this._graphic = new LineComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    LineCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ILineComponentAttributes> {
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
