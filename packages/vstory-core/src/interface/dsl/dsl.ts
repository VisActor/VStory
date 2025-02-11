import type { IRichTextGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import type { EasingType } from '@visactor/vrender-core';
import type { IChartCharacterConfig } from './chart';
import type { IComponentCharacterConfig } from './component';
import type { ICharacter } from '../character';
import type { IStory } from '../story';
import type { IStoryCanvas } from '../canvas';
import type { IPivotChartCharacterConfig, ITableCharacterConfig } from './table';

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
  // 网格布局定位
  columnSpan?: [number, number];
  rowSpan?: [number, number];

  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
  width?: number;
  height?: number;

  angle?: number;
  anchor?: [number, number];
};

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
  layoutType?: 'absolute' | 'grid' | 'flex'; // 布局类型
  // flex布局配置
  flexConfig?: {
    direction: 'row' | 'column';
    wrap: 'wrap' | 'nowrap';
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems: 'flex-start' | 'flex-end' | 'center';
  };
  // 网格布局配置
  gridConfig?: {
    columns: number;
    rows: number;
    gutterColumn: number;
    gutterRow: number;
  };
  position: IWidgetData; // 定位描述
  zIndex: number;
  theme?: string;
  extra?: any; // 带着的额外信息
  locked?: boolean; // 是否锁定
}

// 新增 container 类型的配置接口
export interface IContainerCharacterConfig extends ICharacterConfigBase {
  type: 'container';
  children: ICharacterConfig[]; // 子元素
}

export type IEditorTextGraphicAttribute = {
  graphicAlign?: 'left' | 'center' | 'right';
  graphicBaseline?: 'top' | 'middle' | 'bottom';
} & Partial<ITextGraphicAttribute & IRichTextGraphicAttribute>;

export type ICharacterConfig =
  | IChartCharacterConfig
  | IComponentCharacterConfig
  | ITableCharacterConfig
  | IPivotChartCharacterConfig
  | IContainerCharacterConfig; // 添加 container 类型

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;

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
  version: string; // 版本号
  width: number;
  height: number;
  theme?: string; // 主题
  background?: string; // 背景色
  gridConfig?: {
    columns: number;
    rows: number;
    gutterColumn: number;
    gutterRow: number;
  };
  characters: ICharacterConfig[]; // 作品中的元素
  acts: IActSpec[]; // 作品的章节
}
