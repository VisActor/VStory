import Scene3TitleImage from '../../../assets/scene3/title-image.png';
import Scene3Decoration from '../../../assets/scene3/decoration.png';
import Scene3TextTop from '../../../assets/scene3/text-zh.png';
import Scene3TextBottom from '../../../assets/scene3/text-en.png';
import Scene3ChartImage1 from '../../../assets/scene3/chart-1.png';
import Scene3ChartImage2 from '../../../assets/scene3/chart-2.png';
import Scene3ChartImage3 from '../../../assets/scene3/chart-3.png';
import Scene3ChartImage4 from '../../../assets/scene3/chart-4.png';
import Scene3ChartImage5 from '../../../assets/scene3/chart-5.png';
import { ISceneSpec } from '../../../../../../vstory-core/src';

// @ts-ignore
export const scene3Characters: ICharacterSpec[] = [
  {
    type: 'Text',
    id: `scene3-title1`,
    zIndex: 1,
    position: {
      top: 100,
      left: 200
    },
    options: {
      graphic: { text: 'Proto Bar', fontSize: 55, fontWeight: 'bold', textAlign: 'left', textBaseline: 'middle' }
    }
  },
  {
    type: 'Line',
    id: `scene3-line-top`,
    zIndex: 1,
    position: {
      top: 102,
      left: 100,
      width: 500,
      height: 200
    },
    options: {
      graphic: {
        lineWidth: 1,
        points: [
          { x: 100, y: 34 },
          { x: 350, y: 34 }
        ]
      }
    }
  },
  {
    type: 'Line',
    id: `scene3-line-bottom`,
    zIndex: 1,
    position: {
      top: 130,
      left: 100,
      width: 500,
      height: 200
    },
    options: {
      graphic: {
        lineWidth: 1,
        points: [
          { x: 100, y: 34 },
          { x: 350, y: 34 }
        ]
      }
    }
  },
  {
    type: 'Text',
    id: `scene3-title-Nicole`,
    zIndex: 1,
    position: {
      top: 150,
      left: 200
    },
    options: {
      graphic: { text: 'Nicole Oresme', fontSize: 12, fontWeight: 'bold', textAlign: 'left', textBaseline: 'middle' }
    }
  },
  {
    type: 'Image',
    id: `scene3-text-image-top`,
    zIndex: 1,
    position: {
      top: 160,
      left: 560,
      width: 570,
      height: 65
    },
    options: {
      graphic: {
        image: Scene3TextTop
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-chart-image-1`,
    zIndex: 1,
    position: {
      top: 250,
      left: 560,
      width: 200,
      height: 160
    },
    options: {
      graphic: {
        image: Scene3ChartImage1
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-chart-image-2`,
    zIndex: 1,
    position: {
      top: 250,
      left: 780,
      width: 200,
      height: 160
    },
    options: {
      graphic: {
        image: Scene3ChartImage2
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-chart-image-3`,
    zIndex: 1,
    position: {
      top: 425,
      left: 560,
      width: 200,
      height: 160
    },
    options: {
      graphic: {
        image: Scene3ChartImage3
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-chart-image-4`,
    zIndex: 1,
    position: {
      top: 425,
      left: 780,
      width: 200,
      height: 160
    },
    options: {
      graphic: {
        image: Scene3ChartImage4
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-chart-image-5`,
    zIndex: 1,
    position: {
      top: 250,
      left: 1000,
      width: 200,
      height: 335
    },
    options: {
      graphic: {
        image: Scene3ChartImage5
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-text-image-bottom`,
    zIndex: 1,
    position: {
      top: 620,
      left: 560,
      width: 570,
      height: 60
    },
    options: {
      graphic: {
        image: Scene3TextBottom
      }
    }
  },
  {
    type: 'Text',
    id: `scene3-title-1486`,
    zIndex: 1,
    position: {
      top: 150,
      left: 420
    },
    options: {
      graphic: { text: '1486', fontSize: 12, fontWeight: 'bold', textAlign: 'left', textBaseline: 'middle' }
    }
  },
  {
    type: 'Image',
    id: `scene3-title-image`,
    zIndex: 1,
    position: {
      top: 180,
      left: 200,
      width: 250,
      height: 260
    },
    options: {
      graphic: {
        image: Scene3TitleImage
      }
    }
  },
  {
    type: 'Rect',
    id: `scene3-background`,
    zIndex: 0,
    position: {
      top: 0,
      left: 170,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#D9D4CA'
      }
    }
  },
  {
    type: 'Image',
    id: `scene3-background-decoration`,
    zIndex: 0,
    position: {
      top: 120,
      left: 270,
      width: 1000,
      height: 500
    },
    options: {
      graphic: {
        image: Scene3Decoration
      }
    }
  },
  // Bar Chart
  {
    type: 'VChart',
    id: `bar`,
    zIndex: 1,
    position: {
      top: 250,
      left: 900,
      width: 260,
      height: 335
    },
    options: {
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4
      },
      spec: {
        type: 'bar',
        title: {
          text: 'BarChart',
          orient: 'bottom',
          align: 'center',
          textStyle: {
            fontSize: 10,
            lineHeight: 10
          }
        },
        padding: [120, 60, 75, 60],
        data: [
          {
            id: 'data',
            values: [
              {
                x: '1',
                y: 100,
                type: 'Category1'
              },
              {
                x: '2',
                y: 100,
                type: 'Category1'
              },
              {
                x: '3',
                y: 100,
                type: 'Category1'
              },
              {
                x: '4',
                y: 100,
                type: 'Category1'
              },
              {
                x: '1',
                y: 100,
                type: 'Category2'
              },
              {
                x: '2',
                y: 100,
                type: 'Category2'
              },
              {
                x: '3',
                y: 100,
                type: 'Category2'
              },
              {
                x: '4',
                y: 100,
                type: 'Category2'
              }
            ]
          }
        ],
        xField: ['x', 'type'],
        yField: 'y',
        seriesField: 'type',
        bar: {
          style: {
            fill: {
              gradient: 'linear',
              stops: [
                {
                  offset: 1
                },
                {
                  offset: 0,
                  opacity: 0.6
                }
              ]
            }
          },
          state: {
            selected: {
              stroke: '#000',
              strokeWidth: 1
            }
          }
        },
        label: {
          style: {
            visible: false
          }
        },
        axes: [
          {
            orient: 'bottom',
            bandPadding: 0,
            paddingInner: 0,
            paddingOuter: 0,
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          },
          {
            orient: 'left',
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        ],
        animationUpdate: {
          easing: 'cubicInOut',
          duration: 1000
        },
        color: ['#4CC9E4', '#4954E6']
      }
    }
  }
];

export const scene3: ISceneSpec = {
  id: 'scene3',
  actions: [
    {
      characterId: `scene3-background`,
      characterActions: [
        {
          startTime: 0,
          action: 'appear',
          payload: {
            animation: {
              duration: 800,
              easing: 'easeInOutQuad',
              effect: ['fade', 'move'],
              move: { pos: 'right', isVariableSpeed: false }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-background-decoration`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: ['fade', 'move'],
              move: {
                pos: 'right'
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-title1`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-line-top`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-line-bottom`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-title-Nicole`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-title-1486`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-title-image`,
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              effect: 'move',
              easing: 'easeInOutQuad',
              move: {
                pos: 'right',
                isVariableSpeed: false
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-text-image-top`,
      characterActions: [
        {
          startTime: 300,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              effect: 'move',
              easing: 'easeInOutQuad',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-1`,
      characterActions: [
        {
          startTime: 330,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              effect: 'move',
              easing: 'easeInOutQuad',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          action: 'style',
          payload: {
            graphic: {
              width: 150
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-2`,
      characterActions: [
        {
          startTime: 330,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              effect: 'move',
              easing: 'easeInOutQuad',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          action: 'style',
          payload: {
            graphic: {
              width: 150,
              dx: -50
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-3`,
      characterActions: [
        {
          startTime: 330,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          action: 'style',
          payload: {
            graphic: {
              width: 150
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-4`,
      characterActions: [
        {
          startTime: 330,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          action: 'style',
          payload: {
            graphic: {
              width: 150,
              dx: -50
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-5`,
      characterActions: [
        {
          startTime: 330,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: 'easeInOutQuad',
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          action: 'style',
          payload: {
            graphic: {
              width: 260,
              dx: -100
            },
            animation: {
              duration: 1000,
              easing: 'easeInOutQuad'
            }
          }
        },
        {
          startTime: 3500,
          action: 'disappear',
          payload: {
            animation: {
              duration: 500,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-text-image-bottom`,
      characterActions: [
        {
          startTime: 360,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
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
    // Bar Chart
    {
      characterId: 'bar',
      characterActions: [
        {
          action: 'appear',
          startTime: 2500,
          payload: {
            animation: {
              duration: 1000,
              easing: 'cubicOut',
              fade: {
                opacity: 1,
                easing: 'linear'
              }
            }
          }
        },
        {
          action: 'update',
          startTime: 3500,
          payload: {
            id: 'data',
            duration: 1000,
            data: [
              {
                x: '1',
                y: 100,
                type: 'Category1'
              },
              {
                x: '2',
                y: 100,
                type: 'Category1'
              },
              {
                x: '3',
                y: 100,
                type: 'Category1'
              },
              {
                x: '4',
                y: 100,
                type: 'Category1'
              }
            ].map((v, index) => {
              return {
                sourceValue: v,
                targetValue: {
                  ...v,
                  y: (index + 1) * 10
                }
              };
            })
          }
        },
        {
          action: 'update',
          startTime: 4500,
          payload: {
            duration: 1000,
            id: 'data',
            data: [
              {
                x: '1',
                y: 100,
                type: 'Category2'
              },
              {
                x: '2',
                y: 100,
                type: 'Category2'
              },
              {
                x: '3',
                y: 100,
                type: 'Category2'
              },
              {
                x: '4',
                y: 100,
                type: 'Category2'
              }
            ]
              .slice(0, 4)
              .map((v, index) => {
                return {
                  sourceValue: v,
                  targetValue: {
                    ...v,
                    y: (index + 1) * 10
                  }
                };
              })
          }
        },
        {
          action: 'update',
          startTime: 5500,
          payload: {
            id: 'data',
            duration: 1000,
            data: [
              {
                x: '1',
                y: 100,
                type: 'Category1'
              },
              {
                x: '2',
                y: 100,
                type: 'Category1'
              },
              {
                x: '3',
                y: 100,
                type: 'Category1'
              },
              {
                x: '4',
                y: 100,
                type: 'Category1'
              },
              {
                x: '1',
                y: 100,
                type: 'Category2'
              },
              {
                x: '2',
                y: 100,
                type: 'Category2'
              },
              {
                x: '3',
                y: 100,
                type: 'Category2'
              },
              {
                x: '4',
                y: 100,
                type: 'Category2'
              }
            ].map((v, index) => {
              return {
                sourceValue: {
                  ...v,
                  y: ((index % 4) + 1) * 10
                },
                targetValue: {
                  ...v,
                  y: 100
                }
              };
            })
          }
        },
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              easing: 'cubicInOut',
              duration: 1000,
              fade: {
                opacity: 0.1,
                isBaseOpacity: true
              }
            }
          }
        }
      ]
    },
    // transition
    {
      characterId: `scene3-title1`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-line-top`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-line-bottom`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-title-Nicole`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-title-1486`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-title-image`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
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
      characterId: `scene3-text-image-top`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-1`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-2`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-3`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-4`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          duration: 700,
          payload: {
            animation: {
              duration: 700,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-chart-image-5`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-text-image-bottom`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-background-decoration`,
      characterActions: [
        {
          action: 'disappear',
          startTime: 6500,
          payload: {
            animation: {
              duration: 700
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-background`,
      characterActions: [
        {
          action: 'moveTo',
          startTime: 6500,
          payload: {
            destination: {
              x: 0,
              y: 0
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
      characterId: `timeline`,
      characterActions: [
        {
          startTime: 0,
          action: 'moveTo',
          payload: {
            destination: {
              x: 900,
              y: 60
            },
            animation: {
              duration: 500
            }
          }
        },
        {
          startTime: 0,
          action: 'scaleTo',
          payload: {
            scale: {
              scaleX: 0.8,
              scaleY: 0.8
            },
            animation: {
              duration: 500
            }
          }
        },
        {
          startTime: 0,
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 500,
              easing: 'linear'
            }
          }
        },
        {
          startTime: 600, // FIXME: 紧接着上一个 action 的 500 时不生效
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 6400,
              easing: 'linear'
            }
          }
        }
      ]
    }
  ]
};
