import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';
import { CommonStyleActionProcessor } from '../common/style';
import { CommonMoveToActionProcessor } from '../common/move';
import { CommonScaleToActionProcessor } from '../common/scale';
import { CommonBounceActionProcessor } from '../common/bounce';

export class ImageVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
}

export function registerImageVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.IMAGE, {
    [ACTION_TYPE.APPEAR]: new ImageVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ImageVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
