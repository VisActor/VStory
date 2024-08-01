import type { IGraphic } from '@visactor/vrender-core';
import type { IAnimationParams } from '../interface/appear-action';

/**
 * 判断图元是否需要执行动画
 * @param graphic
 * @param animationParams
 * @returns
 */
export const canDoGraphicAnimation = (graphic: IGraphic, animationParams: IAnimationParams) => {
  return graphic && animationParams.duration && animationParams.duration > 0;
};
