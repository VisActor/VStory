import type { IGroup, IGraphic } from '@visactor/vrender';
import type { IBoundsLike, IPointLike } from '@visactor/vutils';
import type { IStory, IStoryCanvas, StoryEvent } from '../interface/runtime-interface';
import type { ICharacterConfig } from './dsl-interface';
import type { Graphic } from './component/graphic/graphic';

export interface ICharacterPickInfo {
  part: string;
  graphic?: IGraphic;
  graphicType?: string;
  modelInfo?: any;
}
export interface ICharacter {
  id: string;
  type: string;
  visActorType: string;
  config: ICharacterConfig;
  graphic: Graphic | IGroup;

  init: () => void;
  reset: () => void;
  show: () => void;
  hide: () => void;
  getGraphicParent: () => IGroup;
  getLayoutBounds: () => IBoundsLike;
  tickTo: (t: number) => void;

  checkEvent: (event: StoryEvent) => false | (ICharacterPickInfo & any);

  // updateSpec: (spec: Omit<Partial<ICharacterSpec>, 'id' | 'type'>) => void;
  toJSON: () => ICharacterConfig;

  setConfig: (config: Record<string, any>) => void;
  release: () => void;
}

export interface ICharacterInitOption {
  story: IStory;
  canvas: IStoryCanvas;
  graphicParent: IGroup;
}

export interface ICharacterConstructor {
  new (spec: ICharacterConfig, option: ICharacterInitOption): ICharacter;
}

export interface ILayoutAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  anchor?: [number | string, number | string];
  dx?: number;
  dy?: number;
  // shapePoints?: IPointLike[];
}
