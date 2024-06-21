import type { IGraphic, IStage } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';

export type IContext = {
  dom: string | HTMLElement;
  width: number;
  height: number;
  stage: IStage;
  canvas: HTMLCanvasElement;
};

type ILayoutNumber = { percent?: number; offset: number };
export type ILayoutRect = {
  // 所有模块统一使用如下结构记录布局信息
  x: ILayoutNumber;
  y: ILayoutNumber;
  width: ILayoutNumber;
  height: ILayoutNumber;
};

export type VRenderPointerEvent = PointerEvent & { target: Partial<IGraphic> } & {
  canvas: IPointLike;
  _layerPoint: IPointLike;
};
