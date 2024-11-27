# How to Reference VStory in Your Project

In the [How to Get VStory](./How_to_Get_VStory) section, we introduced how to get VStory. This section will explain how to reference VStory under these acquisition methods.

## CDN Usage

After we get the VStory file from [cdn](./How_to_Get_VStory#cdn-获取), we can add it to the `<script>` tag in the HTML file:

**Note: When using the CDN method to import, pay attention to the way VStory is referenced:**

`const story = new VStory.story(dsl, { dom: 'chart' });`

```html
<body>
  <div id="chart" style="outline: solid red 1px; width: 100%; height: 500px"></div>
</body>
<!-- Import VStory -->
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>

<script>
  // Register all content
  VStory.registerAll();
  // Create a pie chart
  const spec = {
    type: 'pie',
    data: [
      {
        id: 'id0',
        values: [
          { type: 'oxygen', value: '46.60' },
          { type: 'silicon', value: '27.72' },
          { type: 'aluminum', value: '8.13' },
          { type: 'iron', value: '5' },
          { type: 'calcium', value: '3.63' },
          { type: 'sodium', value: '2.83' },
          { type: 'potassium', value: '2.59' },
          { type: 'others', value: '3.5' }
        ]
      }
    ],
    outerRadius: 0.8,
    valueField: 'value',
    categoryField: 'type',
    title: {
      visible: true,
      text: 'Surface element content statistics'
    },
    legends: {
      visible: true,
      orient: 'left'
    },
    label: {
      visible: true
    },
    tooltip: {
      mark: {
        content: [
          {
            key: datum => datum['type'],
            value: datum => datum['value'] + '%'
          }
        ]
      }
    }
  };
  // Create a DSL
  const dsl = {
    characters: [
      {
        type: 'VChart',
        id: '0',
        position: {
          top: 50,
          left: 50,
          width: 300,
          height: 300
        },
        options: {
          spec,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 8
          },
        }
      }
    ],
    acts: [
      {
        id: 'default-chapter',
        scenes: [
          {
            id:'scene0',
            actions: [
              {
                characterId: '0',
                characterActions: [
                  {
                    action: 'appear',
                    payload: {
                      animation: {
                        duration: 3000
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
  }

  // Create a vstory instance
  const story = new VStory.Story(dsl, { dom: 'chart', background: 'pink' });
  const player = new VStory.Player(story);
  story.init(player);

  player.play(0);

</script>
```

## NPM Usage

After we install `@visactor/vstory` into the project through the [npm](./How_to_Get_VStory#npm-获取) method, we can use it in the following way:

```ts
import { registerAll, Story, Player } from '@visactor/vstory';
// Register all content
registerAll();
const spec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: 'oxygen', value: '46.60' },
        { type: 'silicon', value: '27.72' },
        { type: 'aluminum', value: '8.13' },
        { type: 'iron', value: '5' },
        { type: 'calcium', value: '3.63' },
        { type: 'sodium', value: '2.83' },
        { type: 'potassium', value: '2.59' },
        { type: 'others', value: '3.5' }
      ]
    }
  ],
  outerRadius: 0.8,
  valueField: 'value',
  categoryField: 'type',
  title: {
    visible: true,
    text: 'Surface element content statistics'
  },
  legends: {
    visible: true,
    orient: 'left'
  },
  label: {
    visible: true
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  }
};

// Create a DSL
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        spec,
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        },
      }
    }
  ],
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id:'scene0',
          actions: [
            {
              characterId: '0',
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 3000
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
}

// Create a vstory instance
const story = new Story(dsl, { dom: 'chart', background: 'pink' });
const player = new Player(story);
story.init(player);

player.play(0);
```
