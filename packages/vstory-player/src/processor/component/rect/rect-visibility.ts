import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';

export class RectVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
}

export function registerRectVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.RECT, {
    [ACTION_TYPE.APPEAR]: new RectVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new RectVisibilityActionProcessor()
  });
}
