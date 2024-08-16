import { IActionsLink, IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
import React, { useEffect } from 'react';
import MeetingImg from '../../assets/1920x1080/meeting.jpeg';
import { ICharacterSpec } from '../../../../src/story/character';

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

const icon = [
  'M 0.012 -0.287 c 0.041 0 0.075 -0.033 0.075 -0.075 c 0 -0.041 -0.033 -0.075 -0.075 -0.075 c -0.041 0 -0.075 0.033 -0.075 0.075 C -0.063 -0.32 -0.029 -0.287 0.012 -0.287 z M 0.087 -0.27 L 0.012 -0.27 l -0.075 0 c -0.056 0 -0.093 0.05 -0.093 0.097 L -0.156 0.054 c 0 0.044 0.062 0.044 0.062 0 L -0.094 -0.156 l 0.012 0 l 0 0.571 c 0 0.061 0.084 0.059 0.086 0 L 0.004 0.086 l 0.014 0 l 0.002 0 l 0 0.329 c 0.003 0.062 0.086 0.056 0.086 0 L 0.106 -0.156 l 0.01 0 l 0 0.21 c 0 0.044 0.064 0.044 0.064 0 L 0.18 -0.173 C 0.18 -0.22 0.143 -0.27 0.087 -0.27 z',
  'M 0.012 -0.329 m -0.085 0 a 0.085 0.085 90 1 0 0.171 0 a 0.085 0.085 90 1 0 -0.171 0 Z M 0.138 -0.172 A 0.043 0.043 90 0 0 0.097 -0.201 h -0.171 a 0.043 0.043 90 0 0 -0.04 0.029 l -0.085 0.256 l 0.076 0.025 L -0.159 0.268 h 0.085 v 0.171 h 0.171 v -0.171 h 0.085 l -0.035 -0.159 l 0.076 -0.025 l -0.085 -0.256 z'
];

function createIconMatrix(matrix: number[][], startIndex: number, x: number, y: number) {
  const characters: ICharacterSpec[] = [];
  const actions: IActionsLink[] = [];

  const startX = x;
  const startY = y;
  const width = 26;
  const height = 56;
  const lineGap = 12;
  let curIndex = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const iconIndex = matrix[i][j];
      const id = `icon-${startIndex + i * matrix[i].length + j}-${x}-${y}`;
      const character: ICharacterSpec = {
        type: 'Shape',
        id,
        zIndex: 3,
        position: {
          top: startY + i * height + i * lineGap + 30,
          left: startX + j * width,
          width,
          height
        },
        options: {
          graphic: {
            symbolType: icon[iconIndex],
            width,
            height,
            stroke: false,
            size: 56,
            scaleY: 0.9,
            scaleX: 0.9,
            fill: ++curIndex >= startIndex ? '#48A0CF' : 'white'
          }
        }
      };
      characters.push(character);
      actions.push({
        characterId: id,
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
      });
    }
  }
  return { characters, actions };
}

const leftIcons = createIconMatrix(matrixLeft, 40, 116, 330);
const rightIcons = createIconMatrix(matrixRight, 45, 1164, 330);

export const Pictogram = () => {
  const id = 'pictogram';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = {
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
              image: MeetingImg,
              opacity: 0.2
            }
          }
        },
        {
          type: 'RichText',
          id: 'Title',
          zIndex: 3,
          position: {
            top: 254 / 2,
            left: 1920 / 2,
            width: 1920,
            height: 1080
          },
          options: {
            graphic: {
              width: 1920 - 300,
              height: 1080,
              fontSize: 40,
              wordBreak: 'break-word',
              textAlign: 'center',
              fill: 'white',
              fontWeight: 200,
              textConfig: [
                {
                  text: 'According to a study conducted by '
                },
                {
                  text: 'Mckinsey & Company',
                  fontWeight: 'bold'
                },
                {
                  text: ' on the effect the pandemic and remote working had on hiring and human resources management'
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
            top: 340 + 560,
            left: 1920 / 2,
            width: 100,
            height: 100
          },
          options: {
            graphic: {
              fill: '#48A0CF',
              stroke: false,
              symbolType:
                'M187.5,0.2c-61.2,106-63.8,106-125,0c61.2,106,59.9,108.3-62.5,108.3  c122.4,0,123.7,2.2,62.5,108.3c61.2-106,63.8-106,125,0c-61.2-106-59.9-108.3,62.5-108.3C127.6,108.6,126.3,106.2,187.5,0.2z',
              size: 140,
              dx: -70,
              dy: -60
            }
          }
        },
        {
          type: 'Text',
          id: 'LeftPercent',
          zIndex: 3,
          position: {
            top: 760,
            left: 420,
            width: 300,
            height: 100
          },
          options: {
            graphic: {
              text: '67%',
              fill: '#48A0CF',
              fontSize: 120,
              fontWeight: 600,
              stroke: '#48A0CF',
              fontFamily: 'Archivo'
            }
          }
        },
        {
          type: 'RichText',
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
            top: 760,
            left: 1483,
            width: 300,
            height: 100
          },
          options: {
            graphic: {
              text: '63%',
              fill: '#48A0CF',
              fontSize: 120,
              fontWeight: 600,
              stroke: '#48A0CF',
              fontFamily: 'Archivo'
            }
          }
        },
        {
          type: 'RichText',
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
              textConfig: [
                {
                  text: 'Plan to grow their IT and tech teams in response to changing  ways of working'
                }
              ]
            }
          }
        },
        ...leftIcons.characters,
        ...rightIcons.characters
      ],
      acts: [
        {
          id: 'page1',
          scenes: [
            {
              id: 'singleScene',
              actions: [
                {
                  characterId: 'background-top',
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
                },
                {
                  characterId: 'background-bottom-filter',
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
                },
                {
                  characterId: 'background-bottom',
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
                },
                {
                  characterId: 'Title',
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
                },
                {
                  characterId: 'SplitLine',
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
                },
                {
                  characterId: 'Star',
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
                },
                ...leftIcons.actions,
                ...rightIcons.actions,
                {
                  characterId: 'LeftPercent',
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
                },
                {
                  characterId: 'LeftDescription',
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
                },
                {
                  characterId: 'RightPercent',
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
                },
                {
                  characterId: 'RightDescription',
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
    const story = new Story(spec, { dom: id, playerOption: { scaleX: 0.5, scaleY: 0.5 } });
    // const story = new Story(spec, { dom: id, playerOption: {} });
    story.play();
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
