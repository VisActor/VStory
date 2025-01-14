import { isNumber, isString, isValidNumber } from '@visactor/vutils';
import type { ModelSelector } from '../interface/dsl/chart';

export function isIDSelector(value: ModelSelector): value is `#${string}` {
  return isString(value) && value.startsWith('#');
}

export function isSpecIndexSelector(value: ModelSelector): value is number | `${number}` {
  return isValidNumber(+value);
}

export function validNumber(value: any) {
  return isValidNumber(value) ? value : null;
}

export function foreachAllConstructor(instance: any, fn: (value: any, key: string) => void) {
  let currentProto = Object.getPrototypeOf(instance);
  while (currentProto) {
    const constructor = currentProto.constructor;
    if (constructor) {
      fn(constructor, currentProto);
    }
    currentProto = Object.getPrototypeOf(currentProto);
  }
}

export function getAllStaticAttrs(instance: any, key: string): Record<string, any> {
  const allAttrs: Record<string, any> = {};
  foreachAllConstructor(instance, (constructor, _currentProto) => {
    if (constructor && constructor[key]) {
      Object.assign(allAttrs, constructor[key]);
    }
  });
  return allAttrs;
}
