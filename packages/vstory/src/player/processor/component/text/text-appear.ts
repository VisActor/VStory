import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import { CommonAppearActionProcessor } from '../common-component';
import { isString } from '@visactor/vutils';
import { TypeWriter } from '../../../../animate/typewirter';
import type { ICharacter } from '../../../../story/character';
import type { ITypeWriterParams } from '../../interface/appear-action';
import { getCharacterByEffect } from '../../../../dsl/story-processor/graphic/util';

function typewriter(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _typewriter(graphic, animation as any));
}

function _typewriter(graphic: IText, params: any) {
  if (graphic && graphic.type === 'text') {
    const { duration, easing } = params;
    const { text } = graphic.attribute;
    if (isString(text)) {
      graphic.animate().play(new TypeWriter({ text: '' }, { text }, duration, easing as EasingType));
    }
  }
}

export class TextAppearActionProcessor extends CommonAppearActionProcessor {
  name: 'appear';
  constructor() {
    super();
  }

  getEffectFunc(effect: string) {
    switch (effect) {
      case 'typewriter':
        return typewriter;
    }
    return super.getEffectFunc(effect);
  }
}
