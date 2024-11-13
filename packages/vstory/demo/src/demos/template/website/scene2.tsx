// @ts-nocheck

export const scene2Characters: ICharacterSpec[] = [
  {
    type: 'Text',
    id: `title1`,
    zIndex: 1,
    position: {
      top: 290,
      left: 630
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
      left: 630
    },
    options: {
      graphic: { text: 'OF CHARTS', fontSize: 75, fontWeight: 'bold' }
    }
  },
  {
    type: 'Text',
    id: `titlesubtitle`,
    zIndex: 1,
    position: {
      top: 470,
      left: 770
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 22,
        fontWeight: 'bold',
        textBaseline: 'middle',
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
      top: 30,
      left: 150
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 12,
        fill: '#292729',
        textAlign: 'center',
        textBaseline: 'middle',
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
          { label: '1990s', desc: '' },
          { label: '', desc: '' }
        ],
        lineStyle: {
          lineDash: [1, 1]
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        activeSymbolStyle: {
          size: 20
        },
        activeLabelStyle: {
          fontSize: 22,
          fontWeight: 'bold'
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
          startTime: 1200,
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
          startTime: 6200,
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
          startTime: 6200,
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
          startTime: 6200,
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
          startTime: 1200,
          action: 'appear',
          payload: {
            animation: {
              duration: 5000,
              effect: 'default'
            }
          }
        }
      ]
    }
  ]
};
