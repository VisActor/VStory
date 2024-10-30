import { ACTION_TYPE, VCHART_ACTION_TYPE } from '../../constants/action';
import { StoryVisactorType, StoryComponentType } from '../../constants/character';
import { ImageVisibilityActionProcessor } from './component/image/image-visibility';
import { VChartAddActionProcessor, VChartUpdateActionProcessor, VChartVisibilityActionProcessor } from './chart/vchart';
import { LineVisibilityActionProcessor } from './component/line/line-visibility';
import { RectVisibilityActionProcessor } from './component/rect/rect-visibility';
import { ShapeVisibilityActionProcessor } from './component/shape/shape-visibility';
import { TextVisibilityActionProcessor } from './component/text/text-visibility';
import {
  TimelineStateActionProcessor,
  TimelineVisibilityActionProcessor
} from './component/timeline/timeline-visibility';
import {
  CommonBounceActionProcessor,
  CommonMoveToActionProcessor,
  CommonScaleToActionProcessor,
  CommonStyleActionProcessor
} from './component/common-component';
import { RankingBarPlayActionProcessor } from './chart/rankingBar/rankingBar';
import { UnitVisibilityActionProcessor, UnitStyleActionProcessor } from './component/unit/unit-action';
import { VTableVisibilityActionProcessor } from './table/vtable';

export const processorChartMap = {
  [StoryVisactorType.VCHART]: {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor(),
    [VCHART_ACTION_TYPE.UPDATE]: new VChartUpdateActionProcessor(),
    [VCHART_ACTION_TYPE.ADD]: new VChartAddActionProcessor()
  },
  [StoryVisactorType.RANKINGBAR]: {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor(),
    play: new RankingBarPlayActionProcessor()
  }
};
export const processorTableMap = {
  [StoryVisactorType.VTABLE]: {
    [ACTION_TYPE.APPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VTableVisibilityActionProcessor()
  },
  [StoryVisactorType.WEATHERTABLE]: {
    [ACTION_TYPE.APPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VTableVisibilityActionProcessor()
  }
};

export const processorComponentMap = {
  [StoryComponentType.RECT]: {
    [ACTION_TYPE.APPEAR]: new RectVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new RectVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.LINE]: {
    [ACTION_TYPE.APPEAR]: new LineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new LineVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.SHAPE]: {
    [ACTION_TYPE.APPEAR]: new ShapeVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ShapeVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.IMAGE]: {
    [ACTION_TYPE.APPEAR]: new ImageVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new ImageVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.TEXT]: {
    [ACTION_TYPE.APPEAR]: new TextVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TextVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.TIMELINE]: {
    [ACTION_TYPE.APPEAR]: new TimelineVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new TimelineVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.STATE]: new TimelineStateActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  },
  [StoryComponentType.UNIT]: {
    [ACTION_TYPE.APPEAR]: new UnitVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new UnitVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new UnitStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  }
};

export const processorMap = {
  ...processorChartMap,
  ...processorTableMap,
  ...processorComponentMap
};
