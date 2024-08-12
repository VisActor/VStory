import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import { CommonVisibilityActionProcessor } from '../common-component';
import { isString } from '@visactor/vutils';
import { TypeWriter } from '../../../../animate/typewirter';
import type { ICharacter } from '../../../../story/character';
import type { ITypeWriterParams } from '../../interface/appear-action';
import { getCharacterByEffect } from '../../../../dsl/story-processor/graphic/util';

function typewriterIn(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _typewriter(graphic, animation as any, true));
}
function typewriterOut(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _typewriter(graphic, animation as any, false));
}

function _typewriter(graphic: IText, params: any, appear: boolean) {
  if (graphic && graphic.type === 'text') {
    const { duration, easing } = params;
    const { text } = graphic.attribute;
    if (isString(text)) {
      let from = '';
      let to = text;
      if (!appear) {
        [from, to] = [to, from];
      }
      graphic.animate().play(new TypeWriter({ text: from }, { text: to }, duration, easing as EasingType));
    }
  }
}

export class TextVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectFunc(effect: string, appear: boolean) {
    switch (effect) {
      case 'typewriter':
        return appear ? typewriterIn : typewriterOut;
    }
    return super.getEffectFunc(effect, appear);
  }
}
