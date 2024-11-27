# A Basic DSL

In the previous chapters, we have roughly understood how to quickly create a VStory work. This tutorial will use a simple dashboard as an example to introduce the basic components of a VStory DSL in detail. A basic DSL should include the following parts:

1. `character`: the characters used in the work
2. `acts`: the different behaviors of characters at different times

By the end of this tutorial, we will achieve the effect shown in the image below:
![](https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/dashboard.gif)

## 1. Material Preparation

A dashboard will contain various charts, as well as modules such as titles and tables. Some of these modules can be implemented using specific characters provided by VStory, while others can be configured using VChart. In this tutorial, we will simplify the material preparation process and provide all the chart specs needed.

1. A simple bar chart based on `VChart`
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

2. A simple area chart based on `VChart`
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


3. A simple radar chart based on `VChart`
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

4. A simple rose chart based on `VChart`
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

5. A simple gauge chart based on `VChart`
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

6. Use a `Text` type from `VStory` as the title
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
      text: 'VStory简易仪表盘',
      fontSize: 70,
      wordBreak: 'break-word',
      textAlign: 'left',
      textBaseline: 'top',
      fill: 'black',
      fontWeight: 200,
    }
  }
});

player.play(-1);
window.vstory = story;
```

7. Use a `WaveScatter` chart type from `VStory`
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

## 2. Assembly

Next, we will assemble these materials into a large canvas of `VStory`, forming a complete work. We will use a canvas size of 1920 * 1080, with a margin of 30px between the charts and a margin of 30px from the left and right borders. The specific layout is shown in the image below:

![](https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/dashboard_layout_detail.png)

After designing the layout, we will start writing the DSL to achieve the effect shown in the image above. The DSL core includes an array of `character` and an array of `acts`. The `character` array contains all the elements in the work, and the `acts` array contains various actions of the characters. The interface definitions are as follows:

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

### 2.1 Configuration of the `characters` array
Based on the provided configuration for each `character` and the interface definition, we can assemble our `characters` array.

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

### 2.2 Configuration of the `acts` array
The `characters` array only defines the elements available in the work, but the specific actions are not defined yet. If actions are not defined, the elements will not be displayed. Therefore, we will define the `acts` array next. We expect the elements in the work to have the following actions:

1. The bar chart and rose chart will have an `appear` animation effect with `oneByOne` (one by one) for the elements, while other charts will have the default `appear` animation effect.
2. The panels containing the charts themselves should also have a `bounce` animation effect with `appear`.

Since the actions are simple, only one scene is needed to complete each act.

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

## 3. Playback

Now that we have completed the steps to create a simple dashboard, we will combine the `character` and `acts` arrays to form a DSL, and then use VStory to play it.

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

By following this tutorial, you have learned the components of a basic DSL configuration. You can now try modifying the `character` and `acts` arrays to explore the powerful features and flexibility of VStory, creating colorful and vibrant works. Happy coding!
