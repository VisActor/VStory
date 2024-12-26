---
category: examples
group: infographic
title: Bar Chart Horizontal
keywords: templates, visualization, bar, left-right, comparison, horizontal
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/bar-chart-horizontal.png
---

# Horizontal Bar Chart Infographic

## Code Demo

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
              characterId: ['bgImage', 'bg0', 'bg1'],
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
              characterId: ['title', 'chart', 'displayImage'],
              characterActions: [
                {
                  action: 'appear',
                  payload: [
                    {
                      animation: {
                        duration: 500,
                        easing: 'linear',
                        effect: 'wipe'
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
  characters: [
    {
      id: 'bgImage',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          background: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/bar-chart-horizontal-bg.png',
          blur: 20
        }
      }
    },
    {
      id: 'bg0',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 100,
        y: 100,
        width: 1080,
        height: 520
      },
      options: {
        graphic: {
          fill: '#1f1766',
          cornerRadius: 20,
          fillOpacity: 0.9
        }
      }
    },
    {
      id: 'bg1',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 100,
        y: 100,
        width: 1080,
        height: 70
      },
      options: {
        graphic: {
          fill: '#576cfd',
          cornerRadius: [20, 20, 0, 0],
          fillOpacity: 0.9
        }
      }
    },
    {
      id: 'title',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 640,
        y: 116,
        width: 1000,
        height: 100
      },
      options: {
        graphic: {
          text: 'Marketers create data visualizations regularly',
          textAlign: 'center',
          fontSize: 36,
          fontWeight: 'bold',
          fill: 'white'
        }
      }
    },
    {
      id: 'chart',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 120,
        y: 180,
        width: 900,
        height: 400
      },
      options: {
        spec: {
          type: 'bar',
          data: [
            {
              id: 'barData',
              values: [
                {
                  name: 'Every week',
                  value: 0.48
                },
                {
                  name: 'Evert month',
                  value: 0.37
                },
                {
                  name: 'Every few months',
                  value: 0.1
                },
                {
                  name: 'Once or twice a year',
                  value: 0.05
                }
              ]
            }
          ],
          direction: 'horizontal',
          xField: 'value',
          yField: 'name',
          bar: {
            style: {
              fill: datum => {
                return datum.value > 0.4 ? '#ffb035' : '#3eb2e7';
              }
            }
          },
          axes: [
            {
              orient: 'bottom',
              visible: false,
              max: 0.6
            },
            {
              orient: 'left',
              paddingInner: 0.6,
              domainLine: {
                visible: false
              },
              tick: {
                tickSize: 40,
                style: {
                  lineDash: [4, 4]
                }
              },
              label: {
                style: {
                  fontSize: 18,
                  fill: 'white',
                  fillOpacity: 0.9
                }
              }
            }
          ],
          label: {
            visible: true,
            formatMethod: value => `${Math.round(value * 100)}%`,
            style: {
              fontSize: 30,
              fontWeight: 'bold',
              stroke: false,
              dx: 20,
              fill: 'white'
            }
          }
          // padding: 100
        }
      }
    },
    {
      id: 'displayImage',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 700,
        y: 300,
        width: 340,
        height: 300
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/bar-chart-horizontal-image.png'
        }
      }
    }
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1280,
  height: 720,
  background: '#1c217e'
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
