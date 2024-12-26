import type { ICharacter } from './character';
import type { IActionSpec } from './dsl/dsl';
import type { IReleaseable } from './releaseable';

export interface IActionProcessorItem {
  getStartTime: (action: IActionSpec) => number;
  getDuration: (action: IActionSpec) => number;
  getStartTimeAndDuration: (action: IActionSpec, character?: ICharacter) => { startTime: number; duration: number };

  run: (...actionParams: any) => any;
  applyAttrsForVisibility?: (...actionParams: any) => any;
}

export interface IActionProcessor extends IReleaseable {
  getActInfo: (
    characterId: string,
    action: IActionSpec
  ) => {
    startTime: number;
    duration: number;
  } | null;

  getProcessorList: (name: string) => IActionProcessorItem[];
  getProcessor: (name: string, actionName: string) => IActionProcessorItem;

  doAction: (name: string, actionName: string, character: ICharacter, actionSpec: IActionSpec) => void;
  applyAppearAttrs: (name: string, actionName: string, character: ICharacter, actionSpec: IActionSpec) => void;
}
