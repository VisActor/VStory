import { runAxisAppear } from './component/axisAppear';
import { runLabelAppear } from './component/labelAppear';
import { runLegendsAppear } from './component/legendsAppear';
import { runTitleAppear } from './component/titleAppear';
import { transformArcAppear } from './seriesmark/transformArcAppear';
import { transformLineAppear } from './seriesmark/transformLineAppear';
import { transformRectAppear } from './seriesmark/transformRectAppear';
import { transformSymbolAppear } from './seriesmark/transformSymbolAppear';
import { transformTextAppear } from './seriesmark/transformTextAppear';

export const transformMap = {
  appear: {
    // series & mark
    rect: transformRectAppear,
    line: transformLineAppear,
    symbol: transformSymbolAppear,
    text: transformTextAppear,
    arc: transformArcAppear,
    // component
    legends: runLegendsAppear,
    label: runLabelAppear,
    axis: runAxisAppear,
    title: runTitleAppear
  }
};
