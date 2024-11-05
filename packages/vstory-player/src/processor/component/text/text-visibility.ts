import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import type { ICharacter } from '@visactor/vstory-core';
import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { TypeWriter } from '@visactor/vstory-animate';
import { isString } from '@visactor/vutils';
import type { ITypeWriterParams } from './interface';
import { getCharacterByEffect } from '../../common/common';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';

function typewriterIn(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _typewriter(graphic, animation as any, true));
}
function typewriterOut(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _typewriter(graphic, animation as any, false));
}

function _typewriter(graphic: IText, params: any, appear: boolean) {
  if (graphic && (graphic.type === 'text' || graphic.type === 'richtext')) {
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

export function registerTextVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.TEXT, {
    [ACTION_TYPE.APPEAR]: new TextVisibilityActionProcessor()
  });
}
