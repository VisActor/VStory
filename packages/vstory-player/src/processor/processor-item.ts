import type { IActionProcessorItem } from '@visactor/vstory-core';
import type { IActionSpec } from '@visactor/vstory-core';
import type { ICharacter } from '@visactor/vstory-core';

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
