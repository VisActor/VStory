import type { EasingType } from '@visactor/vrender';

export interface IAction {
  action: string;
  payload: Record<string, any>;
}

export interface IAnimationParams {
  duration: number;
  easing?: EasingType;
  loop?: number | boolean;
}

export interface IActionPayload {
  animation?: IAnimationParams;
}

export interface IChartAppearPayLoad extends IActionPayload {
  animation: IAnimationParams & {
    oneByOne: boolean;
    /**
     * 柱状图支持: 'grow' | 'fade' | 'bounce'
     * 折线图支持: 'grow' | 'fade'
     * 饼图支持: 'grow' | 'fade' | 'growAngle' | 'growRadius'
     */
    effect: string;
  };
  fade?: { isBaseOpacity?: boolean };
}

export interface IChartAppearAction extends IAction {
  action: 'appear';
  payload: IChartAppearPayLoad;
}

export type AppearOption = Omit<IChartAppearAction, 'action' | 'data'>;
