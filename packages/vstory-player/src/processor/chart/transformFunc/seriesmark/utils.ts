import type { IChartVisibilityPayload } from '../../interface';

export const getCustomParams = (
  animation: IChartVisibilityPayload['animation'],
  delayPerTime: number,
  enterPerTime: number,
  option = { dimensionCount: 1 }
) => {
  const { duration: totalTime, loop, oneByOne, easing } = animation;
  const { dimensionCount = 1 } = option;

  // 柱子+label
  const standTime = delayPerTime * (dimensionCount - 1) + enterPerTime + enterPerTime;
  const ratio = totalTime / standTime;

  const duration = oneByOne ? enterPerTime * ratio : totalTime;

  return {
    duration,
    loop,
    oneByOne: oneByOne ? duration + (delayPerTime - enterPerTime) * ratio : oneByOne,
    easing
  };
};
