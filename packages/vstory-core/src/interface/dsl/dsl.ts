import type { IRichTextGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { EasingType } from '@visactor/vrender-core';
import type { IChartCharacterConfig } from './chart';
import type { IComponentCharacterConfig } from './component';
import type { ICharacter } from '../character';
import type { IStory } from '../story';
import type { IStoryCanvas } from '../canvas';

export interface IAction<T extends IActionPayload> {
  action: string;
  startTime?: number;
  payload?: T | T[];
}

export interface IAnimationParams {
  duration: number;
  easing?: EasingType;
  loop?: number | boolean;
  dimensionCount?: number;
  delayPerTime?: number;
  enterPerTime?: number;
  params?: Record<string, any>;
  effect?: string | string[];
  [key: string]: any;
}

export interface IActionPayload {
  animation?: IAnimationParams;
  selector?: string;
}

export type IActionSpec = IAction<IActionPayload>;

export type IWidgetData = {
  left?: number;
  top?: number;
  x?: number;
  y?: number;
  angle?: number;
  anchor?: [number, number];
} & (
  | {
      bottom?: number;
      right?: number;
    }
  | {
      width?: number;
      height?: number;
    }
);

export interface IActSpec {
  id: string;
  scenes: ISceneSpec[];
}

export interface IActions {
  characterId: string | string[];
  characterActions: IActionSpec[];
}

export type ISceneSpec = {
  id: string;
  delay?: number; // 入场延迟，可以是正数或者负数
  actions: IActions[];
};

export interface ICharacterConfigBase {
  id: string;
  type: string; // 类型
  position: IWidgetData; // 定位描述
  zIndex: number;
  extra?: any; // 带着的额外信息
}

export type IEditorTextGraphicAttribute = {
  graphicAlign?: 'left' | 'center' | 'right';
  graphicBaseline?: 'top' | 'middle' | 'bottom';
} & Partial<ITextGraphicAttribute & IRichTextGraphicAttribute>;

export type ICharacterConfig = IChartCharacterConfig | IComponentCharacterConfig;

export interface ICharacterInitOption {
  story: IStory;
  canvas: IStoryCanvas;
  // configProcess: IConfigProcess;
  // attributeProcess: IAttributeProcess;
}

export interface ICharacterConstructor {
  new (spec: ICharacterConfig, option: ICharacterInitOption): ICharacter;
}

export interface IStoryDSL {
  acts: IActSpec[]; // 作品的章节
  characters: ICharacterConfig[]; // 作品中的元素
}
