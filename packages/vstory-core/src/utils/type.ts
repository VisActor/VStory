import { isString, isValidNumber } from '@visactor/vutils';
import type { ModelSelector } from '../interface/dsl/chart';

export function isIDSelector(value: ModelSelector): value is `#${string}` {
  return isString(value) && value.startsWith('#');
}

export function isSpecIndexSelector(value: ModelSelector): value is number | `${number}` {
  return isValidNumber(+value);
}
