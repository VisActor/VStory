import { BarMarkControl } from './bar';
import type { IMarkControlConstructor } from './base';
import { LineMarkControl } from './line';

export const SeriesMarkControl: { [key: string]: IMarkControlConstructor } = {
  bar: BarMarkControl,
  line: LineMarkControl
};
