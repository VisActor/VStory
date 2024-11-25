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

function defaultAppear(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _defaultAppear(graphic, animation as any));
}

function _defaultAppear(graphic: Timeline, params: any) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    const { duration, easing } = params;
    graphic.appearAnimate({ duration: duration, easing });
  }
}

export class TimelineVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectFunc(effect: string = 'default', appear: boolean) {
    switch (effect) {
      case 'default':
        return defaultAppear;
    }
    return super.getEffectFunc(effect, appear);
  }
}

function forward(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _forward(graphic, animation as any));
}

function _forward(graphic: Timeline, params: any) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    const { duration, easing } = params;
    graphic.forward({ duration: duration, easing });
  }
}
function backward(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _backward(graphic, animation as any));
}

function _backward(graphic: Timeline, params: any) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    const { duration, easing } = params;
    graphic.backward({ duration: duration, easing });
  }
}
export class TimelineStateActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'state';
  constructor() {
    super();
  }

  getEffectFunc(effect: string = 'forward', appear: boolean) {
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
