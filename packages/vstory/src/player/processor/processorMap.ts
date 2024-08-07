import { ACTION_TYPE } from '../../constants/action';
import { StoryChartType, StoryComponentType } from '../../constants/character';
import { ImageVisibilityActionProcessor } from './component/image/image-visibility';
import { VChartVisibilityActionProcessor } from './chart/vchart';
import { LineVisibilityActionProcessor } from './component/line/line-visibility';
import { RectVisibilityActionProcessor } from './component/rect/rect-visibility';
import { ShapeVisibilityActionProcessor } from './component/shape/shape-visibility';
import { TextVisibilityActionProcessor } from './component/text/text-visibility';
import { TimelineVisibilityActionProcessor } from './component/timeline/timeline-visibility';

export const processorChartMap = {
  [StoryChartType.VCHART]: {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor()
  }
};

export const processorComponentMap = {
  [StoryComponentType.RECT]: {
    [ACTION_TYPE.APPEAR]: new RectVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new RectVisibilityActionProcessor()
  },
  [StoryComponentType.LINE]: {
    [ACTION_TYPE.APPEAR]: new LineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new LineVisibilityActionProcessor()
  },
  [StoryComponentType.SHAPE]: {
    [ACTION_TYPE.APPEAR]: new ShapeVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ShapeVisibilityActionProcessor()
  },
  [StoryComponentType.IMAGE]: {
    [ACTION_TYPE.APPEAR]: new ImageVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ImageVisibilityActionProcessor()
  },
  [StoryComponentType.TEXT]: {
    [ACTION_TYPE.APPEAR]: new TextVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TextVisibilityActionProcessor()
  },
  [StoryComponentType.TIMELINE]: {
    [ACTION_TYPE.APPEAR]: new TimelineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TimelineVisibilityActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap,
  ...processorComponentMap
};
