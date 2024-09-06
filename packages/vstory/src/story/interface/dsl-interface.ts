import type { IRankingBarPlayAction } from './../../player/processor/chart/rankingBar/rankingBar';
import type { IChartAddAction, IChartUpdateAction } from '../../player/processor/chart/vchart';
import type {
  IChartVisibilityAction,
  IComponentVisibilityAction
} from '../../player/processor/interface/appear-action';
import type {
  IComponentBounceAction,
  IComponentMoveToAction,
  IComponentScaleToAction,
  IComponentStyleAction
} from '../../player/processor/interface/style-action';
import type { ICharacterSpec } from '../character';
import type { IUnitStyleAction, IUnitVisibilityAction } from '../../player/processor/interface/unit-action';

export type IActionSpec =
  | IComponentStyleAction
  | IComponentVisibilityAction
  | IComponentMoveToAction
  | IComponentScaleToAction
  | IComponentBounceAction
  | IChartVisibilityAction
  | IChartUpdateAction
  | IChartAddAction
  | IRankingBarPlayAction
  | IUnitStyleAction
  | IUnitVisibilityAction;

export interface IStorySpec {
  acts: IActSpec[]; // 作品的章节
  characters: ICharacterSpec[]; // 作品中的元素
}

export interface IActionsLink {
  characterId: string | string[];
  characterActions: IActionSpec[];
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
