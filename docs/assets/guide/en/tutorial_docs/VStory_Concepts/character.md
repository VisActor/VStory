# Character

Please read the definition of [DSL](./DSL) first, and then read the content of this section.

Character is the most basic element in VStory, it can be a chart, component, table, etc. It can be a simple text or a very complex chart. Character can be configured through DSL or added dynamically through API. Characters need to be predefined, if you need to use a specific Character in your work, you need to define this Character in the `characters` array in DSL.

## Definition of Character

All `characters` can be defined by some common configurations and some special configurations. Common configurations include:
- id: The id of the `character`, used to uniquely identify this `character`, which will be used in defining specific behaviors (actions) later
- type: The type of the `character`, the types of `characters` supported by VStory include but are not limited to: `VChart`, `Text`, `Image`, etc.
- position: The position and size of the `character`, as well as rotation anchor information
- zIndex: The layer of the `character`, default is 0, characters with higher layers will overlay characters with lower layers

All special configurations are in the options, for example:

```ts
const textConfig = {
  type: 'Text', // Indicates it is a text type
  id: 'title1',
  zIndex: 1,
  position: {
    top: 100,
    left: 200,
  },
  // Define the text configuration here
  options: {
    graphic: {
      text: 'A BRIEF HISTORY',
      fontSize: 12,
      fill: 'red'
    },
  }
}

const imageConfig = {
  type: 'Image', // Indicates it is an image type
  id: 'image1',
  zIndex: 1,
  position: {
    top: 100,
    left: 200,
  },
  // Define the image configuration here
  options: {
    graphic: {
      image: 'url',
    }
  }
}
```

Regarding the accurate interface definition, it is as follows:
```ts
type ICharacterConfig = IChartCharacterConfig | IComponentCharacterConfig;

// Definition of position, describing the position, size, and rotation anchor of the element
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
  type: string; // Type
  position: IWidgetData; // Position description
  zIndex: number;
  extra?: any; // Extra information carried
  options: any; // Special configuration, each different Character can pass its own special configuration here
}
```

## Built-in Character Types

### VChart

VChart is the most commonly used Character type in VStory, it can be various types of charts, such as line charts, bar charts, pie charts, etc. VChart can be defined by directly passing in the Spec of VChart, for how to define the specific spec, please refer to the [vchart site](/vchart). The interface definition of VChart is as follows:

```ts
interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    // Chart spec
    spec?: any;
    // Initialization parameters
    initOption?: IInitOption;
    // Padding
    padding?: { left: number; top: number; right: number; bottom: number };
    // Chart container
    panel?: any;
    // Data source
    data?: any;
    // Title
    title?: {
      [key: string]: IComponentConfig<ISpec['title']>;
    };
    // Legends
    legends?: {
      [key: string]: IComponentConfig<ISpec['legends']>;
    };
    // Axes
    axes?: {
      [key: string]: IComponentConfig<ISpec['axes']>;
    };
    // Color palette
    color?: any;
    // Mark single element style
    markStyle?: {
      [key: string]: IMarkStyle;
    };
    // Label single element style, different from mark, completely different runtime logic
    labelStyle?: {
      [key: string]: IMarkStyle;
    };
    // Data group style configuration
    dataGroupStyle?: {
      [StroyAllDataGroup]: IDataGroupStyle; // Styles for all groups
      [key: string]: IDataGroupStyle; // Styles for a specific group
    };
    // Directly merged configuration, using VChart's spec
    rootConfig?: Record<string, any>;
  };
}
```
Let's look at an example of VChart:

