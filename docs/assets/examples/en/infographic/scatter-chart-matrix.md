---
category: examples
group: infographic
title: Scatter Chart Infographic - Eurovision Winners
keywords: templates, visualization, scatter, rank, top-bottom
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/eurovision-winner.png
---

# Scatter Chart Infographic: Eurovision Winners

## Code Demo

```javascript livedemo template=vstory
VStory.registerAll();
const dataRes = await fetch(
  'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/vision-winner.json'
);
const { data } = await dataRes.json();

const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: ['bg', 'Title', 'SubTitle', 'Data', 'PoweredBy'],
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
                  startTime: 500,
                  payload: [
                    {
                      animation: {
                        duration: 1000
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
      id: 'bg',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1280,
        height: 780
      },
      options: {
        graphic: {
          fill: 'rgb(0,3,42)'
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 0,
        y: 160,
        width: 1280,
        height: 580
      },
      options: {
        spec: {
          type: 'common',
          background: 'red',
          padding: { right: 20, top: 2, left: 5 },
          series: [
            {
              type: 'scatter',
              xField: 'Year',
              yField: 'To country1',
              sizeField: 'Points',
              size: [2, 14],
              point: {
                style: {
                  fill: data => (data.display1 === 'Winner' ? 'rgb(19,150,202)' : 'rgb(144,138,143)'),
                  fillOpacity: 1
                }
              }
            }
          ],
          crosshair: {
            yField: {
              visible: false
            },
            xField: {
              visible: false
            }
          },
          data: [
            {
              id: 'data',
              values: data,
              fields: {
                'To country1': {
                  lockStatisticsByDomain: true,
                  domain: [
                    'Sweden',
                    'Italy',
                    'France',
                    'United Kingdom',
                    'Ukraine',
                    'Norway',
                    'Israel',
                    'Switzerland',
                    'Ireland',
                    'Germany',
                    'Russia',
                    'Greece',
                    'Spain',
                    'The Netherlands',
                    'Denmark',
                    'Belgium',
                    'Portugal',
                    'Finland',
                    'Austria',
                    'Cyprus',
                    'Malta',
                    'Turkey',
                    'Iceland',
                    'Croatia',
                    'Azerbaijan',
                    'Estonia',
                    'Moldova',
                    'Serbia',
                    'Armenia',
                    'Australia',
                    'Romania',
                    'Luxembourg',
                    'Bulgaria',
                    'Lithuania',
                    'Bosnia & Herzegovina',
                    'Hungary',
                    'Poland',
                    'Latvia',
                    'Yugoslavia',
                    'Albania',
                    'Slovenia',
                    'Monaco',
                    'Georgia',
                    'Czech Republic',
                    'Serbia & Montenegro',
                    'F.Y.R. Macedonia',
                    'Belarus',
                    'North Macedonia',
                    'Netherlands',
                    'San Marino',
                    'Czechia',
                    'Montenegro',
                    'Slovakia',
                    'Morocco'
                  ]
                }
              }
            }
          ],
          axes: [
            {
              orient: 'left',
              type: 'band',
              sampling: false,
              inverse: true,
              label: { style: { fill: 'white', fontSize: 10 } },
              domainLine: { visible: false },
              tick: { visible: false },
              paddingOuter: 0
            },
            {
              orient: 'bottom',
              label: { style: { fill: 'white', fontSize: 10 } },
              domainLine: { style: { stroke: 'rgb(19,150,202)', strokeOpacity: 0.2 } },
              tick: { style: { stroke: 'rgb(19,150,202)', strokeOpacity: 0.2 } }
            }
          ],
          tooltip: {
            dimension: { visible: false }
          }
        }
      }
    },
    {
      id: 'Title',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 160,
        y: -30,
        width: 1000,
        height: 220
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/vision-title.png'
        }
      }
    },
    {
      id: 'SubTitle',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 360,
        y: 100,
        width: 600,
        height: 90
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/vision-sub-title.png'
        }
      }
    },
    {
      id: 'Data',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 100,
        y: 756,
        width: 200,
        height: 30
      },
      options: {
        graphic: {
          text: 'Data: eurovision.tv    Design: Frederic Fery',
          fill: 'white',
          fontSize: 10,
          textAlign: 'left'
        }
      }
    },
    {
      id: 'PoweredBy',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1260,
        y: 756,
        width: 200,
        height: 30
      },
      options: {
        graphic: {
          text: 'PoweredBy: VisActor@VStory',
          fill: 'white',
          fontSize: 10,
          textAlign: 'right'
        }
      }
    }
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 0.7,
  scaleY: 0.7
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
