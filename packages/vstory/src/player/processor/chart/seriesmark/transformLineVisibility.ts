import type VChart from '@visactor/vchart';
import type { IChartVisibilityAction } from '../../interface/appear-action';
import { commonFade, commonGrow } from './commonTransformMarkAppear';

export const transformLineVisibility = (
  instance: VChart,
  animation: IChartVisibilityAction['payload']['animation'],
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
