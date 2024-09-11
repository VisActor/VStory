import type { EventEmitter } from '@visactor/vutils';
import { ICharacter } from '../../story/character';
import type { IActionSpec, IActSpec } from '../../story/interface/dsl-interface';

export interface IPlayer extends EventEmitter {
  speed: number;
  tickTo: (t: number) => void;
  play: () => void;
  encodeToVideo: (millsecond: number, fps: number) => Promise<string>;
  pause: () => void;
  release: () => void;
  initActs: (acts: IActSpec[]) => void;
  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
  reset: () => void;
}
