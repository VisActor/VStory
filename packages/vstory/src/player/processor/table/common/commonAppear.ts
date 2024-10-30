import type { IGroup } from '@visactor/vrender-core';
import type { ITableVisibilityPayload } from '../../interface/appear-action';

export const commonFade = (
  instance: IGroup,
  animation: ITableVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const currOpacity = instance.attribute.baseOpacity;
  const opacityMap = disappear ? { from: currOpacity ?? 1, to: 0 } : { from: 0, to: currOpacity ?? 1 };

  instance.setAttributes({ baseOpacity: opacityMap.from });
  instance.animate().to({ baseOpacity: opacityMap.to }, duration, easing);
};
export const commonGrow = (
  instance: IGroup,
  animation: ITableVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const currScaleX = instance.attribute.scaleX;
  const currScaleY = instance.attribute.scaleY;
  const opacityMap = disappear
    ? { fromX: currScaleX ?? 1, fromY: currScaleY ?? 1, toX: 0, toY: 0 }
    : { fromX: 0, fromY: 0, toX: currScaleX ?? 1, toY: currScaleY ?? 1 };

  instance.setAttributes({ scaleX: opacityMap.fromX, scaleY: opacityMap.fromY });
  instance.animate().to({ scaleX: opacityMap.toX, scaleY: opacityMap.toY }, duration, easing);
};
