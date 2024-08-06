import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
// import { Animate } from '@visactor/vrender-core';

// Animate.AddInterpolate('clipRange', (k, r, from, to, target, out) => {
//   console.log('animate', k, r, from, to);
// });

const icon = [
  'M 0.012 -0.287 c 0.041 0 0.075 -0.033 0.075 -0.075 c 0 -0.041 -0.033 -0.075 -0.075 -0.075 c -0.041 0 -0.075 0.033 -0.075 0.075 C -0.063 -0.32 -0.029 -0.287 0.012 -0.287 z M 0.087 -0.27 L 0.012 -0.27 l -0.075 0 c -0.056 0 -0.093 0.05 -0.093 0.097 L -0.156 0.054 c 0 0.044 0.062 0.044 0.062 0 L -0.094 -0.156 l 0.012 0 l 0 0.571 c 0 0.061 0.084 0.059 0.086 0 L 0.004 0.086 l 0.014 0 l 0.002 0 l 0 0.329 c 0.003 0.062 0.086 0.056 0.086 0 L 0.106 -0.156 l 0.01 0 l 0 0.21 c 0 0.044 0.064 0.044 0.064 0 L 0.18 -0.173 C 0.18 -0.22 0.143 -0.27 0.087 -0.27 z',
  'M 0.012 -0.329 m -0.085 0 a 0.085 0.085 90 1 0 0.171 0 a 0.085 0.085 90 1 0 -0.171 0 Z M 0.138 -0.172 A 0.043 0.043 90 0 0 0.097 -0.201 h -0.171 a 0.043 0.043 90 0 0 -0.04 0.029 l -0.085 0.256 l 0.076 0.025 L -0.159 0.268 h 0.085 v 0.171 h 0.171 v -0.171 h 0.085 l -0.035 -0.159 l 0.076 -0.025 l -0.085 -0.256 z',
  'star'
];

export const BaseComponent = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        ...new Array(3).fill(0).map((_, i) => {
          return {
            type: 'Rect',
            id: 'rect' + i,
            zIndex: 10,
            position: {
              top: 20,
              left: 20 + i * 50,
              width: 30,
              height: 30
            },
            options: {
              graphic: {
                fill: 'red',
                // background: '/assets/scene4/matrix.png',
                stroke: false
              }
            }
          };
        }),
        ...new Array(3).fill(0).map((_, i) => {
          return {
            type: 'Line',
            id: 'line' + i,
            zIndex: 10,
            position: {
              top: 80,
              left: 20 + i * 50,
              width: 30,
              height: 30
            },
            options: {
              graphic: {
                stroke: 'red',
                lineWith: 10,
                points: [
                  { x: 0, y: 0 },
                  { x: 30, y: 30 }
                ]
                // background: '/assets/scene4/matrix.png',
                // stroke: false
              }
            }
          };
        }),
        ...new Array(3).fill(0).map((_, i) => {
          return {
            type: 'Shape',
            id: 'shape' + i,
            zIndex: 10,
            position: {
              top: 160,
              left: 20 + i * 50,
              width: 30,
              height: 30
            },
            options: {
              graphic: {
                symbolType: icon[i],
                fill: 'pink',
                size: 30,
                stroke: false
              }
            }
          };
        }),
        ...new Array(3).fill(0).map((_, i) => {
          return {
            type: 'Image',
            id: 'image' + i,
            zIndex: 10,
            position: {
              top: 200,
              left: 20 + i * 50,
              width: 50,
              height: 50
            },
            options: {
              graphic: {
                image: `/src/assets/scene3/chart-${i + 1}.png`
              }
            }
          };
        }),
        ...new Array(4).fill(0).map((_, i) => {
          return {
            type: 'Text',
            id: 'text' + i,
            zIndex: 10,
            position: {
              top: 270,
              left: 20 + i * 50,
              width: 50,
              height: 50
            },
            options: {
              graphic: {
                text: 'it is ' + i,
                fill: 'purple',
                textAlign: 'left'
              }
            }
          };
        }),
        ...new Array(4).fill(0).map((_, i) => {
          return {
            type: 'Timeline',
            id: 'timeline' + i,
            zIndex: 10,
            position: {
              top: 350,
              left: 20 + i * 130,
              width: 100,
              height: 50
            },
            options: {
              graphic: {
                times: [
                  { label: '2001', desc: '' },
                  { label: '2002', desc: '' },
                  { label: '2003', desc: '' }
                ]
              }
            }
          };
        })
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                ...new Array(3).fill(0).map((_, i) => {
                  return {
                    characterId: 'rect' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn'][i]
                          }
                        }
                      }
                    ]
                  };
                }),
                ...new Array(3).fill(0).map((_, i) => {
                  return {
                    characterId: 'line' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn'][i]
                          }
                        }
                      }
                    ]
                  };
                }),
                ...new Array(3).fill(0).map((_, i) => {
                  return {
                    characterId: 'shape' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn'][i]
                          }
                        }
                      }
                    ]
                  };
                }),
                ...new Array(3).fill(0).map((_, i) => {
                  return {
                    characterId: 'image' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn'][i]
                          }
                        }
                      }
                    ]
                  };
                }),
                ...new Array(4).fill(0).map((_, i) => {
                  return {
                    characterId: 'text' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn', 'typewriter'][i]
                          }
                        }
                      }
                    ]
                  };
                }),
                ...new Array(4).fill(0).map((_, i) => {
                  return {
                    characterId: 'timeline' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 2000,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn', 'default'][i]
                          }
                        }
                      }
                    ]
                  };
                })
              ]
            }
          ]
        }
      ]
    };
    const story = new Story(tempSpec, { dom: id });
    story.play();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
