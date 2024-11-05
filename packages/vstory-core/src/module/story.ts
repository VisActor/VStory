import type { IStoryDSL } from '../interface/dsl/dsl';
import type { IStoryInitOption } from '../core/story';
import { Story } from '../core/story';

export function createStory(dsl: IStoryDSL | null, option: IStoryInitOption) {
  const story = new Story(dsl, option);
  return story;
}

export * from '../core/story';
export * from '../core/player';
// export * from '../character/component';
