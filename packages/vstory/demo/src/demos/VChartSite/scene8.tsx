import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene8Text from '../../assets/scene8/text.png';
import scene8Chart from '../../assets/scene8/chart.png';
import scene8Title from '../../assets/scene8/title.png';
import scene8BgDecoration from '../../assets/scene8/bg-decoration.png';
import scene8Image1 from '../../assets/scene8/image1.png';
import scene8Image2 from '../../assets/scene8/image2.png';
import { easeInOutElastic, easeInOutQuad } from './util';

const chartSpec = {
  type: 'scatter',
  padding: { left: 6, right: 30 },
  xField: 'year',
  yField: 'value',
  tooltip: {
    dimension: {
      visible: false
    },
    mark: {
      visible: false
    }
  },
  crosshair: {
    yField: {
      visible: false
    },
    xField: {
      visible: false
    }
  },
  point: {
    style: {
      fill: 'black',
      size: 4,
      outerBorder: (data: any) => {
        if (data.border) {
          return {
            distance: 2,
            lineWidth: 1,
            stroke: 'black',
            strokeOpacity: 0.4
          };
        }
      }
    }
  },
  axes: [
    {
      title: {
        visible: true,
        text: 'Poisition Angle(deg.)',
        style: { fill: 'black', fontSize: 8 }
      },
      orient: 'left',
      min: 80,
      max: 170,
      niceType: 'accurateFirst',
      tick: { visible: true, forceTickCount: 10, style: { stroke: 'black' } },
      subTick: { visible: true, tickCount: 5, style: { stroke: 'black' } },
      domainLine: { visible: true, style: { stroke: 'black' } },
      label: { visible: true, style: { fill: 'black', fontSize: 8 } },
      grid: { visible: false },
      type: 'linear'
    },
    {
      title: {
        visible: true,
        text: 'Year',
        style: { fill: 'black', fontSize: 8 }
      },
      orient: 'bottom',
      label: { visible: true, style: { fill: 'black', fontSize: 8 } },
      domainLine: { visible: true, style: { stroke: 'black' } },
      tick: { visible: true, forceTickCount: 14, style: { stroke: 'black' } },
      subTick: { visible: true, tickCount: 1, style: { stroke: 'black' } },
      grid: { visible: false },
      type: 'linear',
      min: 1710,
      max: 1840,
      step: 10
    },
    {
      orient: 'top',
      label: { visible: false, style: { fill: 'black' } },
      domainLine: { visible: true, style: { stroke: 'black' } },
      tick: { visible: false, forceTickCount: 14, style: { stroke: 'black' } },
      subTick: { visible: false, tickCount: 1, style: { stroke: 'black' } },
      grid: { visible: false },
      type: 'linear',
      min: 1710,
      max: 1840,
      step: 10
    },
    {
      orient: 'right',
      label: { visible: false, style: { fill: 'black' } },
      domainLine: { visible: true, style: { stroke: 'black' } },
      tick: { visible: false, forceTickCount: 14, style: { stroke: 'black' } },
      subTick: { visible: false, tickCount: 1, style: { stroke: 'black' } },
      grid: { visible: false },
      type: 'linear',
      min: 80,
      max: 170
    }
  ],
  data: [
    {
      id: 'data',
      values: [
        { year: 1718, value: 139 },
        { year: 1720, value: 162, border: true },
        { year: 1756, value: 146, border: true },
        { year: 1782, value: 132, border: true },
        { year: 1803, value: 120, border: true },
        { year: 1820, value: 105, border: true },
        { year: 1822, value: 102, border: true },
        { year: 1822.5, value: 101, border: true },
        { year: 1825, value: 97, border: true },
        { year: 1825.5, value: 96, border: true },
        { year: 1830, value: 82, border: true }
      ]
    }
  ]
};

export const scene8Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene8-background`,
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
        fill: 'rgb(34,34,34)'
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-bg-decoration`,
    zIndex: 0,
    position: {
      top: 80,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        image: scene8BgDecoration
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-title`,
    zIndex: 0,
    position: {
      top: 156,
      left: 126,
      width: 426,
      height: 144
    },
    options: {
      graphic: {
        image: scene8Title
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-text`,
    zIndex: 0,
    position: {
      top: 472,
      left: 128,
      width: 336,
      height: 248
    },
    options: {
      graphic: {
        image: scene8Text
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-chart-image`,
    zIndex: 0,
    position: {
      top: 190,
      left: 882,
      width: 373,
      height: 337
    },
    options: {
      graphic: {
        image: scene8Chart
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-image1`,
    zIndex: 0,
    position: {
      top: 358,
      left: 590,
      width: 280,
      height: 453
    },
    options: {
      graphic: {
        image: scene8Image1
      }
    }
  },
  {
    type: 'Image',
    id: `scene8-image2`,
    zIndex: 0,
    position: {
      top: 514,
      left: 1066,
      width: 190,
      height: 226
    },
    options: {
      graphic: {
        image: scene8Image2
      }
    }
  },
  {
    type: 'VChart',
    id: `scene8-chart`,
    zIndex: 0,
    position: {
      top: 210,
      left: 890,
      width: 360,
      height: 290
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: 'white'
      }
    }
  }
];

export const scene8: ISceneSpec = {
  id: 'scene8',
  delay: -500,
  actions: [
    {
      characterId: 'scene8-background',
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
                from: 'bottom'
              }
            }
          }
        },
        {
          action: 'style',
          startTime: 1,
          duration: 700,
          payload: {
            graphic: {
              fill: 'rgb(30,34,33)'
            },
            animation: {
              duration: 700,
              easing: easeInOutQuad
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-bg-decoration',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 800,
          payload: {
            animation: {
              duration: 800,
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
      characterId: 'scene8-title',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 800,
          payload: {
            animation: {
              duration: 800,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-text',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 800,
          payload: {
            animation: {
              duration: 800,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-image1',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 1500,
          payload: {
            animation: {
              duration: 1500,
              easing: easeInOutElastic,
              move: {
                from: 'bottom-left'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-chart-image',
      characterActions: [
        {
          action: 'appear',
          startTime: 200,
          duration: 1500,
          payload: {
            animation: {
              duration: 1500,
              easing: easeInOutElastic,
              move: { from: 'top-right' }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-image2',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 1500,
          payload: {
            animation: {
              duration: 1500,
              easing: easeInOutElastic,
              move: { from: 'bottom-right' }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene8-chart',
      characterActions: [
        {
          action: 'appear',
          startTime: 2500,
          duration: 700,
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        },
        {
          action: 'disappear',
          startTime: 5200,
          duration: 700,
          payload: {
            animation: {
              duration: 700,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    }
  ]
};

scene8.actions.forEach(({ characterId, characterActions }) => {
  characterActions.push({
    action: 'disappear',
    startTime: characterId === 'scene8-background' ? 7500 : 7000,
    duration: 500,
    payload: {
      animation: {
        duration: 500,
        easing: easeInOutQuad,
        effect: 'fade'
      }
    }
  });
});
