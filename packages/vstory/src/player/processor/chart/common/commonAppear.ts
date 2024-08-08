import type { IGroup } from '@visactor/vrender-core';
import type { IChartVisibilityAction } from '../../interface/appear-action';

export const commonFade = (
  instance: IGroup,
  animation: IChartVisibilityAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const opacityMap = disappear ? { from: 1, to: 0 } : { from: 0, to: 1 };

  instance.setAttributes({ baseOpacity: opacityMap.from });
  instance.animate().to({ baseOpacity: opacityMap.to }, duration, easing);
};
export const commonGrow = (
  instance: IGroup,
  animation: IChartVisibilityAction['payload']['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const opacityMap = disappear ? { from: 1, to: 0 } : { from: 0, to: 1 };

  instance.setAttributes({ scaleX: opacityMap.from, scaleY: opacityMap.from });
  instance.animate().to({ scaleX: opacityMap.to, scaleY: opacityMap.to }, duration, easing);
};
