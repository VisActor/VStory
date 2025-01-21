import type { EventEmitter } from '@visactor/vutils';
import type { IStoryCanvas } from './canvas';
import type { ICharacter } from './character';
import type { IActionSpec, ICharacterConfig, IStoryDSL } from './dsl/dsl';
import type { IPlayer } from './player';
import type { IReleaseable } from './releaseable';

export type IActionParams = {
  actions: IActionSpec[];
  sceneId: string;
};

export interface IStory extends IReleaseable, EventEmitter {
  readonly id: string;
  readonly canvas: IStoryCanvas;
  readonly player: IPlayer;
  readonly theme: string;

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
