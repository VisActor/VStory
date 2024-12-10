import type { IAnimationParams } from '@visactor/vstory-core';

export interface IAngleParams extends IAnimationParams {
  from?: {
    startAngle?: number;
    endAngle?: number;
  };
}
