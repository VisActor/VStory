# DSL 定义

DSL 是描述一个 VStory 作品的 JSON 格式。其中定义了这个作品中使用了哪些元素，以及相关配置。描述了这个作品是如何编排的，什么元素在什么时刻做了什么行为。关于 DSL 的快速实战入门请参考[一份基础的 DSL](../Basic/A_Basic_DSL)。本节教程将详细介绍 DSL 的具体定义。

描述一个作品，我们需要讲清楚两件事：

1. 一个是这个作品的组成部分，也就是这个作品由什么元素组成的。
2. 一个是这个作品的编排，也就是这些元素是怎么组成作品的画面，以及不同时刻这些元素做了什么行为。
   通过上述两块描述，我们就可以完成一个作品的定义。

在 DSL 定义中，作品的组成部分也就是元素的定义，是在`characters`数组中定义的。作品的编排是通过`acts`数组来定义的。

我们的 acts 定义参考了戏剧的架构：在戏剧中，“幕”和“场面”是两个非常重要的概念，用于划分和组织剧本的结构。

1. 幕：在戏剧中，幕（Act）是剧本的主要部分，用于划分戏剧的大段落。一部戏剧通常包含两幕或更多，每一幕都有其独特的主题和冲突。幕的划分可以帮助观众理解剧情的发展和角色的变化。在实际表演中，每一幕之间通常会有短暂的休息，以便更换舞台布景或让演员更换服装。
2. 场面：场面（Scene）是幕的子集，它进一步细化了剧本的结构。一幕通常包含多个场面，每个场面都在特定的时间和地点发生。场面的切换通常意味着角色、地点或时间的变化。在剧本中，场面的划分可以帮助读者或观众更好地理解剧情的流动。

我们的 acts 定义也是由幕（Act） -> 场面（Scene） -> 行为（action）这样的定义

## 结构

`DSL` 是一个 JSON 格式的对象，包含以下几个字段：

1. `character`数组
   `character` 数组用于描述这个作品中使用了哪些元素，以及相关配置。
2. `acts`数组
   `acts` 数组用于描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。

```ts
interface IStoryDSL {
  acts: IActSpec[]; // 作品的章节，描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。
  characters: ICharacterConfig[]; // 作品中的元素，描述这个作品中使用了哪些元素，以及相关配置。
}
```

### character 数组

`character` 数组用于描述这个作品中使用了哪些类型的元素，以及相关配置。其中包含位置大小（`position`），层级（`layout`）。

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

目前`character`有三大类型，分别是图表、组件、表格。主要是因为这三大类型的配置有较大差异，然后每个类型下面还有无数的子类型，比如组件类型，你可以自定义任意的组件，然后注册到 VStory 中在 DSL 中使用。

#### 图表类型

图表类型支持 VChart 图表，可以直接配置 VChart 的 spec，然后支持一些额外属性列举如下：

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
      [key in ModelSelector]: Partial<ElementType<ISpec['title']>>;
    };
    // 图例
    legends?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['legends']>>;
    };
    // axes
    axes?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['axes']>>;
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

文字、图片等都属于组件类型，如果需要在 VStory 中使用自定义组件，需要先注册到 VStory 中，然后在 DSL 中使用。这个在[自定义组件](./Custom_Component)中会详细介绍。
注意的是，组件可以携带一个额外的文本，这个文本通过`text`属性配置，而`graphic`属性则是组件本身的配置。

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

### Acts 数组

通过`characters`数组，我们可以在画布中放置多个元素，接下来我们需要通过`acts`数组来描述这个作品是如何编排的，什么元素在什么时刻做了什么行为。`acts`由幕、场景、动作组成。
`acts`数组中可以包含多个幕，幕与幕之间是有先后顺序的串联结构。每一个幕中可以包含多个场景，场景与场景默认是有先后顺序的串联结构。但是场景和场景的时间线是可以重叠的，通过配置场景的`delay`字段，可以控制该场景与上一个场景时间线的偏移。每一个场景中可以包含多个动作，动作中描述了一个或多个`character`的具体行为，一个场景中可以包含多个`character`和多个动作，动作之间是并行执行的，通过配置`startTime`来控制该动作的开始时间。

#### 幕

幕是作品中最大的章节，一个作品可以包含多个幕，幕与幕之间是有先后顺序的串联结构。

```ts
interface IActSpec {
  id: string; // 幕的id
  scenes: ISceneSpec[]; // 场景数组
}
```

#### 场景

场景是一个时间线，一个场景包含一个动作数组，场景与场景默认是有先后顺序的串联结构，但也可以通过配置`delay`字段来控制该场景与上一个场景时间线的偏移。

```ts
type ISceneSpec = {
  id: string;
  delay?: number; // 入场延迟，可以是正数或者负数
  actions: IActions[];
};
```

#### 动作

一个动作包含一个或多个`character`的具体行为，一个场景中可以包含多个动作，动作之间是并行执行的，通过配置`startTime`来控制该动作的开始时间。

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

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: '这是一个矩形',
    textBaseline: 'middle',
    textAlign: 'center',
    fill: 'white'
  }
};
const text = {
  graphic: {
    text: '这是一个文本',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'red',
    textAlign: 'left',
    textBaseline: 'top'
  }
};
const image = {
  graphic: {
    stroke: false,
    image:
      'data:image/png;base64,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'
  }
};
const shape = {
  graphic: {
    stroke: 'red',
    symbolType: 'star'
  }
};
const line = {
  graphic: {
    stroke: 'red'
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'scale' },
  { type: 'Text', options: text, effect: 'typewriter' },
  { type: 'Image', options: image, effect: 'wipe' },
  { type: 'Shape', options: shape, effect: 'clipRange' },
  { type: 'Line', options: line, effect: 'clipRange' }
];

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter(
    {
      type: item.type,
      id: item.type,
      zIndex: 1,
      position: {
        top: 50 + Math.floor(index / 2) * 150,
        left: 50 + Math.floor(index % 2) * 150,
        width: 100,
        height: 100
      },
      options: item.options
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 1000 * index,
          payload: [
            {
              animation: {
                duration: 1000,
                easing: 'linear',
                effect: item.effect
              }
            }
          ]
        }
      ]
    }
  );
});

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

到这里，一个 DSL 的完整定义就完成了，大家可以自己动手试一下，或者去[examples](/vstory/examples)里去改一改试一试。
