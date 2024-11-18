import type VChart from '@visactor/vchart';
import { commonFade, commonGrow } from './commonTransformMarkAppear';
import type { IChartVisibilityPayload } from '../../interface';

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
    default: {
      return commonFade(instance, animation, option);
    }
  }
};
