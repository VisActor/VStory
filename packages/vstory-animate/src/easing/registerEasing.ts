import { Easing } from '@visactor/vrender-core';
import { flicker } from './flicker';

export function registerEasing() {
  // 注册flicker
  for (let i = 0; i < 10; i++) {
    (Easing as any)[`flicker${i}`] = (t: number) => flicker(t, i);
  }
}
