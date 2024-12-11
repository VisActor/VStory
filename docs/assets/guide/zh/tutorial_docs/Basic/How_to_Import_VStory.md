# 如何在项目中引用 VStory

在[如何获取 VStory](./How_to_Get_VStory)章节中我们介绍了获取 VStory 的方式，本章节会一一介绍这些获取方式下如何引用 VStory。

## cdn 使用

我们从 [cdn](./How_to_Get_VStory#cdn-获取) 获取到 VStory 文件后，就可以将其添加到 HTML 文件的 `<script>` 标签中：

** 说明：cdn 方式引入的时候，VStory 的引用方式需要注意：**

`const story = new VStory.story(dsl, { dom: 'chart' });`

```html
<body>
  <div id="chart" style="outline: solid red 1px; width: 100%; height: 500px"></div>
</body>
<!-- 引入 VStory -->
<script src="https://unpkg.com/@visactor/vstory/dist/index.min.js"></script>

<script>
  // 注册所有内容
  VStory.registerAll();
  // 创建饼图
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
  // 创建一个DSL
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

  // 创建 vstory 实例
  const story = new VStory.Story(dsl, { dom: 'chart', background: 'pink' });
  const player = new VStory.Player(story);
  story.init(player);

  player.play(0);

</script>
```

## npm 使用

我们通过 [npm](./How_to_Get_VStory#npm-获取) 的方式将 `@visactor/vstory` 安装到项目之后，就可以通过如下方式进行使用了：

```ts
import { registerAll, Story, Player } from '@visactor/vstory';
// 注册所有内容
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

// 创建一个DSL
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

// 创建 vstory 实例
const story = new Story(dsl, { dom: 'chart', background: 'pink' });
const player = new Player(story);
story.init(player);

player.play(0);
```
