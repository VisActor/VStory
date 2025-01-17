import type { IVChart } from '@visactor/vchart';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
import type { ICharacterChart } from './character-chart';
export interface IChartCharacterRuntime {
  readonly type: string;
  // 应用 config 到 attribute ，主要用来修改 spec
  applyConfigToAttribute?: (character: ICharacterChart) => void;

  // 图表初始化完成，可以获取到图表模块，可以在这里修改 VChart 模块的属性。
  afterInitialize?: (character: ICharacterChart, vchart: IVChart) => void;

  // 图表即将绘制，此时所有vrender元素的属性已经设置完成，可以修改
  beforeVRenderDraw?: (character: ICharacterChart, vchart: IVChart) => void;
}

export interface IChartCharacterRuntimeConstructor {
  new (): IChartCharacterRuntime;
}
