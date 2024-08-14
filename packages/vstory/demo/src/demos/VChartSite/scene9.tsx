import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene9Person from '../../assets/scene9/person.png';
import scene9BgDecoration from '../../assets/scene9/bg-decoration.png';
import scene9TextEn from '../../assets/scene9/text-en.png';
import scene9TextZh from '../../assets/scene9/text-zh.png';
import scene9Title from '../../assets/scene9/title.png';
import scene9Chart from '../../assets/scene9/chart.png';

import { easeInOutQuad } from './util';

const monthData = {
  Jan: [
    { type: 'rail', value: 31.8, month: 'Jan' },
    { type: 'highway', value: 39.2, month: 'Jan' },
    { type: 'civil aviation', value: 24.1, month: 'Jan' }
  ],
  Feb: [
    { type: 'rail', value: 46.4, month: 'Feb' },
    { type: 'highway', value: 38, month: 'Feb' },
    { type: 'civil aviation', value: 22.3, month: 'Feb' }
  ],
  Mar: [
    { type: 'rail', value: 30.3, month: 'Mar' },
    { type: 'highway', value: 30.9, month: 'Mar' },
    { type: 'civil aviation', value: 23.4, month: 'Mar' }
  ],
  Apr: [
    { type: 'rail', value: 60.8, month: 'Apr' },
    { type: 'highway', value: 26.8, month: 'Apr' },
    { type: 'civil aviation', value: 24.5, month: 'Apr' }
  ],
  May: [
    { type: 'rail', value: 31.7, month: 'May' },
    { type: 'highway', value: 26.4, month: 'May' },
    { type: 'civil aviation', value: 27, month: 'May' }
  ],
  Jun: [
    { type: 'rail', value: 38.7, month: 'Jun' },
    { type: 'highway', value: 36.7, month: 'Jun' },
    { type: 'civil aviation', value: 33.4, month: 'Jun' }
  ],
  Jul: [
    { type: 'rail', value: 25.3, month: 'Jul' },
    { type: 'highway', value: 34.7, month: 'Jul' },
    { type: 'civil aviation', value: 28.2, month: 'Jul' }
  ],
  Aug: [
    { type: 'rail', value: 45.3, month: 'Aug' },
    { type: 'highway', value: 25.3, month: 'Aug' },
    { type: 'civil aviation', value: 30.8, month: 'Aug' }
  ],
  Sep: [
    { type: 'rail', value: 26.8, month: 'Sep' },
    { type: 'highway', value: 29.4, month: 'Sep' },
    { type: 'civil aviation', value: 20.9, month: 'Sep' }
  ],
  Oct: [
    { type: 'rail', value: 39.8, month: 'Oct' },
    { type: 'highway', value: 38.5, month: 'Oct' },
    { type: 'civil aviation', value: 39, month: 'Oct' }
  ],
  Nov: [
    { type: 'rail', value: 38.3, month: 'Nov' },
    { type: 'highway', value: 23.8, month: 'Nov' },
    { type: 'civil aviation', value: 29.4, month: 'Nov' }
  ],
  Dec: [
    { type: 'rail', value: 62.8, month: 'Dec' },
    { type: 'highway', value: 35.8, month: 'Dec' },
    { type: 'civil aviation', value: 35.2, month: 'Dec' }
  ]
};

const month = Object.keys(monthData);

