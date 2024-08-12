import type { IGraphic } from '@visactor/vrender-core';
import type { IAnimationParams } from '../interface/common-action';

/**
 * 判断图元是否需要执行动画
 * @param graphic
 * @param animationParams
 * @returns
 */
export const canDoGraphicAnimation = (graphic: IGraphic, animationParams: IAnimationParams) => {
  return graphic && animationParams.duration && animationParams.duration > 0;
};

export const isMatch = (obj: object, source: object) => {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (!obj.hasOwnProperty(key) || obj[key] !== source[key]) {
        return false;
      }
    }
  }
  return true;
};
