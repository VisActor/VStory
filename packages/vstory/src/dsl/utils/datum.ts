import { isArray } from '@visactor/vutils';

export const isDatumEqual = (source: any, target: any) => {
  const sourceData = isArray(source) ? source : [source];
  const targetData = target;

  const compareOne = (s: Record<string, any>, t: Record<string, any>) => {
    const sKeys = Object.keys(s);
    const tKeys = Object.keys(t);

    // 找到source中所有在t中存在的key
    const keys = sKeys.filter(k => tKeys.includes(k));

    return keys.every(key => s[key] === t[key]);
  };

  return sourceData.some(s => compareOne(s, targetData));
};
