import type { ICharacter } from '../../../story/character';
import type { IActionSpec } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import type { EasingType } from '@visactor/vrender-core';
import type { IComponentMoveToAction, IComponentScaleToAction, IComponentStyleAction } from '../interface/style-action';
import { fadeIn, fadeOut } from '../common/fade-processor';
import { scaleIn, scaleOut, scaleTo } from '../common/scale-processor';
import { wipeIn, wipeOut } from '../common/wipe-processor';
import { getCharacterGraphic } from '../common/common';
import { moveIn, moveOut, moveTo } from '../common/move-processor';
import { array } from '@visactor/vutils';

export class CommonVisibilityActionProcessor extends ActionProcessorItem {
  name: string = 'appearOrDisAppear';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IActionSpec): void {
    const { animation } = actionSpec.payload ?? {};
    const { effect = 'fade' } = animation ?? ({} as any);
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

export class CommonStyleActionProcessor extends ActionProcessorItem {
  name: 'style';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentStyleAction): void {
    const { animation, graphic: graphicStyle, text: textStyle } = actionSpec.payload ?? {};

    const { duration, easing } = animation;
    const graphic = getCharacterGraphic(character)[0];
    const text = getCharacterGraphic(character)[1];

    if (graphic && graphicStyle) {
      graphic.animate().to(graphicStyle, duration, easing as EasingType);
    }
    if (text && textStyle) {
      graphic.animate().to(textStyle, duration, easing as EasingType);
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
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentMoveToAction): void {
    const { animation, destination } = actionSpec.payload ?? {};

    moveTo(character, animation as any, destination);
  }
}
export class CommonScaleToActionProcessor extends ActionProcessorItem {
  name: 'scaleTo';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentScaleToAction): void {
    const { animation, scale } = actionSpec.payload ?? {};

    scaleTo(character, animation as any, scale);
  }
}
