# character

请先阅读[dsl 的定义](./DSL)，然后再阅读本节内容。
Character（角色） 是 VStory 中最基础的元素，它可以是图表、组件、表格等，它可以只是一个简单的文字，也可以是一个非常复杂的图表。Character 可以通过 DSL 配置，也可以通过 API 动态添加。Character 是需要预定义的，如果你的作品中需要使用某个 Character，你需要在 DSL 的`characters`数组中定义好这个 Character。

## Character 的定义

所有的`character`都可以由一些通用的配置和一些特殊的配置定义。通用配置包括：

- id：`character`的 id，用于唯一标识这个`character`，后续在定义具体的行为（action）时会用到
- type：`character`的类型，目前 VStory 支持的`character`类型包括但不限于：`VChart`、`Text`、`Image`等
- position：`character`的位置和大小，以及旋转锚点等信息
- zIndex：`character`的层级，默认为 0，层级高的`character`会覆盖层级低的`character`

所有的特殊配置都在 options 里，举例：

```ts
const textConfig = {
  type: 'Text', // 标记是文字类型
  id: 'title1',
  zIndex: 1,
  position: {
    top: 100,
    left: 200
  },
  // 这里定义文字的配置
  options: {
    graphic: {
      text: 'A BRIEF HISTORY',
      fontSize: 12,
      fill: 'red'
    }
  }
};

const imageConfig = {
  type: 'Image', // 标记是图片类型
  id: 'image1',
  zIndex: 1,
  position: {
    top: 100,
    left: 200
  },
  // 这里定义图片的配置
  options: {
    graphic: {
      image: 'url'
    }
  }
};
```

关于准确的接口定义，如下所示：

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
  type: string; // 类型
  position: IWidgetData; // 定位描述
  zIndex: number;
  extra?: any; // 带着的额外信息
  options: any; // 特殊的配置，所有不同的Character可以将自己特殊的配置传入在这里
}
```

## 内置的 Character 类型

### VChart

VChart 是 VStory 中最常用的 Character 类型，它可以是各种类型的图表，比如折线图、柱状图、饼图等。VChart 可以通过直接传入 VChart 的 Spec 来定义，具体的 spec 如何定义，请参考[vchart 站点](/vchart)。VChart 的接口定义如下：

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

我们看一个 VChart 的例子：

```javascript livedemo template=vchart
// 注册所有需要的内容
VStory.registerAll();
// 需要用到的图表，一个普通柱状图就可以
const chartSpec = {
  type: 'bar',
  data: [
    {
      values: [
        { month: 'Mon', sales: 22 },
        { month: 'Tue', sales: 38 },
        { month: 'Wed', sales: 25 },
        { month: 'Thu', sales: 29 },
        { month: 'Fri', sales: 13 }
      ]
    }
  ],
  xField: 'month',
  yField: 'sales'
};

