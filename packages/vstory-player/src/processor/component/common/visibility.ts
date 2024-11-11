import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { array } from '@visactor/vutils';
import { scaleIn, scaleOut } from '../../common/scale-processor';
import { fadeIn, fadeOut } from '../../common/fade-processor';
import { moveIn, moveOut } from '../../common/move-processor';
import { wipeIn, wipeOut } from '../../common/wipe-processor';
import { getPayload } from './utils';

export class CommonVisibilityActionProcessor extends ActionProcessorItem {
  name: string = 'appearOrDisAppear';

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

  run(character: ICharacter, actionSpec: IActionSpec): void {
    // 首先展示出来
    character.show();
    const { animation = {} } = getPayload(actionSpec);
    const { effect = 'fade' } = animation as any;
    array(effect).forEach(_effect => {
      const effectFunc = this.getEffectFunc(_effect, actionSpec.action === 'appear');
      if (effectFunc) {
        effectFunc(character, animation as any, _effect);
      }
    });
  }

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'scale':
        return appear ? scaleIn : scaleOut;
      case 'wipe':
        return appear ? wipeIn : wipeOut;
      case 'fade':
        return appear ? fadeIn : fadeOut;
      case 'move':
        return appear ? moveIn : moveOut;
    }
    return fadeIn;
  }
}
