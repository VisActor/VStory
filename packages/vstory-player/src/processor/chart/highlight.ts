import { globalProcessorRegistry, type ICharacter, CharacterType } from '@visactor/vstory-core';
import type { IVChart } from '@visactor/vchart';
import type { IChartHighlightPayload, IChartHighlightAction } from './interface';
import { VChartBaseActionProcessor } from './base';
import { ACTION_TYPE } from '../constants/action';

export class VChartHighlightActionProcessor extends VChartBaseActionProcessor {
  name: 'highlight';

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IChartHighlightAction): void {
    super.preRun(character, actionSpec);
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }

    const { payload } = actionSpec as IChartHighlightAction;
    const { value, animation, style = {} } = payload as IChartHighlightPayload;
    const isDatumEqual = (inputValue: any, elementDatum: any) =>
      Object.keys(inputValue).every(key => inputValue[key] === elementDatum[key]);
    const channel = {};

    Object.keys(style).forEach(key => {
      channel[key] = {
        to: style[key]
      };
    });
    instance
      .getChart()
      .getAllMarks()
      .forEach(mark => {
        if (mark.getAnimationConfig()) {
          mark.getProduct().animate?.run({
            timeSlices: {
              effects: {
                channel,
                easing: animation.easing
              },
              duration: animation?.duration ?? 0
            },
            partitioner: datum => isDatumEqual(value, datum)
          });
        }
      });
  }
}

export function registerVChartHighlightAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VCHART, {
    [ACTION_TYPE.HIGHLIGHT]: new VChartHighlightActionProcessor()
  });
}
