import type { IChartSpec } from '@visactor/vchart';
import type VChart from '@visactor/vchart';
import { cloneDeep, isArray } from '@visactor/vutils';
import type { IChartUpdateAction } from '../../types/chart/update';
import type { ICharacterVisactor } from '../../../story/character/visactor/interface';
import { isMatch } from './utils';

export const updateProcessor = async (
  chartInstance: ICharacterVisactor,
  spec: IChartSpec,
  action: IChartUpdateAction
) => {
  const chart = chartInstance.getGraphicParent();
  const vchart = chart?._vchart;
  const instance: VChart = vchart ? vchart : chartInstance;

  if (!instance) {
    return;
  }

  const { payload } = action as IChartUpdateAction;
  const { id: dataId, data, values } = payload;

  if (values) {
    instance.updateDataSync(dataId, values);
  } else {
    const rowData = cloneDeep(vchart._dataSet.getDataView(dataId).rawData);

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
};
