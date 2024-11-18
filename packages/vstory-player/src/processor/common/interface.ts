import type { EasingType } from '@visactor/vrender-core';
import type { IAnimationParams } from '@visactor/vstory-core';

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

export interface IMoveToParams extends IAnimationParams {
  destination: { x: number; y: number };
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

export interface IScaleToParams extends IAnimationParams {
  scale: { scaleX: number; scaleY: number };
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
