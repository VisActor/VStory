import type { IGraphic } from '@visactor/vrender-core';
import type { IAnimationParams } from '@visactor/vstory-core';

export const canDoGraphicAnimation = (graphic: IGraphic, animationParams: IAnimationParams) => {
  return graphic && animationParams.duration && animationParams.duration > 0;
};
