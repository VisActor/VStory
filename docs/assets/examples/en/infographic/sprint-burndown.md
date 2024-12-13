---
category: examples
group: infographic
title: Line Chart Infographic ( Sprint-Burndown)
keywords: templates, visualization, line, trend
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/line-chart-sprint-burndown.png
---

# Line Chart Infographic: Sprint-Burndown

## Code Demo

```javascript livedemo template=vstory
// Register all necessary content
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
              characterId: ['0'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 200
                    }
                  }
                }
              ]
            },
            {
              characterId: ['2', 'icon'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 200,
                  payload: {
                    animation: {
                      duration: 200
                    }
                  }
                }
              ]
            },
            {
              characterId: ['rect'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      effect: 'scale',
                      duration: 200
                    }
                  }
                }
              ]
            },
            {
              characterId: ['1'],
              startTime: 500,
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000
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
      id: '0',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          image:
            'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/Sprint-Burndown-Chart-Templat.png'
        }
      }
    },
    {
      id: 'rect',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 100,
        y: 60,
        width: 1080,
        height: 600
      },

      options: {
        graphic: {
          fill: 'white',
          fillOpacity: 0.9,
          cornerRadius: 20
        },
        panel: {
          scaleCenter: [500, 300]
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 140,
        y: 200,
        width: 1000,
        height: 450
      },
      options: {
        spec: {
          type: 'line',
          data: {
            values: [
              { days: '1', effort: 'Baseline', value: 30 },
              { days: '1', effort: 'Remaining', value: 30 },

              { days: '2', effort: 'Baseline', value: 25 },
              { days: '2', effort: 'Remaining', value: 26 },

              { days: '3', effort: 'Baseline', value: 20 },
              { days: '3', effort: 'Remaining', value: 21 },

              { days: '4', effort: 'Baseline', value: 15 },
              { days: '4', effort: 'Remaining', value: 13 },

              { days: '5', effort: 'Baseline', value: 10 },
              { days: '5', effort: 'Remaining', value: 11 },

              { days: '6', effort: 'Baseline', value: 5 },
              { days: '6', effort: 'Remaining', value: 6 }
            ]
          },
          xField: 'days',
          yField: 'value',
          seriesField: 'effort',
          line: {
            style: {
              curveType: 'monotone',
              curveness: 0.5,
              lineWidth: 2
            }
          },
          point: {
            style: {
              stroke: false,
              strokeWidth: 0,
              shape: 'circle',
              size: 12
            }
          },
          color: {
            field: 'effort',
            type: 'ordinal',
            range: ['#f66e59', '#fbc804'],
            specified: {},
            domain: ['Baseline', 'Remaining']
          },
          legends: [
            {
              visible: true,
              orient: 'right',
              item: {
                label: {
                  style: { fontSize: 16, fontWeight: 'bold' }
                },
                shape: {
                  style: {
                    size: 26
                  }
                }
              }
            }
          ],
          axes: [
            {
              orient: 'left',
              type: 'linear',
              tick: {
                visible: true,
                tickCount: 6
              },
              label: {
                style: {
                  fill: '#000',
                  fontSize: 16
                }
              },
              domainLine: {
                visible: true,
                style: {
                  stroke: '#000'
                }
              },
              grid: {
                visible: true,
                style: {
                  stroke: '#dddee2'
                }
              }
            },
            {
              orient: 'bottom',
              type: 'linear',

              label: {
                style: {
                  fill: '#000',
                  fontSize: 16
                }
              },
              min: 1,
              grid: {
                visible: true,
                style: {
                  stroke: '#dddee2'
                }
              },

              domainLine: {
                visible: true,
                style: {
                  stroke: '#000'
                }
              }
            }
          ]
        }
      }
    },
    {
      id: 'icon',
      type: 'Shape',
      zIndex: 0,
      position: {
        x: 360,
        y: 60,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: '#f9c906',
          symbolType: `<svg t="1733989330275" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7539" width="200" height="200"><path d="M419.413333 375.04L341.333333 403.456V554.666667H256V343.466667h0.64l224.768-81.834667c10.410667-3.968 21.76-5.973333 33.365333-5.589333a111.616 111.616 0 0 1 103.552 77.653333c7.936 24.874667 15.189333 41.685333 21.76 50.432A212.992 212.992 0 0 0 810.666667 469.333333v85.333334a298.069333 298.069333 0 0 1-230.485334-108.672l-29.738666 168.789333L640 689.92V981.333333h-85.333333v-251.648l-96.853334-81.237333-31.018666 176.085333-294.144-51.84 14.848-84.053333 210.090666 37.034667L419.413333 375.04zM576 234.666667a85.333333 85.333333 0 1 1 0-170.666667 85.333333 85.333333 0 0 1 0 170.666667z" fill="#f9c906" p-id="7540"></path></svg>`
        }
      }
    },
    {
      id: '2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 450,
        y: 100,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          text: 'SPRINT BURNDOWN',
          textAlign: 'left',
          fontSize: 46,
          fontWeight: 'bold',
          fill: '#ed6b56'
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
