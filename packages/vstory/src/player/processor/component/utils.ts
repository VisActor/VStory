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

export function checkArrayOrder(arr: any[], field: string) {
  if (!arr) {
    return 1;
  }
  let isAscending = true;
  let isDescending = true;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][field] > arr[i + 1][field]) {
      isAscending = false;
    }
    if (arr[i][field] < arr[i + 1][field]) {
      isDescending = false;
    }
  }

  if (isAscending) {
    return 1;
  }
  if (isDescending) {
    return -1;
  }
}
