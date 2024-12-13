---
category: examples
group: infographic
title: Bar Chart Infographic(Left Right Layout)
keywords: templates, visualization, bar, left-right, comparison, horizon
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/bar-chart-leftRight.jpeg
---

# 信息图模板-柱状图（左右布局）

## 代码演示

```javascript livedemo template=vstory
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
              characterId: ['0', 'text-1', 'text-2'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 500
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
                      selector: ':not(bar)', // 其他组件使用默认动画就行
                      animation: { duration: 2000 }
                    },
                    {
                      selector: 'bar', // 柱子使用leap动画
                      animation: { duration: 2000, effect: 'barLeap', oneByOne: true, dimensionCount: 5 }
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
      id: '0',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 800,
        y: 0,
        width: 480,
        height: 720
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/cereal.jpeg'
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 800,
        height: 720
      },
      options: {
        spec: {
          type: 'bar',
          data: [
            {
              id: 'barData',
              values: [
                { type: 'Lucky Charms', energy: 555 },
                { type: 'Frosted Flaked', energy: 780 },
                { type: 'Fruit Loops', energy: 450 },
                { type: 'Special K', energy: 500 },
                { type: 'Honey Nut Cheerios', energy: 325 },
                { type: `Reese's Puffs`, energy: 150 }
              ]
            }
          ],
          xField: 'type',
          yField: 'energy',
          seriesField: 'type',
          color: ['#92CF9D', '#FAAA69', '#9095ca', '#b3d6fa', '#ef737a', '#fddb79'],
          label: {},
          legends: {
            visible: true,
            position: 'start',
            item: {
              padding: [4, 16, 0, 10],
              shape: {
                style: {
                  size: 24
                }
              },
              label: {
                style: {
                  fontSize: 24
                }
              }
            }
          },
          axes: [
            { orient: 'bottom', visible: false },
            { orient: 'left', visible: false }
          ]
        }
      }
    },
    {
      id: 'text-1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1040,
        y: 20,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          text: 'READY-TO-EAT',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bold',
          fill: '#5A3E36'
        }
      }
    },
    {
      id: 'text-2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1040,
        y: 100,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          text: 'CEREAL SALES',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bold',
          fill: '#FF8C00'
        }
      }
    }
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  background: '#ebecf0',
  scaleX: 0.5,
  scaleY: 0.5
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
