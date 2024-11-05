import type { ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry, CharacterType } from '@visactor/vstory-core';
import { VChartBaseActionProcessor } from './base';
import type { IChartUpdateAction, IChartUpdatePayload } from './interface';
import type { IVChart } from '@visactor/vchart';
import { cloneDeep, isArray } from '@visactor/vutils';
import { isMatch } from '../../utils/isMatch';
import { ACTION_TYPE } from '../constants/action';

export class VChartUpdateActionProcessor extends VChartBaseActionProcessor {
  name: 'update';

  run(character: ICharacter, actionSpec: IChartUpdateAction): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }

    const { payload } = actionSpec;
    // update action暂时不支持数组
    const { id: dataId, data, values } = payload as IChartUpdatePayload;

    if (values) {
      instance.updateDataSync(dataId, values);
    } else {
      const rowData = cloneDeep((instance as any)._dataSet.getDataView(dataId).rawData);

      const items = isArray(data) ? data : [data];

      items.forEach(item => {
        const { sourceValue, targetValue } = item;
        const dataIndex = rowData.findIndex((v: any) => isMatch(v, sourceValue));
        if (dataIndex !== -1) {
          rowData.splice(dataIndex, 1, targetValue);
        }
      });

      instance.updateDataSync(dataId, rowData);
    }
  }
}

export function registerVChartUpdateAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VCHART, {
    [ACTION_TYPE.APPEAR]: new VChartUpdateActionProcessor()
  });
}
