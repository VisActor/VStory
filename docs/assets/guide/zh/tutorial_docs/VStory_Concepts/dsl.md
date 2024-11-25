# DSL定义

DSL是描述一个VStory作品的JSON格式。其中定义了这个作品中使用了哪些元素，以及相关配置。描述了这个作品是如何编排的，什么元素在什么时刻做了什么行为。关于DSL的快速实战入门请参考[一份基础的 DSL](../Basic/A_Basic_DSL)。本节教程将详细介绍DSL的具体定义。

## 结构
DSL 是一个 JSON 格式的对象，包含以下几个字段：
1. character数组
  character 数组用于描述这个作品中使用了哪些元素，以及相关配置。
2. acts数组
  acts 数组用于描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。

```ts
interface IStoryDSL {
  acts: IActSpec[]; // 作品的章节，描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。
  characters: ICharacterConfig[]; // 作品中的元素，描述这个作品中使用了哪些元素，以及相关配置。
}
```

### character数组
character 数组用于描述这个作品中使用了哪些类型的元素，以及相关配置。其中包含位置大小（position），层级（layout）。

```ts
type ICharacterConfig = IChartCharacterConfig | IComponentCharacterConfig;

// position的定义，描述元素的位置和大小，以及旋转锚点等信息
type IWidgetData = {
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

interface ICharacterConfigBase {
  id: string;
  type: string; // character的类型
  position: IWidgetData; // 定位描述
  zIndex: number; // 层级描述
  extra?: any; // 带着的额外信息，可不填
}
```

目前character有三大类型，分别是图表、组件、表格。主要是因为这三大类型的配置有较大差异，然后每个类型下面还有无数的子类型，比如组件类型，你可以自定义任意的组件，然后注册到VStory中在DSL中使用。

#### 图表类型

图表类型支持VChart图表，可以直接配置VChart的spec，然后支持一些额外属性列举如下：
```ts
interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    // 图表spec
    spec?: any;
    // 初始化参数
    initOption?: IInitOption;
    // 边距
    padding?: { left: number; top: number; right: number; bottom: number };
    // 图表容器
    panel?: any;
    // 数据源
    data?: any;
    // 标题
    title?: {
      [key: string]: IComponentConfig<ISpec['title']>;
    };
    // 图例
    legends?: {
      [key: string]: IComponentConfig<ISpec['legends']>;
    };
    // axes
    axes?: {
      [key: string]: IComponentConfig<ISpec['axes']>;
    };
    // 色板
    color?: any;
    // mark 单元素样式
    markStyle?: {
      [key: string]: IMarkStyle;
    };
    // label 单元素样式 与 mark 区分开，runtime逻辑完全不同
    labelStyle?: {
      [key: string]: IMarkStyle;
    };
    // 组样式配置
    dataGroupStyle?: {
      [StroyAllDataGroup]: IDataGroupStyle; // 全部分组的样式
      [key: string]: IDataGroupStyle; // 某一组
    };
    // 直接合并的配置，使用VChart的spec
    rootConfig?: Record<string, any>;
  };
}
```
#### 组件类型

文字、图片等都属于组件类型，如果需要在VStory中使用自定义组件，需要先注册到VStory中，然后在DSL中使用。这个在[自定义组件](./Custom_Component)中会详细介绍。
注意的是，组件可以携带一个额外的文本，这个文本通过text属性配置，而graphic属性则是组件本身的配置。
```ts
interface IComponentCharacterConfig extends ICharacterConfigBase {
  options: {
    // 主图元的配置
    graphic: any;
    // 面板配置
    panel?: any;
    // 文字配置
    text?: any;
    // 边距
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}
```
#### 表格类型
正在开发中

### Acts数组
通过characters数组，我们可以在画布中放置多个元素，接下来我们需要通过acts数组来描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。Acts由幕、场景、动作组成。acts数组中可以包含多个幕，幕与幕之间是有先后顺序的串联结构。每一个幕中可以包含多个场景，场景与场景默认是有先后顺序的串联结构。但是场景和场景的时间线是可以重叠的，通过配置场景的delay字段，可以控制该场景与上一个场景时间线的偏移。每一个场景中可以包含多个动作，动作中描述了一个或多个character的具体行为，一个场景中可以包含多个character和多个动作，动作之间是并行执行的，通过配置startTime来控制该动作的开始时间。

#### 幕
幕是作品中最大的章节，一个作品可以包含多个幕，幕与幕之间是有先后顺序的串联结构。
```ts
interface IActSpec {
  id: string; // 幕的id
  scenes: ISceneSpec[]; // 场景数组
}
```
#### 场景
场景是一个时间线，一个场景包含一个动作数组，场景与场景默认是有先后顺序的串联结构，但也可以通过配置delay字段来控制该场景与上一个场景时间线的偏移。
```ts
type ISceneSpec = {
  id: string;
  delay?: number; // 入场延迟，可以是正数或者负数
  actions: IActions[];
};
```
#### 动作
一个动作包含一个或多个character的具体行为，一个场景中可以包含多个动作，动作之间是并行执行的，通过配置startTime来控制该动作的开始时间。
```ts
interface IActions {
  characterId: string | string[]; // 要执行动作的character的id或者数组
  characterActions: IAction<IActionPayload>[];
}

interface IAction<T extends IActionPayload> {
  action: string; // 具体的action，比如appear
  startTime?: number; // 动作开始时间
  payload?: T | T[]; // 动作的参数
}

export interface IActionPayload {
  animation?: IAnimationParams; // 具体的动画参数定义
  selector?: string; // 选择器，用于指定要执行动作的元素，比如图表中，可以通过 bar 选择到柱子
}

export interface IAnimationParams {
  duration: number; // 动画时长
  easing?: EasingType; // 动画曲线
  loop?: number | boolean; // 是否循环，循环几次
  effect?: string | string[]; // 特效，比如appear有fade、bounce等特效
  // 其他参数
  dimensionCount?: number;
  delayPerTime?: number;
  enterPerTime?: number;
  params?: Record<string, any>;
  [key: string]: any;
}
```

到这里，一个DSL的完整定义就完成了，大家可以自己动手试一下，或者去example[/vstory/example]里去改一改试一试。
