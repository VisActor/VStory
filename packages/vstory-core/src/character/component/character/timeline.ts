import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { IComponentCharacterRuntimeConstructor } from '../interface/runtime';
import { TimelineComponent } from '../graphic/TimelineComponent';
import type { ITimelineComponentAttributes } from '../interface/character-timeline';
import { TimelineRuntime } from '../runtime/timeline';

export class TimelineCharacter extends CharacterComponent<TimelineComponent, ITimelineComponentAttributes> {
  static type = CharacterType.TIMELINE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [TimelineRuntime];

  protected createAndAddGraphic(attribute: ITimelineComponentAttributes): void {
    this._graphic = new TimelineComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    TimelineCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ITimelineComponentAttributes> {
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