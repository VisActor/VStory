import type { IGroup } from '@visactor/vrender-core';
import type { IChartVisibilityPayload } from '../../interface/appear-action';
import { commonFade } from '../common/commonAppear';

export const commonGrow = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean; orient?: 'width' | 'height' }
) => {
  const { duration, easing } = animation;
  const { disappear, orient = 'width' } = option;

  instance = instance.getChildAt(0) as IGroup;
  const width = instance.AABBBounds.width();
  const height = instance.AABBBounds.height();
  if (orient === 'width') {
    const opacityMap = disappear ? { from: width, to: 0 } : { from: 0, to: width };
    instance.setAttributes({
      width: opacityMap.from,
      height,
      clip: true
    });
    instance.animate().to({ width: opacityMap.to }, duration, easing);
  } else {
    const opacityMap = disappear ? { from: height, to: 0 } : { from: 0, to: height };
    // TODO: 轴 bounds 不准确
    instance.setAttributes({
      width: width * 2,
      height: opacityMap.from,
      clip: true
    });
    instance.animate().to({ height: opacityMap.to }, duration, easing);
  }
};

export const runAppearOrDisAppear = (
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
