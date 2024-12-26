import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';

registerAll();
export const NoStackArea = () => {
  const id = 'Infographic';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    canvas.width = 2000;
    canvas.height = 1000;
    container?.appendChild(canvas);
    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: ['0', '1', '2', '3', 'chart', '4'],
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
          id: '0',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 480,
            height: 720
          },
          options: {
            graphic: {
              image: 'https://tosv.byted.org/obj/bit-cloud/vstory-infographic/resource/BG.png'
            }
          }
        },
        {
          id: '1',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 142,
            y: 160,
            width: 196,
            height: 196
          },
          options: {
            graphic: {
              image: 'https://tosv.byted.org/obj/bit-cloud/vstory-infographic/resource/2.png'
            }
          }
        },
        {
          id: '2',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 250,
            y: 320
          },
          options: {
            graphic: {
              text: 'Market Share',
              fontSize: 60,
              fontWeight: 'bold',
              fill: '#fff'
            }
          }
        },
        {
          id: '3',
          type: 'Line',
          zIndex: 0,
          position: {
            x: 60,
            y: 390,
            width: 380
            // height: 560
          },
          options: {
            graphic: {
              stroke: '#F4D35E',
              lineWidth: 4,
              points: [
                { x: 0, y: 0 },
                { x: 380, y: 0 }
              ]
            }
          }
        },
        {
          id: '4',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 250,
            y: 400
          },
          options: {
            graphic: {
              text: 'Comparative report ',
              fontSize: 50,
              fontWeight: 'bold',
              fill: '#fff'
            }
          }
        },
        {
          id: 'chart',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 540,
            y: 140,
            width: 800,
            height: 540
          },
          options: {
            spec: {
              type: 'area',
              color: ['#5F1040', '#CD4157', '#FF7F51', '#F4D35E'],

              stack: false,
              xField: '_editor_dimension_field',
              yField: '_editor_value_field',
              seriesField: '_editor_type_field',
              point: {
                style: {
                  visible: false
                }
              },
              area: {
                style: {
                  curveType: 'monotone'
                }
              },
              legends: {
                id: 'legend-discrete',
                visible: true,
                autoPage: false,
                position: 'middle',
                maxWidth: 350,
                item: {
                  width: 160,
                  shape: {
                    style: {
                      size: 16
                    }
                  },
                  label: {
                    style: {
                      fill: '#666',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }
                  }
                }
              },
              axes: [
                {
                  orient: 'left',
                  id: 'axis-left',
                  type: 'linear',
                  label: {
                    style: {
                      fill: '#acacac',
                      fontWeight: 'bold'
                    },
                    space: 6
                  },
                  domainLine: {
                    visible: true,
                    style: {
                      stroke: '#e6e7e7'
                    }
                  },
                  tick: {
                    visible: true,
                    style: {
                      stroke: '#d5d5d6'
                    },
                    tickStep: 2,
                    tickSize: 3
                  },
                  grid: {
                    visible: true,
                    style: {
                      stroke: '#f8f8f8'
                    }
                  },
                  autoIndent: false,
                  maxWidth: null,
                  maxHeight: null,
                  title: {
                    visible: false
                  },
                  visible: true,
                  min: 2
                },
                {
                  orient: 'bottom',
                  id: 'axis-bottom',
                  type: 'band',
                  label: {
                    style: {
                      fill: '#acacac',
                      fontWeight: 'bold',
                      fontSize: 16
                    },
                    space: 6
                  },
                  domainLine: {
                    visible: true,
                    style: {
                      stroke: '#e6e7e7'
                    }
                  },
                  tick: {
                    visible: true,
                    style: {
                      stroke: '#d5d5d6'
                    }
                  },
                  grid: {
                    visible: true,
                    style: {
                      stroke: '#f8f8f8'
                    }
                  },

                  visible: true
                }
              ],
              data: {
                id: '0',
                sourceKey: 'Tall tale travels',
                values: [
                  {
                    _editor_dimension_field: '2019',
                    _editor_value_field: 18,
                    _editor_type_field: 'Tall tale travels'
                  },
                  {
                    _editor_dimension_field: '2020',
                    _editor_value_field: 22,
                    _editor_type_field: 'Tall tale travels'
                  },
                  {
                    _editor_dimension_field: '2021',
                    _editor_value_field: 23.5,
                    _editor_type_field: 'Tall tale travels'
                  },
                  {
                    _editor_dimension_field: '2022',
                    _editor_value_field: 26,
                    _editor_type_field: 'Tall tale travels'
                  },
                  {
                    _editor_dimension_field: '2023',
                    _editor_value_field: 28,
                    _editor_type_field: 'Tall tale travels'
                  },

                  {
                    _editor_dimension_field: '2019',
                    _editor_value_field: 10,
                    _editor_type_field: 'Worldly wanderer'
                  },
                  {
                    _editor_dimension_field: '2020',
                    _editor_value_field: 14,
                    _editor_type_field: 'Worldly wanderer'
                  },
                  {
                    _editor_dimension_field: '2021',
                    _editor_value_field: 14.8,
                    _editor_type_field: 'Worldly wanderer'
                  },
                  {
                    _editor_dimension_field: '2022',
                    _editor_value_field: 16.5,
                    _editor_type_field: 'Worldly wanderer'
                  },
                  {
                    _editor_dimension_field: '2023',
                    _editor_value_field: 18,
                    _editor_type_field: 'Worldly wanderer'
                  },
                  {
                    _editor_dimension_field: '2019',
                    _editor_value_field: 18,
                    _editor_type_field: 'Awesome abroad'
                  },
                  {
                    _editor_dimension_field: '2020',
                    _editor_value_field: 17,
                    _editor_type_field: 'Awesome abroad'
                  },
                  {
                    _editor_dimension_field: '2021',
                    _editor_value_field: 16,
                    _editor_type_field: 'Awesome abroad'
                  },
                  {
                    _editor_dimension_field: '2022',
                    _editor_value_field: 15,
                    _editor_type_field: 'Awesome abroad'
                  },
                  {
                    _editor_dimension_field: '2023',
                    _editor_value_field: 13,
                    _editor_type_field: 'Awesome abroad'
                  },
                  {
                    _editor_dimension_field: '2019',
                    _editor_value_field: 6,
                    _editor_type_field: 'Best venture'
                  },
                  {
                    _editor_dimension_field: '2020',
                    _editor_value_field: 8,
                    _editor_type_field: 'Best venture'
                  },
                  {
                    _editor_dimension_field: '2021',
                    _editor_value_field: 10,
                    _editor_type_field: 'Best venture'
                  },
                  {
                    _editor_dimension_field: '2022',
                    _editor_value_field: 8,
                    _editor_type_field: 'Best venture'
                  },
                  {
                    _editor_dimension_field: '2023',
                    _editor_value_field: 6,
                    _editor_type_field: 'Best venture'
                  }
                ]
              }
            }
          }
        }
      ]
    };
    const story = new Story(dsl, { canvas, width: 1280, height: 720, scaleX: 'auto', scaleY: 'auto' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
