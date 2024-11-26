import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDSL() {
  const mockData: any = [];
  const types = ['A', 'B', 'C'];

  types.forEach(type => {
    for (let i = 1; i <= 12; i++) {
      mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
    }
  });

  const bar1 = {
    type: 'bar',
    data: [
      {
        id: 'id0',
        values: mockData
      }
    ],
    xField: ['month', 'type'],
    yField: 'value',
    seriesField: 'type',
    legends: { visible: true }
  };

  const area1 = {
    type: 'area',
    data: [
      {
        id: 'id0',
        values: mockData.filter((item: any) => item.type !== 'C')
      }
    ],
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    line: {
      style: {
        curveType: 'monotone'
      }
    },
    legends: { visible: true }
  };

  const radar1 = {
    type: 'radar',
    data: [
      {
        values: mockData
      }
    ],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    point: {
      visible: false
    },
    area: {
      visible: true,
      style: {
        fillOpacity: 0.15,
        curveType: 'catmullRomClosed',
        curveTension: 0.6
      }
    },
    line: {
      visible: true,
      style: {
        curveType: 'catmullRomClosed',
        curveTension: 0.6
      }
    },
    legends: {
      visible: true,
      orient: 'top'
    }
  };

  const rose1 = {
    type: 'rose',
    data: [
      {
        values: mockData
      }
    ],
    categoryField: 'month',
    valueField: 'value',
    seriesField: 'type',
    outerRadius: 1,
    stack: true,
    legends: [{ visible: true }],
    axes: [
      {
        orient: 'angle',
        bandPadding: 0.02
      }
    ]
  };

  const gauge1 = {
    type: 'gauge',
    data: [
      {
        id: 'id0',
        values: [
          {
            type: '目标A',
            value: 0.6
          }
        ]
      }
    ],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.8,
    innerRadius: 0.5,
    startAngle: -225,
    endAngle: 45
  };

  return {
    characters: [
      {
        type: 'Text',
        id: 'Title',
        zIndex: 3,
        position: {
          top: 100,
          left: 1920 / 2,
          width: 1920,
          height: 90
        },
        options: {
          graphic: {
            fontSize: 70,
            wordBreak: 'break-word',
            textAlign: 'center',
            textBaseline: 'bottom',
            fill: 'black',
            fontWeight: 200,
            text: 'VStory简易仪表盘'
          }
        }
      },
      {
        type: 'WaveScatter',
        id: 'wave-scatter',
        zIndex: 1,
        position: {
          top: 130,
          left: 30,
          width: 600,
          height: 630
        },
        options: {
          data: {
            values: mockData.filter((item: any) => item.type === 'A')
          },
          categoryField: 'month',
          valueField: 'value',
          /* 水波动画的配置 */
          waveDuration: 2000,
          waveRatio: 0.00525,
          waveColor: '#0099ff',
          background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
          amplitude: 10,
          frequency: 2,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 8,
            clip: true
          }
        }
      },
      {
        type: 'VChart',
        id: 'radar1',
        zIndex: 3,
        position: {
          top: 130,
          left: 660,
          width: 600,
          height: 630
        },
        options: {
          spec: radar1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'rose1',
        zIndex: 3,
        position: {
          top: 130,
          left: 1290,
          width: 600,
          height: 630
        },
        options: {
          spec: rose1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'gauge1',
        zIndex: 3,
        position: {
          top: 790,
          left: 30,
          width: 600,
          height: 260
        },
        options: {
          spec: gauge1,
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'bar1',
        zIndex: 3,
        position: {
          top: 790,
          left: 660,
          width: 600,
          height: 260
        },
        options: {
          spec: bar1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      },
      {
        type: 'VChart',
        id: 'area1',
        zIndex: 3,
        position: {
          top: 790,
          left: 1290,
          width: 600,
          height: 260
        },
        options: {
          spec: area1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
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
              {
                characterId: ['Title', 'area1', 'radar1', 'gauge1', 'wave-scatter'],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 2000
                      }
                    }
                  }
                ]
              },
              {
                characterId: ['bar1', 'rose1'],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 3000,
                        oneByOne: true,
                        dimensionCount: mockData.length
                      }
                    }
                  }
                ]
              },
              {
                characterId: ['area1', 'radar1', 'bar1', 'rose1', 'gauge1', 'wave-scatter'],
                characterActions: [
                  {
                    action: 'bounce',
                    payload: {
                      animation: {
                        duration: 2000,
                        easing: 'quadOut'
                      },
                      type: 'bounce4',
                      flipY: true
                      // dy: 30,
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

export const VScreen = () => {
  const id = 'VScreen';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      width: 1920 / 2,
      height: 1080 / 2,
      background: 'rgb(245, 246, 247)',
      scaleX: 0.5,
      scaleY: 0.5
    });
    const player = new Player(story);
    story.init(player);

    loadDSL().then(dsl => {
      story.load(dsl);
      player.play(-1);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
