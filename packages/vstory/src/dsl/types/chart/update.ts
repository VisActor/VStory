import type { IAction, IActionPayload } from '../index';
import type { Datum } from '../Datum';

export interface IChartUpdatePayload extends IActionPayload {
  // 批量更新数据
  values: Array<Datum>;

  // 将sourceValue替换为targetValue
  data: Array<{
    sourceValue: Datum;
    targetValue: Datum;
  }>;

  id: string | number;
}

export interface IChartUpdateAction extends IAction {
  action: 'update';
  payload: IChartUpdatePayload;
}
