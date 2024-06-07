import type { EasingType } from '@visactor/vrender-core';

export interface IAnimationParams {
  duration: number;
  easing?: EasingType;
  loop?: number | boolean;
}

export * from './flicker';
