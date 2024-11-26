# 一份基础的 DSL

在前面的章节中，我们已经大致了解了如何快速绘制制作一个 VStory 作品。本教程将以一个简单的仪表盘为例，细致介绍 VStory 的一份基础的 dsl 组成。一份基础的 dsl 需包含以下部分：

1. `character` 作品中会使用到的角色
2. `acts` 角色在不同时刻的不同行为

教程最终，我们将会实现如下图片中的效果
![](https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/dashboard.gif)

## 1. 物料准备

一个仪表盘会包含多种图表、以及标题、表格等模块、这些模块一部分可以使用VStory中提供的特定character实现，还有一些可以通过VChart自行去配置。在本教程中，我们将简化物料准备过程，直接给到所有用到的图表spec。

1. 一个基于`VChart`的简单的柱状图
```javascript livedemo template=vchart
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const spec = {
  type: 'bar',
  data: [
    {
      id: 'id0',
      values: mockData
    }
  ],
  xField: ['month', 'type'],
  yField: 'value',
  seriesField: 'type',
  legends: { visible: true }
};

const vchart = new VChart(spec, { dom: CONTAINER_ID });
vchart.renderSync();

// Just for the convenience of console debugging, DO NOT COPY!
window['vchart'] = vchart;
```

2. 一个基于`VChart`的简单的面积图
```javascript livedemo template=vchart
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const spec = {
  type: 'area',
  data: [
    {
      id: 'id0',
      values: mockData.filter((item) => item.type !== 'C')
    }
  ],
  xField: 'month',
  yField: 'value',
  seriesField:  'type',
  line: {
    style: {
      curveType: 'monotone'
    }
  },
  legends: { visible: true }
};

const vchart = new VChart(spec, { dom: CONTAINER_ID });
vchart.renderSync();

// Just for the convenience of console debugging, DO NOT COPY!
window['vchart'] = vchart;
```

3. 一个基于`VChart`的简单的雷达图
```javascript livedemo template=vchart
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const spec = {
  type: 'radar',
  data: [
    {
      values: mockData
    }
  ],
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type',
  point: {
    visible: false
  },
  area: {
    visible: true,
    style: {
      fillOpacity: 0.15,
      curveType: 'catmullRomClosed',
      curveTension: 0.6
    }
  },
  line: {
    visible: true,
    style: {
      curveType: 'catmullRomClosed',
      curveTension: 0.6
    }
  },
  legends: {
    visible: true,
    orient: 'top'
  }
};

const vchart = new VChart(spec, { dom: CONTAINER_ID });
vchart.renderSync();

// Just for the convenience of console debugging, DO NOT COPY!
window['vchart'] = vchart;
```
4. 一个基于`VChart`的简单的玫瑰图
```javascript livedemo template=vchart
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const spec = {
  type: 'rose',
  data: [
    {
      values: mockData
    }
  ],
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type',
  outerRadius: 1,
  stack: true,
  legends: [{ visible: true }],
  axes: [
    {
      orient: 'angle',
      bandPadding: 0.02
    },
  ]
};

const vchart = new VChart(spec, { dom: CONTAINER_ID });
vchart.renderSync();

// Just for the convenience of console debugging, DO NOT COPY!
window['vchart'] = vchart;
```
5. 一个基于`VChart`的简单的仪表盘图
```javascript livedemo template=vchart
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const spec = {
  type: 'gauge',
  data: [
    {
      id: 'id0',
      values: [
        {
          type: '目标A',
          value: 0.6
        }
      ]
    }
  ],
  categoryField: 'type',
  valueField: 'value',
  outerRadius: 0.8,
  innerRadius: 0.5,
  startAngle: -225,
  endAngle: 45,
};

const vchart = new VChart(spec, { dom: CONTAINER_ID });
vchart.renderSync();

// Just for the convenience of console debugging, DO NOT COPY!
window['vchart'] = vchart;
```

6. 使用一个`VStory`的`Text`类型作为标题
```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

story.addCharacterWithAppear({
  type: 'Text',
  id: 'title',
  zIndex: 1,
  position: {
    top: 50,
    left: 50,
    width: 800,
    height: 100
  },
  options: {
    graphic: {
      text: '这是一个文本',
      fontSize: 12,
      fontWeight: 'bold',
      fill: 'red',
      textAlign: 'left',
      textBaseline: 'top'
    },
    panel: {
      fill: 'blue',
      cornerRadius: 30
    }
  }
});

player.play(-1);
window.vstory = story;
```
7. 使用一个`VStory`的`WaveScatter`图表类型

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const mockData = [];
const types = ['A', 'B', 'C'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
  }
});

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