// 定义故事的dsl
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: 'bar1',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4
        },
        spec: chartSpec
      }
    }
  ],
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id: 'scene0',
          actions: [
            {
              characterId: 'bar1',
              characterActions: [
                {
                  action: 'appear',
                  payload: [
                    {
                      selector: ':not(bar)', // 其他组件使用默认动画就行
                      animation: { duration: 3000 }
                    },
                    {
                      selector: 'bar', // 柱子使用leap动画
                      animation: { duration: 3000, effect: 'barLeap', oneByOne: true, dimensionCount: 5 }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```

### 基本组件（Image、Line、Rect、Shape、Text、Arc、Polygon）

组件类型的接口定义如下，其中基本组件（Image、Line、Rect、Shape、Text、Arc、Polygon）的配置都直接基于 VRender 的对应图元，配置在 graphic 属性上：

- Image 是基于 VRender 的[Image 图元](/vrender/option/Image)
- Line 是基于 VRender 的[Line 图元](/vrender/option/Line)
- Rect 是基于 VRender 的[Rect 图元](/vrender/option/Rect)
- Shape 是基于 VRender 的[Symbol 图元](/vrender/option/Symbol)
- Text 是基于 VRender 的[RichText 图元](/vrender/option/RichText)
- Arc 是基于 VRender 的[Arc 图元](/vrender/option/Arc)
- Polygon 是基于 VRender 的[Polygon 图元](/vrender/option/Polygon)

其中 panel 是组件的额外面板，其实是一个[VRender 的 rect](/vrender/option/Rect)图元，可以参考[VRender 的 rect](/vrender/option/Rect)图元配置。
text 配置是每个组件都带有的一个额外的配置，是一个[VRender 的 text](/vrender/option/Text)图元，可以参考[VRender 的 text](/vrender/option/Text)图元配置。
padding 表示面板和内容的边距，分别表示上、右、下、左的边距。

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

使用案例如下：

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

### Timeline 组件

`Timeline`组件是一个时间轴组件，可以展示一整个时间序列，以及时间的流向，它的接口定义如下：

```ts
interface TimelineAttrs extends IGroupGraphicAttribute {
  width: number; // 宽度
  // height?: number;
  times: { label: string; desc?: string }[]; // 具体的时间序列
  labelSpace?: number; // 标签的间距
  symbolStyle?: Partial<ISymbolGraphicAttribute>; // 时间点的样式
  activeSymbolStyle?: Partial<ISymbolGraphicAttribute>; // 激活的时间点的样式
  lineStyle?: Partial<ILineGraphicAttribute>; // 时间线的样式
  activeLineStyle?: Partial<ILineGraphicAttribute>; // 激活的时间线的样式
  labelStyle?: Partial<ITextGraphicAttribute>; // 标签的样式
  activeLabelStyle?: Partial<ITextGraphicAttribute>; // 激活的标签的样式
  pointLayoutMode?: 'space-around' | 'space-between'; // 布局模式
  // 当前进度
  clipRange?: number;
  animation?: boolean; // 是否开启动画
}

interface ITimelineComponentAttributes extends IGroupGraphicAttribute {
  // 结合富文本textConfig的文本配置
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: TimelineAttrs;
  /**
   * 内部边距
   */
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}
```

使用案例如下：

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// dsl配置
const dsl = {
  characters: [
    {
      type: 'Timeline',
      id: 'timeline',
      zIndex: 1,
      position: {
        top: 100,
        left: 0,
        width: 500,
        height: 100
      },
      options: {
        graphic: {
          times: [
            { label: '1486', desc: '' },
            { label: '1644', desc: '' },
            { label: '1765', desc: '' },
            { label: '1786', desc: '' }
          ],
          labelStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          },
          activeSymbolStyle: {
            size: 20
          },
          activeLabelStyle: {
            fontSize: 22,
            fontWeight: 'bold'
          }
        }
      }
    }
  ],
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: 'timeline',
              characterActions: [
                {
                  startTime: 1000,
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 2000,
                      effect: 'default'
                    }
                  }
                },
                ...new Array(5).fill(0).map((item, index) => {
                  return {
                    startTime: 3000 + index * 3100,
                    action: 'state',
                    payload: {
                      animation: {
                        duration: 3000,
                        effect: 'forward'
                      }
                    }
                  };
                })
              ]
            }
          ]
        }
      ]
    }
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```

### Unit 组件

单元可视化组件，单元可视化是一种将数据转化为视觉元素的叙事方式，能够直观地展示复杂信息。通过将每个数据点个体化，观众能更深入地理解每一个数据背后所代表的真实故事。这种方式利用动画和时间推移，生动地描绘数据变化的过程，同时通过颜色和形状等视觉元素传达多维度的信息，增强了情感共鸣。它不仅提升了数据的可读性，还易于在社交媒体上分享，有助于提高公众对重要社会问题的关注。

`Unit`组件的接口定义如下

```ts
interface IUnitGraphicAttributes extends IGroupAttribute {
  /**
   * The width of the container.
   * Defaults to the width defined by the position of the character.
   */
  width: number;

  /**
   * The height of the container.
   * Defaults to the height defined by the position of the character.
   */
  height: number;

  /**
   * The padding inside the container, specifying space between the container border and its content.
   * @default { top: 50, bottom: 50, right: 50, left: 50 }
   */
  padding?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };

  /**
   * The total number of units to be rendered within the container.
   * @default 250
   */
  count?: number;

  /**
   * 每个symbol代表多少数量
   * @default 1
   */
  countPerSymbol?: number;

  /**
   * The gap between units, represented as a percentage of the unit's width and height.
   * The first value specifies the horizontal gap, and the second value specifies the vertical gap.
   * @default [0.5, 0.5]
   */
  gap?: [number, number];

  // 定义了从什么区间到什么区间是什么样式
  units: {
    style: ISymbolGraphicAttribute;
    range: [number, number];
  }[];

  /**
   * The aspect ratio of the units, defined as width divided by height.
   * @default 1
   */
  aspect?: number;

  /**
   * The direction in which units are laid out within the container.
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';

  duration?: number;
}
```

使用案例如下：

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// dsl配置
const dsl = {
  characters: [
    {
      type: 'Unit',
      id: 'unit-test',
      zIndex: 2,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        graphic: {
          fill: '#f1f1f0',
          padding: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
          },
          count: 250,
          units: [
            {
              range: [0, 66],
              style: {
                symbolType: 'rect',
                fill: '#4e8ae0'
              }
            },
            {
              range: [66],
              style: {
                symbolType: 'circle',
                fill: '#f6c86d'
              }
            }
          ],
          gap: [0.5, 0.75],
          aspect: 1,
          direction: 'vertical'
        }
      }
    }
  ],
  acts: [
    {
      id: 'page1',
      scenes: [
        {
          id: '1',
          actions: [
            {
              characterId: 'unit-test',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: {
                    animation: {
                      duration: 1000,
                      easing: 'linear',
                      effect: 'default'
                    }
                  }
                },
                {
                  action: 'style',
                  startTime: 3000,
                  payload: {
                    animation: {
                      duration: 1000,
                      easing: 'linear',
                      effect: 'default'
                    },
                    graphic: {
                      units: [
                        {
                          range: [0, 66],
                          style: {
                            symbolType: 'rect',
                            fill: '#4e8ae0'
                          }
                        },
                        {
                          range: [66, 99],
                          style: {
                            symbolType: 'circle',
                            fill: '#f6c86d'
                          }
                        },
                        {
                          range: [99],
                          style: {
                            symbolType: 'circle',
                            fill: '#6638f0'
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  action: 'style',
                  startTime: 6000,
                  payload: {
                    animation: {
                      duration: 2000,
                      easing: 'linear',
                      effect: 'default'
                    },
                    graphic: {
                      units: [
                        {
                          range: [],
                          style: {
                            fill: '#4af2a1'
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```
