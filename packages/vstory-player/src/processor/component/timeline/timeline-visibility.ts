import type { ICharacter } from '@visactor/vstory-core';
import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import type { ITypeWriterParams } from '../text/interface';
import { getCharacterByEffect } from '../../common/common';
import type { IGraphic } from '@visactor/vrender-core';
import type { Timeline } from '@visactor/vrender-components';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';
import { BaseVisibility } from '../../common/base-visibility-processor';

export class DefaultVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IGraphic, params: any, appear: boolean) {
    return;
  }

  protected _run(graphic: IGraphic, params: any, appear: boolean) {
    if (graphic && graphic.appearAnimate) {
      const { duration, easing } = params;
      graphic.appearAnimate({ duration: duration, easing });
    }
    return true;
  }
}

const defaultInstance = new DefaultVisibility();

export class TimelineVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';

  getEffectInstance(effect: string = 'default', appear: boolean) {
    switch (effect) {
      case 'default':
        return defaultInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export class ForwardVisibility extends BaseVisibility {
  forward: boolean;
  constructor(forward: boolean) {
    super();
    this.forward = forward;
  }
  protected _setInitAttributes(graphic: IGraphic, params: any, appear: boolean) {
    return;
  }

  protected _run(graphic: IGraphic, params: any, appear: boolean) {
    if (graphic && graphic.appearAnimate) {
      const { duration, easing } = params;
      this.forward ? graphic.forward({ duration: duration, easing }) : graphic.backward({ duration: duration, easing });
    }
    return true;
  }
}
const forward = new ForwardVisibility(true);
const backward = new ForwardVisibility(false);
export class TimelineStateActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'state';
  constructor() {
    super();
  }

  getEffectInstance(effect: string = 'forward', appear: boolean) {
    switch (effect) {
      case 'forward':
        return forward;
      case 'backward':
        return backward;
    }
    return forward;
  }
}

export function registerTimelineVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.TIMELINE, {
    [ACTION_TYPE.APPEAR]: new TimelineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TimelineVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.STATE]: new TimelineStateActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
