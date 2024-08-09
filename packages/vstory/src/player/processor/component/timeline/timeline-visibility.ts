import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import { CommonVisibilityActionProcessor } from '../common-component';
import { isString } from '@visactor/vutils';
import { TypeWriter } from '../../../../animate/typewirter';
import type { ICharacter } from '../../../../story/character';
import type { ITypeWriterParams } from '../../interface/appear-action';
import { getCharacterByEffect } from '../../../../dsl/story-processor/graphic/util';
import type { Timeline } from '@visactor/vrender-components';

function defaultAppear(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _defaultAppear(graphic, animation as any));
}

function _defaultAppear(graphic: Timeline, params: any) {
  if (graphic && graphic.type !== 'text') {
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
  if (graphic && graphic.type !== 'text') {
    const { duration, easing } = params;
    graphic.forward({ duration: duration, easing });
  }
}
function backward(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _backward(graphic, animation as any));
}

function _backward(graphic: Timeline, params: any) {
  if (graphic && graphic.type !== 'text') {
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