story.addCharacterWithAppear({
  type: 'WaveScatter',
  id: 'wave-scatter',
  zIndex: 1,
  position: {
    top: 50,
    left: 50,
    width: 300,
    height: 300
  },
  options: {
    data: {
      values: mockData.filter((item) => item.type === 'A')
    },
    categoryField: 'month',
    valueField: 'value',
    /* 水波动画的配置 */
    waveDuration: 2000,
    waveRatio: 0.00525,
    waveColor: '#0099ff',
    background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
    amplitude: 10,
    frequency: 2,
    panel: {
      fill: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowBlur: 10,
      shadowOffsetX: 4,
      shadowOffsetY: 4,
      cornerRadius: 8,
      clip: true
    }
  }
});

player.play(-1);
window.vstory = story;
```

## 2. 拼接

接下来，我们将这些素材拼接到`VStory`的大画布中，形成一个完整的作品，我们使用1920 * 1080作为画布的完整尺寸，图表之间的`margin`为30px，距离左右边界的`margin`也是30px。具体的布局如下图所示

![](https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/dashboard_layout_detail.png)

完成了布局的设计之后，接下来我们开始DSL的编写，来实现上图中的效果，DSL核心包括一个`character`数组和一个`acts`数组，`character`数组包含了作品中的所有角色（元素），`acts`数组包含了作品中的各种角色的各种动作（动画），具体的接口定义如下：

```ts
interface IStoryDSL {
  acts: IActSpec[]; // 作品的章节
  characters: ICharacterConfig[]; // 作品中的元素
}
/* character定义 */
type ICharacterConfig = {
  id: string;
  type: string; // 类型
  position: IWidgetData; // 定位描述
  zIndex: number;
  extra?: any; // 带着的额外信息
  options?: any; // 具体的配置信息
}

/* act定义 */
interface IActSpec {
  id: string; // 这一幕的id
  scenes: ISceneSpec[]; // 这一幕包含的场景
}
interface ISceneSpec {
  id: string; // 这个场景的id
  delay?: number; // 场景的入场延迟，可以是正数或者负数
  actions: IActions[]; // 这个场景包含的动作
};

interface IActions { // 行为定义，角色和行为都可以配数组，可以定义多个角色执行多个行为
  characterId: string | string[]; // 执行行为的角色id
  characterActions: IActionSpec[]; // 执行的具体行为
}

// 具体的行为定义
interface IAction {
  action: string; // 行为名称
  startTime?: number; // 开始时间
  payload?: { // 行为的参数
    animation?: IAnimationParams;
    selector?: string;
    [key?: string]: any;
  };
}

