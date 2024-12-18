---
category: examples
group: infographic
title: Scatter Chart Infographic - Suicide Rate by Age
keywords: templates, visualization, scatter
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/suicide_rate.png
---

# 信息图模板-散点图：年龄与自杀率

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
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
              characterId: ['bg', 'bg-cover', 'bg-blur'],
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
            },
            {
              characterId: ['text-1', 'text-2', 'text-3'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000,
                      effect: 'typewriter'
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
                      animation: { effect: 'grow', duration: 2000 }
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
      id: 'bg-cover',
      type: 'Rect',
      zIndex: -1,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          background: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/scatter-life.jpg'
        }
      }
    },
    {
      id: 'bg-blur',
      type: 'Rect',
      zIndex: -1,
      position: {
        x: (1280 - 1280 * 0.6) / 2,
        y: (720 - 720 * 0.6) / 2,
        width: 1280 * 0.6,
        height: 720 * 0.6
      },
      options: {
        graphic: {
          cornerRadius: 25,
          lineWidth: 2,
          fill: '#EFFAFB',
          fillOpacity: 0.8
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: (1280 - 1280 * 0.6) / 2,
        y: (720 - 720 * 0.6) / 2,
        width: 1280 * 0.6,
        height: 720 * 0.6
      },
      options: {
        spec: {
          type: 'scatter',
          data: [
            {
              id: 'barData',
              values: [
                {
                  Age: '10',
                  xxx_rate: '2.8',

                  Gender: 'F'
                },
                {
                  Age: '15',
                  xxx_rate: '14.2',

                  Gender: 'M'
                },
                {
                  Age: '15',
                  xxx_rate: '11',

                  Gender: 'M'
                },
                {
                  Age: '16',
                  xxx_rate: '11',

                  Gender: 'F'
                },
                {
                  Age: '17',
                  xxx_rate: '11',

                  Gender: 'M'
                },
                {
                  Age: '18',
                  xxx_rate: '11.5',

                  Gender: 'M'
                },
                {
                  Age: '19',
                  xxx_rate: '12',

                  Gender: 'M'
                },
                {
                  Age: '20',
                  xxx_rate: '14.2',

                  Gender: 'M'
                },
                {
                  Age: '20',
                  xxx_rate: '12.5',

                  Gender: 'M'
                },
                {
                  Age: '21',
                  xxx_rate: '14',

                  Gender: 'M'
                },
                {
                  Age: '22',
                  xxx_rate: '14',

                  Gender: 'F'
                },
                {
                  Age: '23',
                  xxx_rate: '14',

                  Gender: 'M'
                },
                {
                  Age: '24',
                  xxx_rate: '13.5',

                  Gender: 'M'
                },
                {
                  Age: '25',
                  xxx_rate: '18.4',

                  Gender: 'M'
                },
                {
                  Age: '25',
                  xxx_rate: '14.8',

                  Gender: 'M'
                },
                {
                  Age: '26',
                  xxx_rate: '14.8',

                  Gender: 'M'
                },
                {
                  Age: '27',
                  xxx_rate: '14.8',

                  Gender: 'F'
                },
                {
                  Age: '28',
                  xxx_rate: '15',

                  Gender: 'F'
                },
                {
                  Age: '29',
                  xxx_rate: '15.5',

                  Gender: 'F'
                },
                {
                  Age: '30',
                  xxx_rate: '18.4',
                  Gender: 'M'
                },
                {
                  Age: '30',
                  xxx_rate: '16',

                  Gender: 'F'
                },
                {
                  Age: '31',
                  xxx_rate: '16.8',

                  Gender: 'F'
                },
                {
                  Age: '32',
                  xxx_rate: '17',

                  Gender: 'F'
                },
                {
                  Age: '33',
                  xxx_rate: '17',

                  Gender: 'M'
                },
                {
                  Age: '34',
                  xxx_rate: '18',

                  Gender: 'F'
                },
                {
                  Age: '35',
                  xxx_rate: '17.4',

                  Gender: 'F'
                },
                {
                  Age: '35',
                  xxx_rate: '16.5',

                  Gender: 'F'
                },
                {
                  Age: '36',
                  xxx_rate: '16.8',

                  Gender: 'F'
                },
                {
                  Age: '37',
                  xxx_rate: '16.5',

                  Gender: 'M'
                },
                {
                  Age: '38',
                  xxx_rate: '16.8',

                  Gender: 'M'
                },
                {
                  Age: '39',
                  xxx_rate: '17',

                  Gender: 'M'
                },
                {
                  Age: '40',
                  xxx_rate: '17.4',

                  Gender: 'F'
                },
                {
                  Age: '40',
                  xxx_rate: '17.3',

                  Gender: 'M'
                },
                {
                  Age: '41',
                  xxx_rate: '18',

                  Gender: 'F'
                },
                {
                  Age: '42',
                  xxx_rate: '18.3',

                  Gender: 'M'
                },
                {
                  Age: '43',
                  xxx_rate: '18',

                  Gender: 'F'
                },
                {
                  Age: '44',
                  xxx_rate: '17',

                  Gender: 'F'
                },
                {
                  Age: '45',
                  xxx_rate: '18',

                  Gender: 'M'
                },
                {
                  Age: '45',
                  xxx_rate: '20',

                  Gender: 'M'
                },
                {
                  Age: '46',
                  xxx_rate: '20',

                  Gender: 'F'
                },
                {
                  Age: '47',
                  xxx_rate: '19.8',

                  Gender: 'M'
                },
                {
                  Age: '48',
                  xxx_rate: '20',

                  Gender: 'M'
                },
                {
                  Age: '49',
                  xxx_rate: '20.2',

                  Gender: 'M'
                },
                {
                  Age: '50',
                  xxx_rate: '18',

                  Gender: 'F'
                },
                {
                  Age: '50',
                  xxx_rate: '20.2',

                  Gender: 'M'
                },
                {
                  Age: '51',
                  xxx_rate: '19.8',

                  Gender: 'M'
                },
                {
                  Age: '52',
                  xxx_rate: '20',

                  Gender: 'F'
                },
                {
                  Age: '63',
                  xxx_rate: '19.5',

                  Gender: 'F'
                },
                {
                  Age: '54',
                  xxx_rate: '18',

                  Gender: 'M'
                },
                {
                  Age: '55',
                  xxx_rate: '16.9',

                  Gender: 'M'
                },
                {
                  Age: '55',
                  xxx_rate: '17',

                  Gender: 'M'
                },
                {
                  Age: '56',
                  xxx_rate: '17.5',

                  Gender: 'M'
                },
                {
                  Age: '57',
                  xxx_rate: '17.5',

                  Gender: 'F'
                },
                {
                  Age: '58',
                  xxx_rate: '18.5',

                  Gender: 'M'
                },
                {
                  Age: '59',
                  xxx_rate: '18.5',

                  Gender: 'F'
                },
                {
                  Age: '60',
                  xxx_rate: '16.9',

                  Gender: 'M'
                },
                {
                  Age: '60',
                  xxx_rate: '18.4',

                  Gender: 'M'
                },
                {
                  Age: '61',
                  xxx_rate: '18.5',

                  Gender: 'F'
                },
                {
                  Age: '62',
                  xxx_rate: '20',

                  Gender: 'F'
                },
                {
                  Age: '63',
                  xxx_rate: '19',

                  Gender: 'F'
                },
                {
                  Age: '64',
                  xxx_rate: '17',

                  Gender: 'F'
                },
                {
                  Age: '65',
                  xxx_rate: '14.5',

                  Gender: 'F'
                },
                {
                  Age: '65',
                  xxx_rate: '15.2',

                  Gender: 'F'
                },
                {
                  Age: '66',
                  xxx_rate: '15.2',

                  Gender: 'F'
                },
                {
                  Age: '67',
                  xxx_rate: '15.2',

                  Gender: 'F'
                },
                {
                  Age: '68',
                  xxx_rate: '15.5',

                  Gender: 'M'
                },
                {
                  Age: '69',
                  xxx_rate: '15.8',

                  Gender: 'F'
                },
                {
                  Age: '70',
                  xxx_rate: '14.5',

                  Gender: 'M'
                },
                {
                  Age: '70',
                  xxx_rate: '16',

                  Gender: 'M'
                },
                {
                  Age: '71',
                  xxx_rate: '16.5',

                  Gender: 'F'
                },
                {
                  Age: '72',
                  xxx_rate: '16.5',

                  Gender: 'M'
                },
                {
                  Age: '73',
                  xxx_rate: '16.5',

                  Gender: 'F'
                },
                {
                  Age: '74',
                  xxx_rate: '16.3',

                  Gender: 'F'
                },
                {
                  Age: '75',
                  xxx_rate: '18.4',

                  Gender: 'F'
                },
                {
                  Age: '75',
                  xxx_rate: '16.3',

                  Gender: 'M'
                },
                {
                  Age: '76',
                  xxx_rate: '16.3',

                  Gender: 'F'
                },
                {
                  Age: '77',
                  xxx_rate: '16.2',

                  Gender: 'F'
                },
                {
                  Age: '78',
                  xxx_rate: '16.3',

                  Gender: 'F'
                },
                {
                  Age: '79',
                  xxx_rate: '16.4',

                  Gender: 'M'
                },
                {
                  Age: '80',
                  xxx_rate: '18.4',

                  Gender: 'F'
                },
                {
                  Age: '80',
                  xxx_rate: '16.5',

                  Gender: 'F'
                },
                {
                  Age: '81',
                  xxx_rate: '16.4',

                  Gender: 'M'
                },
                {
                  Age: '82',
                  xxx_rate: '16.4',

                  Gender: 'F'
                },
                {
                  Age: '83',
                  xxx_rate: '16.3',

                  Gender: 'M'
                },
                {
                  Age: '84',
                  xxx_rate: '16.3',

                  Gender: 'M'
                },
                {
                  Age: '85',
                  xxx_rate: '20.9',
                  Gender: 'F'
                },
                {
                  Age: '85',
                  xxx_rate: '16.2',
                  Gender: 'F'
                }
              ]
            }
          ],
          xField: 'Age',
          yField: 'xxx_rate',
          seriesField: 'Gender',
          legends: {
            visible: true,
            orient: 'right',
            position: 'start',
            item: {
              label: {
                style: {
                  fill: '#588996'
                }
              }
            }
          },
          color: ['#138AAA', '#E18398'],
          point: {
            style: {
              fillOpacity: 1
            }
          },
          padding: 20,
          axes: [
            {
              orient: 'bottom',
              visible: true,
              type: 'linear',
              domainLine: {
                visible: true,
                style: {
                  stroke: 'gray',
                  strokeOpacity: 0.8
                }
              },
              label: {
                style: {
                  fill: '#3C859D',
                  fontWeight: 'bold'
                }
              },
              tick: {
                visible: true,
                tickCount: 16,
                style: {
                  stroke: 'gray',
                  strokeOpacity: 1
                }
              },
              grid: { visible: false },
              zero: false
            },
            {
              orient: 'left',
              visible: true,
              type: 'linear',
              domainLine: {
                visible: true,
                style: {
                  stroke: 'gray',
                  strokeOpacity: 0.8
                }
              },
              nice: true,
              tick: {
                visible: true,
                tickCount: 8,
                style: {
                  stroke: 'gray',
                  strokeOpacity: 1
                }
              },
              label: {
                style: {
                  fill: '#3C859D',
                  fontWeight: 'bold'
                },
                formatMethod: v => {
                  return `${v}`;
                }
              },
              grid: { visible: false },
              zero: false
            }
          ]
        }
      }
    },
    {
      id: 'text-1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1280 / 2,
        y: 50,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: 'Correlation of Suicide Rate and Age',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bolder',
          fill: '#FCFFFE'
        }
      }
    },
    {
      id: 'text-2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1280 / 2,
        y: 600,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: 'Age',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bolder',
          fill: '#FCFFFE'
        }
      }
    },
    {
      id: 'text-3',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 175,
        y: 720 / 2 - 50,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          text: 'Suicide \n Rate',
          textAlign: 'center',
          fontSize: 42,
          fontWeight: 'bolder',
          fill: '#FCFFFE'
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
  height: 720
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
