import { isArray, isObject } from '@visactor/vutils';
import { DeletedAttr } from '../constants/config';

/**
 * 深拷贝对象，如果属性是DeletedAttr，则表示删除该属性
 * 数组的话，会直接替换
 * @param target
 * @param source
 * @returns
 */
export function deepMergeWithDeletedAttr<T>(target: T, source: Partial<T>): T {
  // 遍历 source 对象的每一个属性
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (sourceValue === DeletedAttr) {
        delete target[key];
        continue;
      }
      if (isArray(targetValue) && isArray(sourceValue)) {
        // 如果都是数组，也直接赋值
        target[key] = sourceValue;
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        // 如果 sourceValue 是对象且 targetValue 也是对象，进行递归合并
        target[key] = deepMergeWithDeletedAttr(targetValue, sourceValue);
      } else {
        // 否则直接赋值
        target[key] = sourceValue;
      }
    }
  }
  return target;
}
