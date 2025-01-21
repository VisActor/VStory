import type { IChartCharacterRuntime } from '../character/chart/interface/runtime';
import type { IComponentCharacterRuntime } from '../character/component/interface/runtime';
import type { ITableCharacterRuntime } from '../character/table/interface/runtime';
import CommonStore from './common-store';

export class RuntimeStoreClass extends CommonStore<
  IChartCharacterRuntime | ITableCharacterRuntime | IComponentCharacterRuntime
> {}
