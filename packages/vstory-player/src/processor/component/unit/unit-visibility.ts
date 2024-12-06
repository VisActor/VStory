import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import type { IGraphic } from '@visactor/vrender-core';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';
import { BaseVisibility } from '../../common/base-visibility-processor';
import { canDoGraphicAnimation } from '../../common/utils';

export class DefaultVisibility extends BaseVisibility {
  protected _setInitAttributes(graphic: IGraphic, params: any, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
  }

  protected _run(graphic: IGraphic, params: any, appear: boolean) {
    if (!canDoGraphicAnimation(graphic, params)) {
      return false;
    }
    if (graphic && graphic.appearAnimate) {
      const { duration, easing } = params;
      graphic.appearAnimate({ duration: duration, easing });
    }
    return true;
  }
}

const defaultInstance = new DefaultVisibility();

export class UnitVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';

  getEffectInstance(effect: string = 'default', appear: boolean) {
    switch (effect) {
      case 'default':
        return defaultInstance;
    }
    return super.getEffectInstance(effect, appear);
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
