import { transformLineAppear } from './transformLineAppear';
import { transformRectAppear } from './transformRectAppear';
import { transformSymbolAppear } from './transformSymbolAppear';

export const transformMap = {
  appear: {
    rect: transformRectAppear,
    line: transformLineAppear,
    symbol: transformSymbolAppear
  }
};
