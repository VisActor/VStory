import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { array } from '@visactor/vutils';
import { scaleInstance } from '../../common/scale-processor';
import { fadeInstance } from '../../common/fade-processor';
import { moveInstance } from '../../common/move-processor';
import { wipeInstance } from '../../common/wipe-processor';
import { getPayload } from './utils';
import { getCharacterParentGraphic } from '../../common/common';
import type { IGraphic } from '@visactor/vrender-core';

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
    super.preRun(character, actionSpec);
    const { animation = {}, selector } = getPayload(actionSpec);
    const { effect = 'default' } = animation as any;
    array(effect).forEach(_effect => {
      const graphics = this.selectBySelector(selector, character);
      const appear = actionSpec.action === 'appear';
      const effectInstance = this.getEffectInstance(_effect, appear);
      if (effectInstance) {
        graphics.forEach(graphic => {
          effectInstance.run(graphic, animation as any, appear);
        });
      }
    });
  }

  applyAttrsForVisibility(character: ICharacter, actionSpec: IActionSpec): void {
    const { animation = {}, selector } = getPayload(actionSpec);
    const { effect = 'default' } = animation as any;
    array(effect).forEach(_effect => {
      const graphics = this.selectBySelector(selector, character);
      const appear = actionSpec.action === 'appear';
      const effectInstance = this.getEffectInstance(_effect, appear);
      if (effectInstance) {
        graphics.forEach(graphic => {
          effectInstance.setInitAttributes(graphic, animation as any, appear);
        });
      }
    });
  }

  selectBySelector(selector: string, character: ICharacter): IGraphic[] {
    if (character.getGraphicBySelector) {
      return character.getGraphicBySelector(selector);
    }
    return [getCharacterParentGraphic(character)];
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'scale':
        return scaleInstance;
      case 'wipe':
        return wipeInstance;
      case 'fade':
        return fadeInstance;
      case 'move':
        return moveInstance;
    }
    return fadeInstance;
  }
}
