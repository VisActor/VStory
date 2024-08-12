import type { ICharacter } from '../../../story/character';
import type { IActionSpec } from '../../../story/interface';

export interface IActionProcessorItem {
  getStartTime: (action: IActionSpec) => number;
  getDuration: (action: IActionSpec) => number;
  getStartTimeAndDuration: (action: IActionSpec) => { startTime: number; duration: number };

  run: (...actionParams: any) => any;
}

export interface IActionProcessor {
  getActInfo: (
    characterId: string,
    action: IActionSpec
  ) => {
    startTime: number;
    duration: number;
  } | null;

  doAction: (name: string, actionName: string, character: ICharacter, actionSpec: IActionSpec) => void;
}
