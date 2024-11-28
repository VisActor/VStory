# action

请先阅读[dsl的定义](./DSL)以及[character](./character)，然后再阅读本节内容。

当我们定义好了`character`数组之后，就可以通过`actions`来定义这些`character`的行为了。action的定义是在`幕`（`act`）中进行的

我们的acts定义参考了戏剧的架构：在戏剧中，“幕”和“场面”是两个非常重要的概念，用于划分和组织剧本的结构。
1. 幕：在戏剧中，幕（`Act`）是剧本的主要部分，用于划分戏剧的大段落。一部戏剧通常包含两幕或更多，每一幕都有其独特的主题和冲突。幕的划分可以帮助观众理解剧情的发展和角色的变化。在实际表演中，每一幕之间通常会有短暂的休息，以便更换舞台布景或让演员更换服装。
2. 场面：场面（`Scene`）是幕的子集，它进一步细化了剧本的结构。一幕通常包含多个场面，每个场面都在特定的时间和地点发生。场面的切换通常意味着角色、地点或时间的变化。在剧本中，场面的划分可以帮助读者或观众更好地理解剧情的流动。

我们的acts定义也是由幕（`Act`） -> 场面（`Scene`） -> 行为（`action`）这样的定义

具体的结构参考[dsl的定义](./DSL)，接下来我们介绍有哪些`action`可以使用。

## action使用

`action`的接口定义如下，包括一个`characterId`指定这个`action`作用的元素, 还有一个`characterActions`数组，里面包含了这个`character`的具体行为。
`characterActions`数组的每一项包括一个action的类型（`action`），和一个`payload`，`action`定义了具体的行为，比如`appear`、`disappear`、`style`等,`payload`是一个对象，包含了这个`action`的具体参数，比如动画时长，选择器等。

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

### Appear、DisAppear

首先当我们定义好了`character`数组之后，默认这些`character`是不可见的，我们需要通过`appear`来让它们出现。当不需要的时候，我们可以通过`disappear`来让它们消失。`appear`有很多种形式，通用的比如`fade`、`scale`、`wipe`等。如果你使用了一些特殊的`character`，比如`VChart`，那么还有更多的`appear`形式。

通用的Appear、DisAppear效果有如下几种：
- `fade` 渐入渐出
- `scale` 缩放
- `wipe` 滑动
- `move` 移动

具体的使用用例如下：

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
    fill: 'white',
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'fade' },
  { type: 'Rect', options: rect, effect: 'scale' },
  { type: 'Rect', options: rect, effect: 'wipe' },
  { type: 'Rect', options: rect, effect: 'move' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${index}`,
    zIndex: 1,
    position: {
      top: 50 + Math.floor(index / 2) * 150,
      left: 50 + Math.floor(index % 2) * 150,
      width: 100,
      height: 100
    },
    options: item.options
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            }
          }
        ]
      },
      {
        action: 'disappear',
        startTime: 2000,
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
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### Style
`style`可以让`character`的样式发生变化，比如`fill`、`stroke`等。`style`的使用方式和`appear`、`disappear`类似，但是`style`的`payload`中需要包含`graphic`、`text`等字段。

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
    fill: 'white',
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'fade' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${index}`,
    zIndex: 1,
    position: {
      top: 50 + Math.floor(index / 2) * 150,
      left: 50 + Math.floor(index % 2) * 150,
      width: 100,
      height: 100
    },
    options: item.options
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            }
          }
        ]
      },
      {
        action: 'style',
        startTime: 2000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            },
            graphic: {
              fill: 'blue'
            }
          }
        ]
      }
    ]
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### MoveTo

