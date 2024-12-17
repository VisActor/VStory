---
category: examples
group: infographic
title: Scatter Chart Infographic - Income and Obesity
keywords: templates, visualization, scatter
order: 1-0
cover: https://tosv.byted.org/obj/bit-cloud/vstory-infographic/preview/income_obesity.png
---

# 信息图模板-散点图：收入与肥胖率

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: ['bg', 'bg-cover'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000
                    }
                  }
                }
              ]
            },
            {
              characterId: ['text-1'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000,
                      effect: 'typewriter'
                    }
                  }
                }
              ]
            },
            {
              characterId: ['1'],
              characterActions: [
                {
                  action: 'appear',
                  payload: [
                    {
                      animation: { effect: 'grow' }
                    }
                  ]
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
      id: 'bg-cover',
      type: 'Rect',
      zIndex: -1,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          shadowBlur: 10,
          fill: 'rgba(28, 42, 69)',
          fillOpacity: 0.5,
          background: 'https://tosv.byted.org/obj/bit-cloud/vstory-infographic/resource/scatter-food.jpg'
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 150,
        y: 150,
        width: 1280 - 300,
        height: 720 - 200
      },
      options: {
        spec: {
          type: 'scatter',
          data: [
            {
              id: 'barData',
              values: [
                {
                  x: 42830,
                  y: 33.5
                },
                {
                  x: 71583,
                  y: 29.7
                },
                {
                  x: 50068,
                  y: 28.9
                },
                {
                  x: 41262,
                  y: 35.9
                },
                {
                  x: 61933,
                  y: 24.7
                },
                {
                  x: 61303,
                  y: 21.3
                },
                {
                  x: 70048,
                  y: 26.3
                },
                {
                  x: 59716,
                  y: 30.7
                },
                {
                  x: 71648,
                  y: 21.7
                },
                {
                  x: 47463,
                  y: 26.2
                },
                {
                  x: 49321,
                  y: 30.5
                },
                {
                  x: 69592,
                  y: 22.1
                },
                {
                  x: 47861,
                  y: 28.9
                },
                {
                  x: 57444,
                  y: 29.3
                },
                {
                  x: 49446,
                  y: 32.7
                },
                {
                  x: 53712,
                  y: 30.9
                },
                {
                  x: 52504,
                  y: 31.3
                },
                {
                  x: 42958,
                  y: 31.6
                },
                {
                  x: 44555,
                  y: 34.9
                },
                {
                  x: 49462,
                  y: 28.2
                },
                {
                  x: 73971,
                  y: 29.6
                },
                {
                  x: 69160,
                  y: 23.3
                },
                {
                  x: 49847,
                  y: 30.7
                },
                {
                  x: 61481,
                  y: 27.6
                },
                {
                  x: 39680,
                  y: 35.5
                },
                {
                  x: 48363,
                  y: 30.2
                },
                {
                  x: 46328,
                  y: 26.4
                },
                {
                  x: 52686,
                  y: 30.2
                },
                {
                  x: 51450,
                  y: 27.7
                },
                {
                  x: 66532,
                  y: 27.4
                },
                {
                  x: 71919,
                  y: 26.9
                },
                {
                  x: 44803,
                  y: 28.4
                },
                {
                  x: 58878,
                  y: 27
                },
                {
                  x: 46556,
                  y: 29.7
                },
                {
                  x: 59029,
                  y: 32.2
                },
                {
                  x: 49308,
                  y: 32.6
                },
                {
                  x: 47529,
                  y: 33
                },
                {
                  x: 51075,
                  y: 27.9
                },
                {
                  x: 53234,
                  y: 30.2
                },
                {
                  x: 54891,
                  y: 27
                },
                {
                  x: 45238,
                  y: 32.1
                },
                {
                  x: 50979,
                  y: 29.8
                },
                {
                  x: 44361,
                  y: 31.2
                },
                {
                  x: 53035,
                  y: 31.9
                },
                {
                  x: 60922,
                  y: 25.7
                },
                {
                  x: 54166,
                  y: 24.8
                },
                {
                  x: 64902,
                  y: 28.5
                },
                {
                  x: 61366,
                  y: 27.3
                },
                {
                  x: 41059,
                  y: 35.7
                },
                {
                  x: 52622,
                  y: 31.2
                },
                {
                  x: 57055,
                  y: 29.5
                }
              ]
            }
          ],
          xField: 'x',
          yField: 'y',
          point: {
            style: {
              fill: '#F7CC11',
              fillOpacity: 1
            }
          },
          size: 10,
          padding: 0,
          axes: [
            {
              orient: 'bottom',
              visible: true,
              type: 'linear',
              domainLine: {
                visible: true,
                style: {
                  strokeOpacity: 0.5
                }
              },
              grid: { visible: false },
              zero: false,
              title: {
                visible: true,
                text: 'Income',
                space: 50,
                style: {
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fill: '#FF8C00'
                }
              }
            },
            {
              orient: 'left',
              visible: true,
              type: 'linear',
              domainLine: {
                visible: true,
                style: {
                  strokeOpacity: 0.5
                }
              },
              nice: true,
              tick: {
                visible: true,
                tickCount: 8,
                style: {
                  strokeOpacity: 0.5
                }
              },
              label: {
                formatMethod: v => {
                  return `${v}%`;
                }
              },
              grid: { visible: false },
              zero: false,
              title: {
                visible: true,
                text: 'Obesity (% Body Fat)',
                space: 50,
                style: {
                  textAlign: 'center',
                  textBaseline: 'middle',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fill: '#FF8C00'
                }
              }
            }
          ]
        }
      }
    },
    {
      id: 'text-1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1280 / 2,
        y: 50,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: 'Income & Obesity',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bolder',
          fill: '#F8CC19'
        }
      }
    }
  ]
};

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 0.7,
  scaleY: 0.7
});
const player = new VStory.Player(story);
story.init(player);
player.play(-1);
window['story'] = story;
window['vstory'] = story;
```
