import { runLegendsAppear } from './component/legendsAppear';
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
    // component
    legends: runLegendsAppear
  }
};
