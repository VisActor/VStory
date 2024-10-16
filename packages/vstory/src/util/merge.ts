import { DeletedAttr } from '../constants';

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

      // 如果 sourceValue 是对象且 targetValue 也是对象，进行递归合并
      if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = deepMergeWithDeletedAttr(targetValue, sourceValue);
      } else {
        // 否则直接赋值
        target[key] = sourceValue;
      }
    }
  }
  return target;
}

// 辅助函数，用于判断一个值是否为对象
function isObject(value: any): value is Record<string, any> {
  return value && typeof value === 'object' && !Array.isArray(value);
}
