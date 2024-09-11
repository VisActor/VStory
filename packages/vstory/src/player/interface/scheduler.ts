import type { IActionSpec, IActSpec, ISceneSpec } from '../../story/interface';
import type { IActionItem } from '../scheduler';

export interface IScheduler {
  init: (acts: IActSpec[]) => void;
  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
  getActionsInRange: (fromTime: number, toTime: number) => IActionItem[];
  clearState: () => void;
  getTotalTime: () => number;
  getScenes: () => ISceneSpec[];
}
