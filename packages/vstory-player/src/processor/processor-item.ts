import type { IActionProcessorItem } from '@visactor/vstory-core';
import type { IActionSpec } from '@visactor/vstory-core';
import type { ICharacter } from '@visactor/vstory-core';
import { getPayload } from './component/common/utils';

export class ActionProcessorItem implements IActionProcessorItem {
  getStartTime(action: IActionSpec): number {
    return this.getStartTimeAndDuration(action).startTime;
  }
  getDuration(action: IActionSpec): number {
    return this.getStartTimeAndDuration(action).duration;
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

  protected preRun(character: ICharacter, actionSpec: IActionSpec) {
    // 首先展示出来
    character.show();
  }

  run(character: ICharacter, actionSpec: IActionSpec): void {
    return;
  }
}
