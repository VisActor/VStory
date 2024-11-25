import type { IVChart } from '@visactor/vchart';
import type { ICharacter } from '../../../interface/character';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
export interface IChartCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: () => void;

  // 图表初始化完成
  afterInitialize?: (vchart: IVChart) => void;

  // 图表绘制完成
  afterVRenderDraw?: () => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (character: ICharacter): IChartCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
