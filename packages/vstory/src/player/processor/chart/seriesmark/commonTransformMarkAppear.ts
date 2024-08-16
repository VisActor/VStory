import type VChart from '@visactor/vchart';
import type { IChartVisibilityAction } from '../../interface/appear-action';

export const commonGrow = (
  instance: VChart,
  animation: IChartVisibilityAction['payload']['animation'],
  typeList: string[],
  option: { markIndex: number; disappear: boolean }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { disappear } = option;

  const type = disappear ? typeList[1] : typeList[0];

  return {
    type,
    duration,
    loop,
    oneByOne,
    easing
  };
};

export const commonFade = (
  instance: VChart,
  animation: IChartVisibilityAction['payload']['animation'],
  option: { markIndex: number; disappear: boolean }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { disappear } = option;
  const type = disappear ? 'fadeOut' : 'fadeIn';

  return {
    type,
    duration,
    loop,
    oneByOne,
    easing
  };
};
