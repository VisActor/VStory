import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { UnitComponent } from '../graphic/UnitComponent.ts/UnitComponent';
import type { IUnitComponentAttributes } from '../graphic/UnitComponent.ts/interface';
import { UnitRuntimeInstance } from '../runtime/unit';

export class UnitCharacter extends CharacterComponent<UnitComponent, IUnitComponentAttributes> {
  static type = CharacterType.UNIT;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IUnitComponentAttributes): void {
    this._graphic = new UnitComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(UnitRuntimeInstance);
  }

  protected getDefaultAttribute(): Partial<IUnitComponentAttributes> {
    return {
      ...super.getDefaultAttribute(),
      graphic: {
        activeSymbolStyle: {
          size: 26
        },
        activeLineStyle: {
          lineWidth: 1.5
        }
      } as any
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
