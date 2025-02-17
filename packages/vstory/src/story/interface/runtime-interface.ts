import type { IGraphic, IStage } from '@visactor/vrender';
import type { ICharacter, ICharacterSpec } from '../character';
import type { IPlayer } from '../../player/interface/player';

export interface IStoryInitOption {
  dom?: string | HTMLDivElement; // dom id
  canvas?: string | HTMLCanvasElement; // canvas id
  width?: number;
  height?: number;
  pluginList?: string[];
  playerOption?: {
    scaleX?: number;
    scaleY?: number;
  };
  dpr?: number;
  renderMode?: 'node' | 'browser';
}

export interface IStoryCanvas {
  readonly dpr: number;
  getStage: () => IStage;
  getCanvas: () => HTMLCanvasElement;
  resize: (w: number, height: number) => void;
  getEventDetail: (event: StoryEvent) => {
    character: ICharacter;
    characterInfo: undefined;
  };
  release: () => void;
}

export interface IStory {
  readonly id: string;
  readonly player: IPlayer;
  readonly characterTree: ICharacterTree;
  readonly option: IStoryInitOption;
  canvas: IStoryCanvas;
  getCharacters: () => { [key: string]: ICharacter };
  getCharactersById: (key: string) => ICharacter | null;
}
export interface ICharacterTree {
  getCharacters: () => { [key: string]: ICharacter };
  getCharactersById: (key: string) => ICharacter | null;
  addCharacter: (spec: ICharacterSpec) => ICharacter;
  initCharacters: (spec: ICharacterSpec[]) => void;
}

export type StoryEvent = Event & {
  detailPath: IGraphic[];
  path: IGraphic[];
  canvasX?: number;
  canvasY?: number;
};
