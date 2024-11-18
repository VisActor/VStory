import type { ICharacter } from '@visactor/vstory-core';
import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import type { ITypeWriterParams } from '../text/interface';
import { getCharacterByEffect } from '../../common/common';
import type { IGraphic } from '@visactor/vrender-core';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';

function defaultAppear(character: ICharacter, animation: ITypeWriterParams, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _defaultAppear(graphic, animation as any));
}

function _defaultAppear(graphic: IGraphic, params: any) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    const { duration, easing } = params;
    graphic.appearAnimate({ duration: duration, easing });
  }
}

export class UnitVisibilityActionProcessor extends CommonVisibilityActionProcessor {
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

export function registerUnitVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.UNIT, {
    [ACTION_TYPE.APPEAR]: new UnitVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new UnitVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
