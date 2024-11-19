---
category: examples
group: character
title: unit
keywords: unit
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit.gif
---

# 单元可视化组件

`unit`是单元可视化组件，单元可视化是一种将数据转化为视觉元素的叙事方式，能够直观地展示复杂信息。通过将每个数据点个体化，观众能更深入地理解每一个数据背后所代表的真实故事。这种方式利用动画和时间推移，生动地描绘数据变化的过程，同时通过颜色和形状等视觉元素传达多维度的信息，增强了情感共鸣。它不仅提升了数据的可读性，还易于在社交媒体上分享，有助于提高公众对重要社会问题的关注。

设置`type: 'Unit'`即可使用该组件作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// dsl配置
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
