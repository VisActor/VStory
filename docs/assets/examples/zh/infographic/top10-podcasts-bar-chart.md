---
category: examples
group: infographic
title: Top 10 Podcasts
keywords: templates, visualization, bar, left-right
order: 1-0
cover: https://tosv.byted.org/obj/bit-cloud/vstory-infographic/preview/chart.png
---

# 信息图模板-韦恩图

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
              characterId: ['0', '1', '2', 'rect', 'text1', 'text2', 'text3'],
              characterActions: [
                {
                  action: 'appear'
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
      id: 'text1',
      type: 'Text',
      zIndex: 10,
      position: {
        x: 640,
        y: 60
      },
      options: {
        graphic: {
          text: 'Podcast Industry Ranking Highlights',
          fontSize: 18,
          fill: '#FED694',
          textAlign: 'center'
        }
      }
    },
    {
      id: 'text2',
      type: 'Text',
      zIndex: 10,
      position: {
        x: 640,
        y: 95
      },
      options: {
        graphic: {
          text: 'Top 10 Podcast Publishers in US',
          fontSize: 36,
          fill: '#FFF',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      }
    },
    {
      id: 'text3',
      type: 'Text',
      zIndex: 10,
      position: {
        x: 640,
        y: 150
      },
      options: {
        graphic: {
          text: 'OCTOBER 2019',
          fontSize: 14,
          fill: '#FFF',
          textAlign: 'center'
        }
      }
    },
    {
      id: '0',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 321,
        y: 0,
        width: 638,
        height: 720
      },
      options: {
        graphic: {
          image: 'https://tosv.byted.org/obj/bit-cloud/vstory-infographic/resource/after-removebg-preview.png'
        }
      }
    },
    {
      id: 'rect',
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
          fill: 'rgb(132, 75, 163)',
          fillOpacity: 0.84
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 190,
        y: 200,
        width: 900,
        height: 480
      },
      options: {
        spec: {
          type: 'bar',
          color: [
            '#e1f3f9',
            '#a1d8e9',
            '#41b3ce',
            '#3e839b',
            '#399487',
            '#a8d9c4',
            '#e5f5f0',
            '#ffd694',
            '#ffb82b',
            '#e8a01b'
          ],
          label: {
            visible: true,
            position: 'top',
            style: {
              lineHeight: '100%',
              lineWidth: 0,
              fill: '#fff',
              fontSize: 12
            }
          },
          xField: '_editor_dimension_field',
          yField: '_editor_value_field',
          seriesField: '_editor_dimension_field',
          title: {
            id: 'chart_title',
            visible: false,
            // minWidth: '100%',
            verticalAlign: 'middle',
            align: 'center',
            textStyle: {
              fontSize: 36,
              fontWeight: 'bolder',
              fill: '#FFFFFF'
            },
            subtext: 'OCTOBER 2019',
            subtextStyle: {
              visible: true,
              fontSize: 14,
              textBaseline: 'middle',
              fill: '#FFFFFF',
              align: 'center'
            },
            text: 'Top 10 Podcast Publishers in US'
          },
          axes: [
            {
              orient: 'left',
              id: 'axis-left',
              type: 'linear',
              label: {
                autoLimit: false,
                style: {
                  fill: '#FFFFFF',
                  fontSize: 16
                },
                formatConfig: {
                  separator: true
                },
                _originStyle: {
                  fill: '#FFFFFF',
                  fontSize: 16
                }
              },
              domainLine: {
                visible: true,
                style: {
                  stroke: '#5f486f'
                }
              },
              tick: {
                visible: true,
                style: {
                  stroke: '#685874'
                }
              },
              grid: {
                visible: false,
                style: {
                  stroke: '#bbbfc4',
                  pickStrokeBuffer: 2
                }
              },
              autoIndent: false,
              maxWidth: null,
              maxHeight: null,
              min: '5000000',
              title: {
                style: {
                  background: null,
                  fill: '#FFFFFF'
                },
                text: ['Audience'],
                visible: true
              }
            },
            {
              orient: 'bottom',
              id: 'axis-bottom',
              type: 'band',
              label: {
                autoLimit: false,
                style: {
                  fill: '#1F2329',
                  fontSize: 16
                },
                formatConfig: {},
                visible: false,
                _originStyle: {
                  fill: '#1F2329',
                  fontSize: 16
                }
              },
              domainLine: {
                visible: true,
                style: {
                  stroke: '#5f486f'
                },
                onZero: true
              },
              tick: {
                visible: false,
                style: {
                  stroke: '#000000'
                }
              },
              grid: {
                visible: false,
                style: {
                  stroke: '#bbbfc4',
                  pickStrokeBuffer: 2
                }
              },
              autoIndent: false,
              maxWidth: null,
              maxHeight: null,
              trimPadding: false,
              paddingInner: [0.2, 0],
              paddingOuter: [0.2, 0],
              title: {
                style: {
                  fill: '#ffffff',
                  fontSize: 18,
                  fontStyle: '',
                  fontWeight: 'normal',
                  lineWidth: 1,
                  underline: 0
                },
                space: 30,
                text: ['Podcast Publisher'],
                visible: true
              }
            }
          ],
          data: [
            {
              id: '0',
              sourceKey: 'value',
              values: [
                {
                  _editor_dimension_field: 'NPR',
                  _editor_value_field: 25923000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'iHeartRadio',
                  _editor_value_field: 23672000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'PRX',
                  _editor_value_field: 11878000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'New York Times',
                  _editor_value_field: 11878000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'Wondery',
                  _editor_value_field: 10849000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'Barstool Sports',
                  _editor_value_field: 9211000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'ESPN',
                  _editor_value_field: 8054000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'WNTC Studios',
                  _editor_value_field: 6764000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'NBC News',
                  _editor_value_field: 6438000,
                  _editor_type_field: 'value'
                },
                {
                  _editor_dimension_field: 'This American Life/Serial',
                  _editor_value_field: 5678000,
                  _editor_type_field: 'value'
                }
              ],
              specField: {
                _editor_dimension_field: {
                  type: 'dimension',
                  order: 0
                },
                _editor_type_field: {
                  type: 'series',
                  order: 0
                },
                _editor_value_field: {
                  type: 'value',
                  order: 0
                }
              }
            }
          ]
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
