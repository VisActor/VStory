import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();
const actionShow = {
  characterId: [
    'background-top',
    'background-bottom-filter',
    'background-bottom-left',
    'background-bottom-right',
    'Title',
    'SplitLine',
    'Star',
    'LeftPercent',
    'LeftDescription',
    'RightPercent',
    'RightDescription',

    'chart',
    'chart2'
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
};

const actionShowTile = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'style',
      startTime: 1000,
      payload: {
        animation: {
          duration: 2000,
          easing: 'quadInOut'
        },
        graphic: { fontSize: 200 }
      }
    }
  ]
};
const actionScaleTitle = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'style',
      startTime: 3500,
      payload: {
        animation: {
          duration: 1000,
          easing: 'quadInOut',
          effect: 'fade'
        },

        graphic: { fontSize: 100 }
      }
    }
  ]
};

const actionMoveTitle = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 4500,
      payload: {
        destination: {
          x: 1920 / 2,
          y: 100
        },
        animation: {
          duration: 800,
          easing: 'quadInOut'
        }
      }
    }
  ]
};

const actionScaleLeftPercent = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 5500,
      payload: {
        animation: {
          duration: 100,
          easing: 'quadInOut',
          effect: 'fade'
        },

        graphic: { fontSize: 10 }
      }
    }
  ]
};
const actionScaleLeftPercent1 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 5600,
      payload: {
        animation: {
          duration: 300,
          easing: 'quadIn',
          effect: 'fade'
        },
        text: { text: '看我致命一击！' },
        graphic: {
          fontSize: 100
        }
      }
    }
  ]
};

