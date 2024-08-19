import type { IGroup } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';
import type { StoryCanvas } from '../canvas/canvas';
import type { IStory, IStoryCanvas, StoryEvent } from '../interface/runtime-interface';
import type { ICharacterSpec } from './dsl-interface';
import type { Graphic } from './component/graphic/graphic';

export interface ICharacterPickInfo {
  part: string;
  graphicType: string;
}
export interface ICharacter {
  id: string;
  type: string;
  visActorType: string;
  spec: ICharacterSpec;

  init: () => void;
  reset: () => void;
  show: () => void;
  hide: () => void;
  getGraphicParent: () => IGroup;
  graphic: Graphic | IGroup;
  tickTo: (t: number) => void;

  checkEvent: (event: StoryEvent) => false | (ICharacterPickInfo & any);

  updateSpec: (spec: Omit<Partial<ICharacterSpec>, 'id' | 'type'>) => void;

  setAttributes: (attr: Record<string, any>) => void;
  release: () => void;
}

export interface ICharacterInitOption {
  story: IStory;
  canvas: IStoryCanvas;
  graphicParent: IGroup;
}

export interface ICharacterConstructor {
  new (spec: ICharacterSpec, option: ICharacterInitOption): ICharacter;
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
  shapePoints?: IPointLike[];
}
