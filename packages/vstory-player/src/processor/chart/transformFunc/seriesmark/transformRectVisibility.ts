import type VChart from '@visactor/vchart';
import type { IOrientType } from '@visactor/vrender-components';
import { BarBounce, BarLeap } from '@visactor/vstory-animate';
import { commonFade } from './commonTransformMarkAppear';
import type { IChartVisibilityPayload } from '../../interface';
import { getCustomParams } from './utils';
import type { ICharacter } from '@visactor/vstory-core';

// 将payload转换为chart内置的动画type
export const transformRectVisibility = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option: { markIndex: number; disappear: boolean; payload: any; character?: ICharacter }
) => {
  switch (animation.effect) {
    case 'grow': {
      return rectGrow(instance, animation, {
        ...option,
        center: false
      });
    }
    case 'centerGrow': {
      return rectGrow(instance, animation, {
        ...option,
        center: true
      });
    }
    case 'barBounce': {
      return barBounce(instance, animation, {
        ...option.payload
      });
    }
    case 'barLeap': {
      return barLeap(instance, animation, {
        ...option.payload
      });
    }
    case 'fade':
    default: {
      return commonFade(instance, animation, {
        ...option
      });
    }
  }
};

const rectGrow = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option = { center: false, disappear: false }
) => {
  const { duration, loop, oneByOne, easing } = animation;
  const { center, disappear } = option;
  const direction = instance.getChart().getSpec().direction ?? 'vertical';
  const xField = instance.getChart().getSpec().xField;
  const yField = instance.getChart().getSpec().yField;
  const [xAxis, yAxis] = getXYAxis(instance);

  const type = disappear ? (center ? 'growCenterOut' : 'growHeightOut') : center ? 'growCenterIn' : 'growHeightIn';

  return {
    type: type,
    duration,
    loop,
    oneByOne,
    easing,
    options: (datum: any, element: any, params: any) => {
      const field = direction === 'vertical' ? yField : xField;
      const data = datum?.[field];

      if (direction === 'vertical') {
        return {
          overall: yAxis?.getScale(0).scale(0),
          orient: data > 0 ? 'negative' : 'positive'
        };
      }
      return {
        overall: xAxis?.getScale(0).scale(0),
        orient: data > 0 ? 'negative' : 'positive'
      };
    }
  };
};

function isXAxis(orient: IOrientType) {
  return orient === 'bottom' || orient === 'top';
}

function isYAxis(orient: IOrientType) {
  return orient === 'left' || orient === 'right';
}

const getXYAxis = (instance: VChart) => {
  const axes = instance.getChart().getComponentsByKey('axes');
  const xAxis = axes.find(axis => {
    const orient = (axis as any).getOrient();
    if (isXAxis(orient)) {
      return true;
    }
  }) as any;
  const yAxis = axes.find(axis => {
    const orient = (axis as any).getOrient();
    if (isYAxis(orient)) {
      return true;
    }
  }) as any;

  return [xAxis, yAxis];
};

const barBounce = (
  instance: VChart,
  animation: IChartVisibilityPayload['animation'],
  option = { dimensionCount: 1 }
) => {
  const { duration, loop, oneByOne, easing } = getCustomParams(
    animation,
    BarBounce.delayPerTime ?? 50,
    BarBounce.enterPerTime ?? 300,
    option
  );

  return {
    channel: ['x', 'y', 'x1', 'y1', 'width', 'height'],
    custom: BarBounce,
    duration,
    loop,
    oneByOne,
    easing
  };
};

const barLeap = (instance: VChart, animation: IChartVisibilityPayload['animation'], option = { dimensionCount: 1 }) => {
  const { duration, loop, oneByOne, easing } = getCustomParams(
    animation,
    BarBounce.delayPerTime ?? 50,
    BarBounce.enterPerTime ?? 300,
    option
  );

  return {
    channel: ['x', 'y', 'x1', 'y1', 'width', 'height', 'cornerRadius'],
    custom: BarLeap,
    duration,
    loop,
    oneByOne,
    easing
  };
};
