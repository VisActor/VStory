import type { IGraphic, IGroup } from '@visactor/vrender-core';
import type { IChartVisibilityPayload } from '../../interface';

export const runLabelAppear = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return labelGrow(instance, animation, option);
    }
    case 'followGraphic': {
      return labelFollowGraphic(instance, animation, option);
    }
    case 'fade': {
      return labelFade(instance, animation, option);
    }
    default: {
      return labelFade(instance, animation, option);
    }
  }
};

const labelGrow = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const sizeMap = disappear ? { from: 1, to: 0 } : { from: 0, to: 1 };

  instance.getElementsByType('text').forEach((text: IGraphic) => {
    text.setAttributes({ scaleX: sizeMap.from, scaleY: sizeMap.from });
    text.animate().to({ scaleX: sizeMap.to, scaleY: sizeMap.to }, duration, easing);
  });

  instance.getElementsByType('richtext').forEach((text: IGraphic) => {
    text.setAttributes({ scaleX: sizeMap.from, scaleY: sizeMap.from });
    text.animate().to({ scaleX: sizeMap.to, scaleY: sizeMap.to }, duration, easing);
  });
};

const labelFade = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const opacityMap = disappear ? { from: 1, to: 0 } : { from: 0, to: 1 };
  instance.getElementsByType('text').forEach((text: IGraphic) => {
    text.setAttributes({ opacity: opacityMap.from });
    text.animate().to({ opacity: opacityMap.to }, duration, easing);
  });

  instance.getElementsByType('richtext').forEach((text: IGraphic) => {
    text.setAttributes({ opacity: opacityMap.from });
    text.animate().to({ opacity: opacityMap.to }, duration, easing);
  });
};

const labelFollowGraphic = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  const { duration, easing } = animation;
  const { disappear } = option;
  const opacityMap = disappear ? { from: 1, to: 0 } : { from: 1, to: 1 };
  instance.setAttributes({ baseOpacity: opacityMap.from });
  instance.animate().to({ baseOpacity: opacityMap.to }, duration, easing);
};
