import type { Dict } from '@visactor/vutils';
import { isString } from '@visactor/vutils';

export function getThemeAttribute(obj: Dict<any>, path: string | string[]): any {
  if (!obj) {
    return undefined;
  }
  const paths = isString(path) ? (path as string).split('.') : path;

  for (let p = 0; p < paths.length; p++) {
    obj = obj ? obj[paths[p]] : undefined;
    if (!obj) {
      return undefined;
    }
  }
  return obj;
}
