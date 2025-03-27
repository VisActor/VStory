import type { IStoryDSL } from '../interface/dsl/dsl';
import { Story } from '../core/story';
import type { IStoryInitOption } from '../interface/story';

export function createStory(dsl: IStoryDSL | null, option: IStoryInitOption) {
  const story = new Story(dsl, option);
  return story;
}

export * from '../core/story';
export * from '../core/player';
// export * from '../character/component';
