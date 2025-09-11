import type { ICharacter, IActionSpec, IActSpec, IReleaseable, ISceneSpec, IStory } from '@visactor/vstory-core';

export interface IViewSizeParams {
  keepFrame?: boolean; // 是否保持画幅不变，如果正常情况下是裁剪了，那么缩放后裁剪的地方依然不显示
}

export interface IPlayer extends IReleaseable {
  bindStory: (story: IStory) => void;
  tickTo: (t: number) => void;

  initActions: (acts: IActSpec[]) => void;

  // 因为场景树节点是相对定位的，所以播放器只能控制画面的缩放，不能控制大小
  setViewScale: (offsetX: number, offsetY: number, scaleX: number, scaleY: number, params: IViewSizeParams) => void;
  // loop小于0的话，不循环持续播放，loop等于0的话，仅放一次，loop大于0的话，持续循环播放
  play: (loop?: number) => void;

  reset: () => void;

  toDSL: () => IActSpec[];

  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
}

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

export interface IActionItem {
  startTime: number;
  duration: number;
  actionSpec: IActionSpec;
  characterId: string;
}

export interface IScheduler extends IReleaseable {
  init: (acts: IActSpec[]) => void;
  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
  getActionsInRange: (fromTime: number, toTime: number) => IActionItem[];
  getUnAppliedAppearAction: () => IActionItem[];
  clearState: () => void;
  getTotalTime: () => number;
  getScenes: () => ISceneSpec[];
  toDSL: () => IActSpec[];
}
