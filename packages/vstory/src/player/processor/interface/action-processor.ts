import type { ICharacter } from '../../../story/character';
import type { IAction } from '../../../story/interface';

export interface IActionProcessorItem {
  getStartTime: (action: IAction) => number;
  getDuration: (action: IAction) => number;
  getStartTimeAndDuration: (action: IAction) => { startTime: number; duration: number };

  run: (...actionParams: any) => any;
}

export interface IActionProcessor {
  getActInfo: (
    characterId: string,
    action: IAction
  ) => {
    startTime: number;
    duration: number;
  } | null;

  doAction: (name: string, actionName: string, character: ICharacter, actionSpec: IAction) => void;
}
