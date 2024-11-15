---
category: examples
group: arrange
title: vchart-arrange
keywords: vchart-arrange
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/rankingbar-preview.gif
---

# Vchart Animation Arrangement

The `VChart` chart component can refer to [VChart chart elements](/vstory/examples/character/vchart) is a general Character element that can configure any VChart spec. So after configuring a VChart spec, we can control the animation effects of different components, series, axes, legends, etc. of the chart based on the animation arrangement capabilities of VStory.
In this demo, we will demonstrate the continuous lifecycle of VChart entering -> updating -> exiting.

## Code Demonstration

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const spec = {
  type: 'bar',
  data: [
    {
      id: 'data',
      values: [
        {
          x: '1',
          y: 100,
          type: 'Category1'
        },
        {
          x: '2',
          y: 100,
          type: 'Category1'
        },
        {
          x: '3',
          y: 100,
          type: 'Category1'
        },
        {
          x: '4',
          y: 100,
          type: 'Category1'
        },
        {
          x: '1',
          y: 100,
          type: 'Category2'
        },
        {
          x: '2',
          y: 100,
          type: 'Category2'
        },
        {
          x: '3',
          y: 100,
          type: 'Category2'
        },
        {
          x: '4',
          y: 100,
          type: 'Category2'
        }
      ]
    }
  ],
  xField: ['x', 'type'],
  yField: 'y',
  seriesField: 'type',
  axes: [
    {
      orient: 'bottom',
      bandPadding: 0,
      paddingInner: 0,
      paddingOuter: 0,
      tick: { visible: false },
      label: { visible: false },
      grid: { visible: false }
    },
    {
      orient: 'left',
      tick: { visible: false },
      label: { visible: false },
      grid: { visible: false }
    }
  ],
  color: ['#4CC9E4', '#4954E6']
};

const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: '0',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: {
                    animation: {
                      duration: 1000,
                      easing: 'cubicOut',
                      fade: {
                        opacity: 1,
                        easing: 'linear'
                      }
                    }
                  }
                },
                {
                  action: 'update',
                  startTime: 1500,
                  payload: {
                    id: 'data',
                    duration: 1000,
                    data: [
                      {
                        x: '1',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '2',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '3',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '4',
                        y: 100,
                        type: 'Category1'
                      }
                    ].map((v, index) => {
                      return {
                        sourceValue: v,
                        targetValue: {
                          ...v,
                          y: (index + 1) * 10
                        }
                      };
                    })
                  }
                },
                {
                  action: 'update',
                  startTime: 3500,
                  payload: {
                    duration: 1000,
                    id: 'data',
                    data: [
                      {
                        x: '1',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '2',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '3',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '4',
                        y: 100,
                        type: 'Category2'
                      }
                    ]
                      .slice(0, 4)
                      .map((v, index) => {
                        return {
                          sourceValue: v,
                          targetValue: {
                            ...v,
                            y: (index + 1) * 10
                          }
                        };
                      })
                  }
                },
                {
                  action: 'update',
                  startTime: 5500,
                  payload: {
                    id: 'data',
                    duration: 1000,
                    data: [
                      {
                        x: '1',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '2',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '3',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '4',
                        y: 100,
                        type: 'Category1'
                      },
                      {
                        x: '1',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '2',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '3',
                        y: 100,
                        type: 'Category2'
                      },
                      {
                        x: '4',
                        y: 100,
                        type: 'Category2'
                      }
                    ].map((v, index) => {
                      return {
                        sourceValue: {
                          ...v,
                          y: ((index % 4) + 1) * 10
                        },
                        targetValue: {
                          ...v,
                          y: 100
                        }
                      };
                    })
                  }
                },
                {
                  action: 'disappear',
                  startTime: 6500,
                  payload: {
                    animation: {
                      easing: 'cubicInOut',
                      duration: 1000,
                      fade: {
                        opacity: 0.1,
                        isBaseOpacity: true
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  characters: [
    {
      type: 'VChart',
      id: `0`,
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
          shadowOffsetY: 4,
          cornerRadius: 8
        },
        spec
      }
    }
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window.vstory = story;
```
