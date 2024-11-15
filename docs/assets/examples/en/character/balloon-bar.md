---
category: examples
group: character
title: balloon-bar
keywords: balloon-bar
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/rankingbar-preview.gif
---

# balloon-bar chart element

`balloon-bar` is a specially encapsulated chart element, which interprets data similarly to a bar chart, representing the size of data through height or width, making the comparison of different categories of data intuitive and easy to understand. However, its unique shape and animation effects make this chart more interesting, adding fun and appeal to the story in the narrative.
Set `type: 'ScatterBar'` to use this chart as a Character.

## Code demonstration

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const data = [{city:"北京",value:35},{city:"上海",value:30},{city:"广州",value:27},{city:"深圳",value:26},{city:"成都",value:15}]
const scatterBarOptions = {
  data: [
    {
      id: 'id0',
      values: data
    }
  ],
  rootConfig: {
    xField: 'city',
    yField: 'value'
  },
  panel: {
    fill: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowBlur: 10,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    cornerRadius: 8
  },
};
// dsl配置
const dsl = {
  characters: [
    {
      type: 'ScatterBar',
      id: 'throw-bar',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300,
      },
      options: scatterBarOptions
    },
    {
      type: 'ScatterBar',
      id: 'swing-bar',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300,
      },
      options: scatterBarOptions
    },
  ],
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'throw-bar-scene',
          actions: [
            {
              characterId: 'throw-bar',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: [
                    {
                      selector: ':not(scatter)',
                      animation: {
                        duration: 2000,
                        easing: 'linear'
                        // effect: 'fade'
                      }
                    },
                    {
                      selector: 'scatter',
                      animation: {
                        duration: 2000,
                        easing: 'linear',
                        effect: 'throwBounce',
                        oneByOne: true,
                        dimensionCount: 5,
                      }
                    }
                  ]
                },
                {
                  action: 'disappear',
                  startTime: 3000,
                  payload: {
                    animation: {
                      duration: 1000,
                      easing: 'linear'
                      // effect: 'fade'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'swing-bar-scene',
          actions: [
            {
              characterId: 'swing-bar',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: [
                    {
                      selector: ':not(scatter)',
                      animation: {
                        duration: 2000,
                        easing: 'linear'
                        // effect: 'fade'
                      }
                    },
                    {
                      selector: 'scatter',
                      animation: {
                        duration: 2000,
                        easing: 'linear',
                        effect: 'swing',
                        oneByOne: true,
                        dimensionCount: 5,
                      }
                    }
                  ]
                },
                {
                  action: 'disappear',
                  startTime: 3000,
                  payload: {
                    animation: {
                      duration: 1000,
                      easing: 'linear'
                      // effect: 'fade'
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
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
```
