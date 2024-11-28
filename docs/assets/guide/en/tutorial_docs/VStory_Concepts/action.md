# action

Please read [the definition of DSL](./DSL) and [character](./character) first, and then continue to read this section.

Once we have defined the `character` array, we can define the behaviors of these `character` through `actions`. The definition of actions is done in the `act`.

Our act definition is inspired by the structure of drama: in drama, "Act" and "Scene" are two very important concepts used to divide and organize the structure of the script.
1. Act: In drama, an Act is the main part of the script, used to divide the drama into major sections. A play usually contains two or more acts, each with its unique theme and conflict. The division of acts can help the audience understand the development of the plot and the changes in characters. In actual performances, there is usually a brief break between each act to change stage settings or allow actors to change costumes.
2. Scene: A Scene is a subset of an Act, further refining the structure of the script. An act typically contains multiple scenes, each happening at a specific time and place. The transition between scenes usually signifies a change in characters, location, or time. In the script, the division of scenes can help readers or viewers better understand the flow of the plot.

Our act definition follows the structure of Act -> Scene -> Action.

For specific structure reference, please check [the definition of DSL](./DSL). Next, we will introduce the available `actions`.

## Using Actions

The interface definition of `action` is as follows, including a `characterId` specifying the element on which this `action` acts, and a `characterActions` array containing the specific behaviors of this `character`.
Each item in the `characterActions` array includes a type of action (`action`) and a `payload`, where `action` defines the specific behavior, such as `appear`, `disappear`, `style`, etc., and `payload` is an object containing the specific parameters of this `action`, such as animation duration, selector, etc.

```ts
interface IActions {
  characterId: string | string[]; // id or array of ids of the character to perform the action
  characterActions: IAction<IActionPayload>[];
}

interface IAction<T extends IActionPayload> {
  action: string; // specific action, such as appear
  startTime?: number; // action start time
  payload?: T | T[]; // action parameters
}

export interface IActionPayload {
  animation?: IAnimationParams; // specific animation parameter definition
  selector?: string; // selector to specify the element to perform the action, e.g., in a chart, can select bars
}

export interface IAnimationParams {
  duration: number; // animation duration
  easing?: EasingType; // animation curve
  loop?: number | boolean; // whether to loop, how many times
  effect?: string | string[]; // effects, e.g., fade, bounce for appear
  // other parameters
  dimensionCount?: number;
  delayPerTime?: number;
  enterPerTime?: number;
  params?: Record<string, any>;
  [key: string]: any;
}
```

### Appear, DisAppear

After defining the `character` array, these `character` elements are initially invisible. We can use `appear` to make them appear. When they are no longer needed, we can use `disappear` to make them disappear. `appear` has various forms, common ones include `fade`, `scale`, `wipe`, etc. If you are using special characters like `VChart`, there are more `appear` forms available.

Common Appear and DisAppear effects include:
- `fade`: Fade in and out
- `scale`: Scale
- `wipe`: Slide
- `move`: Move

Here is an example of how to use them:

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: 'This is a rectangle',
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
`style` can change the style of a `character`, such as `fill`, `stroke`, etc. The usage of `style` is similar to `appear` and `disappear`, but the `payload` of `style` needs to include fields like `graphic`, `text`, etc.

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: 'This is a rectangle',
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

`moveTo` can move a `character` to a specified position. The usage of `moveTo` is similar to `appear` and `disappear`, but the `payload` of `moveTo` needs to include a `destination` field indicating the movement distance, with `x` and `y` coordinates.

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: 'This is a rectangle',
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

`scaleTo` can scale a `character` to a specified size. The usage of `scaleTo` is similar to `appear` and `disappear`, but the `payload` of `scaleTo` needs to include a `scale` field indicating the scaling ratio, with `scaleX` and `scaleY` properties.

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: 'This is a rectangle',
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

`bounce` can make a `character` bounce. Just configure the action.

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
const rect = {
  graphic: {
    stroke: false,
    fill: 'pink'
  },
  text: {
    text: 'This is a rectangle',
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

### Appear, DisAppear, and Selector for VChart

Above, we introduced some basic `action` content. Due to the complexity of `VChart` content, we have designed a more complex syntax to support its special `Appear` or `DisAppear` effects. For example, in a chart, we want bars to have a `leap` animation while others use default animations. In this case, we need to use `selector` to select the bars that need special animations and configure them with specific animations. We have also designed default `Appear` animations for `VChart`, where each series and component will execute its own `Appear` animation.

Selector is a chart filter, where you can configure several formats:
- `*`: Select all components
- `def`: Select components with type `abc`, e.g., `bar`
- `#abc`: Select elements with name `abc`, e.g., `#abc`
- `:not(selector)`: Select elements other than the selector, where the selector can be `type` or `name`
Multiple selectors can be configured in the same string, separated by spaces, e.g., `def #abc`, which means selecting components of type `def` and elements with name `abc`.

```ts
// Items in the same payload array of the same Action have a covering relationship, with later items overriding earlier ones
// Payloads of different Actions are parallel to each other
[
    {
      action: 'appear',
      startTime: 10, // start time
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
      startTime: 100, // start time
      payload: [
          {
            selector: '*', // selector 0
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
Here is an example where bars use the `leap` animation and other components use default animations:
```javascript livedemo template=vchart
// Register all necessary content
VStory.registerAll();
// Chart needed, a simple bar chart will do
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

// Define the DSL of the story
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
                      selector: ':not(bar)', // other components use default animations
                      animation: { duration: 3000 }
                    },
                    {
                      selector: 'bar', // bars use leap animation
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
