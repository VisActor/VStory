import { ACTION_TYPE } from '../../constants/action';
import { StoryChartType, StoryComponentType } from '../../constants/character';
import { ImageAppearActionProcessor } from './component/image/image-appear';
import { VChartVisibilityActionProcessor } from './chart/vchart';
import { LineAppearActionProcessor } from './component/line/line-appear';
import { RectAppearActionProcessor } from './component/rect/rect-appear';
import { ShapeAppearActionProcessor } from './component/shape/shape-appear';
import { TextAppearActionProcessor } from './component/text/text-appear';
import { TimelineAppearActionProcessor } from './component/timeline/timeline-appear';

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
  },
  [StoryComponentType.SHAPE]: {
    [ACTION_TYPE.APPEAR]: new ShapeAppearActionProcessor()
  },
  [StoryComponentType.IMAGE]: {
    [ACTION_TYPE.APPEAR]: new ImageAppearActionProcessor()
  },
  [StoryComponentType.TEXT]: {
    [ACTION_TYPE.APPEAR]: new TextAppearActionProcessor()
  },
  [StoryComponentType.TIMELINE]: {
    [ACTION_TYPE.APPEAR]: new TimelineAppearActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap,
  ...processorComponentMap
};
