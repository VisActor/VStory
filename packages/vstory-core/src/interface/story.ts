import type { EventEmitter } from '@visactor/vutils';
import type { IStoryCanvas } from './canvas';
import type { ICharacter } from './character';
import type { IActionSpec, ICharacterConfig, IStoryDSL } from './dsl/dsl';
import type { IPlayer } from './player';
import type { IReleaseable } from './releaseable';
import type { IAABBBoundsLike } from '@visactor/vutils';

export type IActionParams = {
  actions: IActionSpec[];
  sceneId: string;
};

type NodeCanvas = any;
export interface IStoryInitOption {
  dom?: string | HTMLDivElement; // dom id
  canvas?: string | HTMLCanvasElement | NodeCanvas; // canvas id
  width?: number;
  height?: number;
  background?: string;
  layerBackground?: string;
  layerViewBox?: IAABBBoundsLike;
  dpr?: number;
  // 对画面的缩放
  scaleX?: number | 'auto';
  scaleY?: number | 'auto';
  theme?: string;
  pluginList?: string[];
  mode?: 'desktop-browser' | 'node';
  modeParams?: any;
  layerClip?: boolean;
}

export interface IStory extends IReleaseable, EventEmitter {
  readonly id: string;
  readonly canvas: IStoryCanvas;
  readonly player: IPlayer;
  readonly theme: string;
  readonly option: IStoryInitOption;

  load: (dsl: IStoryDSL) => void;
  reset: () => void;
  toDSL: () => IStoryDSL;

  getCharacters: () => { [key: string]: ICharacter };
  getCharacterList: () => ICharacter[];
  getCharacterById: (key: string) => ICharacter | null;
  getCharactersByType: (type: string) => ICharacter[];
  addCharacter: (config: ICharacterConfig, actionParams?: IActionParams) => ICharacter;
  addCharacterWithAppear: (config: ICharacterConfig) => ICharacter;
  removeCharacter: (cId: string) => void;
  addAction: (cId: string, actionParams: IActionParams) => void;
}
