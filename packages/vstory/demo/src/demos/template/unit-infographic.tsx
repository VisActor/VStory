import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDSL() {
  const matrixLeft = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  ];

  const matrixRight = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
  ];

  const left = matrixLeft.flat();
  const right = matrixRight.flat();

  const icon = [
    'M 0.012 -0.287 c 0.041 0 0.075 -0.033 0.075 -0.075 c 0 -0.041 -0.033 -0.075 -0.075 -0.075 c -0.041 0 -0.075 0.033 -0.075 0.075 C -0.063 -0.32 -0.029 -0.287 0.012 -0.287 z M 0.087 -0.27 L 0.012 -0.27 l -0.075 0 c -0.056 0 -0.093 0.05 -0.093 0.097 L -0.156 0.054 c 0 0.044 0.062 0.044 0.062 0 L -0.094 -0.156 l 0.012 0 l 0 0.571 c 0 0.061 0.084 0.059 0.086 0 L 0.004 0.086 l 0.014 0 l 0.002 0 l 0 0.329 c 0.003 0.062 0.086 0.056 0.086 0 L 0.106 -0.156 l 0.01 0 l 0 0.21 c 0 0.044 0.064 0.044 0.064 0 L 0.18 -0.173 C 0.18 -0.22 0.143 -0.27 0.087 -0.27 z',
    'M 0.012 -0.329 m -0.085 0 a 0.085 0.085 90 1 0 0.171 0 a 0.085 0.085 90 1 0 -0.171 0 Z M 0.138 -0.172 A 0.043 0.043 90 0 0 0.097 -0.201 h -0.171 a 0.043 0.043 90 0 0 -0.04 0.029 l -0.085 0.256 l 0.076 0.025 L -0.159 0.268 h 0.085 v 0.171 h 0.171 v -0.171 h 0.085 l -0.035 -0.159 l 0.076 -0.025 l -0.085 -0.256 z'
  ];

  return {
    characters: [
      {
        type: 'Rect',
        id: 'background-top',
        zIndex: 2,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 254
        },
        options: {
          graphic: {
            fill: '#2D6BA0',
            stroke: false
          }
        }
      },
      {
        type: 'Rect',
        id: 'background-bottom-filter',
        zIndex: 0,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            fill: '#193446',
            fillOpacity: 1,
            stroke: false
          }
        }
      },
      {
        type: 'Image',
        id: 'background-bottom',
        zIndex: 1,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/meeting.jpeg`,
            opacity: 0.2
          }
        }
      },
      {
        type: 'Text',
        id: 'Title',
        zIndex: 3,
        position: {
          top: 254 / 2,
          left: 1920 / 2,
          width: 1920,
          height: 100
        },
        options: {
          graphic: {
            fontSize: 40,
            wordBreak: 'break-word',
            textAlign: 'center',
            textBaseline: 'middle',
            fill: 'white',
            fontWeight: 200,
            textConfig: [
              {
                text: 'According to a study conducted by ',
                textAlign: 'center'
              },
              {
                text: 'Mckinsey & Company',
                fontWeight: 'bold',
                textAlign: 'center'
              },
              {
                text: ' on the effect the pandemic and remote working had on hiring and human resources management',
                textAlign: 'center'
              }
            ]
          }
        }
      },
      {
        type: 'Line',
        id: 'SplitLine',
        zIndex: 3,
        position: {
          top: 340,
          left: 1920 / 2,
          width: 20,
          height: 560
        },
        options: {
          graphic: {
            stroke: '#48A0CF',
            lineWith: 10,
            points: [
              { x: 0, y: 0 },
              { x: 0, y: 560 }
            ]
          }
        }
      },
      {
        type: 'Shape',
        id: 'Star',
        zIndex: 3,
        position: {
          top: 340 + 560 - 70,
          left: 1920 / 2 - 70,
          width: 140,
          height: 140
        },
        options: {
          graphic: {
            fill: '#48A0CF',
            stroke: false,
            symbolType:
              'M 0.63 -1.1 c -0.61 1.06 -0.64 1.06 -1.25 0 c 0.61 1.06 0.6 1.08 -0.63 1.08 c 1.22 0 1.24 0.02 0.63 1.08 c 0.61 -1.06 0.64 -1.06 1.25 0 c -0.61 -1.06 -0.6 -1.08 0.63 -1.08 C 0.03 -0.01 0.01 -0.04 0.63 -1.1 z',
            size: 140
          }
        }
      },
      {
        type: 'Text',
        id: 'LeftPercent',
        zIndex: 3,
        position: {
          top: 780,
          left: 450,
          width: 300,
          height: 160
        },
        options: {
          graphic: {
            text: '67%',
            fill: '#48A0CF',
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 110,
            fontWeight: 600
          }
        }
      },
      {
        type: 'Text',
        id: 'LeftDescription',
        zIndex: 3,
        position: {
          top: 900,
          left: 420,
          width: 460,
          height: 108
        },
        options: {
          graphic: {
            fill: 'white',
            fontSize: 30,
            textAlign: 'center',
            textBaseline: 'middle',
            width: 460,
            height: 108,
            wordBreak: 'break-word',
            textConfig: [
              {
                text: 'Of over 120 CEOs plan to spend less time on hiring permanent recruits'
              }
            ]
          }
        }
      },
      {
        type: 'Text',
        id: 'RightPercent',
        zIndex: 3,
        position: {
          top: 780,
          left: 1483,
          width: 300,
          height: 160
        },
        options: {
          graphic: {
            text: '63%',
            fill: '#48A0CF',
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 110,
            fontWeight: 600,
            stroke: '#48A0CF'
          }
        }
      },
      {
        type: 'Text',
        id: 'RightDescription',
        zIndex: 3,
        position: {
          top: 900,
          left: 1483,
          width: 460,
          height: 108
        },
        options: {
          graphic: {
            fill: 'white',
            fontSize: 30,
            width: 460,
            height: 108,
            wordBreak: 'break-word',
            textAlign: 'center',
            textBaseline: 'middle',
            textConfig: [
              {
                text: 'Plan to grow their IT and tech teams in response to changing  ways of working'
              }
            ]
          }
        }
      },
      {
        type: 'Unit',
        id: 'left-unit',
        zIndex: 2,
        position: {
          top: 254,
          left: 0,
          width: 1920 / 2 - 160,
          height: 540
        },
        options: {
          graphic: {
            fill: false,
            padding: {
              top: 80,
              bottom: 100,
              right: 50,
              left: 100
            },
            count: 120,
            units: [
              {
                range: [0, 40],
                style: {
                  symbolType: icon[0],
                  fill: 'white'
                }
              },
              {
                range: [40],
                style: {
                  symbolType: icon[1],
                  fill: '#48A0CF'
                }
              }
            ],
            gap: [0, 0.2],
            aspect: 0.5,
            direction: 'vertical'
          }
        }
      },
      {
        type: 'Unit',
        id: 'right-unit',
        zIndex: 2,
        position: {
          top: 254,
          left: 1920 / 2 + 80,
          width: 1920 / 2 - 160,
          height: 540
        },
        options: {
          graphic: {
            fill: false,
            padding: {
              top: 80,
              bottom: 100,
              right: 50,
              left: 100
            },
            count: 120,
            units: [
              {
                range: [0, 44],
                style: {
                  symbolType: icon[0],
                  fill: 'white'
                }
              },
              {
                range: [44],
                style: {
                  symbolType: icon[1],
                  fill: '#48A0CF'
                }
              }
            ],
            gap: [0, 0.2],
            aspect: 0.5,
            direction: 'vertical'
          }
        }
      }
    ],
    acts: [
      {
        id: 'page1',
        scenes: [
          {
            id: 'singleScene',
            actions: [
              {
                characterId: [
                  'background-top',
                  'background-bottom-filter',
                  'background-bottom',
                  'Title',
                  'SplitLine',
                  'Star',
                  'LeftPercent',
                  'LeftDescription',
                  'RightPercent',
                  'RightDescription',
                  'left-unit',
                  'right-unit'
                ],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 0
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

export const UnitInfographic = () => {
  const id = 'UnitInfographic';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 1000, height: 500, background: 'pink', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    loadDSL().then(dsl => {
      story.load(dsl);
      player.play(0);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
