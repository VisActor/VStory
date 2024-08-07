import type { EasingType } from '@visactor/vrender-core';
import type { IAction, IActionPayload, IAnimationParams } from './common-action';

export interface IChartVisibilityPayload extends IActionPayload {
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

export interface IChartVisibilityAction extends IAction<IChartVisibilityPayload> {
  action: 'appear' | 'disappear';
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

export interface IMoveParams extends IAnimationParams {
  pos?: 'left' | 'right' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
  move?: {
    /**
     * @default left
     */
    pos?: IMoveParams['pos'];
    /**
     * @default true
     * @description 若为true: 多个图形的move距离不同, duration相同, 使多个图形同时抵达目标位置;  若为false: 多个图形move的距离相同, duration相同, 即可使多个图形达到相同的速度, 以保持图形的相对位置不变.
     */
    isVariableSpeed?: boolean;
    duration?: number;
    easing?: EasingType;
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

export type ITypeWriterParams = IAnimationParams;
export interface IComponentAppearPayLoad extends IActionPayload {
  animation: IFadeInParams | IScaleInParams | IWipeInParams;
}

export interface IComponentVisibilityAction extends IAction<IComponentAppearPayLoad> {
  action: 'appear' | 'disappear';
}

export type AppearOption = Omit<IChartVisibilityAction, 'action' | 'data'>;
