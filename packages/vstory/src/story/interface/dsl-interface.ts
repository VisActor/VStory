import type {
  IChartVisibilityAction,
  IComponentVisibilityAction
} from '../../player/processor/interface/appear-action';
import type {
  IComponentMoveToAction,
  IComponentScaleToAction,
  IComponentStyleAction
} from '../../player/processor/interface/style-action';
import type { ICharacterSpec } from '../character';

export type IAction =
  | IComponentStyleAction
  | IComponentMoveToAction
  | IComponentScaleToAction
  | IComponentVisibilityAction
  | IChartVisibilityAction;

export interface IStorySpec {
  acts: IActSpec[]; // 作品的章节
  characters: ICharacterSpec[]; // 作品中的元素
}

export interface IActionsLink {
  characterId: string;
  characterActions: IAction[];
}

export type ISceneSpec = {
  id: string;
  delay?: number; // 入场延迟，可以是正数或者负数
  actions: IActionsLink[];
};

export interface IActSpec {
  id: string;
  scenes: ISceneSpec[];
}
