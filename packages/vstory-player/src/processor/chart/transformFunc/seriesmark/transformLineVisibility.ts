import type VChart from '@visactor/vchart';
import { commonFade, commonGrow } from './commonTransformMarkAppear';
import type { IChartVisibilityPayload } from '../../interface';
import type { ICharacter } from '@visactor/vstory-core';
import { getCustomParams } from './utils';

export const growPoints = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean; character?: ICharacter }
) => {
  const { duration, oneByOne, easing } = getCustomParams(
    animation,
    animation.delayPerTime ?? 30,
    animation.enterPerTime ?? 200
  );
  const { params = {} } = animation;
  const { disappear, character } = option;
  if (disappear || !character) {
    return commonFade(instance, animation, option);
  }

  return {
    type: params.direction === 'horizontal' ? 'growPointsXIn' : 'growPointsYIn',
    options: {
      orient: params.direction === 'horizontal' ? 'positive' : 'negative'
    },
    duration,
    oneByOne,
    easing
  };
};

export const transformLineVisibility = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, ['clipIn', 'clipOut'], option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }
    case 'growPoints': {
      return growPoints(instance, animation, option);
    }
    default: {
      return commonFade(instance, animation, option);
    }
  }
};
