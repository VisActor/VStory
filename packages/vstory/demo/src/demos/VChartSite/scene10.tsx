import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene10Person from '../../assets/scene10/person.png';
import scene10BgDecoration from '../../assets/scene10/bg-decoration.png';
import scene10TextEn from '../../assets/scene10/text-en.png';
import scene10TextZh from '../../assets/scene10/text-zh.png';
import scene10Title from '../../assets/scene10/title.png';
import scene10Chart from '../../assets/scene10/chart.png';

import { easeInOutQuad } from './util';
const mockData: any[] = [];
const types = ['A', 'B'];

types.forEach(type => {
  for (let i = 1; i <= 12; i++) {
    mockData.push({ month: i + '月', value: Math.random() * 100 + 10, type });
  }
});

const chartSpec = {
  type: 'radar',
  background: 'transparent',
  data: [
    {
      values: mockData
    }
  ],
  categoryField: 'month',
  valueField: 'value',
  seriesField: 'type', // 声明分组字段,
  outerRadius: 0.8,
  color: ['#27711B', '#A64260'],
  area: {
    visible: true
  },
  line: {
    style: {
      lineWidth: 1
    }
  },
  axes: [
    {
      orient: 'radius', // 半径轴配置
      grid: {
        smooth: true, // 平滑的网格线
        style: {
          lineDash: [0]
        },
        alternateColor: 'rgba(255, 255, 255, 0.2)' // 配置栅格线间的背景色
      }
    },
    {
      orient: 'angle', // 角度轴配置
      tick: {
        visible: false
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#333'
        }
      },
      grid: {
        style: {
          lineDash: [0]
        }
      },
      label: {
        style: {
          fill: '#ffffff'
        }
      }
    }
  ],
  legends: {
    visible: false,
    orient: 'top'
  }
};

export const scene10Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene10-background`,
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
        fill: '#2E4254'
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-person`,
    zIndex: 1,
    position: {
      top: 246,
      left: 844,
      width: 445,
      height: 564
    },
    options: {
      graphic: {
        image: scene10Person
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-title`,
    zIndex: 1,
    position: {
      top: 160,
      left: 192,
      width: 334,
      height: 100
    },
    options: {
      graphic: {
        image: scene10Title
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-bg-decoration`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1340,
      height: 494
    },
    options: {
      graphic: {
        image: scene10BgDecoration
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-text-zh`,
    zIndex: 0,
    position: {
      top: 462,
      left: 190,
      width: 240,
      height: 96
    },
    options: {
      graphic: {
        image: scene10TextZh
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-text-en`,
    zIndex: 0,
    position: {
      top: 344,
      left: 526,
      width: 272,
      height: 80
    },
    options: {
      graphic: {
        image: scene10TextEn
      }
    }
  },
  {
    type: 'Image',
    id: `scene10-chart-image`,
    zIndex: 0,
    position: {
      top: 472,
      left: 526,
      width: 320,
      height: 338
    },
    options: {
      graphic: {
        image: scene10Chart
      }
    }
  },
  {
    type: 'VChart',
    id: `scene10-radar-chart`,
    zIndex: 3,
    position: {
      top: 494,
      left: 526,
      width: 320,
      height: 320
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: '#C6B0B7'
      }
    }
  }
];

export const scene10: ISceneSpec = {
  id: 'scene10',
  delay: -1000,
  actions: [
    {
      characterId: 'scene10-background',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-person',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          duration: 500,
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
      characterId: 'scene10-title',
      characterActions: [
        {
          action: 'appear',
          startTime: 1000,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-bg-decoration',
      characterActions: [
        {
          action: 'appear',
          startTime: 1000,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-text-zh',
      characterActions: [
        {
          action: 'appear',
          startTime: 1000,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-text-en',
      characterActions: [
        {
          action: 'appear',
          startTime: 1000,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-chart-image',
      characterActions: [
        {
          action: 'appear',
          startTime: 1000,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene10-radar-chart',
      characterActions: [
        {
          action: 'appear',
          startTime: 2500,
          duration: 1000,
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
        },
        {
          action: 'disappear',
          startTime: 5000,
          duration: 1000,
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
    }
  ]
};

scene10.actions.forEach(({ characterId, characterActions }) => {
  if (characterId.includes('background') || characterId.includes('decoration')) {
    characterActions.push({
      action: 'disappear',
      startTime: 7500,
      duration: 500,
      payload: {
        animation: {
          duration: 500,
          easing: easeInOutQuad,
          effect: 'fade'
        }
      }
    });
  } else {
    characterActions.push({
      action: 'disappear',
      startTime: 7500,
      duration: 500,
      payload: {
        animation: {
          duration: 500,
          easing: easeInOutQuad,
          effect: 'move',
          move: {
            pos: 'bottom'
          },
          fade: {
            opacity: 0
          }
        }
      }
    });
  }
});
