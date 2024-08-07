import type VChart from '@visactor/vchart';
// import type { IChartVisibilityAction } from '../../../../types/chart/appear';
import type { IOrientType } from '@visactor/vrender-components';
import type { IChartVisibilityAction } from '../../interface/appear-action';
import { commonFade } from './commonTransformMarkAppear';

// 将payload转换为chart内置的动画type
export const transformRectAppear = (
  instance: VChart,
  animation: IChartVisibilityAction['payload']['animation'],
  option: { markIndex: number; disappear: boolean }
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
    case 'fade': {
      return commonFade(instance, animation, {
        ...option
      });
    }
  }
};

const rectGrow = (
  instance: VChart,
  animation: IChartVisibilityAction['payload']['animation'],
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
