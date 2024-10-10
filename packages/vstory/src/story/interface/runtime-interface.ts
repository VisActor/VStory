import type { IPointLike } from '@visactor/vutils';
import type { IGraphic, IStage } from '@visactor/vrender';
import type { ICharacter, ICharacterConfig } from '../character';
import type { IPlayer } from '../../player/interface/player';
import type { IActionSpec, IStoryDSL } from './dsl-interface';

export interface IStoryInitOption {
  dom?: string | HTMLDivElement; // dom id
  canvas?: string | HTMLCanvasElement; // canvas id
  width?: number;
  height?: number;
  background?: string;
  layerBackground?: string;
  playerOption?: {
    offsetX?: number;
    offsetY?: number;
    scaleX?: number;
    scaleY?: number;
    transformStage?: boolean;
  };
}

export interface IStoryCanvas {
  getStage: () => IStage;
  getCanvas: () => HTMLCanvasElement;
  resize: (w: number, height: number) => void;
  getEventDetail: (event: StoryEvent) => {
    character: ICharacter;
    characterInfo: undefined;
  };
  release: () => void;
}

export type IActionParams = {
  actions: IActionSpec[];
  sceneId: string;
};

export interface IStory {
  readonly id: string;
  readonly player: IPlayer;
  readonly characterTree: ICharacterTree;
  canvas: IStoryCanvas;
  getCharacters: () => { [key: string]: ICharacter };
  getCharacterById: (key: string) => ICharacter | null;
  addCharacter: (spec: ICharacterConfig, actionParams?: IActionParams) => ICharacter;
  addCharacterWithAppear: (spec: ICharacterConfig) => ICharacter;
  removeCharacter: (cId: string) => void;
  addAction: (cId: string, actionParams: IActionParams) => void;
  toDSL: () => IStoryDSL;
}
export interface ICharacterTree {
  getCharacters: () => { [key: string]: ICharacter };
  getCharacterById: (key: string) => ICharacter | null;
  addCharacter: (spec: ICharacterConfig) => ICharacter;
  removeCharacter: (cId: string) => void;
  initCharacters: (spec: ICharacterConfig[]) => void;
  toDSL: () => ICharacterConfig[];
}

export type StoryEvent = Event & {
  detailPath: IGraphic[];
  path: IGraphic[];
  canvasX?: number;
  canvasY?: number;
  canvas?: IPointLike;
};
