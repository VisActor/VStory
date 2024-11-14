---
category: examples
group: character
title: timeline
keywords: timeline
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/rankingbar-preview.gif
---

# 时间轴组件

`timeline`是时间轴组件，用于展示事件或数据随时间的变化。它通过线性排列的时间节点，清晰地呈现出不同事件的发生顺序和时间间隔，使得观众能够直观地理解时间的流逝及其对事件发展的影响，有一个效果良好的入场动画，以及时间的进度动画，可以通过forward和backward进行控制。
设置`type: 'Timeline'`即可使用该组件作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// dsl配置
const dsl = {
  characters: [
    {
      type: 'Timeline',
      id: 'timeline',
      zIndex: 1,
      position: {
        top: 100,
        left: 0,
        width: 500,
        height: 100,
      },
      options: {
        graphic: {
          times: [
            { label: '1486', desc: '' },
            { label: '1644', desc: '' },
            { label: '1765', desc: '' },
            { label: '1786', desc: '' },
          ],
          labelStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          },
          activeSymbolStyle: {
            size: 20
          },
          activeLabelStyle: {
            fontSize: 22,
            fontWeight: 'bold'
          }
        },
      }
    }
  ],
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: 'timeline',
              characterActions: [
                {
                  startTime: 1000,
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 2000,
                      effect: 'default'
                    }
                  }
                },
                ...(new Array(5).fill(0).map((item, index) => {
                  return {
                    startTime: 3000 + index * 3100,
                    action: 'state',
                    payload: {
                      animation: {
                        duration: 3000,
                        effect: 'forward'
                      }
                    }
                  }
                }))
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
