import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';

import Scene3TitleImage from '../../assets/scene3/title-image.png';
import Scene3Decoration from '../../assets/scene3/decoration.png';
import Scene3TextTop from '../../assets/scene3/text-zh.png';
import Scene3TextBottom from '../../assets/scene3/text-en.png';
import Scene3ChartImage1 from '../../assets/scene3/chart-1.png';
import Scene3ChartImage2 from '../../assets/scene3/chart-2.png';
import Scene3ChartImage3 from '../../assets/scene3/chart-3.png';
import Scene3ChartImage4 from '../../assets/scene3/chart-4.png';
import Scene3ChartImage5 from '../../assets/scene3/chart-5.png';

import { easeInOutQuad } from './util';
// @ts-ignore
export const scene3Characters: ICharacterSpec[] = [
  {
    type: 'TextComponent',
    id: `scene3-title1`,
    zIndex: 1,
    position: {
      top: 100,
      left: 200,
      width: 500,
      height: 200
    },
    options: {
      graphic: { text: 'Proto Bar', fontSize: 55, fontWeight: 'bold', textAlign: 'left' }
    }
  },
  {
    type: 'LineComponent',
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
    type: 'LineComponent',
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
    type: 'TextComponent',
    id: `scene3-title-Nicole`,
    zIndex: 1,
    position: {
      top: 150,
      left: 200,
      width: 500,
      height: 200
    },
    options: {
      graphic: { text: 'Nicole Oresme', fontSize: 12, fontWeight: 'bold', textAlign: 'left' }
    }
  },
  {
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'ImageComponent',
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
    type: 'TextComponent',
    id: `scene3-title-1486`,
    zIndex: 1,
    position: {
      top: 150,
      left: 420,
      width: 500,
      height: 200
    },
    options: {
      graphic: { text: '1486', fontSize: 12, fontWeight: 'bold', textAlign: 'left' }
    }
  },
  {
    type: 'ImageComponent',
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
    type: 'RectComponent',
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
    type: 'ImageComponent',
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
    type: 'BarChart',
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
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
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
                bandPadding: 0
              }
            ],
            animationUpdate: {
              easing: 'cubicInOut',
              duration: 1000
            }
          }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'bottom', bandPadding: 0, paddingInner: 0, paddingOuter: 0 },
          spec: {
            bandPadding: 0,
            paddingInner: 0,
            paddingOuter: 0,
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'left' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        }
      ],
      color: ['#4CC9E4', '#4954E6'],
      attribute: {}
    }
  }
];

export const scene3: ISceneSpec = {
  id: 'scene3',
  actions: [
    // 第二个 scene 的内容，写在这里仅用作测试
    {
      characterId: `scene3-background`,
      characterActions: [
        {
          startTime: 1,
          duration: 800,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right'
              }
            }
          }
        }
      ]
    },
    {
      characterId: `scene3-background-decoration`,
      characterActions: [
        {
          startTime: 1,
          duration: 800,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right'
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
          startTime: 1,
          duration: 700,
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          startTime: 1,
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          startTime: 1,
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          startTime: 1,
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          startTime: 1,
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          startTime: 1,
          duration: 700,
          action: 'appear',
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              move: {
                from: 'right',
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
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
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
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          duration: 1000,
          action: 'style',
          payload: {
            graphic: {
              width: 150
            },
            animation: {
              duration: 1000,
              easing: easeInOutQuad
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
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          duration: 1000,
          action: 'style',
          payload: {
            graphic: {
              width: 150,
              dx: -50
            },
            animation: {
              duration: 1000,
              easing: easeInOutQuad
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
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          duration: 1000,
          action: 'style',
          payload: {
            graphic: {
              width: 150
            },
            animation: {
              duration: 1000,
              easing: easeInOutQuad
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
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          duration: 1000,
          action: 'style',
          payload: {
            graphic: {
              width: 150,
              dx: -50
            },
            animation: {
              duration: 1000,
              easing: easeInOutQuad
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
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
              }
            }
          }
        },
        {
          startTime: 1500,
          duration: 1000,
          action: 'style',
          payload: {
            graphic: {
              width: 260,
              dx: -100
            },
            animation: {
              duration: 1000,
              easing: easeInOutQuad
            }
          }
        },
        {
          startTime: 3500,
          duration: 500,
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
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'bottom'
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
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              easing: 'cubicOut',
              effect: 'grow',
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
          duration: 1000,
          payload: {
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
          duration: 1000,
          payload: {
            id: 'data',
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
          duration: 1000,
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
              move: {
                to: 'bottom'
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
              move: {
                to: 'bottom'
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
              move: {
                to: 'bottom'
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
              move: {
                to: 'bottom'
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
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              move: {
                to: 'bottom'
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
              move: {
                to: 'bottom'
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
      characterId: `scene3-chart-image-1`,
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
      characterId: `scene3-chart-image-2`,
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
      characterId: `scene3-chart-image-3`,
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
      characterId: `scene3-text-image-bottom`,
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
      characterId: `scene3-background-decoration`,
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
      characterId: `scene3-background`,
      characterActions: [
        {
          action: 'moveTo',
          startTime: 6500,
          duration: 700,
          destination: {
            x: 0,
            y: 0
          },
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad
            }
          }
        }
      ]
    }
  ]
};
