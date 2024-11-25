import type { IGroup } from '@visactor/vrender-core';
import { commonFade, commonGrow } from './commonAppear';
import type { IChartVisibilityPayload } from '../../interface';

// TODO: 区分直角坐标系和极坐标系
export const runChartAppear = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
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

export const runPanelAppear = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return commonGrow(instance, animation, option);
    }
    case 'fade': {
      return commonFade(instance, animation, option, 'opacity');
    }
    default: {
      return commonFade(instance, animation, option, 'opacity');
    }
  }
};
