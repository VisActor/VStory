import type { IActionSpec, IActSpec } from './dsl/dsl';
import type { IReleaseable } from './releaseable';
import type { IStory } from './story';

export interface IViewSizeParams {
  keepFrame?: boolean; // 是否保持画幅不变，如果正常情况下是裁剪了，那么缩放后裁剪的地方依然不显示
}

export interface IPlayer extends IReleaseable {
  bindStory: (story: IStory) => void;
  tickTo: (t: number) => void;

  initActions: (acts: IActSpec[]) => void;

  // 因为场景树节点是相对定位的，所以播放器只能控制画面的缩放，不能控制大小
  setViewScale: (offsetX: number, offsetY: number, scaleX: number, scaleY: number, params: IViewSizeParams) => void;
  play: (loop?: boolean) => void;

  toDSL: () => IActSpec[];

  addAction: (sceneId: string, characterId: string, actions: IActionSpec[]) => void;
  removeCharacterActions: (characterId: string) => void;
}