const chartSpec = {
  type: 'rose',
  data: [
    {
      id: '1856Rose',
      values: [],
      fields: {
        month: {
          lockStatisticsByDomain: true,
          domain: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      }
    }
  ],
  color: ['#595959', '#94786A', '#709394'],
  padding: 5,
  radius: 0.7,
  innerRadius: 0,
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type',
  stack: true,
  rose: {
    style: {
      stroke: 'white',
      lineWidth: 1
    }
  },
  animationAppear: {
    rose: {
      duration: 200,
      easing: 'linear'
    }
  },
  animationEnter: {
    rose: {
      type: 'growRadiusIn',
      options: { overall: true },
      duration: 200,
      easing: 'bounceOut'
    }
  },
  legends: {
    visible: false,
    orient: 'top',
    interactive: false
  },
  axes: [
    {
      orient: 'radius',
      visible: true,
      tick: { tickCount: 3 },
      grid: { visible: true, style: { lineDash: [0] } },
      max: 150
    },
    {
      orient: 'angle',
      visible: true,
      domain: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      domainLine: { visible: true, smooth: false },
      grid: { visible: true, smooth: false },
      label: {
        visible: true,
        style: {
          fill: '#000'
        }
      }
    }
  ]
};

export const scene9Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene9-background`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#CFC9BE'
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-bg-decoration`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1240,
      height: 496
    },
    options: {
      graphic: {
        image: scene9BgDecoration
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-person`,
    zIndex: 1,
    position: {
      top: 218,
      left: 864,
      width: 396,
      height: 592
    },
    options: {
      graphic: {
        image: scene9Person
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-chart-image`,
    zIndex: 0,
    position: {
      top: 196,
      left: 454,
      width: 800,
      height: 612
    },
    options: {
      graphic: {
        image: scene9Chart,
        fillOpacity: 0.9
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-title`,
    zIndex: 0,
    position: {
      top: 140,
      left: 160,
      width: 285,
      height: 105
    },
    options: {
      graphic: {
        image: scene9Title
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-text-zh`,
    zIndex: 0,
    position: {
      top: 500,
      left: 165,
      width: 270,
      height: 86
    },
    options: {
      graphic: {
        image: scene9TextZh
      }
    }
  },
  {
    type: 'Image',
    id: `scene9-text-en`,
    zIndex: 0,
    position: {
      top: 610,
      left: 165,
      width: 260,
      height: 120
    },
    options: {
      graphic: {
        image: scene9TextEn
      }
    }
  },
  {
    type: 'VChart',
    id: `scene9-rose-chart`,
    zIndex: 2,
    position: {
      top: 376,
      left: 470,
      width: 240,
      height: 240
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: '#C7B9AF'
      }
    }
  }
];

export const scene9: ISceneSpec = {
  id: 'scene9',
  delay: -500,
  actions: [
    {
      characterId: 'scene9-background',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-bg-decoration',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-person',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'move',
              move: {
                pos: 'right'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-title',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 300,
              easing: easeInOutQuad
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-text-zh',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 300,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-text-en',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 300,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-chart-image',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          payload: {
            animation: {
              duration: 300,
              easing: easeInOutQuad
            }
          }
        }
      ]
    },
    {
      characterId: 'scene9-rose-chart',
      characterActions: [
        {
          action: 'appear',
          startTime: 2000,
          payload: {
            animation: {
              duration: 200,
              easing: 'linear',
              effect: 'fade',
              fade: {
                isBaseOpacity: true
              }
            }
          }
        },
        ...month.map((mon, i) => {
          return {
            action: 'add',
            startTime: 2200 + (i + 1) * 200,
            payload: {
              id: '1856Rose',
              duration: 200,
              // @ts-ignore
              values: monthData[mon]
            }
          };
        }),
        {
          action: 'disappear',
          startTime: 5500,
          payload: {
            animation: {
              duration: 1000,
              easing: easeInOutQuad,
              effect: 'fade',
              fade: {
                isBaseOpacity: true
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'timeline',
      characterActions: [
        {
          startTime: 500,
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 7000,
              easing: 'linear'
            }
          }
        },
        {
          startTime: 1000,
          action: 'moveTo',
          payload: {
            destination: {
              x: 600,
              y: 60
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

scene9.actions.forEach(({ characterId, characterActions }) => {
  if (characterId === 'timeline') {
    return;
  }
  if (characterId === 'scene9-person') {
    characterActions.push({
      action: 'disappear',
      startTime: 7500,
      payload: {
        animation: {
          duration: 500,
          easing: easeInOutQuad,
          effect: 'move',
          move: {
            pos: 'left'
          }
        }
      }
    });
  } else {
    characterActions.push({
      action: 'disappear',
      startTime: 7500,
      payload: {
        animation: {
          duration: 500,
          easing: easeInOutQuad
        }
      }
    });
  }
});
