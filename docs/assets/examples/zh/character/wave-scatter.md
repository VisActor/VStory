---
category: examples
group: character
title: wave-scatter
keywords: wave-scatter
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/wave-scatter.gif
---

# wave-scatter图表元素

`wave-scatter`水波散点图是一种创新的可视化工具，其独特的设计和动态效果使得数据展示更加生动有趣。与传统的散点图相比，水波散点图的大小表达数据点之间的关系，而内部的水波动效果使得数据在视觉上更加生动，吸引了更多的注意力，增强了数据的传达效果。
设置`type: 'WaveScatter'`即可使用该图表作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const data = [{city:"北京",value:35},{city:"上海",value:30},{city:"广州",value:27},{city:"深圳",value:26},{city:"成都",value:15},{city:"杭州",value:19}, {city:"南京",value:12}]
// dsl配置
const dsl = {
  characters: [
    {
      type: 'WaveScatter',
      id: 'wave-scatter',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300,
      },
      options: {
        data: {
          values: data
        },
        categoryField: 'city',
        valueField: 'value',
        /* 水波动画的配置 */
        waveDuration: 2000,
        waveRatio: 0.0125,
        waveColor: '#0099ff',
        background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
        amplitude: 6,
        frequency: 2,
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        },
      }
    },
  ],
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'scene',
          actions: [
            {
              characterId: 'wave-scatter',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: [
                    {
                      animation: {
                        duration: 2000,
                        easing: 'linear'
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
  ],
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, width: 400, height: 400, scaleX: 'auto', scaleY: 'auto', background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
