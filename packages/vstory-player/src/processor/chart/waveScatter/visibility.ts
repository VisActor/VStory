import type { ICharacter } from '@visactor/vstory-core';
import { CharacterType } from '@visactor/vstory-core';
import { ACTION_TYPE } from '../../constants/action';
import { VChartVisibilityActionProcessor } from '../visibility';
import type { IChartVisibilityAction } from '../interface';
import type { IVChart } from '@visactor/vchart';
import { globalProcessorRegistry } from '../../../player/processorRegistry';

export class WaveScatterVisibilityActionProcessor extends VChartVisibilityActionProcessor {
  run(character: ICharacter, actionSpec: IChartVisibilityAction): void {
    super.run(character, actionSpec);
    // 执行背景动画
    const vchart = character.graphic._vchart as IVChart;
    const series = vchart
      .getChart()
      .getAllSeries()
      .filter(series => series.type === 'circlePacking')[0];
    if (!series) {
      return;
    }
    const mark = series.getMarksWithoutRoot().filter(item => item.type === 'arc')[0];
    if (!mark) {
      return;
    }
    const { waveAnimate } = character.getAttribute();
    if (!(waveAnimate && waveAnimate.custom && waveAnimate.customParameters)) {
      return;
    }
    const { duration, easing, loop, custom } = waveAnimate;
    const product = mark.getProduct();
    const graphics = product.getAllElements().map((item: any) => item.getGraphicItem());
    if (!graphics.length) {
      return;
    }
    graphics.forEach((g: any) => {
      // g.animate({ timeline: globalTickerStore.getTimeline('background_animate') })
      g.animate({ timeline: null })
        .play(new custom({}, {}, duration, easing, {}))
        .loop(loop ? Infinity : 1);
    });
  }
}

export function registerWaveScatterVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.WAVE_SCATTER, {
    [ACTION_TYPE.APPEAR]: new WaveScatterVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new WaveScatterVisibilityActionProcessor()
  });
}
