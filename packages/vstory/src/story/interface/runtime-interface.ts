import type { IGraphic, IStage } from '@visactor/vrender';
import type { ICharacter, ICharacterSpec } from '../character';
import type { IPlayer } from '../../player/interface/player';
import type { IActionSpec, IStorySpec } from '.';

export interface IStoryInitOption {
  dom?: string | HTMLDivElement; // dom id
  canvas?: string | HTMLCanvasElement; // canvas id
  width?: number;
  height?: number;
  playerOption?: {
    offsetX?: number;
    offsetY?: number;
    scaleX?: number;
    scaleY?: number;
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
  getCharactersById: (key: string) => ICharacter | null;
  addCharacter: (spec: ICharacterSpec, actionParams?: IActionParams) => ICharacter;
  addCharacterWithAppear: (spec: ICharacterSpec) => ICharacter;
  removeCharacter: (cId: string) => void;
  addAction: (cId: string, actionParams: IActionParams) => void;
  toDSL: () => IStorySpec;
}
export interface ICharacterTree {
  getCharacters: () => { [key: string]: ICharacter };
  getCharactersById: (key: string) => ICharacter | null;
  addCharacter: (spec: ICharacterSpec) => ICharacter;
  removeCharacter: (cId: string) => void;
  initCharacters: (spec: ICharacterSpec[]) => void;
  toDSL: () => ICharacterSpec[];
}

export type StoryEvent = Event & {
  detailPath: IGraphic[];
  path: IGraphic[];
  canvasX?: number;
  canvasY?: number;
};
