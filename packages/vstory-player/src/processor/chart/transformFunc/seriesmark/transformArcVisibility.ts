import type VChart from '@visactor/vchart';
import type { IChartVisibilityPayload } from '../../interface';

// 将payload转换为chart内置的动画type
export const transformArcVisibility = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: {
    disappear: boolean;
    markIndex: number;
  }
) => {
  switch (animation.effect) {
    case 'grow': {
      return arcGrowRadius(instance, animation, option);
    }
    case 'growRadius': {
      return arcGrowRadius(instance, animation, option);
    }
    case 'growAngle': {
      return arcGrowAngle(instance, animation, option);
    }
    case 'fade': {
      return arcFade(instance, animation, option);
    }
    default: {
      return arcFade(instance, animation, option);
    }
  }
};

const arcGrowRadius = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: {
    disappear: boolean;
    markIndex: number;
  }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { disappear } = option;
  const type = disappear ? 'growRadiusOut' : 'growRadiusIn';

  return {
    type,
    duration,
    loop,
    oneByOne,
    easing
  };
};

const arcGrowAngle = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: {
    disappear: boolean;
    markIndex: number;
  }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { disappear } = option;
  const type = disappear ? 'growAngleOut' : 'growAngleIn';

  return {
    type,
    duration,
    loop,
    oneByOne,
    easing,
    options: {
      overall: true
    }
  };
};

const arcFade = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: {
    disappear: boolean;
    markIndex: number;
  }
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
