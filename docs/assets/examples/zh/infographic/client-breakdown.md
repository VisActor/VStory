---
category: examples
group: infographic
title: Pie Chart Infographic(Client Breakdown)
keywords: templates, visualization, Pie, left-right, comparison, horizon
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/client-breakdown.png
---

# 信息图模板-饼图（客户端崩溃比例）

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
              characterId: [
                'rect1',
                'rect2',
                'rect3',
                '1',
                'image',
                'explosion',
                'text-1',
                'text-2',
                'text-3',
                'text-4',
                'text-5'
              ],
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
            }
          ]
        }
      ]
    }
  ],
  characters: [
    {
      id: 'rect1',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 432
      },

      options: {
        graphic: {
          fill: '#092828'
        }
      }
    },
    {
      id: 'rect2',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 432,
        width: 1280,
        height: 288
      },

      options: {
        graphic: {
          fill: 'white'
        }
      }
    },
    {
      id: 'rect3',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 80,
        y: 350,
        width: 200,
        height: 60
      },

      options: {
        graphic: {
          stroke: '#2c8a93',
          cornerRadius: 100
        }
      }
    },
    {
      id: 'text-1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 100,
        y: 80
      },
      options: {
        graphic: {
          text: 'PIE CHART',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: 30,
          fill: '#3aafb6'
        }
      }
    },
    {
      id: 'text-2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 100,
        y: 200
      },
      options: {
        graphic: {
          text: 'CLINET\nBREAKDOWN',
          textAlign: 'left',
          fontSize: 50,
          fill: '#b3c7c7'
        }
      }
    },
    {
      id: 'text-3',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 100,
        y: 360
      },
      options: {
        graphic: {
          text: 'by Country',
          textAlign: 'left',
          fontSize: 30,
          fill: '#ebf4f0'
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 40,
        y: 130,
        width: 1000,
        height: 550
      },
      options: {
        spec: {
          type: 'pie',
          data: [
            {
              id: 'id0',
              values: [
                { country: 'UNITED STATES', value: '40' },
                { country: 'CANADA', value: '10' },
                { country: 'UNITED KINGDOM', value: '25' },
                { country: 'OTHERS', value: '15' }
              ]
            }
          ],
          outerRadius: 1.1,
          valueField: 'value',
          categoryField: 'country',
          color: ['#f2f2f0', '#43c8ce', '#103d3d', '#b6c8c6'],
          legends: {
            visible: true,
            orient: 'left',
            position: 'end',
            width: 430,
            layout: 'horizontal',
            height: 200,
            item: {
              width: 210,
              height: 80,
              padding: 20,
              shape: {
                space: 20,
                style: {
                  symbolType: 'triangle',
                  size: 28
                }
              },
              label: {
                style: {
                  fontSize: 24,
                  textBaseline: 'middle',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal'
                }
              }
            }
          },
          label: {
            visible: true,
            position: 'inside',
            offsetRadius: -40,
            rotate: false,
            formatMethod: (label, data) => {
              return {
                type: 'rich',
                text: [
                  {
                    text: `${data.value}%`,
                    // fill: '#fff',
                    fontSize: 20,
                    fontWeight: 500,
                    stroke: false
                  }
                ]
              };
            }
          }
        }
      }
    },
    {
      id: 'explosion',
      type: 'Shape',
      zIndex: 0,
      position: {
        x: 1100,
        y: 380,
        width: 50,
        height: 50
      },
      options: {
        graphic: {
          fill: '#42c7cd',
          symbolType: `<svg t="1734002573675" class="icon" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14212" width="200" height="200"><path d="M399.36 334.506667L327.68 0l213.333333 273.066667 75.093334-203.093334 46.08 213.333334L846.506667 93.866667l-69.973334 302.08 254.293334 29.013333-259.413334 165.546667 221.866667 145.066666-249.173333-23.893333L851.626667 1024l-221.866667-232.106667-69.973333 128-71.68-165.546666L228.693333 972.8l81.92-310.613333-117.76 20.48 71.68-71.68L0 450.56l296.96 18.773333-88.746667-174.08 191.146667 39.253334z" fill="#42c7cd" p-id="14213"></path></svg>`
        }
      }
    },
    {
      id: 'text-4',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1100,
        y: 270
      },
      options: {
        graphic: {
          text: 'UNITED\nSTATES',
          textAlign: 'left',
          fontSize: 28,
          fontWeight: 'bold',
          fill: '#f0fbfc'
        }
      }
    },
    {
      id: 'text-5',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1120,
        y: 340
      },
      options: {
        graphic: {
          text: '40%',
          textAlign: 'left',
          fontSize: 40,
          fontWeight: 'bold',
          fill: '#42c7cd'
        }
      }
    },
    {
      id: 'image',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 1080,
        y: 10,
        width: 200,
        height: 70
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/logo_500_200_dark.png'
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
