import { globalProcessorRegistry } from '@visactor/vstory-core';
import {
  ACTION_TYPE,
  CommonBounceActionProcessor,
  CommonMoveToActionProcessor,
  CommonScaleToActionProcessor,
  CommonStyleActionProcessor,
  CommonVisibilityActionProcessor,
  ArcGrowAngle
} from '@visactor/vstory-player';
import { SINGLE_PIE } from '../../character/single-pie/constant';

const defaultInstance = new ArcGrowAngle();
export class SinglePieVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'angle':
        return defaultInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerSinglePieVisibilityAction() {
  globalProcessorRegistry.registerProcessor(SINGLE_PIE, {
    [ACTION_TYPE.APPEAR]: new SinglePieVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new SinglePieVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
