import { runChartAppear } from './common/chartAppear';
import { runAxisAppear } from './component/axisAppear';
import { runAppearOrDisAppear } from './component/commonAppear';
import { runLabelAppear } from './component/labelAppear';
import { runLegendsAppear } from './component/legendsAppear';
import { runTitleAppear } from './component/titleAppear';
import { transformArcVisibility } from './seriesmark/transformArcVisibility';
import { transformLineVisibility } from './seriesmark/transformLineVisibility';
import { transformRectVisibility } from './seriesmark/transformRectVisibility';
import { transformSymbolVisibility } from './seriesmark/transformSymbolVisibility';
import { transformTextVisibility } from './seriesmark/transformTextVisibility';

export const transformMap = {
  appear: {
    // series & mark
    rect: transformRectVisibility,
    line: transformLineVisibility,
    symbol: transformSymbolVisibility,
    text: transformTextVisibility,
    arc: transformArcVisibility,
    // component
    legends: runLegendsAppear,
    label: runLabelAppear,
    axis: runAxisAppear,
    title: runTitleAppear,
    // chart:
    chart: runChartAppear
  }
};
