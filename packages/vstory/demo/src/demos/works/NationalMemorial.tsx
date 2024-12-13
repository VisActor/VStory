import React, { useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';
import darkBg from '../../assets/nationalMemory/dark.jpeg';
import candle from '../../assets/nationalMemory/candle.png';
import monument from '../../assets/nationalMemory/monument.png';
import { merge } from '@visactor/vutils';

registerAll();
export const NationalMemorial = () => {
  const id = 'NationalMemorial';
  const width = 1280 / 2;
  const height = 1960 / 2;
  const defaultAppearAction = {
    action: 'appear',
    payload: {
      animation: {
        duration: 500,
        easing: 'linear'
      }
    }
  };
  const defaultDisappearAction = startTime => {
    return {
      action: 'disappear',
      startTime,
      payload: {
        animation: {
          duration: 500,
          easing: 'linear'
        }
      }
    };
  };
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);
    const scene1Characters = [
      {
        character: {
          id: 'scene1-bg',
          type: 'Image',
          position: {
            x: 0,
            y: 0,
            width,
            height
          },
          options: {
            graphic: {
              image: darkBg
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOut'
            }
          }
        },
        disappearAction: false
      },
      {
        character: {
          id: 'scene1-candle',
          type: 'Image',
          position: {
            x: 0,
            y: 600,
            width,
            height: 400
          },
          options: {
            graphic: {
              image: candle
            }
          }
        }
      },
      {
        character: {
          id: 'scene1-monument',
          type: 'Image',
          position: {
            x: 0,
            y: 440,
            width,
            height: 360
          },
          options: {
            graphic: {
              opacity: 0.3,
              image: monument
            }
          }
        }
      },
      {
        character: {
          id: 'scene1-title',
          type: 'Text',
          position: {
            x: width / 2,
            y: 200,
            width,
            height
          },
          options: {
            graphic: {
              text: '南 京',
              fill: 'red',
              fontSize: 150,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              effect: 'wipe'
            }
          }
        }
      },
      {
        character: {
          id: 'scene1-title-date',
          type: 'Text',
          position: {
            x: width / 2,
            y: 350,
            width,
            height
          },
          options: {
            graphic: {
              text: '12.13',
              fill: 'white',
              fontSize: 150,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold',
              shadowBlur: 200
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              effect: 'wipe'
            }
          }
        }
      },
      {
        character: {
          id: 'scene1-subtitle',
          type: 'Text',
          position: {
            x: width / 2,
            y: 460,
            width,
            height
          },
          options: {
            graphic: {
              text: '国 家 公 祭 日',
              fill: 'white',
              fontSize: 40,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 300
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              effect: 'wipe'
            }
          }
        }
      },
      {
        character: {
          id: 'scene1-leftText',
          type: 'Text',
          position: {
            x: width - 30,
            y: 260,
            width: height,
            height,
            anchor: [width - 60, 200],
            angle: (Math.PI / 2) * 3
          },
          options: {
            graphic: {
              text: '铭记历史 祭奠同胞',
              fill: 'white',
              fontSize: 60,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 600,
              opacity: 0.2
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              duration: 1000,
              effect: 'typewriter'
            }
          }
        }
      }
    ];
    const scene1 = {
      id: 'scene1',
      actions: scene1Characters.map(({ character, appearAction, disappearAction }) => {
        const characterId = character.id;
        const characterActions = [];
        if (appearAction !== false) {
          characterActions.push(merge({}, defaultAppearAction, appearAction));
        }

        if (disappearAction !== false) {
          characterActions.push(merge({}, defaultDisappearAction(2000), disappearAction));
        }

        return {
          characterId,
          characterActions
        };
      })
    };
    const scene2Characters = [
      {
        character: {
          id: 'scene1-bg',
          type: 'Image',
          position: {
            x: 0,
            y: 0,
            width,
            height
          },
          options: {
            graphic: {
              image: darkBg
            }
          }
        },
        appearAction: {
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOut'
            }
          }
        },
        disappearAction: false
      },
      {
        character: {
          id: 'scene2-title',
          type: 'Text',
          position: {
            x: width / 2,
            y: 160,
            width,
            height
          },
          options: {
            graphic: {
              text: '遇难同胞',
              fill: 'white',
              fontSize: 40,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 300
            }
          }
        },
        appearAction: {
          action: 'appear',
          startTime: 200,
          payload: {
            animation: {
              duration: 600,
              effect: 'typewriter'
            }
          }
        },
        actions: [
          {
            action: 'moveTo',
            startTime: 1800,
            payload: {
              destination: {
                x: 120,
                y: 120
              },
              animation: {
                duration: 800,
                easing: 'quadInOut'
              }
            }
          }
        ]
      },
      {
        character: {
          id: 'scene2-title-count',
          type: 'Text',
          position: {
            x: width / 2,
            y: 260,
            width,
            height
          },
          options: {
            graphic: {
              text: '300000',
              fill: 'white',
              fontSize: 100,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },
        appearAction: {
          action: 'appear',
          startTime: 800,
          payload: {
            animation: {
              duration: 600,
              effect: 'move',
              pos: 'top'
            }
          }
        },
        actions: [
          {
            action: 'moveTo',
            startTime: 1800,
            payload: {
              destination: {
                x: 400,
                y: 120
              },
              animation: {
                duration: 800,
                easing: 'quadInOut'
              }
            }
          }
        ]
      },
      {
        character: {
          id: 'scene2-title-2',
          type: 'Text',
          position: {
            x: width / 2,
            y: 220,
            width,
            height
          },
          options: {
            graphic: {
              text: '其中',
              fill: 'white',
              fontSize: 60,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },
        appearAction: {
          action: 'appear',
          startTime: 2200,
          payload: {
            animation: {
              duration: 200,
              effect: 'typewriter'
            }
          }
        }
      },
      {
        character: {
          id: 'scene2-title-3',
          type: 'Text',
          position: {
            x: width / 2,
            y: 320,
            width,
            height
          },
          options: {
            graphic: {
              text: '枪杀占比达到惊人的 32%',
              fill: 'white',
              fontSize: 44,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },
        appearAction: {
          action: 'appear',
          startTime: 2600,
          payload: {
            animation: {
              duration: 1000,
              effect: 'typewriter'
            }
          }
        }
      },
      {
        character: {
          id: '1',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 100,
            y: 400,
            width: 500,
            height: 500
          },
          options: {
            initOption: { animation: true, interactive: true, disableTriggerEvent: true },

            spec: {
              type: 'pie',
              data: [
                {
                  id: 'id0',
                  values: [
                    { name: '开枪', value: '32' },
                    { name: '刺刀', value: '20' },
                    { name: '打死', value: '16' },
                    { name: '烧死', value: '9' },
                    { name: '强奸', value: '8' },
                    { name: '其他', value: '15' }
                  ]
                }
              ],

              outerRadius: 0.9,
              valueField: 'value',
              categoryField: 'name',
              color: ['#1F1F1F', '#383838', '#505050', '#686868', '#909090', '#B8B8B8'],
              animationAppear: {
                pie: {
                  startTime: 0,
                  loop: 0,
                  timeSlices: [
                    {
                      effects: {
                        channel: {
                          outerRadius: { to: 400 }
                        }
                      },
                      duration: 500
                    }
                  ]
                }
              },
              label: {
                visible: true,
                position: 'inside',
                offsetRadius: -40,
                smartInvert: true,
                rotate: false,
                formatMethod: (label, data) => {
                  return {
                    type: 'rich',
                    text: [
                      {
                        text: `${data.name}\n`,
                        fontSize: 16,
                        fontWeight: 500,
                        stroke: false
                      },
                      {
                        text: `${data.value}%`,
                        fontSize: 16,
                        fontWeight: 500,
                        stroke: false
                      }
                    ]
                  };
                }
              }
            }
          }
        },
        appearAction: {
          action: 'appear',
          startTime: 2200,
          payload: {
            animation: {
              duration: 600
            }
          }
        }
      }
    ];
    const scene2 = {
      id: 'scene2',
      actions: scene2Characters.map(({ character, appearAction, disappearAction, actions }) => {
        const characterId = character.id;
        const characterActions = [];
        if (appearAction !== false) {
          characterActions.push(merge({}, defaultAppearAction, appearAction));
        }
        if (actions) {
          characterActions.push(...actions);
        }
        if (disappearAction !== false) {
          characterActions.push(merge({}, defaultDisappearAction(6000), disappearAction));
        }

        return {
          characterId,
          characterActions
        };
      })
    };
    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [scene1, scene2]
        }
      ],
      characters: [
        ...scene1Characters.map(({ character }) => character),
        ...scene2Characters.map(({ character }) => character)
      ]
    };

    const story = new Story(dsl, {
      canvas,
      width,
      height
    });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
