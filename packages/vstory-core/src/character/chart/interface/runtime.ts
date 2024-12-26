import type { IVChart } from '@visactor/vchart';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
import type { ICharacterChart } from './character-chart';
export interface IChartCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacterChart) => void;

  // 图表初始化完成
  afterInitialize?: (character: ICharacterChart, vchart: IVChart) => void;

  // 图表绘制完成
  beforeVRenderDraw?: (character: ICharacterChart, vchart: IVChart) => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (): IChartCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
