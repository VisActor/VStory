import type { ISeries, IVChart } from '@visactor/vchart';
import { merge } from '@visactor/vutils';
import type { ICharacter } from '../../../story/character';
import type { IAction } from '../../../story/interface';
import { ActionProcessorItem } from '../processor-item';
import { transformMap } from './transformMap';
import type { IChartAppearAction } from '../interface/appear-action';

export class VChartAppearActionProcessor extends ActionProcessorItem {
  name: 'appear';

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IAction): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0, duration: globalDuration } = action;
    const { startTime = 0, duration = 0 } = action.payload?.animation ?? ({} as any);

    const st = globalStartTime + startTime;
    const d = globalDuration ?? duration;
    return {
      startTime: st,
      duration: d
    };
  }

  run(character: ICharacter, actionSpec: IAction): void {
    const vchart = character.graphic._vchart as IVChart;
    const seriesList = vchart.getChart().getAllSeries();
    seriesList.forEach(series => {
      this.commonSeriesAppear(vchart, series, actionSpec);
    });
  }

  protected seriesTypeToMarkType(seriesType: string) {
    if (seriesType === 'bar') {
      return 'rect';
    }
    return seriesType;
  }

  protected commonSeriesAppear(vchart: IVChart, series: ISeries, actionSpec: IAction) {
    const marks = series.getMarksWithoutRoot();
    if (!marks.length) {
      return;
    }
    const { payload } = actionSpec;
    marks.forEach((mark, markIndex) => {
      const mergePayload = merge(
        {},
        (VChartAppearActionProcessor as any)[`${mark.type}Payload`] || {},
        payload
      ) as IChartAppearAction['payload'];
      const product = mark.getProduct();
      const appearTransform = (transformMap.appear as any)[mark.type];
      const config =
        appearTransform &&
        appearTransform(vchart as any, mergePayload.animation, {
          index: markIndex,
          disappear: false
        });
      // @ts-ignore
      product && product.animate.run(config || {});
    });
  }

  static rectPayload: IChartAppearAction['payload'] = {
    animation: {
      effect: 'grow',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };
  static linePayload: IChartAppearAction['payload'] = VChartAppearActionProcessor.rectPayload;
  static symbolPayload: IChartAppearAction['payload'] = VChartAppearActionProcessor.rectPayload;
}
