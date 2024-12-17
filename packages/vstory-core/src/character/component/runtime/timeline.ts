import type { IComponentCharacterRuntime } from '../interface/runtime';
import { BaseRuntime } from './base';

export class TimelineRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Timeline';
}

export const TimelineRuntimeInstance = new TimelineRuntime();
