import type { IAction, IActionPayload, IActionSpec, ICharacter } from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { getCharacterGraphic } from '../../common/common';
import type { EasingType } from '@visactor/vrender-core';
import { getPayload } from './utils';

export interface IComponentStylePayLoad extends IActionPayload {
  graphic?: Record<string, any>;
  text?: Record<string, any>;
}

export interface IComponentStyleAction extends IAction<IComponentStylePayLoad> {
  action: 'style';
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
    const { animation = {}, graphic: graphicStyle, text: textStyle } = getPayload(actionSpec) as IComponentStylePayLoad;

    const { duration, easing } = animation as any;
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
