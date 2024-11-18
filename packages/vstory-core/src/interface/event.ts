import type { IGraphic } from '@visactor/vrender-core';
import type { IPointLike } from '@visactor/vutils';

export interface ICharacterPickInfo {
  part: string;
  graphic?: IGraphic;
  graphicType?: string;
  modelInfo?: any;
}

export type IStoryEvent = Event & {
  detailPath: IGraphic[];
  path: IGraphic[];
  canvasX?: number;
  canvasY?: number;
  canvas?: IPointLike;
};
