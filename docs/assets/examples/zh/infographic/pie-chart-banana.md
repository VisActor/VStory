---
category: examples
group: infographic
title: Pie Chart Infographic(Banana Composition by Percentage)
keywords: templates, visualization, bar, percentage, horizontal
order: 1-0
cover: https://cdn.jsdelivr.net/gh/Eomnational/image/img/banana.jpg
---

# 信息图模板-饼图（香蕉成分占比）

## 代码演示

```javascript livedemo template=vstory
VStory.registerAll();
const spec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: 'Water', value: 60 },
        { type: 'Carbohydrates', value: 20 },
        { type: 'Sugar', value: 12 },
        { type: 'Fiber', value: 8 }
      ]
    }
  ],
  outerRadius: 0.8,
  innerRadius: 0.5,
  padAngle: 0.6,
  valueField: 'value',
  color: ['#36bfd4', '#1a949e', '#6e4c20', '#f3894c'],
  categoryField: 'type',
  pie: {
    style: {
      cornerRadius: 10
    },
    state: {
      hover: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      },
      selected: {
        outerRadius: 0.85,
        stroke: '#000',
        lineWidth: 1
      }
    }
  },
  legends: {
    visible: true,
    orient: 'right',
    padding: [20, 0, 0, 0],
    item: {
      width: 160,
      shape: {
        style: {
          symbolType: 'square'
        }
      },
      label: {
        style: {
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#000'
        }
      }
    }
  },
  label: {
    visible: true,
    formatMethod: (label, data) => {
      return {
        type: 'rich',
        text: [
          {
            text: `${data.value}%\n`,
            fill: 'rgba(0, 0, 0, 0.92)',
            fontSize: 16,
            fontWeight: 500,
            stroke: false
          },
          {
            text: data.type,
            fill: 'rgba(0, 0, 0, 0.55)',
            fontSize: 12,
            fontWeight: 400,
            stroke: false
          }
        ]
      };
    },
    style: {
      wordBreak: 'break-word',
      maxHeight: 50
    }
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
      id: 'image',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/Eomnational/image/img/pexels-vanessa-loring-5966630.jpg'
        }
      }
    },
    {
      type: 'VChart',
      id: '0',
      position: {
        x: (1280 - 1280 * 0.7) / 2,
        y: (720 - 720 * 0.7) / 2,
        width: 1280 * 0.7,
        height: 720 * 0.7
      },
      options: {
        spec,
        panel: {
          fill: 'rgba(255, 255, 255, 0.5)',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        }
      }
    },
    {
      id: 'title1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1280 / 2,
        y: 40,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: ['Banana Composition by Percentage'],
          textAlign: 'center',
          // 调整字体大小
          fontSize: 35,
          fontFamily: 'Roboto Light',
          fontWeight: 'bold',
          stroke: 'none',
          lineWidth: 0,
          // 调整字体颜色
          fill: '#000'
        }
      }
    },
    {
      id: 'title2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1280 / 2,
        y: 620,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: ['A banana a day, keeps you healthy!'],
          textAlign: 'center',
          // 调整字体大小
          fontSize: 35,
          // 使用系统默认的无衬线字体
          fontFamily: 'Roboto Light',
          fontWeight: 'bold',
          // 移除描边
          stroke: 'none',
          lineWidth: 0,
          // 调整字体颜色
          fill: '#fff'
        }
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
              characterId: ['0', 'title1', 'title2', 'image'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      startTime: 300,
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
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1280,
  height: 720
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
