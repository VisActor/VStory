import type { IGroup } from '@visactor/vrender-core';
import type { IChartAppearAction } from '../../interface/appear-action';

export const commonGrow = (
  instance: IGroup,
  animation: IChartAppearAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;

  instance = instance.getChildAt(0) as IGroup;
  const width = instance.AABBBounds.width();
  const height = instance.AABBBounds.height();
  const opacityMap = disappear ? { from: width, to: 0 } : { from: 0, to: width };

  instance.setAttributes({ width: opacityMap.from, height, clip: true });
  instance.animate().to({ width: opacityMap.to }, duration, easing);
};

export const commonFade = (
  instance: IGroup,
  animation: IChartAppearAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const opacityMap = disappear ? { from: 1, to: 0 } : { from: 0, to: 1 };

  instance.setAttributes({ baseOpacity: opacityMap.from });
  instance.animate().to({ baseOpacity: opacityMap.to }, duration, easing);
};
