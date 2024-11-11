import type VChart from '@visactor/vchart';
import { commonFade, commonGrow } from './commonTransformMarkAppear';
import type { IChartVisibilityPayload } from '../../interface';
import type { ICharacter } from '@visactor/vstory-core';
import { SymbolSwing, SymbolThrow } from '@visactor/vstory-animate';

export const throwBounce = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean; character?: ICharacter }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { disappear, character } = option;
  if (disappear || !character) {
    return commonFade(instance, animation, option);
  }

  const { width, height } = character.getAttribute();

  return {
    channel: ['x', 'y'],
    custom: SymbolThrow,
    easing,
    duration,
    oneByOne: oneByOne && (-duration / 3) * 2,
    customParameters: {
      width,
      height
    },
    reverse: true,
    reversed: true
  };
};
export const swing = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean; character?: ICharacter }
) => {
  const { duration, loop, oneByOne, easing, params = {} } = animation;
  const { disappear, character } = option;
  if (disappear || !character) {
    return commonFade(instance, animation, option);
  }

  const { width, height } = character.getAttribute();

  return {
    channel: ['x', 'y'],
    custom: SymbolSwing,
    easing,
    duration,
    oneByOne: oneByOne,
    customParameters: {
      width,
      height,
      ...params
    },
    reverse: true,
    reversed: true
  };
};

export const transformSymbolVisibility = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean; character?: ICharacter }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, ['scaleIn', 'scaleOut'], option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }
    case 'throwBounce': {
      return throwBounce(instance, animation, option);
    }
    case 'swing': {
      return swing(instance, animation, option);
    }
    default: {
      return commonFade(instance, animation, option);
    }
  }
};
