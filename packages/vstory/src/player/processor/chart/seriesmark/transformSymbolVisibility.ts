import type VChart from '@visactor/vchart';
import type { IChartVisibilityPayload } from '../../interface/appear-action';
import { commonFade, commonGrow } from './commonTransformMarkAppear';

export const transformSymbolVisibility = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, ['scaleIn', 'scaleOut'], option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }
    default: {
      return commonFade(instance, animation, option);
    }
  }
};
