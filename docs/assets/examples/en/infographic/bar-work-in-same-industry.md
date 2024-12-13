---
category: examples
group: infographic
title: Bar Chart Infographic
keywords: templates, visualization, bar, percentage
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/bar-work-in-same-industry.png
---

# Bar Chart Infographic: Industry Stability

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
              characterId: ['bg2', 'chart', 'icon', 'icon-border', 'title1', 'title2', 'line', 'line2'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1200,
                      effect: 'grow'
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
      id: 'bg2',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 816,
        height: 816
      },
      options: {
        graphic: {
          fill: '#F6F6F6',
          fillOpacity: 1
        }
      }
    },
    {
      id: 'chart',
      type: 'VChart',
      zIndex: 2,
      position: {
        x: 58,
        y: 286,
        width: 700,
        height: 447
      },
      options: {
        spec: {
          background: 'red',
          type: 'common',
          animation: true,
          direction: 'horizontal',
          series: [
            {
              type: 'bar',
              xField: ['v'],
              yField: 'name',
              seriesField: 'type',
              direction: 'horizontal',
              stack: true,
              percent: true,
              dataId: '0',
              label: {
                visible: false
              }
            }
          ],
          data: [
            {
              id: '0',
              values: [
                {
                  name: 'Architecture & Engineering',
                  v: 365,
                  type: 'stayed'
                },
                {
                  name: 'Architecture & Engineering',
                  v: 91,
                  type: 'not'
                },
                {
                  name: 'Installation Maintainance & Repair',
                  v: 342,
                  type: 'stayed'
                },
                {
                  name: 'Installation Maintainance & Repair',
                  v: 114,
                  type: 'not'
                },
                {
                  name: 'Computer Mathematical',
                  v: 296,
                  type: 'stayed'
                },
                {
                  name: 'Computer Mathematical',
                  v: 160,
                  type: 'not'
                },
                {
                  name: 'Production',
                  v: 273,
                  type: 'stayed'
                },
                {
                  name: 'Production',
                  v: 183,
                  type: 'not'
                },
                {
                  name: 'Business Operations',
                  v: 227,
                  type: 'stayed'
                },
                {
                  name: 'Business Operations',
                  v: 228,
                  type: 'not'
                },
                {
                  name: 'Arts, Design, Entertainment & Media',
                  v: 218,
                  type: 'stayed'
                },
                {
                  name: 'Arts, Design, Entertainment & Media',
                  v: 238,
                  type: 'not'
                },
                {
                  name: 'Management',
                  v: 204,
                  type: 'stayed'
                },
                {
                  name: 'Management',
                  v: 252,
                  type: 'not'
                },
                {
                  name: 'Office & Administrative Support',
                  v: 181,
                  type: 'stayed'
                },
                {
                  name: 'Office & Administrative Support',
                  v: 275,
                  type: 'not'
                },
                {
                  name: 'Community & Social Services',
                  v: 158,
                  type: 'stayed'
                },
                {
                  name: 'Community & Social Services',
                  v: 298,
                  type: 'not'
                },
                {
                  name: 'Personal Care',
                  v: 112,
                  type: 'stayed'
                },
                {
                  name: 'Personal Care',
                  v: 344,
                  type: 'not'
                },
                {
                  name: 'Education, Library & Training',
                  v: 112,
                  type: 'stayed'
                },
                {
                  name: 'Education, Library & Training',
                  v: 344,
                  type: 'not'
                },
                {
                  name: 'Financial Specialists',
                  v: 89,
                  type: 'stayed'
                },
                {
                  name: 'Financial Specialists',
                  v: 367,
                  type: 'not'
                },
                {
                  name: 'Transportation & Material Moving',
                  v: 80,
                  type: 'stayed'
                },
                {
                  name: 'Transportation & Material Moving',
                  v: 376,
                  type: 'not'
                },
                {
                  name: 'Healthcare Support',
                  v: 66,
                  type: 'stayed'
                },
                {
                  name: 'Healthcare Support',
                  v: 390,
                  type: 'not'
                },
                {
                  name: 'Sales & Related',
                  v: 43,
                  type: 'stayed'
                },
                {
                  name: 'Sales & Related',
                  v: 413,
                  type: 'not'
                }
              ]
            }
          ],
          color: ['#70BC3F', '#FFA54C'],
          axes: [
            {
              orient: 'bottom',
              visible: true,
              label: {
                visible: true,
                formatMethod: v => {
                  return v * 100;
                }
              },
              grid: {
                visible: true,
                style: {
                  stroke: 'gray',
                  strokeOpacity: 0.2
                }
              },
              tick: {
                visible: false
              },
              domainLine: {
                visible: false
              }
            },
            {
              label: {
                visible: true,
                style: {
                  fill: 'black'
                }
              },
              tick: {
                visible: false
              },
              domainLine: {
                visible: false
              },
              orient: 'left'
            }
          ],
          animationAppear: false
        }
      }
    },
    {
      id: 'icon',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 379,
        y: 143,
        width: 30,
        height: 30
      },
      options: {
        graphic: {
          fill: 'black',
          symbolType:
            '<svg t="1733995569523" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1024" xmlns:xlink="http://www.w3.org/1999/xlink" width="200.1953125" height="200"><path d="M942.976 981.76c56.896-56.384 56.896-147.712 0-204.032l-364.16-360.704-206.08 204.03199999 364.16 360.70400001C793.856 1038.144 886.08000001 1038.144 942.976 981.76zM574.336 539.456l24.512-24.32 308.032 305.02400001c6.72 6.65600001 6.71999999 17.536 0 24.38399999-6.72 6.65600001-17.728 6.656-24.512 0L574.336 539.456zM523.136 590.272L547.648 565.888l333.50399999 330.432c6.784 6.656 6.784 17.536 0.06400001 24.32-6.784 6.656-17.728 6.656-24.512-0.128L523.136 590.272zM471.872 641.024L496.384 616.64 804.352 921.6c6.784 6.656 6.71999999 17.536 0 24.256s-17.728 6.656-24.512 0L471.872 641.024z" fill="#040000" p-id="1025"></path><path d="M207.36 351.29600001L226.048 332.80000001 397.76 502.784 465.28 435.968 293.568 265.92 311.936 247.744 290.88 207.744 72.256 74.048 32 113.856 165.76 328.576Z" fill="#040000" p-id="1026"></path><path d="M992 227.904c0-19.584-2.752-38.4-7.424-56.512C982.976 173.184 981.76 175.296 979.968 176.96l-82.944 82.176c-42.24 41.856-110.848 41.856-153.088 0-42.24-41.856-42.24-109.76 1e-8-151.616L826.816 25.344C831.168 21.056 835.968 17.472 840.832 14.016 816.128 5.12 789.696 0 761.92 0 634.88 0 531.904 102.016 531.904 227.904c0 125.82400001 103.04 227.84 230.08 227.84C889.024 455.744 992 353.66399999 992 227.904z" fill="#040000" p-id="1027"></path><path d="M81.984 924.224c49.98400001 49.408 131.00799999 49.408 180.992 0l183.616-182.016-180.86400001-179.264-183.74399999 182.144C32.064 794.56 32.064 874.75199999 81.984 924.224zM204.672 802.752c20.672 20.48 20.672 53.632 0 74.112s-54.208 20.47999999-74.944 0c-20.608-20.48-20.608-53.632 0-74.112C150.52800001 782.272 184.00000001 782.272 204.672 802.752z" fill="#040000" p-id="1028"></path></svg>'
        }
      }
    },
    {
      id: 'icon-border',
      type: 'Shape',
      zIndex: 1,
      position: {
        x: 307,
        y: 73,
        width: 100,
        height: 100
      },
      options: {
        graphic: {
          fill: 'white',
          stroke: 'black',
          lineWidth: 2,
          symbolType: 'M1006.34 512L512 820.962 17.66 512 512 203.038 1006.34 512z'
        }
      }
    },
    {
      id: 'title1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 408,
        y: 35,
        width: 816,
        height: 100
      },
      options: {
        graphic: {
          textConfig: [
            {
              text: 'Staying in the'
            },
            {
              text: '\n'
            },
            {
              text: 'Same Line of Work'
            }
          ],
          textAlign: 'center',
          textBaseline: 'top',
          fontWeight: 'bold',
          fontSize: 40,
          fill: 'black'
        }
      }
    },
    {
      id: 'title2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 408,
        y: 223,
        width: 816,
        height: 100
      },
      options: {
        graphic: {
          textConfig: [
            {
              text: "Among those who switched jobs, here's ",
              fill: 'black'
            },
            {
              text: 'who stayed',
              fill: '#70BC3F'
            },
            {
              text: ' in',
              fill: 'black'
            },
            {
              text: '\n'
            },
            {
              text: 'the same area and'
            },
            {
              text: ' who did not',
              fill: '#FFA54C'
            },
            {
              text: '.'
            }
          ],
          textAlign: 'center',
          fontSize: 20,
          fill: 'black'
        }
      }
    },
    {
      id: 'line',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 58,
        y: 174,
        width: 300,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'black',
          lineWidth: 4,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 300,
              y: 0
            }
          ]
        }
      }
    },
    {
      id: 'line2',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 458,
        y: 174,
        width: 300,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'black',
          lineWidth: 4,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 300,
              y: 0
            }
          ]
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