`moveTo`可以让`character`移动到指定的位置。`moveTo`的使用方式和`appear`、`disappear`类似，但是`moveTo`的`payload`中需要包含`destination`字段表示移动距离，`destination`字段包含了`x`、`y`坐标。

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
    fill: 'white',
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'fade' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${index}`,
    zIndex: 1,
    position: {
      top: 50 + Math.floor(index / 2) * 150,
      left: 50 + Math.floor(index % 2) * 150,
      width: 100,
      height: 100
    },
    options: item.options
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            }
          }
        ]
      },
      {
        action: 'moveTo',
        startTime: 2000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            },
            destination: {
              x: 250,
              y: 80
            },
          }
        ]
      }
    ]
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### ScaleTo

`scaleTo`可以让`character`缩放到指定的大小。`scaleTo`的使用方式和`appear`、`disappear`类似，但是`scaleTo`的`payload`中需要包含`scale`字段表示缩放比例，`scale`字段包含了`scaleX`、`scaleY`属性。

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
    fill: 'white',
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'fade' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${index}`,
    zIndex: 1,
    position: {
      top: 50 + Math.floor(index / 2) * 150,
      left: 50 + Math.floor(index % 2) * 150,
      width: 100,
      height: 100
    },
    options: item.options
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            }
          }
        ]
      },
      {
        action: 'scaleTo',
        startTime: 2000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            },
            scale: {
              scaleX: 0.3,
              scaleY: 0.3
            },
          }
        ]
      }
    ]
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### Bounce

`bounce`可以让`character`跳动。只需要配置action即可。

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
    fill: 'white',
  }
};

const characterList = [
  { type: 'Rect', options: rect, effect: 'fade' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${index}`,
    zIndex: 1,
    position: {
      top: 50 + Math.floor(index / 2) * 150,
      left: 50 + Math.floor(index % 2) * 150,
      width: 100,
      height: 100
    },
    options: item.options
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            }
          }
        ]
      },
      {
        action: 'bounce',
        startTime: 2000,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: item.effect
            },
          }
        ]
      }
    ]
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### VChart的Appear、DisAppear和选择器

上面介绍了一些基本的`action`内容，`VChart`由于其内容的复杂性，我们设计了更加复杂的语法，去支持其特殊的`Appear`或者DisAppear的内容。比如图表我们希望柱子做`leap`动画，其他的走默认的动画。这时我们需要使用`selector`来选择需要做动画的柱子，来给其配置特殊的动画。同时我们也给`VChart`设计了默认的`Appear`动画，其中每个系列和组件都会执行自己的`Appear`动画

selector是图表的筛选器，其中可以配置几种格式：
- `*` 选择所有的组件
- `def` 选择type为abc的组件，比如`bar`
- `#abc` 选择name为abc的元素，比如`#abc`
- `:not(selector)` 选择除了selector之外的元素，这里的selector可以是`type`也可以是`name`
多个selector可以同时配置在同一个字符串中，使用空格分隔，比如`def #abc`，表示选择type为def的组件和name为abc的元素。

```ts
// 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
// 不同Action的payload之间是并列关系
[
    {
      action: 'appear',
      startTime: 10, // 开始时间
      payload: [
          {
            selector: '*',
            style: {},
            animation: {
              duration: 10000,
              easing: 'linear'
            } as any
          },
          {
            selector: ':not(label)',
            style: {},
            animation: {
              duration: 10000,
              easing: 'linear'
            } as any
          },
          {
            selector: 'x-axes',
            style: {},
            animation: {
              duration: 10000,
              easing: 'linear'
            } as any
          },
          {
            selector: '#label1',
            style: {},
            animation: {
              duration: 10000,
              easing: 'linear'
            } as any
          }
      ]
    },
    {
      action: 'appear',
      startTime: 100, // 开始时间
      payload: [
          {
            selector: '*', // 选择器 0
            style: {},
            animation: {
              duration: 10000,
              easing: 'linear'
            } as any
          }
      ]
    }
]
```
这是一个例子，柱子使用`leap`动画，其他组件使用默认动画
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
                },
              ]
            }
          ]
        }
      ]
    }
  ]
}

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```
