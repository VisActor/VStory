import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';
import { clipRangeInstance } from '../../common/clipRange-processor';
export class PolygonVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'clipRange':
        return clipRangeInstance;
    }
    return super.getEffectInstance(effect, appear);
  }
}

export function registerPolygonVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.POLYGON, {
    [ACTION_TYPE.APPEAR]: new PolygonVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new PolygonVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
