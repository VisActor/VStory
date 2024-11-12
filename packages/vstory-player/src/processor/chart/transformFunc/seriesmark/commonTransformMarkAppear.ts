import type VChart from '@visactor/vchart';
import type { IChartVisibilityPayload } from '../../interface';
import { getCustomParams } from './utils';

export const commonGrow = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  typeList: string[],
  option: { markIndex: number; disappear: boolean }
) => {
  const { duration, loop, oneByOne, easing } = getCustomParams(
    animation,
    animation.delayPerTime ?? 50,
    animation.enterPerTime ?? 300
  );
  // const { duration, loop, oneByOne, easing } = animation;
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
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean }
) => {
  const { duration, loop, oneByOne, easing } = getCustomParams(
    animation,
    animation.delayPerTime ?? 50,
    animation.enterPerTime ?? 300
  );
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
