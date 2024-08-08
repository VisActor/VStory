import type { IChartVisibilityAction } from '../../interface/appear-action';
import { commonFade } from '../common/commonAppear';
import { commonGrow } from './commonAppear';
import type { IGroup } from '@visactor/vrender-core';

export const runLegendsAppear = (
  instance: IGroup,
  animation: IChartVisibilityAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }
    default: {
      return commonFade(instance, animation, option);
    }
  }
};
