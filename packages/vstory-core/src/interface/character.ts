import type { IGraphic } from '@visactor/vrender-core';
import { IGroup } from '@visactor/vrender-core';
import type { ICharacterConfig, IUpdateConfigParams } from './dsl/dsl';
import type { ICharacterPickInfo, IStoryEvent } from './event';
import type { IReleaseable } from './releaseable';
import type { IStory } from './story';
import type { IConfigProcess } from '../character/config-transform/interface';
import type { IStoryCanvas } from './canvas';
import type { IAABBBounds } from '@visactor/vutils';

export interface ILayoutLine {
  orient: 'x' | 'y';
  type: 'start' | 'middle' | 'end';
  value: number;
  start: number;
  end: number;
  bounds: IAABBBounds;
}

export enum SetConfigMode {
  default = 0,
  animate = 1
}
export interface ICharacter extends IReleaseable {
  id: string;
  type: string;
  visActorType: 'chart' | 'component' | 'table' | 'common';
  // dsl里的配置
  config: ICharacterConfig;
  // 保存的VRender图元
  graphic: IGraphic;

  story: IStory;
  canvas: IStoryCanvas;

  configProcess: IConfigProcess;
  // attributeProcess: IAttributeProcess;

  theme: string;

  init: () => void;
  reset: () => void;
  // 仅用于在action之前隐藏，在action之后显示
  show: () => void;
  hide: () => void;

  getGraphic: () => IGraphic;
  getGraphicBySelector?: (selector: string | string[]) => any;
  tickTo: (t: number) => void;

  checkEvent: (event: IStoryEvent) => false | (ICharacterPickInfo & any);

  toDSL: () => ICharacterConfig;
  setConfig: (config: Partial<ICharacterConfig>, params?: { forceMergeOption?: boolean; mode?: SetConfigMode }) => void;
  diffConfig: (config: IUpdateConfigParams) => IUpdateConfigParams;

  getAttribute: () => any;

  getRuntimeConfig: () => ICharacterRuntimeConfig;

  // 获取所有辅助线
  getLayoutGuideLine: () => ILayoutLine[];
}

export interface ICharacterRuntimeConfig {
  config: ICharacterConfig;
  canvas: IStoryCanvas;
  getAttribute: () => any;
}
