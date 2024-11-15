import LeftLineDecoration from '../../../assets/scene4/blocks.png';
import TitleDecoration from '../../../assets/scene4/title-decoration.png';
import ChartImage from '../../../assets/scene4/chart.png';
import TextEnImage from '../../../assets/scene4/text-en.png';
import TextZhImage from '../../../assets/scene4/text-zh.png';
import RectTexture from '../../../assets/scene4/matrix.png';
import DecorationImage from '../../../assets/scene4/decoration.png';
import BgDecorationImage from '../../../assets/scene4/bg-decoration.png';

const getCurve = (x: number) => {
  return 0.0694 * x * x - 9.3056 * x + 321.1111; // 回归方程
};
export const scene4Characters = [
  {
    type: 'Image',
    id: 'scene4-title-decoration',
    zIndex: 1,
    position: {
      left: 200,
      top: 140,
      width: 130,
      height: 26
    },
    options: {
      graphic: {
        image: TitleDecoration
      }
    }
  },
  {
    type: 'Text',
    id: 'scene4-title',
    zIndex: 1,
    position: {
      left: 200,
      top: 200,
      width: 400,
      height: 100
    },
    options: {
      graphic: {
        text: 'The First Chart',
        fontSize: 55,
        fontWeight: 'bold',
        textAlign: 'left'
      }
    }
  },
  {
    type: 'Text',
    id: 'scene4-subtitle',
    zIndex: 1,
    position: {
      left: 200,
      top: 256,
      width: 300,
      height: 100
    },
    options: {
      graphic: {
        text: 'Michael van Langren',
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold'
      }
    }
  },
  {
    type: 'Line',
    id: 'scene4-line-left',
    zIndex: 1,
    position: {
      left: 165,
      top: 0,
      width: 10,
      height: 450
    },
    options: {
      graphic: {
        lineWidth: 1,
        points: [
          { x: 5, y: 0 },
          { x: 5, y: 450 }
        ]
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-line-left-decoration',
    zIndex: 1,
    position: {
      left: 160,
      top: 460,
      width: 20,
      height: 66
    },
    options: {
      graphic: {
        image: LeftLineDecoration
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-chart-image',
    zIndex: 1,
    position: {
      left: 200,
      top: 320,
      width: 420,
      height: 104
    },
    options: {
      graphic: {
        image: ChartImage
      }
    }
  },
  {
    type: 'VChart',
    id: 'scatter',
    zIndex: 1,
    position: {
      left: 200,
      top: 320,
      width: 500,
      height: 120
    },
    options: {
      panel: {
        fill: '#ffffff',
        stroke: 'black',
        lineWidth: 1
      },
      spec: {
        type: 'scatter',
        data: [
          {
            id: 'data',
            values: [
              { x: 104, y: 10, type: 'A' },
              { x: 98, y: 10, type: 'A' },
              { x: 93, y: 10, type: 'A' },
              { x: 90, y: 10, type: 'A' },
              { x: 76, y: 10, type: 'A' },
              { x: 70, y: 10, type: 'A' },
              { x: 63, y: 10, type: 'A' }
            ]
          }
        ],
        background: 'white',
        xField: 'x',
        yField: 'y',
        seriesField: 'type',
        point: {
          style: {
            size: 8,
            fill: `#E05F38`
          }
        },
        animationUpdate: {
          easing: 'cubicInOut',
          duration: 1000
        },
        axes: [
          {
            orient: 'bottom',
            bandPadding: 0,
            paddingInner: 0,
            paddingOuter: 0,
            min: 0,
            max: 110,
            type: 'linear',
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false },
            domainLine: { visible: true, style: { stroke: 'black', lineWidth: 4 } }
          },
          {
            orient: 'left',
            visible: false,
            min: 0,
            max: 100
          }
        ]
      }
    }
  },
  {
    type: 'Line',
    id: 'scene4-text-zh-line',
    zIndex: 1,
    position: {
      left: 324,
      top: 470,
      width: 10,
      height: 64
    },
    options: {
      graphic: {
        lineWidth: 1,
        points: [
          { x: 0, y: 0 },
          { x: 0, y: 64 }
        ]
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-text-zh-image',
    zIndex: 1,
    position: {
      left: 340,
      top: 470,
      width: 280,
      height: 64
    },
    options: {
      graphic: {
        image: TextZhImage
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-text-en-image',
    zIndex: 1,
    position: {
      left: 660,
      top: 600,
      width: 300,
      height: 54
    },
    options: {
      graphic: {
        image: TextEnImage
      }
    }
  },
  {
    type: 'Rect',
    id: 'scene4-green-rect',
    zIndex: 1,
    position: {
      left: 620,
      top: 160,
      width: 100,
      height: 90
    },
    options: {
      graphic: {
        fill: `rgba(124, 128,118,0.8)`,
        background: RectTexture,
        stroke: false
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-decoration',
    zIndex: 1,
    position: {
      left: 740,
      top: 340,
      width: 80,
      height: 120
    },
    options: {
      graphic: {
        image: DecorationImage
      }
    }
  },
  {
    type: 'Rect',
    id: 'scene4-grey-rect',
    zIndex: 1,
    position: {
      left: 960,
      top: 340,
      width: 300,
      height: 100
    },
    options: {
      graphic: {
        fill: `rgb(167, 160,153)`,
        stroke: false
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-bg-decoration',
    zIndex: 1,
    position: {
      left: 180,
      top: 680,
      width: 1200,
      height: 140
    },
    options: {
      graphic: {
        image: BgDecorationImage
      }
    }
  },
  {
    type: 'Image',
    id: 'scene4-bg-decoration',
    zIndex: 1,
    position: {
      left: 180,
      top: 680,
      width: 1200,
      height: 140
    },
    options: {
      graphic: {
        image: BgDecorationImage
      }
    }
  }
];

export const scene4: ISceneSpec = {
  id: 'scene4',
  actions: [
    {
      characterId: 'scene4-title-decoration',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-title',
      characterActions: [
        {
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-subtitle',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
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
    {
      characterId: 'scene4-line-left',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
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
    {
      characterId: 'scene4-line-left-decoration',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
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
    {
      characterId: 'scene4-chart-image',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad'
            }
          }
        },
        {
          startTime: 1300,
          action: 'style',
          payload: {
            graphic: {
              width: 500,
              height: 120
            },
            animation: {
              duration: 700,
              easing: 'easeInOutQuad'
            }
          }
        },
        {
          startTime: 2500,
          action: 'disappear',
          payload: {
            animation: {
              duration: 700
            }
          }
        },
        {
          startTime: 5000,
          action: 'appear',
          payload: {
            animation: {
              duration: 500
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-text-zh-image',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1300,
          action: 'style',
          payload: {
            graphic: {
              dx: 50,
              dy: 10
            },
            animation: {
              duration: 700,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-text-zh-line',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1300,
          action: 'style',
          payload: {
            graphic: {
              dx: 50,
              dy: 10
            },
            animation: {
              duration: 700,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-text-en-image',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-green-rect',
      characterActions: [
        {
          startTime: 200,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
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
    {
      characterId: 'scene4-decoration',
      characterActions: [
        {
          startTime: 200,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene4-grey-rect',
      characterActions: [
        {
          startTime: 200,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
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
      characterId: 'scene4-bg-decoration',
      characterActions: [
        {
          startTime: 0,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: 'scatter',
      characterActions: [
        {
          action: 'appear',
          startTime: 2500,
          payload: {
            animation: {
              duration: 500,
              easing: 'cubicOut',
              fade: {
                opacity: 1,
                isBaseOpacity: true,
                easing: 'linear'
              }
            }
          }
        },
        {
          action: 'update',
          startTime: 3500,
          duration: 1000,
          payload: {
            id: 'data',
            data: [
              { x: 104, y: 10, type: 'A' },
              { x: 98, y: 10, type: 'A' },
              { x: 93, y: 10, type: 'A' },
              { x: 90, y: 10, type: 'A' },
              { x: 76, y: 10, type: 'A' },
              { x: 70, y: 10, type: 'A' },
              { x: 63, y: 10, type: 'A' }
            ].map(v => {
              return {
                sourceValue: v,
                targetValue: {
                  ...v,
                  y: getCurve(v.x)
                }
              };
            })
          }
        },
        {
          action: 'disappear',
          startTime: 5000,
          payload: {
            animation: {
              duration: 500,
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
          startTime: 0,
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 6000,
              easing: 'linear'
            }
          }
        },
        {
          startTime: 500,
          action: 'moveTo',
          payload: {
            destination: {
              x: 850,
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

scene4.actions.forEach(({ characterActions, characterId }) => {
  if (characterId !== 'timeline') {
    characterActions.push({
      action: 'disappear',
      startTime: 6000,
      payload: {
        animation: {
          duration: 500
        }
      }
    });
  }
});

scene4.actions.push({
  characterId: 'scene3-background',
  characterActions: [
    {
      action: 'style',
      startTime: 6000,
      payload: {
        graphic: {
          scaleY: 0
        },
        animation: {
          duration: 500
        }
      }
    },
    {
      action: 'disappear',
      startTime: 6000,
      payload: {
        animation: {
          duration: 500
        }
      }
    }
  ]
});