```

### 2.1 character数组配置
根据我们提供的每个`character`的配置，以及接口定义，我们可以组装我们的`character`数组。

```ts
const characters = [
  {
    type: 'Text',
    id: 'Title',
    zIndex: 3,
    position: {
      top: 100,
      left: 1920 / 2,
      width: 1920,
      height: 90
    },
    options: {
      graphic: {
        fontSize: 70,
        wordBreak: 'break-word',
        textAlign: 'center',
        textBaseline: 'bottom',
        fill: 'black',
        fontWeight: 200,
        text: 'VStory简易仪表盘'
      }
    }
  },
  {
    type: 'WaveScatter',
    id: 'wave-scatter',
    zIndex: 1,
    position: {
      top: 130,
      left: 30,
      width: 600,
      height: 630
    },
    options: {
      data: {
        values: mockData.filter((item) => item.type === 'A')
      },
      categoryField: 'month',
      valueField: 'value',
      /* 水波动画的配置 */
      waveDuration: 2000,
      waveRatio: 0.00525,
      waveColor: '#0099ff',
      background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
      amplitude: 10,
      frequency: 2,
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 8,
        clip: true
      }
    }
  },
  {
    type: 'VChart',
    id: 'radar1',
    zIndex: 3,
    position: {
      top: 130,
      left: 660,
      width: 600,
      height: 630
    },
    options: {
      spec: radar1,
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 20
      }
    }
  },
  {
    type: 'VChart',
    id: 'rose1',
    zIndex: 3,
    position: {
      top: 130,
      left: 1290,
      width: 600,
      height: 630
    },
    options: {
      spec: rose1,
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 20
      }
    }
  },
  {
    type: 'VChart',
    id: 'gauge1',
    zIndex: 3,
    position: {
      top: 790,
      left: 30,
      width: 600,
      height: 260
    },
    options: {
      spec: gauge1,
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 20
      }
    }
  },
  {
    type: 'VChart',
    id: 'bar1',
    zIndex: 3,
    position: {
      top: 790,
      left: 660,
      width: 600,
      height: 260
    },
    options: {
      spec: bar1,
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 20
      }
    }
  },
  {
    type: 'VChart',
    id: 'area1',
    zIndex: 3,
    position: {
      top: 790,
      left: 1290,
      width: 600,
      height: 260
    },
    options: {
      spec: area1,
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 20
      }
    }
  },
]
```
### 2.2 acts数组配置
`characters`数组中只是定义了作品中有这些元素可用，具体的动作还没有定义，如果不定义动作的话，元素将不会展示，所以接下来我们开始定义`acts`数组。我们期望作品中的元素有如下动作

1. 柱状图和玫瑰图会有`oneByOne`(图元一个接着一个)的`appear`(入场)动画效果，其他图表都是默认的`appear`（入场）的动画效果
2. 包含图表本身的面板也要有一个`bounce`(弹跳)的`appear`(入场)的动画效果

由于行为都很简单，所以只需要一幕，一个场景就能完成。
```ts
const acts = [
  {
    id: 'page1', // 这一幕的id
    scenes: [
      {
        id: 'singleScene', // 这一幕包含的场景
        actions: [
          // 除了柱状图和玫瑰图以外，其他character都做默认的appear的动画效果
          {
            characterId: ['Title', 'area1', 'radar1', 'gauge1', 'wave-scatter'],
            characterActions: [
              {
                action: 'appear',
                startTime: 0,
                payload: {
                  animation: {
                    duration: 2000
                  }
                }
              }
            ]
          },
          // 柱状图和玫瑰图做oneByOne的appear动画效果
          {
            characterId: ['bar1', 'rose1'],
            characterActions: [
              {
                action: 'appear',
                startTime: 0,
                payload: {
                  animation: {
                    duration: 3000,
                    oneByOne: true,
                    dimensionCount: mockData.length
                  }
                }
              }
            ]
          },
          // 包含图表本身的面板做bounce的appear动画效果
          {
            characterId: ['area1', 'radar1', 'bar1', 'rose1', 'gauge1', 'wave-scatter'],
            characterActions: [
              {
                action: 'bounce',
                payload: {
                  animation: {
                    duration: 2000,
                    easing: 'quadOut'
                  },
                  type: 'bounce4',
                  flipY: true,
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
```

## 3. 播放

至此，我们已经完成了一个简易的仪表盘的制作步骤，接下来，我们将`character`和`acts`数组拼起来合成一个DSL，然后使用 VStory 进行播放。

```ts
// 注册所有需要的内容
VStory.registerAll();

// 创建一个VStory实例，将DSL传入
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
// 创建一个player实例，用于播放这个Story
const player = new VStory.Player(story);
story.init(player);

// 开始播放，传入1表示循环播放
// 传入0表示单次播放，播放到结束时间就停止
// 传入-1表示单次播放，但是播放结束后，时间会继续往后走，不会停止
// 我们这里因为有一个永久在播放的波浪动画（wave），所以这里传入-1，不循环，但是时间不停止
player.play(-1);
```

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

function loadDSL() {
  const mockData = [];
  const types = ['A', 'B', 'C'];

  types.forEach(type => {
    for (let i = 1; i <= 12; i++) {
      mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
    }
  });

  const bar1 = {
    type: 'bar',
    data: [
      {
        id: 'id0',
        values: mockData
      }
    ],
    xField: ['month', 'type'],
    yField: 'value',
    seriesField: 'type',
    legends: { visible: true }
  };

  const area1 = {
    type: 'area',
    data: [
      {
        id: 'id0',
        values: mockData.filter((item) => item.type !== 'C')
      }
    ],
    xField: 'month',
    yField: 'value',
    seriesField:  'type',
    line: {
      style: {
        curveType: 'monotone'
      }
    },
    legends: { visible: true }
  };

  const radar1 = {
    type: 'radar',
    data: [
      {
        values: mockData
      }
    ],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    point: {
      visible: false
    },
    area: {
      visible: true,
      style: {
        fillOpacity: 0.15,
        curveType: 'catmullRomClosed',
        curveTension: 0.6
      }
    },
    line: {
      visible: true,
      style: {
        curveType: 'catmullRomClosed',
        curveTension: 0.6
      }
    },
    legends: {
      visible: true,
      orient: 'top'
    }
  };

  const rose1 = {
    type: 'rose',
    data: [
      {
        values: mockData
      }
    ],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    outerRadius: 1,
    stack: true,
    legends: [{ visible: true }],
    axes: [
      {
        orient: 'angle',
        bandPadding: 0.02
      },
    ]
  };

  const gauge1 = {
    type: 'gauge',
    data: [
      {
        id: 'id0',
        values: [
          {
            type: '目标A',
            value: 0.6
          }
        ]
      }
    ],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.8,
    innerRadius: 0.5,
    startAngle: -225,
    endAngle: 45,
  };

  return {
    characters: [
      {
        type: 'Text',
        id: 'Title',
        zIndex: 3,
        position: {
          top: 100,
          left: 1920 / 2,
          width: 1920,
          height: 90
        },
        options: {
          graphic: {
            fontSize: 70,
            wordBreak: 'break-word',
            textAlign: 'center',
            textBaseline: 'bottom',
            fill: 'black',
            fontWeight: 200,
            text: 'VStory简易仪表盘'
          }
        }
      },
      {
        type: 'WaveScatter',
        id: 'wave-scatter',
        zIndex: 1,
        position: {
          top: 130,
          left: 30,
          width: 600,
          height: 630
        },
        options: {
          data: {
            values: mockData.filter((item) => item.type === 'A')
          },
          categoryField: 'month',
          valueField: 'value',
          /* 水波动画的配置 */
          waveDuration: 2000,
          waveRatio: 0.00525,
          waveColor: '#0099ff',
          background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
          amplitude: 10,
          frequency: 2,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 8,
            clip: true
          }
        }
      },
      {
        type: 'VChart',
        id: 'radar1',
        zIndex: 3,
        position: {
          top: 130,
          left: 660,
          width: 600,
          height: 630
        },
        options: {
          spec: radar1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'rose1',
        zIndex: 3,
        position: {
          top: 130,
          left: 1290,
          width: 600,
          height: 630
        },
        options: {
          spec: rose1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'gauge1',
        zIndex: 3,
        position: {
          top: 790,
          left: 30,
          width: 600,
          height: 260
        },
        options: {
          spec: gauge1,
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'bar1',
        zIndex: 3,
        position: {
          top: 790,
          left: 660,
          width: 600,
          height: 260
        },
        options: {
          spec: bar1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'area1',
        zIndex: 3,
        position: {
          top: 790,
          left: 1290,
          width: 600,
          height: 260
        },
        options: {
          spec: area1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
    ],
    acts: [
      {
        id: 'page1',
        scenes: [
          {
            id: 'singleScene',
            actions: [
              {
                characterId: ['Title', 'area1', 'radar1', 'gauge1', 'wave-scatter'],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 2000
                      }
                    }
                  }
                ]
              },
              {
                characterId: ['bar1', 'rose1'],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 3000,
                        oneByOne: true,
                        dimensionCount: mockData.length
                      }
                    }
                  }
                ]
              },
              {
                characterId: ['area1', 'radar1', 'bar1', 'rose1', 'gauge1', 'wave-scatter'],
                characterActions: [
                  {
                    action: 'bounce',
                    payload: {
                      animation: {
                        duration: 2000,
                        easing: 'quadOut'
                      },
                      type: 'bounce4',
                      flipY: true,
                      // dy: 30,
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
}

const dsl = loadDSL();

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, width: 1920 / 3, height: 1080 / 3, background: '#ebecf0', scaleX: 1/3, scaleY: 1/3 });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```

通过本教程，您已经了解了一份基础的 DSL 配置组成，后面你可以尝试更改`character`和`acts`，探索 VStory 的强大功能和灵活性，编绘出绚丽多彩的作品。祝您编码愉快！
