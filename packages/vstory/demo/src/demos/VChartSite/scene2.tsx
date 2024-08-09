// @ts-nocheck
import { ICharacterSpec } from '../../../../src/story/character';
import { ISceneSpec } from '../../../../src/story/interface';

export const scene2Characters: ICharacterSpec[] = [
  {
    type: 'Text',
    id: `title1`,
    zIndex: 1,
    position: {
      top: 290,
      left: 680,
      width: 775,
      height: 200
    },
    options: {
      graphic: { text: 'A BRIEF HISTORY', fontSize: 75, fontWeight: 'bold' }
    }
  },
  {
    type: 'Text',
    id: `title2`,
    zIndex: 1,
    position: {
      top: 390,
      left: 680,
      width: 600,
      height: 60
    },
    options: {
      graphic: { text: 'OF CHARTS', fontSize: 75, fontWeight: 'bold' }
    }
  },
  {
    type: 'RichText',
    id: `titlesubtitle`,
    zIndex: 1,
    position: {
      top: 470,
      left: 770,
      width: 400,
      height: 80
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 22,
        fontWeight: 'bold',
        textConfig: [
          {
            text: 'Powered By '
          },
          {
            text: 'VChart',
            fill: 'blue'
          }
        ]
      }
    }
  },
  {
    type: 'Text',
    id: `scene2-title2`,
    zIndex: 1,
    position: {
      top: 50,
      left: 150,
      width: 200,
      height: 20
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 12,
        fill: '#292729',
        text: 'DEVELOPMENT ROADMAP'
      }
    }
  },
  {
    type: 'Timeline',
    id: 'timeline',
    zIndex: 10,
    position: {
      top: 500,
      left: 100,
      width: 1200,
      height: 100
    },
    options: {
      graphic: {
        times: [
          { label: '1486', desc: '' },
          { label: '1644', desc: '' },
          { label: '1765', desc: '' },
          { label: '1786', desc: '' },
          { label: '1801', desc: '' },
          { label: '1833', desc: '' },
          { label: '1856', desc: '' },
          { label: '1877', desc: '' },
          { label: '1976', desc: '' },
          { label: '1990s', desc: '' }
        ],
        lineStyle: {
          lineDash: [1, 1]
        },
        labelStyle: {
          fontSize: 28,
          fontWeight: 'bold'
        },
        activeLabelStyle: {
          fontSize: 28,
          fontWeight: 'bold',
          dy: 20
        }
      }
    }
  }
];

export const scene2: ISceneSpec = {
  id: 'scene2',
  actions: [
    {
      characterId: `title1`,
      characterActions: [
        {
          startTime: 0,
          duration: 800,
          action: 'moveTo',
          payload: {
            destination: {
              x: 250,
              y: 80
            },
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        },
        {
          startTime: 0,
          duration: 800,
          action: 'style',
          payload: {
            graphic: {
              fontSize: 40
            },
            animation: {
              duration: 800
            }
          }
        }
      ]
    },
    {
      characterId: `title2`,
      characterActions: [
        {
          startTime: 0,
          duration: 800,
          action: 'moveTo',
          payload: {
            destination: {
              x: 550,
              y: 80
            },
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        },
        {
          startTime: 0,
          duration: 800,
          action: 'style',
          payload: {
            graphic: {
              fontSize: 40
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
      characterId: `scene2-title2`,
      characterActions: [
        {
          startTime: 800,
          duration: 800,
          action: 'appear',
          payload: {
            animation: {
              duration: 800,
              easing: 'linear',
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: `title1`,
      characterActions: [
        {
          startTime: 2000,
          action: 'moveTo',
          payload: {
            destination: {
              x: -650,
              y: 80
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
      characterId: `title2`,
      characterActions: [
        {
          startTime: 2000,
          action: 'moveTo',
          payload: {
            destination: {
              x: -350,
              y: 80
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
      characterId: `scene2-title2`,
      characterActions: [
        {
          startTime: 2000,
          duration: 800,
          action: 'moveTo',
          payload: {
            destination: {
              x: -750,
              y: 80
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
      characterId: 'timeline',
      characterActions: [
        {
          startTime: 2000,
          action: 'appear',
          payload: {
            animation: {
              duration: 4000,
              effect: 'default'
            }
          }
        },
        {
          startTime: 6000,
          action: 'moveTo',
          payload: {
            destination: {
              x: 500,
              y: 60
            },
            animation: {
              duration: 500
            }
          }
        },
        {
          startTime: 6000,
          action: 'scaleTo',
          payload: {
            scale: {
              scaleX: 0.75,
              scaleY: 0.75
            },
            animation: {
              duration: 500
            }
          }
        }
      ]
    }
  ]
};