```javascript livedemo template=vchart
// Register all necessary content
VStory.registerAll();
// Need a simple bar chart
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
                      selector: ':not(bar)', // Other components use default animation
                      animation: { duration: 3000 }
                    },
                    {
                      selector: 'bar', // Bars use leap animation
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

### Basic Components (Image, Line, Rect, Shape, Text)

The interface definition of component types is as follows, where basic components (Image, Line, Rect, Shape, Text) are configured directly based on the corresponding elements of VRender, configured in the graphic property:
- Image is based on VRender's [Image element](/vrender/option/Image)
- Line is based on VRender's [Line element](/vrender/option/Line)
- Rect is based on VRender's [Rect element](/vrender/option/Rect)
- Shape is based on VRender's [Symbol element](/vrender/option/Symbol)
- Text is based on VRender's [Text element](/vrender/option/Text)

The panel is an additional panel of the component, actually a [Rect element of VRender](/vrender/option/Rect), you can refer to the configuration of [Rect element of VRender](/vrender/option/Rect).
The text configuration is an additional configuration that each component has, it is a [Text element of VRender](/vrender/option/Text), you can refer to the configuration of [Text element of VRender](/vrender/option/Text).
Padding represents the padding between the panel and the content, representing the top, right, bottom, and left padding.

```ts
interface IComponentCharacterConfig extends ICharacterConfigBase {
  options: {
    // Configuration of the main element
    graphic: any;
    // Panel configuration
    panel?: any;
    // Text configuration
    text?: any;
    // Padding
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}
```

An example of usage is as follows:

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
const text = {
  graphic: {
    text: '这是一个文本',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'red',
    textAlign: 'left',
    textBaseline: 'top'
  },
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
}
const line = {
  graphic: {
    stroke: 'red',
  }
}

const characterList = [
  { type: 'Rect', options: rect, effect: 'scale' },
  { type:'Text', options: text, effect: 'typewriter' },
  { type:'Image', options: image, effect: 'wipe' },
  { type:'Shape', options: shape, effect: 'clipRange' },
  { type:'Line', options: line, effect: 'clipRange' },
]

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

characterList.forEach((item, index) => {
  story.addCharacter({
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
  }, {
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
  });
})

player.play(1);
window.vstory = story;
window['story'] = story;
window['vstory'] = story;
```

### Timeline Component

The `Timeline` component is a timeline component that displays a complete sequence of time, as well as the flow of time. Its interface definition is as follows:
```ts

interface TimelineAttrs extends IGroupGraphicAttribute {
  width: number; // Width
  // height?: number;
  times: { label: string; desc?: string }[]; // Specific time sequence
  labelSpace?: number; // Spacing between labels
  symbolStyle?: Partial<ISymbolGraphicAttribute>; // Style of time points
  activeSymbolStyle?: Partial<ISymbolGraphicAttribute>; // Style of active time points
  lineStyle?: Partial<ILineGraphicAttribute>; // Style of timeline
  activeLineStyle?: Partial<ILineGraphicAttribute>; // Style of active timeline
  labelStyle?: Partial<ITextGraphicAttribute>; // Style of labels
  activeLabelStyle?: Partial<ITextGraphicAttribute>; // Style of active labels
  pointLayoutMode?: 'space-around' | 'space-between'; // Layout mode
  // Current progress
  clipRange?: number;
  animation?: boolean; // Whether to enable animation
}

interface ITimelineComponentAttributes extends IGroupGraphicAttribute {
  // Text configuration combined with rich text textConfig
  textStyle?: Partial<ITextGraphicAttribute & { textConfig: IRichTextAttribute['textConfig'] }>;
  graphic?: TimelineAttrs;
  /**
   * Inner padding
   */
  padding?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}
```

Usage example:
```javascript livedemo template=vstory
// Register all required content
VStory.registerAll();
// DSL configuration
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
        height: 100,
      },
      options: {
        graphic: {
          times: [
            { label: '1486', desc: '' },
            { label: '1644', desc: '' },
            { label: '1765', desc: '' },
            { label: '1786', desc: '' },
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
        },
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
                ...(new Array(5).fill(0).map((item, index) => {
                  return {
                    startTime: 3000 + index * 3100,
                    action: 'state',
                    payload: {
                      animation: {
                        duration: 3000,
                        effect: 'forward'
                      }
                    }
                  }
                }))
              ]
            }
          ]
        }
      ]
    }
  ],
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```

### Unit Component

The unit visualization component is a narrative way of transforming data into visual elements, allowing complex information to be intuitively displayed. By individualizing each data point, the audience can gain a deeper understanding of the real stories behind each data point. This method vividly depicts the process of data change through animation and time progression, while conveying multidimensional information through visual elements such as color and shape, enhancing emotional resonance. It not only enhances the readability of data but also makes it easy to share on social media, helping to increase public awareness of important social issues.

The interface definition of the `Unit` component is as follows:
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
   * Number of units represented by each symbol
   * @default 1
   */
  countPerSymbol?: number;

  /**
   * The gap between units, represented as a percentage of the unit's width and height.
   * The first value specifies the horizontal gap, and the second value specifies the vertical gap.
   * @default [0.5, 0.5]
   */
  gap?: [number, number];

  // Defines what style is from what range to what range
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

Usage example:
```javascript livedemo template=vstory
// Register all required content
VStory.registerAll();
// DSL configuration
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
                        },
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
