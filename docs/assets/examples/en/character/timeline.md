---
category: examples
group: character
title: timeline
keywords: timeline
order: 1-0
cover: ttps://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/timeline.gif
---

# Timeline Component

`timeline` is a timeline component used to display the changes of events or data over time. It presents the order and time interval of different events clearly through linearly arranged time nodes, enabling the audience to intuitively understand the passage of time and its impact on the development of events. It has a good entrance animation and time progress animation, which can be controlled by forward and backward.
Set `type: 'Timeline'` to use this component as a Character.

## Code Demonstration

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
