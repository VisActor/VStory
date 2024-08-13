import type { ICharacter } from '../../story/character';
import type { IActionSpec } from '../../story/interface';
import type { IActionProcessorItem } from './interface/action-processor';

export class ActionProcessorItem implements IActionProcessorItem {
  getStartTime(action: IActionSpec): number {
    return this.getStartTimeAndDuration(action).startTime;
  }
  getDuration(action: IActionSpec): number {
    return this.getStartTimeAndDuration(action).duration;
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    return {
      startTime: 0,
      duration: 0
    };
  }

  run(character: ICharacter, actionSpec: IActionSpec): void {
    return;
  }
}
