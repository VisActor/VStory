import type { IAction, IActionPayload, IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getPayload } from './utils';
import { moveTo } from '../../common/move-processor';

export interface IComponentMoveToPayLoad extends IActionPayload {
  destination: { x: number; y: number };
}
export interface IComponentMoveToAction extends IAction<IComponentMoveToPayLoad> {
  action: 'moveTo';
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

    moveTo(character, animation as any, destination);
  }
}
