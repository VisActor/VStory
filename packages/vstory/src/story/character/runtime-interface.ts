import type { IGroup } from '@visactor/vrender-core';
import type { IPointLike } from '@visactor/vutils';
import type { StoryCanvas } from '../canvas/canvas';
import type { IStory, StoryEvent } from '../interface/runtime-interface';
import type { ICharacterSpec } from './dsl-interface';

export interface ICharacterPickInfo {
  part: string;
  graphicType: string;
}
export interface ICharacter {
  id: string;
  spec: ICharacterSpec;

  init: () => void;
  reset: () => void;
  show: () => void;
  hide: () => void;
  getGraphicParent: () => IGroup;
  tickTo: (t: number) => void;

  checkEvent: (event: StoryEvent) => false | (ICharacterPickInfo & any);

  updateSpec: (spec: Omit<Partial<ICharacterSpec>, 'id' | 'type'>) => void;

  setAttributes: (attr: Record<string, any>) => void;
}

export interface ICharacterInitOption {
  story: IStory;
  canvas: StoryCanvas;
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
