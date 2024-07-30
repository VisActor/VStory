import type { ICharacter } from '../../story/character';
import type { IAction } from '../../story/interface';
import type { IActionProcessorItem } from './interface/action-processor';

export class ActionProcessorItem implements IActionProcessorItem {
  getStartTime(action: IAction): number {
    return this.getStartTimeAndDuration(action).startTime;
  }
  getDuration(action: IAction): number {
    return this.getStartTimeAndDuration(action).duration;
  }

  getStartTimeAndDuration(action: IAction): { startTime: number; duration: number } {
    return {
      startTime: 0,
      duration: 0
    };
  }

  run(character: ICharacter, actionSpec: IAction): void {
    return;
  }
}
