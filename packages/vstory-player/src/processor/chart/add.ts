import { globalProcessorRegistry, type ICharacter, CharacterType } from '@visactor/vstory-core';
import type { IVChart } from '@visactor/vchart';
import { cloneDeep, isArray } from '@visactor/vutils';
import type { IChartAddAction, IChartAddPayload } from './interface';
import { VChartBaseActionProcessor } from './base';
import { ACTION_TYPE } from '../constants/action';

export class VChartAddActionProcessor extends VChartBaseActionProcessor {
  name: 'add';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartAddAction): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }

    const { payload } = actionSpec as IChartAddAction;
    // add action暂时不支持数组
    const { id: dataId, values } = payload as IChartAddPayload;
    const rowData = cloneDeep((instance as any)._dataSet.getDataView(dataId).rawData);

    const data = isArray(values) ? values : [values];
    rowData.push(...data);

    instance.updateDataSync(dataId, rowData);
  }
}

export function registerVChartAddAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VCHART, {
    [ACTION_TYPE.APPEAR]: new VChartAddActionProcessor()
  });
}
