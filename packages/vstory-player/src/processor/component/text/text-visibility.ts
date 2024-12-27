import type { EasingType, IGraphic, IText } from '@visactor/vrender-core';
import type { ICharacter } from '@visactor/vstory-core';
import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { TypeWriter } from '@visactor/vstory-animate';
import { isString } from '@visactor/vutils';
import type { ITypeWriterParams } from './interface';
import { getCharacterByEffect } from '../../common/common';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';
import { BaseVisibility } from '../../common/base-visibility-processor';

export class TypeWriterVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IGraphic, params: ITypeWriterParams, appear: boolean) {
    if (!appear) {
      return;
    }
    const fromClipRange = params.clipRange ?? 0;
    graphic._vstory_lastScaleClipRange = (graphic.attribute as any).clipRange;
    graphic.setAttributes({
      clipRange: fromClipRange
    } as any);
  }
  protected _run(graphic: IGraphic, params: ITypeWriterParams, appear: boolean) {
    if (graphic && (graphic.type === 'text' || graphic.type === 'richtext')) {
      const { duration, easing, params: typewriterParams } = params;
      const { text } = graphic.attribute as any;
      if (isString(text)) {
        let from = '';
        let to = text;
        if (!appear) {
          [from, to] = [to, from];
        }
        const a = graphic
          .animate()
          .play(new TypeWriter({ text: from }, { text: to }, duration, easing as EasingType, typewriterParams));
        if (!appear) {
          a.reversed(true);
        }
      }
    }
    return true;
  }
}

const typewriterIn = new TypeWriterVisibility();

export class TextVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear' = 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'typewriter':
        return typewriterIn;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerTextVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.TEXT, {
    [ACTION_TYPE.APPEAR]: new TextVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TextVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
