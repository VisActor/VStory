---
category: examples
group: character
title: unit
keywords: unit
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit.gif
---

# Unit Visualization Component

`unit` is a unit visualization component. Unit visualization is a narrative way of transforming data into visual elements, which can intuitively display complex information. By individualizing each data point, the audience can understand the real story behind each data more deeply. This method uses animation and time lapse to vividly depict the process of data changes, while conveying multi-dimensional information through visual elements such as color and shape, enhancing emotional resonance. It not only improves the readability of data, but also is easy to share on social media, helping to increase public attention to important social issues.

Set `type: 'Unit'` to use this component as a Character.

## Code Demonstration

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
