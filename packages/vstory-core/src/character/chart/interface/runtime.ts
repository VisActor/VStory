import type { IVChart } from '@visactor/vchart';
import type { ICharacter } from '../../../interface/character';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
export interface IChartCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacter) => void;

  // 图表初始化完成
  afterInitialize?: (character: ICharacter, vchart: IVChart) => void;

  // 图表绘制完成
  afterVRenderDraw?: (character: ICharacter) => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (): IChartCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
