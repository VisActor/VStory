import type { ITableVisibilityPayload } from '../../interface/appear-action';
import type { IGroup } from '@visactor/vrender-core';
import { commonFade, commonGrow } from './commonAppear';

// TODO: 区分直角坐标系和极坐标系
export const runTableAppear = (
  instance: IGroup,
  animation: ITableVisibilityPayload['animation'],
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
