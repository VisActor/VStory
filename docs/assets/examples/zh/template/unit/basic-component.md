---
category: examples
group: template
title: ranking-bar
keywords: ranking-bar
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/rankingbar-preview.gif
---

# 单元可视化组件

## 代码演示

```javascript livedemo template=vstory
const spec = {
  characters: [
    {
      type: 'Rect',
      id: 'background-top',
      zIndex: 2,
      position: {
        top: 0,
        left: 0,
        width: 20,
        height: 20
      },
      options: {
        graphic: {
          fill: '#2D6BA0',
          stroke: false
        }
      }
    },
    {
      type: 'Unit',
      id: 'unit-test',
      zIndex: 2,
      position: {
        top: 0,
        left: 0,
        width: 1200,
        height: 1000
      },
      options: {
        graphic: {
          fill: '#f1f1f0',
          padding: {
            top: 100,
            bottom: 100,
            right: 50,
            left: 50
          },
          count: 250,
          styleFunc: index => {
            return index < 66 ? { symbolType: 'rect', fill: '#4e8ae0' } : { fill: '#f6c86d' };
          },
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
              characterId: 'background-top',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 0,
                  payload: {
                    animation: {
                      effect: 'move',
                      duration: 100
                    }
                  }
                }
              ]
            },
            {
              characterId: 'unit-test',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 1,
                  payload: {
                    animation: {
                      startIndex: 100,
                      style: { fill: '#6638f0' },
                      effect: 'style',
                      duration: 1000,
                      easing: 'linear',
                      stagger: {
                        enable: true
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          id: '2',
          actions: [
            {
              characterId: 'unit-test',
              characterActions: [
                {
                  action: 'style',
                  startTime: 1000,
                  payload: {
                    animation: {
                      style: { fill: '#4af2a1' },
                      effect: 'style',
                      duration: 5000,
                      easing: 'linear',
                      stagger: {
                        enable: true
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
  ]
};
const vstory = new VStory.Story(spec, { dom: CONTAINER_ID, playerOption: { scaleX: 1, scaleY: 1 } });
vstory.canvas.getStage().defaultLayer.scale(0.4, 0.4);

vstory.play(false);
window.vstory = vstory;
```
