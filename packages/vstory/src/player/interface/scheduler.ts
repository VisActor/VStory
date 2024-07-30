import type { IActSpec } from '../../story/interface';
import type { IActionItem } from '../scheduler';

export interface IScheduler {
  initActs: (acts: IActSpec[]) => void;
  getActionsInRange: (fromTime: number, toTime: number) => IActionItem[];
}
