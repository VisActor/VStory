import type { IChartVisibilityPayload } from '../../interface';

export const getCustomParams = (
  animation: IChartVisibilityPayload['animation'],
  delayPerTime: number,
  enterPerTime: number
) => {
  const { duration: totalTime, loop, oneByOne, easing, dimensionCount = 1 } = animation;

  // 柱子+label，不要卡时间，加一些buffer
  const buffer = Math.min(delayPerTime, enterPerTime) / 3;
  const standTime = delayPerTime * (dimensionCount - 1) + enterPerTime + buffer;
  const ratio = totalTime / standTime;

  const duration = oneByOne ? enterPerTime * ratio : totalTime;

  return {
    duration,
    loop,
    oneByOne: oneByOne ? duration + (delayPerTime - enterPerTime) * ratio : oneByOne,
    easing
  };
};
