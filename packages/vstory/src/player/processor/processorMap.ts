import { ACTION_TYPE } from '../../constants/action';
import { StoryChartType, StoryComponentType } from '../../constants/character';
import { VChartAppearActionProcessor } from './chart/vchart';
import { RectAppearActionProcessor } from './component/rect/rect';

export const processorChartMap = {
  [StoryChartType.VCHART]: {
    [ACTION_TYPE.APPEAR]: new VChartAppearActionProcessor()
  }
};

export const processorComponentMap = {
  [StoryComponentType.RECT]: {
    [ACTION_TYPE.APPEAR]: new RectAppearActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap,
  ...processorComponentMap
};