const actionUpdateChart1to10 = {
  characterId: ['chart'],
  characterActions: [
    {
      action: 'update',
      startTime: 6000,
      payload: {
        id: '0',
        values: [
          {
            state: '美国',
            value: 10
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

const actionUpdateRightPercentColor = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 7000,
      payload: {
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#48A0CF' // 0% 处的颜色
              },

              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};
const actionUpdateChart2to10 = {
  characterId: ['chart2'],
  characterActions: [
    {
      action: 'update',
      startTime: 7300,
      payload: {
        id: '0',
        values: [
          {
            state: '中国',
            value: 10
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

const actionMoveLeftPercent = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 8800,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent2 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 8900,
      payload: {
        text: { text: '看我致命二击！' },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent2 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 8900,
      payload: {
        text: { text: '看我致命二击！' },
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};

const actionUpdateChart1to34 = {
  characterId: ['chart'],
  characterActions: [
    {
      action: 'update',
      startTime: 9500,
      payload: {
        id: '0',
        values: [
          {
            state: '美国',
            value: 34
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};
const actionUpdateRightPercentColor2 = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 11000,
      payload: {
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.6,
                color: '#48A0CF' // 0% 处的颜色
              },

              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};

const actionUpdateChart2to34 = {
  characterId: ['chart2'],
  characterActions: [
    {
      action: 'update',
      startTime: 11500,
      payload: {
        id: '0',
        values: [
          {
            state: '中国',
            value: 34
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

const actionMoveLeftPercent3 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 13000,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent3 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 13100,
      payload: {
        text: { text: '看我致命三击！' },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent4 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 13100,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};

const actionUpdateChart1to104 = {
  characterId: ['chart'],
  characterActions: [
    {
      action: 'update',
      startTime: 13500,
      payload: {
        id: '0',
        values: [
          {
            state: '美国',
            value: 104
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

const actionUpdateRightPercentColor3 = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 14500,
      payload: {
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: '#48A0CF' // 0% 处的颜色
              },

              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};

const actionUpdateChart2to84 = {
  characterId: ['chart2'],
  characterActions: [
    {
      action: 'update',
      startTime: 15000,
      payload: {
        id: '0',
        values: [
          {
            state: '中国',
            value: 84
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

// 第四回合
const actionMoveLeftPercent5 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 16000,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent5 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 16100,
      payload: {
        text: { text: '看我致命四击！' },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent6 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 16100,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};

const actionUpdateChart1to145 = {
  characterId: ['chart'],
  characterActions: [
    {
      action: 'update',
      startTime: 16500,
      payload: {
        id: '0',
        values: [
          {
            state: '美国',
            value: 145
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

const actionUpdateRightPercentColor4 = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 16500,
      payload: {
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.2,
                color: '#48A0CF' // 0% 处的颜色
              },

              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};

const actionUpdateChart2to125 = {
  characterId: ['chart2'],
  characterActions: [
    {
      action: 'update',
      startTime: 17000,
      payload: {
        id: '0',
        values: [
          {
            state: '中国',
            value: 125
          }
        ],

        animation: { duration: 1000 }
      }
    }
  ]
};

// 第5回合

const actionMoveLeftPercent7 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 18000,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent7 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 18100,
      payload: {
        text: { text: '看我！' },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent8 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 18100,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};
const actionMoveLeftPercent9 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 18500,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};

const actionMoveLeftPercent10 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 18500,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};

const actionMoveLeftPercent11 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 18900,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent8 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 19000,
      payload: {
        text: { text: '看我！快看我！' },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent12 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 19000,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 400,
          easing: 'quadIn'
        }
      }
    }
  ]
};
const actionUpdateRightPercentCotent = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 19500,
      payload: {
        text: { text: '嗯！看着呢' },
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.2,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: 'blue' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};

// 第六回合
const actionMoveLeftPercent13 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 21000,
      payload: {
        destination: {
          x: -1920 / 2,
          y: 820
        },
        animation: {
          duration: 100,
          easing: 'quadInOut'
        }
      }
    }
  ]
};
const actionUpdateLeftPercent9 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 21100,
      payload: {
        text: { text: '部分电子产品免收高关税' },
        graphic: {
          fontSize: 20
        },
        animation: {
          duration: 0
        }
      }
    }
  ]
};
const actionMoveLeftPercent14 = {
  characterId: ['LeftPercent'],
  characterActions: [
    {
      action: 'moveTo',
      startTime: 21100,
      payload: {
        destination: {
          x: 160 + (1920 / 2 - 160) / 2,
          y: 820
        },
        animation: {
          duration: 2000
        }
      }
    }
  ]
};

const actionUpdateRightPercentCotent2 = {
  characterId: ['RightPercent'],
  characterActions: [
    {
      action: 'style',
      startTime: 23200,
      payload: {
        text: { text: '👍🏻看见了' },
        animation: {
          duration: 300
        },
        graphic: {
          fill: {
            gradient: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 1,
            stops: [
              {
                offset: 0,
                color: '#48A0CF' // 0% 处的颜色
              },
              {
                offset: 0.2,
                color: '#48A0CF' // 0% 处的颜色
              },

              {
                offset: 1,
                color: 'red' // 100% 处的颜色
              }
            ]
          }
        }
      }
    }
  ]
};
//hide all
const actionHideAll = {
  characterId: [
    'LeftPercent',
    'LeftDescription',
    'RightPercent',
    'RightDescription',
    'background-bottom-filter',
    'chart',
    'chart2',
    'Star',
    'SplitLine'
  ],
  characterActions: [
    {
      action: 'disappear',
      startTime: 24500,
      payload: {
        animation: {
          duration: 500,
          easing: 'quadInOut',
          effect: 'fade'
        }
      }
    }
  ]
};
// scale china

const actionScaleRight = {
  characterId: ['background-bottom-right'],
  characterActions: [
    {
      action: 'style',
      payload: {
        graphic: {
          width: 1920 - 100
        },
        animation: {
          duration: 0
        }
      },

      startTime: 24999
    }
  ]
};
const actionMoveRight = {
  characterId: ['background-bottom-right'],
  characterActions: [
    {
      action: 'moveTo',
      payload: {
        destination: {
          x: 100,
          y: 0
        },
        animation: {
          duration: 3000,
          easing: 'linear'
        }
      },

      startTime: 25000
    }
  ]
};
const actionScaleLeft = {
  characterId: ['background-bottom-left'],
  characterActions: [
    {
      action: 'style',
      payload: {
        graphic: {
          width: 100
        },

        animation: {
          duration: 3000,
          easing: 'linear'
        }
      },

      startTime: 25000
    }
  ]
};

const actionUpdateTitleSize = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'style',
      startTime: 25000,
      payload: {
        text: { text: '中国必胜！' },
        graphic: {
          fill: 'red'
        },
        animation: {
          duration: 500
        }
      }
    }
  ]
};

const actionMoveTitle2 = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'moveTo',
      payload: {
        destination: {
          x: 1920 / 2,
          y: 1080 / 2
        },
        animation: {
          duration: 2500,
          easing: 'quadInOut'
        }
      },

      startTime: 25500
    }
  ]
};
const actionUpdateTitle2 = {
  characterId: ['Title'],
  characterActions: [
    {
      action: 'style',
      payload: {
        graphic: {
          fontSize: 300
        },

        animation: {
          duration: 2500,
          easing: 'quadInOut'
        }
      },

      startTime: 25500
    }
  ]
};
async function loadDSL() {
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
        zIndex: 2,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            fill: '#193446',
            fillOpacity: 0.6,
            stroke: false
          }
        }
      },
      {
        type: 'Image',
        id: 'background-bottom-left',
        zIndex: 1,
        position: {
          top: 0,
          left: 0,
          width: 1920 / 2,
          height: 1080
        },
        options: {
          graphic: {
            image: `https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/infographic/trump.png`
          }
        }
      },
      {
        type: 'Image',
        id: 'background-bottom-right',
        zIndex: 1,
        position: {
          top: 0,
          left: 1920 / 2,
          width: 1920 / 2,
          height: 1080
        },
        options: {
          graphic: {
            image: `https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/infographic/china.png`
          }
        }
      },
      {
        type: 'Text',
        id: 'Title',
        zIndex: 3,
        position: {
          top: (1080 - 200) / 2,
          left: 1920 / 2,
          width: 1920,
          height: 600
        },
        options: {
          graphic: {
            fontSize: 2,

            textAlign: 'center',
            textBaseline: 'middle',
            stroke: 'white',

            fill: 'black',
            fontWeight: 'bolder',
            lineWidth: 10,
            textConfig: [
              {
                text: '中美关税对决！',
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
          top: 820,
          left: 160 + (1920 / 2 - 160) / 2,
          width: 600,
          height: 160
        },
        options: {
          graphic: {
            text: '暗中观察',
            fill: '#48A0CF',
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 100,
            fontWeight: 600
          }
        }
      },
      {
        type: 'Text',
        id: 'LeftDescription',
        zIndex: 3,
        position: {
          top: 920,
          left: 160 + (1920 / 2 - 160) / 2,
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
                text: '美国对中国加增关税'
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
          top: 820,
          left: 1920 / 2 + (1920 / 2 - 160) / 2,
          width: 600,
          height: 160
        },
        options: {
          graphic: {
            text: '从容应对',
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
          top: 920,
          left: 1920 / 2 + (1920 / 2 - 160) / 2,
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
                text: '中国对美国加增关税'
              }
            ]
          }
        }
      },
      {
        id: 'chart',
        type: 'VChart',
        zIndex: 2,
        position: {
          top: 254,
          left: 160,
          width: 1920 / 2 - 160,
          height: 540
        },
        options: {
          spec: {
            type: 'common',
            animation: false,
            barWidth: 0.1,
            series: [
              {
                type: 'bar',
                xField: ['state'],
                yField: 'value',
                seriesField: 'state',
                direction: 'vertical',
                stack: true,
                dataId: '0',

                label: {
                  visible: true,
                  formatter: `{value}%`,
                  offset: 10,
                  overlap: { clampForce: false },
                  style: {
                    stroke: 'white',
                    lineWidth: 5,
                    fill: 'black',
                    fontWeight: 'bold',
                    fontSize: 36
                  }
                }
              }
            ],
            data: [
              {
                id: '0',
                values: [
                  {
                    state: '美国',
                    value: 0
                  }
                ]
              }
            ],
            color: ['#222A5A'],
            axes: [
              {
                orient: 'bottom',
                visible: true,
                paddingOuter: [0.1],
                label: {
                  visible: false
                },
                grid: {
                  visible: false
                },
                tick: {
                  visible: false
                },
                domainLine: {
                  visible: true
                }
              },
              {
                label: {
                  visible: false
                },
                domainLine: {
                  visible: false
                },
                tick: { visible: false, tickStep: 10 },
                range: { max: 150 },
                orient: 'left'
              },
              {
                label: {
                  visible: true,
                  style: {
                    fill: 'rgb(246, 237, 237)',
                    fontSize: 30
                  }
                },
                domainLine: {
                  visible: false
                },
                tick: { visible: false, tickStep: 10 },
                range: { max: 130 },
                orient: 'right'
              }
            ]
          }
        }
      },

      {
        id: 'chart2',
        type: 'VChart',
        zIndex: 2,
        position: {
          top: 254,
          left: 1920 / 2,
          width: 1920 / 2 - 160,
          height: 540
        },
        options: {
          spec: {
            type: 'common',
            animation: false,
            barWidth: 10,
            series: [
              {
                type: 'bar',
                xField: ['state'],
                yField: 'value',
                seriesField: 'state',
                direction: 'vertical',
                stack: true,
                dataId: '0',

                label: {
                  visible: true,
                  formatter: `{value}%`,
                  offset: 10,
                  overlap: { clampForce: false },
                  style: {
                    stroke: 'white',
                    lineWidth: 5,
                    fill: 'black',
                    fontWeight: 'bold',
                    fontSize: 36
                  }
                }
              }
            ],
            data: [
              {
                id: '0',
                values: [
                  {
                    state: '中国',
                    value: 0
                  }
                ]
              }
            ],
            color: ['red'],
            axes: [
              {
                orient: 'bottom',
                visible: true,
                paddingOuter: [0.1],
                label: {
                  visible: false
                },
                grid: {
                  visible: false
                },
                tick: {
                  visible: false
                },
                domainLine: {
                  visible: false
                }
              },
              {
                label: {
                  visible: true,
                  style: {
                    fill: 'rgb(246, 237, 237)',
                    fontSize: 30
                  }
                },
                domainLine: {
                  visible: false
                },
                tick: { visible: false, tickStep: 10 },
                range: { max: 150 },
                orient: 'left'
              }
            ]
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
              actionShow,
              actionShowTile,
              actionScaleTitle,
              actionMoveTitle,
              actionScaleLeftPercent,
              actionScaleLeftPercent1,
              actionUpdateChart1to10,
              actionUpdateRightPercentColor,
              actionUpdateChart2to10,
              actionMoveLeftPercent,
              actionUpdateLeftPercent2,
              actionMoveLeftPercent2,
              actionUpdateChart1to34,
              actionUpdateRightPercentColor2,
              actionUpdateChart2to34,
              actionMoveLeftPercent3,
              actionUpdateLeftPercent3,
              actionMoveLeftPercent4,
              actionUpdateChart1to104,
              actionUpdateRightPercentColor3,
              actionUpdateChart2to84,
              actionMoveLeftPercent5,
              actionUpdateLeftPercent5,
              actionMoveLeftPercent6,
              actionUpdateChart1to145,
              actionUpdateRightPercentColor4,
              actionUpdateChart2to125,
              actionMoveLeftPercent7,
              actionUpdateLeftPercent7,
              actionMoveLeftPercent8,
              actionMoveLeftPercent9,
              actionMoveLeftPercent10,
              actionMoveLeftPercent11,
              actionUpdateLeftPercent8,
              actionMoveLeftPercent12,
              actionUpdateRightPercentCotent,
              actionMoveLeftPercent13,
              actionUpdateLeftPercent9,
              actionMoveLeftPercent14,
              actionUpdateRightPercentCotent2,
              actionHideAll,
              actionScaleLeft,
              actionScaleRight,
              actionMoveRight,
              actionUpdateTitleSize,
              actionMoveTitle2,
              actionUpdateTitle2
            ]
          }
        ]
      }
    ]
  };
}

export const TariffWar = () => {
  const id = 'TariffWar';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 1000, height: 500, scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    loadDSL().then(dsl => {
      story.load(dsl);
      player.play();
    });

    console.log(story);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
