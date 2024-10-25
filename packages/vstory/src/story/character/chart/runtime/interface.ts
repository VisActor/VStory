import type { IVChart } from '@visactor/vchart';
import type { ICharacterVisactor } from '../../visactor/interface';
export interface IChartCharacterRuntime {
  readonly type: string;
  // config 准备完成
  onConfigReady?: () => void;

  // 图表初始化完成
  afterInitializeChart?: (vchart: IVChart) => void;

  // 图表绘制完成
  afterVRenderDraw?: () => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (character: ICharacterVisactor): IChartCharacterRuntime;
}
