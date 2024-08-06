import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import { CommonAppearActionProcessor } from '../common-component';
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

export class TimelineAppearActionProcessor extends CommonAppearActionProcessor {
  name: 'appear';
  constructor() {
    super();
  }

  getEffectFunc(effect: string = 'default') {
    switch (effect) {
      case 'default':
        return defaultAppear;
    }
    return super.getEffectFunc(effect);
  }
}
