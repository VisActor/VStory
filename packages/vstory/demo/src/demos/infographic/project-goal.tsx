import React, { useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';

registerAll();
export const ProjectGoal = () => {
  const id = 'ProjectGoal';
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

              // characterId: [
              //   'background',
              //   'leftRect',
              //   'topArrow',
              //   'topText',
              //   'leftIcon',
              //   'leftTitle',
              //   'leftMiddleLine',
              //   'leftContent',
              //   'gaugeChart',
              //   'targetText'
              // ],
              actions: [
                {
                  characterId: ['background', 'leftRect'],
                  characterActions: [
                    {
                      action: 'appear'
                    }
                  ]
                },

                {
                  characterId: ['topArrow', 'topText'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: [
                        {
                          animation: {
                            duration: 400,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['leftIcon', 'leftTitle', 'leftMiddleLine'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 400,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['leftContent'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 600,
                      payload: [
                        {
                          animation: {
                            duration: 400,
                            easing: 'linear',
                            effect: 'move'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['gaugeChart'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1000
                    }
                  ]
                },

                {
                  characterId: ['targetText'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1000,
                      payload: [
                        {
                          animation: {
                            duration: 400,
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
          id: 'background',
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
              image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/goal.jpeg'
            }
          }
        },
        {
          id: 'leftRect',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 500,
            height: 720
          },
          options: {
            graphic: {
              fill: '#b66777',
              fillOpacity: 1
            }
          }
        },
        {
          id: 'topArrow',
          type: 'Line',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 1178,
            height: 172
          },
          options: {
            graphic: {
              points: [
                { x: 0, y: 0 },
                { x: 1124, y: 0 },
                { x: 1178, y: 86 },
                { x: 1124, y: 172 },
                { x: 0, y: 172 },
                { x: 0, y: 0 }
              ],
              fill: '#f2f2f0'
            }
          }
        },
        {
          id: 'topText',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 56,
            y: 58,
            width: 1124,
            height: 172
          },
          options: {
            graphic: {
              text: 'Project Goal Completion Status Report',
              fill: '#375470',
              fontSize: 58,
              textAlign: 'left',
              fontWeight: 'bolder'
            }
          }
        },

        {
          id: 'leftIcon',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 210,
            y: 210,
            width: 100,
            height: 100
          },
          options: {
            graphic: {
              size: 50,
              symbolType:
                '<svg t="1734319107969" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1524" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60"><path d="M891.392 504.128 831.296 363.52l60.544-159.744c4.544-12.096 1.664-25.856-7.424-34.944-9.152-9.152-22.592-11.84-34.368-6.912-99.712 41.408-227.392 41.408-326.976 0-114.944-47.872-260.16-47.872-375.232 0C135.872 166.848 128 178.816 128 192l0 735.424C128 945.408 142.272 960 159.872 960c17.664 0 31.936-14.592 31.936-32.576l0-387.84c95.616-33.728 214.016-31.04 307.136 7.616 115.2 47.872 260.16 47.808 375.232 0 7.936-3.328 14.208-9.728 17.408-17.856C894.848 521.344 894.72 512.192 891.392 504.128zM523.072 486.976C465.536 463.04 402.432 450.944 335.424 450.944c-50.304 0-98.432 6.848-143.616 20.352L191.808 214.528c95.616-33.664 214.016-31.104 307.136 7.616 93.888 38.912 209.152 46.4 309.376 21.632l-41.216 108.8c-3.072 7.936-2.88 16.832 0.512 24.704l51.648 121.088C726.016 528.128 612.672 524.16 523.072 486.976z" p-id="1525"></path></svg>',
              stroke: '#fdf1e2',
              fill: '#fdf1e2',
              lineWidth: 0
            }
          }
        },

        {
          id: 'leftTitle',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 250,
            y: 328,
            width: 3300,
            height: 80
          },
          options: {
            graphic: {
              text: ['GOAL COMPLETION', 'STATUS UPDATE'],
              fill: '#fdf1e2',
              fontSize: 26,
              textAlign: 'center',
              fontWeight: 'bolder',
              lineHeight: 36
            }
          }
        },

        {
          id: 'leftMiddleLine',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 174,
            y: 442,
            width: 178,
            height: 5
          },
          options: {
            graphic: {
              fill: '#fdf1e2'
            }
          }
        },

        {
          id: 'leftContent',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 250,
            y: 484,
            width: 300,
            height: 200
          },
          options: {
            graphic: {
              textConfig: [
                {
                  text: 'A functional version of the\n'
                },
                {
                  text: 'mobile app'
                },
                {
                  text: ' has been developed\n',
                  fontWeight: 'bolder'
                },
                {
                  text: ' successfully.',
                  fontWeight: 'bolder'
                },
                {
                  text: ' Howerer, there are\n'
                },
                {
                  text: ' some vital changes we need to \n'
                },
                {
                  text: ' make before the app is ready to \n'
                },
                {
                  text: ' go into the launch phase. \n'
                }
              ],
              fill: 'rgb(248 238 235)',
              fontSize: 18,
              lineHeight: 28,
              textAlign: 'center'
            }
          }
        },

        {
          id: 'gaugeChart',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 500,
            y: 172,
            width: 780,
            height: 542
          },
          options: {
            spec: {
              type: 'gauge',
              color: ['#e86d6d'],
              data: [
                {
                  id: 'id0',
                  values: [
                    {
                      type: '目标A',
                      value: 0.62
                    }
                  ]
                }
              ],
              categoryField: 'type',
              valueField: 'value',
              outerRadius: 0.95,
              innerRadius: 0.5,
              centerX: '50%',
              centerY: '60%',
              startAngle: -180,
              endAngle: 0,
              gauge: {
                type: 'circularProgress',
                progress: {
                  style: {
                    stroke: '#f2f2f2',
                    lineWidth: 0.5
                  }
                },
                track: {
                  style: {
                    fill: '#f2f2f2',
                    stroke: '#f2f2f2',
                    lineWidth: 0.5,
                    fillOpacity: 1
                  }
                }
              },
              pin: {
                visible: false
              },
              pinBackground: {
                width: 0.03,
                height: 0.03,
                style: {
                  fill: '#f2f2f2'
                }
              },
              pointer: {
                type: 'rect',
                width: 0.01,
                style: {
                  fill: '#f2f2f2'
                }
              },
              extensionMark: [
                {
                  type: 'path',
                  style: {
                    path: (datum: any, ctx: any) => {
                      const { getCenter, getLayoutRadius } = ctx;
                      const layoutRadius = getLayoutRadius();
                      const center = getCenter();
                      const angle = ((-180 + 180 * 0.62) / 180) * Math.PI;
                      const radius = 0.5 * layoutRadius * 0.8;
                      const x0 = center.x + radius * Math.cos(angle);
                      const y0 = center.y + radius * Math.sin(angle);
                      const size = 20;
                      const x1 = center.x + (radius + size) * Math.cos(angle);
                      const y1 = center.y + (radius + size) * Math.sin(angle);
                      const x2 = x0 + (Math.cos(angle + Math.PI / 2) * size) / 2;
                      const y2 = y0 + (Math.sin(angle + +Math.PI / 2) * size) / 2;
                      const x3 = x0 + (Math.cos(angle - Math.PI / 2) * size) / 2;
                      const y3 = y0 + (Math.sin(angle - Math.PI / 2) * size) / 2;

                      return `M${x1},${y1}L${x2},${y2}L${x3},${y3}Z`;
                    },
                    fill: '#f2f2f2'
                  }
                }
              ],
              axes: [
                {
                  orient: 'angle',
                  label: {
                    visible: false
                  },
                  grid: {
                    visible: false
                  }
                }
              ]
            }
          }
        },

        {
          id: 'targetText',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 890,
            y: 600,
            width: 300,
            height: 200
          },
          options: {
            graphic: {
              text: '62%',
              fill: '#f2f2f2',
              fontSize: 90,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bolder'
            }
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 1280, height: 720, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
