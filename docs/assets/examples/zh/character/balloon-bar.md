---
category: examples
group: character
title: balloon-bar
keywords: balloon-bar
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/balloon-bar.gif
---

# balloon-bar图表元素

`balloon-bar`是一种特殊封装的图表元素，其对数据的解释作用和柱状图类似，通过高度或来表示数据的大小，使得比较不同类别的数据变得直观易懂。但是其特殊的形态以及动画效果使得该图表更有意思，在叙事中增加故事的趣味性和吸引力。
设置`type: 'ScatterBar'`即可使用该图表作为Character。

## 代码演示

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
