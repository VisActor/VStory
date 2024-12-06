import type { IAction, IActionPayload, IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getPayload } from './utils';
import { getCharacterParentGraphic } from '../../common/common';
import type { EasingType, IGraphic } from '@visactor/vrender-core';
import type { IScaleToParams } from '../../common/interface';

export interface IComponentScaleToPayLoad extends IActionPayload {
  scale: { scaleX: number; scaleY: number };
}
export interface IComponentScaleToAction extends IAction<IComponentScaleToPayLoad> {
  action: 'scaleTo';
}

export function scaleTo(graphic: IGraphic, animation: IScaleToParams, scaleTo: { scaleX: number; scaleY: number }) {
  if (graphic) {
    const { duration, easing } = animation;
    if (scaleTo) {
      graphic.animate().to(scaleTo, duration, easing as EasingType);
    }
  }
}

export class CommonScaleToActionProcessor extends ActionProcessorItem {
  name: 'scaleTo';

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

  run(character: ICharacter, actionSpec: IComponentScaleToAction): void {
    super.preRun(character, actionSpec);
    const { animation = {}, scale } = getPayload(actionSpec) as IComponentScaleToPayLoad;
    scaleTo(getCharacterParentGraphic(character), animation as any, scale);
  }
}
