import type { ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry } from '@visactor/vstory-core';
import type { IArc } from '@visactor/vrender-core';
import { ACTION_TYPE, VChartBaseActionProcessor } from '@visactor/vstory-player';
import type { IAngleParams } from './interface';
import { VChartVisibilityActionProcessor } from '@visactor/vstory-player';
import { DYNAMIC_LINE } from '../../character/dynamic-line/constant';
import { ActionProcessorItem } from '@visactor/vstory-player';
import type { IVChart, ScrollBar } from '@visactor/vchart';
import { array } from '@visactor/vutils';

export class DynamicLinePlayActionProcessor extends VChartBaseActionProcessor {
  run(character: ICharacter, actionSpec: any): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }
    const scrollBar = instance.getComponents().find(cmp => cmp.type === 'scrollBar') as ScrollBar;
    if (!scrollBar) {
      return;
    }
    const start = (scrollBar as any)._start;
    const end = (scrollBar as any)._end;
    const { payload } = actionSpec;
    array(payload).forEach(item => {
      const { animation } = item;
      const { duration, easing } = animation;

      const delta = end - start;
      (instance.getStage().children[0] as any)
        .animate()
        .to({}, duration, easing)
        .onFrame((step: any, t: number) => {
          const nextEnd = (1 - end) * t + end;
          (scrollBar as any)._handleChange(nextEnd - delta, nextEnd, true);
        });
    });
  }
}

export function registerDynamicLinePlayAction() {
  globalProcessorRegistry.registerProcessor(DYNAMIC_LINE, {
    [ACTION_TYPE.PLAY]: new DynamicLinePlayActionProcessor()
  });
}
export function registerDynamicLineVisibilityAction() {
  globalProcessorRegistry.registerProcessor(DYNAMIC_LINE, {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor()
  });
}
