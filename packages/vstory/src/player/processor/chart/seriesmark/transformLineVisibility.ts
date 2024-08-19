import type VChart from '@visactor/vchart';
import type { IChartVisibilityPayload } from '../../interface/appear-action';
import { commonFade, commonGrow } from './commonTransformMarkAppear';

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
