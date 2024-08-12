import type { EventEmitter } from '@visactor/vutils';
import { ICharacter } from '../../story/character';
import type { IActSpec } from '../../story/interface/dsl-interface';

export interface IPlayer extends EventEmitter {
  tickTo: (t: number) => void;
  play: () => void;
  encodeToVideo: (millsecond: number, fps: number) => Promise<string>;
  pause: () => void;
  release: () => void;
  initActs: (acts: IActSpec[]) => void;
  reset: () => void;
}
