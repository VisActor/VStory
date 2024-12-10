import type { EasingType } from '@visactor/vrender-core';
import type { IAnimationParams } from '@visactor/vstory-core';

export interface IFadeInParams extends IAnimationParams {
  opacity?: number;
  /**
   * 作用于全局的透明度
   * @default false
   */
  isBaseOpacity?: string;
}

export interface IMoveToParams extends IAnimationParams {
  destination: { x: number; y: number };
}

export interface IMoveParams extends IAnimationParams {
  pos?: 'left' | 'right' | 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
  isVariableSpeed?: boolean;
}

export interface IScaleToParams extends IAnimationParams {
  scale: { scaleX: number; scaleY: number };
  from: { scaleX: number; scaleY: number };
}

export interface IScaleInParams extends IAnimationParams {
  ratio?: number;
}

export interface IWipeInParams extends IAnimationParams {
  from?: 'left' | 'right' | 'top' | 'bottom' | 'stroke';
  fromRatio?: number;
}
export interface IClipRangeParams extends IAnimationParams {
  fromClipRange?: number;
}
