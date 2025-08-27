import { CharacterType } from '@visactor/vstory-core';

import { ACTION_TYPE } from '../../constants/action';
import { VChartVisibilityActionProcessor } from '../visibility';
import { globalProcessorRegistry } from '../../../player/processorRegistry';

export class ScatterBarVisibilityActionProcessor extends VChartVisibilityActionProcessor {
  // getMarkAnimateConfig(vchart: IVChart, mark: any, markIndex: number, action: 'appear' | 'disappear', series: ISeries, payload: IChartVisibilityPayload) {
  // }
}

export function registerScatterBarVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.SCATTER_BAR, {
    [ACTION_TYPE.APPEAR]: new ScatterBarVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ScatterBarVisibilityActionProcessor()
  });
}
