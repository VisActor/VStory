import type { IGraphic, IStage } from '@visactor/vrender';
import type { ICharacter, ICharacterSpec } from '../character';

export interface IStoryInitOption {
  dom: string | HTMLDivElement; // dom id
  playerOption?: {
    scaleX?: number;
    scaleY?: number;
  };
}

export interface IStoryCanvas {
  getStage: () => IStage;
  getCanvas: () => HTMLCanvasElement;
  getEventDetail: (event: StoryEvent) => {
    character: ICharacter;
    characterInfo: undefined;
  };
  release: () => void;
}

export interface IStory {
  readonly id: string;
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
};
