import type { IGraphic } from '@visactor/vrender-core';
import { IGroup } from '@visactor/vrender-core';
import type { ICharacterConfig } from './dsl/dsl';
import type { ICharacterPickInfo, IStoryEvent } from './event';
import type { IReleaseable } from './releaseable';
import type { IStory } from './story';
import type { IConfigProcess } from '../character/config-transform/interface';
import type { IStoryCanvas } from './canvas';

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
  setConfig: (config: ICharacterConfig) => void;

  getAttribute: () => any;

  getRuntimeConfig: () => ICharacterRuntimeConfig;
}

export interface ICharacterRuntimeConfig {
  config: ICharacterConfig;
  canvas: IStoryCanvas;
  getAttribute: () => any;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
