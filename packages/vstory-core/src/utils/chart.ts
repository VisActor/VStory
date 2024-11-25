import type { IInitOption } from '@visactor/vchart';
import { merge } from '@visactor/vutils';

export function mergeChartOption(
  target: Partial<IInitOption>,
  ...sources: Partial<IInitOption>[]
): Partial<IInitOption> {
  const performanceHook: { [key: string]: (() => void)[] } = {};

  function pushHookToTemp(hooks: IInitOption['performanceHook']) {
    Object.keys(hooks).forEach((k: string) => {
      if (!performanceHook[k]) {
        performanceHook[k] = [];
      }
      // @ts-ignore
      performanceHook[k].push(hooks[k]);
    });
  }
  if (target.performanceHook) {
    pushHookToTemp(target.performanceHook);
  }
  sources.forEach(source => {
    if (!source) {
      return;
    }
    const { performanceHook, ...rest } = source;
    if (performanceHook) {
      pushHookToTemp(performanceHook);
    }
    merge(target, rest);
  });
  target.performanceHook = {};
  Object.keys(performanceHook).forEach(k => {
    // @ts-ignore
    target.performanceHook[k] = (...args) => {
      // @ts-ignore
      performanceHook[k].forEach(f => f(...args));
    };
  });
  return target;
}
