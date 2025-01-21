import type { ICanvasLike, IGraphic, IStage } from '@visactor/vrender-core';
import type { ICharacter, ILayoutLine } from './character';
import type { IStoryEvent } from './event';
import type { IReleaseable } from './releaseable';

export interface IStoryCanvas extends IReleaseable {
  getStage: () => IStage;
  resize: (w: number, h: number) => void;
  getEventDetail: (event: IStoryEvent) => {
    character: ICharacter;
    characterInfo: undefined;
  };
  container: HTMLDivElement | null;
  tickTo: (t: number, render?: boolean) => void;
  getNativeCanvas: () => ICanvasLike | any;
  getDpr: () => number;

  // 添加graphic到canvas中
  addGraphic: (g: IGraphic) => void;
  removeGraphic: (g: IGraphic) => void;
  getLayoutGuideLine: () => ILayoutLine[];
}
