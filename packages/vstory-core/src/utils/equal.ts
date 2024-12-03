// Adapted from https://github.com/antvis/F2/blob/master/packages/f2/src/base/equal.ts by zengyue
// License: https://github.com/antvis/F2/blob/master/packages/f2/LICENSE

import type { IBoundsLike } from '@visactor/vutils';
import { isArray, isPlainObject } from '@visactor/vutils';

/**
 * 所有a中的属性都和b相等，但不要求b和a相等
 * @param a
 * @param b
 * @returns
 */
export function allParamsEqualTo(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  // null 和 undefined
  if (a == null || b == null) {
    return false;
  }

  // 特殊处理NaN
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  if (isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = a.length - 1; i >= 0; i--) {
      if (!allParamsEqualTo(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (!isPlainObject(a)) {
    return false;
  }

  const ka = Object.keys(a);

  // the same set of keys (although not necessarily the same order),
  ka.sort();

  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (let i = ka.length - 1; i >= 0; i--) {
    const key = ka[i];
    if (!allParamsEqualTo((a as any)[key], b[key])) {
      return false;
    }
  }

  return true;
}

export function getDiffedParams(from: any, to: any): any {
  if (from === to) {
    return null;
  }
  const obj: any = {};
  for (const key in from) {
    if (from[key] !== to[key]) {
      obj[key] = to[key];
    }
  }
  return obj;
}

export function isBoundsLikeEqual(a: IBoundsLike, b: IBoundsLike) {
  return a.x1 === b.x1 && a.x2 === b.x2 && a.y1 === b.y1 && a.y2 === b.y2;
}
