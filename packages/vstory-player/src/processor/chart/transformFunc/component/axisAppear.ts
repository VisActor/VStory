import type { IChartVisibilityPayload } from '../../interface';
import { commonFade } from '../common/commonAppear';
import { commonGrow } from './commonAppear';
import type { IGroup, ILine, IText } from '@visactor/vrender-core';

// TODO: 区分直角坐标系和极坐标系
export const runAxisAppear = (
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean }
) => {
  switch (animation.effect) {
    case 'grow': {
      return axisGrow(instance, animation, option);
    }
    case 'fade': {
      return commonFade(instance, animation, option);
    }
    default: {
      return commonFade(instance, animation, option);
    }
  }
};

function axisGrow(
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean; orient?: 'width' | 'height'; direction?: 'negative' | 'positive' }
) {
  const isGrid = instance.name?.includes('grid');
  if (isGrid) {
    gridGrow(instance, animation, option);
  } else {
    mainAxisGrow(instance, animation, option);
  }
}

function mainAxisGrow(
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean; orient?: 'width' | 'height'; direction?: 'negative' | 'positive' }
) {
  const { duration, easing } = animation;
  const { disappear, direction = 'positive', orient } = option;
  const axisLine = instance.getElementsByName('axis-line')[0] as unknown as IGroup;
  const axisTicks = instance.getElementsByName('axis-tick-container')[0] as unknown as IGroup;
  const axisLabel = instance.getElementsByName('axis-label-container')[0] as unknown as IGroup;

  if (axisLine && axisLine.childrenCount > 0) {
    const shouldReverse =
      orient === 'height'
        ? direction === 'positive' || disappear //
        : false;

    const line = axisLine.getElementsByType('line')[0] as unknown as ILine;
    if (line) {
      if (shouldReverse) {
        line.setAttributes({ points: line.attribute.points.reverse() });
      }
      const attributeMap = disappear
        ? { from: { clipRange: 1 }, to: { clipRange: 0 } }
        : { from: { clipRange: 0 }, to: { clipRange: 1 } };

      line.setAttributes(attributeMap.from);
      line
        .animate()
        .to(attributeMap.to, duration, easing)
        .onEnd(() => {
          if (shouldReverse) {
            line.setAttributes({ points: line.attribute.points.reverse() });
          }
        });
    }
  }

  const opacityMap = disappear
    ? { from: { opacity: 1 }, to: { opacity: 0 } }
    : { from: { opacity: 0 }, to: { opacity: 1 } };

  if (axisTicks && axisTicks.childrenCount > 0) {
    const shouldReverse = disappear;
    const ticks = axisTicks.getElementsByType('line');
    if (shouldReverse) {
      ticks.reverse();
    }
    ticks.forEach((tick: IText, i: number) => {
      tick.setAttributes(opacityMap.from);
      tick
        .animate()
        .wait((duration / ticks.length) * i)
        .to(opacityMap.to, duration / ticks.length, easing)
        .onEnd(() => {
          if (shouldReverse) {
            ticks.reverse();
          }
        });
    });
  }

  if (axisLabel && axisLabel.childrenCount > 0) {
    const shouldReverse = disappear;
    const text = axisLabel.getElementsByType('text');
    if (shouldReverse) {
      text.reverse();
    }
    text.forEach((t: IText, i: number) => {
      t.setAttributes(opacityMap.from);
      t.animate()
        .wait((duration / text.length) * i)
        .to(opacityMap.to, duration / text.length, easing)
        .onEnd(() => {
          if (shouldReverse) {
            text.reverse();
          }
        });
    });
  }
}

function gridGrow(
  instance: IGroup,
  animation: IChartVisibilityPayload['animation'],
  option: { disappear: boolean; orient?: 'width' | 'height'; direction?: 'negative' | 'positive' }
) {
  if (instance) {
    commonGrow(instance, animation, option);
  }
}
