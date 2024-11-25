import scene7TextZh from '../../../assets/scene7/text-zh.png';
import scene7TextEn from '../../../assets/scene7/text-en.png';
import scene7Chart from '../../../assets/scene7/chart.png';
import scene7Title from '../../../assets/scene7/title.png';
import scene7Pie from '../../../assets/scene7/pie.png';

const chartSpec = {
  type: 'pie',
  dataIndex: 0,
  outerRadius: 0.75,
  innerRadius: 0,
  valueField: 'value',
  categoryField: 'type',
  color: ['#56826C', '#BF6970', '#CDA871', '#B4948F', '#a05d56', '#CC6691', '#EBA4C2'],
  background: 'transparent',
  data: {
    values: [
      { type: '0~9', value: '39.12' },
      { type: '10~19', value: '43.01' },
      { type: '20~29', value: '43.91' },
      { type: '30~39', value: '45.4' },
      { type: '40~49', value: '40.89' },
      { type: '50~59', value: '42.48' },
      { type: '60~69', value: '39.63' },
      { type: '70~79', value: '25.17' },
      { type: '80 and over', value: '12.29' }
    ]
  },
  label: {
    visible: true
  },
  pie: {
    style: {
      stroke: 'rgb(238,231,217)',
      lineWidth: 1
    }
  }
};
// FIXME: 1801 的上中下两块背景都需要从上一页继承下来
export const scene7Characters = [
  {
    type: 'Rect',
    id: `scene7-background-top`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 68
    },
    options: {
      graphic: {
        stroke: false,
        scaleX: 0.8,
        fill: 'rgb(195,195,195)'
      }
    }
  },
  {
    type: 'Rect',
    id: `scene7-background-middle`,
    zIndex: 0,
    position: {
      top: 66,
      left: 0,
      width: 1440,
      height: 596
    },
    options: {
      graphic: {
        stroke: false,
        scaleX: 0.8,
        fill: 'rgb(221,221,221)'
      }
    }
  },
  {
    type: 'Rect',
    id: `scene7-background-bottom`,
    zIndex: 0,
    position: {
      top: 662,
      left: 0,
      width: 1440,
      height: 148
    },
    options: {
      graphic: {
        stroke: false,
        scaleX: 0.8,
        fill: 'rgb(30,34,33)'
      }
    }
  },
  {
    type: 'Image',
    id: `scene7-zh-text`,
    zIndex: 0,
    position: {
      top: 416,
      left: 167,
      width: 248,
      height: 142
    },
    options: {
      graphic: {
        image: scene7TextZh
      }
    }
  },
  {
    type: 'Image',
    id: `scene7-title`,
    zIndex: 0,
    position: {
      top: 75,
      left: 150,
      width: 675,
      height: 390
    },
    options: {
      graphic: {
        image: scene7Title
      }
    }
  },
  {
    type: 'Image',
    id: `scene7-chart-image`,
    zIndex: 0,
    position: {
      top: 180,
      left: 534,
      width: 548,
      height: 336
    },
    options: {
      graphic: {
        image: scene7Chart
      }
    }
  },
  {
    type: 'Image',
    id: `scene7-en-text`,
    zIndex: 0,
    position: {
      top: 178,
      left: 1105,
      width: 276,
      height: 158
    },
    options: {
      graphic: {
        image: scene7TextEn
      }
    }
  },
  {
    type: 'Image',
    id: `scene7-pie-image`,
    zIndex: 0,
    position: {
      top: 484,
      left: 1136,
      width: 248,
      height: 248
    },
    options: {
      graphic: {
        image: scene7Pie
      }
    }
  },
  {
    type: 'VChart',
    id: `scene7-chart`,
    zIndex: 0,
    position: {
      top: 208,
      left: 534,
      width: 548,
      height: 278
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: 'rgb(238,231,217)',
        stroke: 'black',
        lineWidth: 1
      }
    }
  }
];
export const scene7 = {
  id: 'scene7',
  actions: [
    {
      characterId: 'scene7-background-top',
      characterActions: [
        // 应该是一个 scaleX 更新的动画
        {
          action: 'style',
          payload: {
            graphic: { scaleX: 1 },
            animation: {
              duration: 500,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-background-middle',
      characterActions: [
        // 应该是一个 scaleX 更新的动画
        {
          action: 'style',
          payload: {
            graphic: { scaleX: 1 },
            animation: {
              duration: 500,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-background-bottom',
      characterActions: [
        // 应该是一个 scaleX 更新的动画
        {
          action: 'style',
          payload: {
            graphic: { scaleX: 1 }, // TODO: 这里应该有一个从上一页继承过来的 bg Image
            animation: {
              duration: 500,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-zh-text',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'left'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-title',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 100,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },

    {
      characterId: 'scene7-en-text',
      characterActions: [
        {
          action: 'appear',
          startTime: 300,
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-pie-image',
      characterActions: [
        {
          action: 'appear',

          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad',
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene7-chart-image',
      characterActions: [
        {
          action: 'appear',

          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    // FIXME: 1. label is not shown; 2. growAngle effect is not correct
    {
      characterId: 'scene7-chart',
      characterActions: [
        {
          action: 'appear',
          startTime: 1500,
          payload: {
            animation: {
              duration: 1000
            }
          }
        },
        {
          action: 'disappear',
          startTime: 3500,
          payload: {
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'timeline',
      characterActions: [
        {
          startTime: 0, // TODO 不知道为啥不能是0
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 5500,
              easing: 'linear'
            }
          }
        },
        {
          startTime: 500,
          action: 'moveTo',
          payload: {
            destination: {
              x: 700,
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

scene7.actions.forEach(({ characterId, characterActions }) => {
  if (characterId === 'scene7-background-bottom') {
    characterActions.push({
      action: 'disappear',
      startTime: 5500,
      payload: {
        animation: {
          duration: 500,
          easing: 'easeInOutQuad'
        }
      }
    });
  } else if (characterId !== 'timeline') {
    characterActions.push({
      action: 'disappear',
      startTime: 5500,
      payload: {
        animation: {
          duration: 500,
          easing: 'easeInOutQuad',
          effect: ['move', 'fade'],
          move: {
            to: 'top'
          }
        }
      }
    });
  }
});
