import type { IActionItem } from '../core/scheduler';
import type { IActionSpec, IActSpec, ISceneSpec } from './dsl/dsl';
import type { IReleaseable } from './releaseable';

export interface IScheduler extends IReleaseable {
  init: (acts: IActSpec[]) => void;
  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
  getActionsInRange: (fromTime: number, toTime: number) => IActionItem[];
  clearState: () => void;
  getTotalTime: () => number;
  getScenes: () => ISceneSpec[];
  toDSL: () => IActSpec[];
}
