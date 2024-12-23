import type { IVChart } from '@visactor/vchart';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
import type { ICharacterChartRuntimeConfig } from './character-chart';
export interface IChartCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacterChartRuntimeConfig) => void;

  // 图表初始化完成
  afterInitialize?: (character: ICharacterChartRuntimeConfig, vchart: IVChart) => void;

  // 图表绘制完成
  afterVRenderDraw?: (character: ICharacterChartRuntimeConfig, vchart: IVChart) => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (): IChartCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
