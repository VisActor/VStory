import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';

registerAll();
export const Infographic = () => {
  const id = 'Infographic';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
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
                  characterId: ['0', '1', '2', 'rect', 'icon'],
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
            width: 1280,
            height: 720
          },
          options: {
            graphic: {
              image:
                'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/singleArea-leftRight.png'
            }
          }
        },
        {
          id: 'rect',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 283,
            y: 0,
            width: 997,
            height: 720
          },
          options: {
            graphic: {
              fill: 'black',
              fillOpacity: 0.7
            }
          }
        },
        {
          id: '1',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 320,
            y: 186,
            width: 900,
            height: 540
          },
          options: {
            spec: {
              type: 'common',
              animation: false,
              series: [
                {
                  type: 'line',
                  xField: ['_editor_dimension_field', '_editor_type_field'],
                  yField: '_editor_value_field',
                  seriesField: '_editor_type_field',
                  direction: 'vertical',
                  stack: true,
                  dataId: '0',
                  line: {
                    style: {
                      curveType: 'monotone'
                    }
                  },
                  label: {
                    visible: true,
                    formatter: `{_editor_value_field} hrs`,
                    style: { stroke: false, fill: 'white', fontSize: 18 }
                  }
                }
              ],
              legends: [
                {
                  orient: 'bottom',
                  position: 'middle',
                  visible: true,
                  item: {
                    shape: {
                      style: {
                        size: 14,
                        symbolType:
                          'M 4.08 0.62 H 2.55 c -0.23 1.14 -1.23 2 -2.43 2 S -2.09 1.76 -2.32 0.62 H -3.86 c -0.27 0 -0.5 -0.22 -0.5 -0.5 c 0 -0.28 0.22 -0.5 0.5 -0.5 H -2.32 c 0.23 -1.14 1.23 -2 2.43 -2 s 2.2 0.86 2.43 2 H 4.08 c 0.27 0 0.5 0.22 0.5 0.5 c 0 0.28 -0.22 0.5 -0.5 0.5 z M 0.11 -1.38 c -0.82 0 -1.49 0.67 -1.49 1.5 s 0.67 1.5 1.49 1.5 S 1.6 0.95 1.6 0.12 s -0.67 -1.5 -1.49 -1.5 z'
                      }
                    },
                    label: {
                      style: { fill: '#F14C44' }
                    }
                  }
                }
              ],
              data: [
                {
                  id: '0',
                  values: [
                    {
                      _editor_dimension_field: 'A',
                      _editor_value_field: 2.5,
                      _editor_type_field: 'Time taken (in hours)'
                    },
                    {
                      _editor_dimension_field: 'B',
                      _editor_value_field: 1.5,
                      _editor_type_field: 'Time taken (in hours)'
                    },
                    {
                      _editor_dimension_field: 'C',
                      _editor_value_field: 3.3,
                      _editor_type_field: 'Time taken (in hours)'
                    },
                    {
                      _editor_dimension_field: 'D',
                      _editor_value_field: 4.2,
                      _editor_type_field: 'Time taken (in hours)'
                    },
                    {
                      _editor_dimension_field: 'E',
                      _editor_value_field: 3.7,
                      _editor_type_field: 'Time taken (in hours)'
                    }
                  ]
                }
              ],
              color: ['#F14C44'],
              axes: [
                {
                  label: {
                    visible: true,
                    style: {
                      fill: 'white',
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      underline: 0
                    }
                  },
                  domainLine: {
                    visible: true,
                    style: { strokeOpacity: 0.5 }
                  },
                  tick: { visible: false },
                  orient: 'bottom',
                  paddingInner: 0
                },
                {
                  label: {
                    visible: true,
                    style: {
                      fill: 'white',
                      fontSize: 11,
                      fontWeight: 'normal',
                      fontStyle: 'normal',
                      underline: 0
                    }
                  },
                  grid: { visible: false },
                  domainLine: {
                    visible: true,
                    style: { strokeOpacity: 0.5 }
                  },
                  tick: { visible: false },
                  orient: 'left'
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
            x: 320,
            y: 60,
            width: 60,
            height: 60
          },
          options: {
            graphic: {
              fill: 'white',
              symbolType: `<svg t="1732698660653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4317" width="200" height="200"><path d="M348.32 790.976a53.856 53.856 0 0 1-38.816-15.488 72.416 72.416 0 0 1-19.68-44.704l-76.48 9.28a126.56 126.56 0 0 0 42.72 84.224 135.904 135.904 0 0 0 92.8 32.192 136.608 136.608 0 0 0 98.752-38.24 123.84 123.84 0 0 0 39.648-92.544 98.752 98.752 0 0 0-21.248-63.84 96 96 0 0 0-56.64-34.016 93.984 93.984 0 0 0 30.368-155.264 122.56 122.56 0 0 0-93.376-37.12 143.584 143.584 0 0 0-61.44 12.8 103.456 103.456 0 0 0-42.784 35.168 162.816 162.816 0 0 0-22.912 59.744l72.832 12.384a66.048 66.048 0 0 1 17.44-41.056 47.616 47.616 0 0 1 34.592-14.08 42.592 42.592 0 0 1 45.28 45.568 49.568 49.568 0 0 1-16.864 39.232 69.28 69.28 0 0 1-48.96 13.92l-8.704 64.416a137.888 137.888 0 0 1 36.288-5.888 51.104 51.104 0 0 1 39.104 17.408 67.104 67.104 0 0 1 16 47.264 71.968 71.968 0 0 1-16.704 50.048 53.312 53.312 0 0 1-41.216 18.56z m321.76 65.504a112.48 112.48 0 0 0 93.376-42.176q40.48-51.2 40.48-168.192 0-117.28-40.192-167.904a112.64 112.64 0 0 0-93.664-42.752 112.48 112.48 0 0 0-93.376 42.208q-40.512 51.2-40.512 167.616 0 118.688 36.864 164.96a117.984 117.984 0 0 0 97.024 46.24z m-43.04-313.6a61.376 61.376 0 0 1 17.44-32.736 39.488 39.488 0 0 1 25.6-9.152 38.944 38.944 0 0 1 25.44 9.152 71.072 71.072 0 0 1 18.432 36.256 448.608 448.608 0 0 1 7.296 99.712 447.936 447.936 0 0 1-8.128 102.944 61.344 61.344 0 0 1-17.44 32.768 40.448 40.448 0 0 1-51.072 0.128 70.08 70.08 0 0 1-18.4-36.16 448.64 448.64 0 0 1-7.328-99.68 451.936 451.936 0 0 1 8.16-103.2zM751.552 198.4a32 32 0 0 0 32-32V32a32 32 0 0 0-64 0v134.4a32 32 0 0 0 32 32z m-479.104 0a32 32 0 0 0 32-32V32a32 32 0 0 0-64 0v134.4a32 32 0 0 0 32 32z" fill="white" p-id="4318"></path><path d="M984.96 66.912H847.552v64H960v140.896H64V130.88h112.448v-64H39.04A39.104 39.104 0 0 0 0 105.952V984.96A39.104 39.104 0 0 0 39.04 1024h945.92a39.104 39.104 0 0 0 39.04-39.04V105.984a39.104 39.104 0 0 0-39.04-39.04zM960 960H64V335.808h896z" fill="#F14C44" p-id="4319"></path><path d="M368.448 66.912h287.104v64H368.448z" fill="#F14C44" p-id="4320"></path></svg>`
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
              text: 'Project Timeline Breakdown',
              textAlign: 'left',
              fontSize: 36,
              fill: 'white'
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
