import type { IGraphic } from '@visactor/vrender';

export interface IStoryInitOption {
  dom: string | HTMLDivElement; // dom id
}

export interface IStory {
  readonly id: string;
}

export type StoryEvent = Event & {
  detailPath: IGraphic[];
  path: IGraphic[];
};
