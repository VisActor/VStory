import type { ICharacter } from '../../../story/character';
import type { IActionSpec } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import type { EasingType } from '@visactor/vrender-core';
import type {
  IComponentBounceAction,
  IComponentMoveToAction,
  IComponentMoveToPayLoad,
  IComponentScaleToAction,
  IComponentScaleToPayLoad,
  IComponentStyleAction,
  IComponentStylePayLoad
} from '../interface/style-action';
import { fadeIn, fadeOut } from '../common/fade-processor';
import { scaleIn, scaleOut, scaleTo } from '../common/scale-processor';
import { wipeIn, wipeOut } from '../common/wipe-processor';
import { moveIn, moveOut, moveTo } from '../common/move-processor';
import { getCharacterGraphic } from '../common/common';
import { array } from '@visactor/vutils';
import { bounce } from '../common/bounce-processor';

function getPayload(action: IActionSpec) {
  return (Array.isArray(action.payload) ? action.payload[0] : action.payload) ?? {};
}

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
    const { animation } = getPayload(actionSpec);
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
    const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentStyleAction): void {
    const { animation, graphic: graphicStyle, text: textStyle } = getPayload(actionSpec) as IComponentStylePayLoad;

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
    const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentMoveToAction): void {
    const { animation, destination } = getPayload(actionSpec) as IComponentMoveToPayLoad;

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
    const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IComponentScaleToAction): void {
    const { animation, scale } = getPayload(actionSpec) as IComponentScaleToPayLoad;

    scaleTo(character, animation as any, scale);
  }
}

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
    const payload = getPayload(actionSpec);
    const { animation } = payload;
    bounce(character, animation as any, payload);
  }
}
