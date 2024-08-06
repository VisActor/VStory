import { ACTION_TYPE } from '../../constants/action';
import { StoryChartType, StoryComponentType } from '../../constants/character';
import { VChartVisibilityActionProcessor } from './chart/vchart';
import { LineAppearActionProcessor } from './component/line/line-appear';
import { RectAppearActionProcessor } from './component/rect/rect-appear';

export const processorChartMap = {
  [StoryChartType.VCHART]: {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor()
  }
};

export const processorComponentMap = {
  [StoryComponentType.RECT]: {
    [ACTION_TYPE.APPEAR]: new RectAppearActionProcessor()
  },
  [StoryComponentType.LINE]: {
    [ACTION_TYPE.APPEAR]: new LineAppearActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap,
  ...processorComponentMap
};
