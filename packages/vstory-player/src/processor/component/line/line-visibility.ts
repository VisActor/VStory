import { CharacterType, globalProcessorRegistry } from '@visactor/vstory-core';
import { CommonVisibilityActionProcessor } from '../common/visibility';
import { ACTION_TYPE } from '../../constants/action';

export class LineVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: 'appearOrDisAppear';
}

export function registerLineVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.LINE, {
    [ACTION_TYPE.APPEAR]: new LineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new LineVisibilityActionProcessor()
  });
}
