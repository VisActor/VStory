import { ACTION_TYPE } from '../../constants/action';
import { StoryChartType } from '../../constants/character';
import { VChartAppearActionProcessor } from './chart/vchart';

export const processorChartMap = {
  [StoryChartType.VCHART]: {
    [ACTION_TYPE.APPEAR]: new VChartAppearActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap
};
