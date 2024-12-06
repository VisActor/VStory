import type { IAction, IActionPayload, IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getPayload } from './utils';
import { getCharacterParentGraphic } from '../../common/common';
import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IMoveToParams } from '../../common/interface';
import type { IPointLike } from '@visactor/vutils';

export interface IComponentMoveToPayLoad extends IActionPayload {
  destination: { x: number; y: number };
}
export interface IComponentMoveToAction extends IAction<IComponentMoveToPayLoad> {
  action: 'moveTo';
}

export function moveTo(graphic: IGraphic, animation: IMoveToParams, destination: IPointLike) {
  if (graphic) {
    const { duration, easing } = animation;
    if (destination) {
      graphic.animate().to(destination, duration, easing as EasingType);
    }
  }
}

export class CommonMoveToActionProcessor extends ActionProcessorItem {
  name: 'moveTo';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentMoveToAction): void {
    super.preRun(character, actionSpec);
    const { animation = {}, destination } = getPayload(actionSpec) as IComponentMoveToPayLoad;

    moveTo(getCharacterParentGraphic(character), animation as any, destination);
  }
}
