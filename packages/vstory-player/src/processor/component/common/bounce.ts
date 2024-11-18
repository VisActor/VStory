import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getPayload } from './utils';
import type { IComponentBounceAction } from '../../common/bounce-processor';
import { bounce } from '../../common/bounce-processor';
import { ACTION_TYPE } from '../../constants/action';

export class CommonBounceActionProcessor extends ActionProcessorItem {
  name: 'bounce';

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

  run(character: ICharacter, actionSpec: IComponentBounceAction): void {
    super.preRun(character, actionSpec);
    const payload = getPayload(actionSpec);
    const { animation = {} } = payload;
    bounce(character, animation as any, payload);
  }
}

export function registerCommonBounceAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.COMMON, {
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
