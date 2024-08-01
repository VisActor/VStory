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

// components
export interface IFadeInParams extends IAnimationParams {
  opacity?: number;
  fade?: {
    /**
     * @default 1
     */
    opacity?: number;
    duration?: number;
    easing?: EasingType;
    /**
     * 作用于全局的透明度
     * @default false
     */
    isBaseOpacity?: string;
  };
}

export interface IScaleInParams extends IAnimationParams {
  ratio?: number;
  scale?: {
    /**
     * @default 1
     */
    ratio?: number;
    duration?: number;
    easing?: EasingType;
  };
}

export interface IWipeInParams extends IAnimationParams {
  from?: 'left' | 'right' | 'top' | 'bottom' | 'stroke';
  wipe?: {
    /**
     * @default left
     */
    from?: 'left' | 'right' | 'top' | 'bottom' | 'stroke';
    duration?: number;
    easing?: EasingType;
  };
}

export interface IComponentAppearPayLoad extends IActionPayload {
  animation: IFadeInParams | IScaleInParams | IWipeInParams;
}

export type AppearOption = Omit<IChartAppearAction, 'action' | 'data'>;
