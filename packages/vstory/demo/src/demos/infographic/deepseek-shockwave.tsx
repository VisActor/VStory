import React, { useEffect } from 'react';
import { IStoryDSL, Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';
import bg from '../../assets/infographic/deepseek-shockwave/bg.png';

registerAll();
export const DeepseekShockwave = () => {
  const id = 'DeepseekShockwave';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 700;
    container?.appendChild(canvas);

    const dataValues = [
      { company: 'AVGO', date: 'January 24th', price: 244.7 },
      { company: 'Nvidia', date: 'January 24th', price: 142.62 },
      { company: 'AMD', date: 'January 24th', price: 122.84 },

      { company: 'AVGO', date: 'January 27th', price: 202.13 },
      { company: 'Nvidia', date: 'January 27th', price: 118.42 },
      { company: 'AMD', date: 'January 27th', price: 115.01 }
    ];
    const marklineData = [0, 1, 2].map(i => {
      return {
        datas: [dataValues[i], dataValues[i + 3]],
        percent: (dataValues[i].price - dataValues[i + 3].price) / dataValues[i].price
      };
    });
    const spec = {
      type: 'bar',
      data: [
        {
          id: 'barData',
          values: dataValues
        }
      ],
      xField: ['company', 'date'],
      yField: 'price',
      seriesField: 'date',
      axes: [
        {
          orient: 'left',
          min: 100,
          max: 300,
          visible: false
        },
        {
          orient: 'bottom',
          domainLine: {
            style: {
              stroke: '#000'
            }
          },
          tick: {
            visible: false
          },
          label: {
            style: {
              fill: '#000',
              fontSize: 16
            }
          }
        }
      ],
      markLine: marklineData.map(lineData => {
        return {
          type: 'type-step',
          coordinates: lineData.datas,
          connectDirection: 'top',
          expandDistance: 30,
          line: {
            style: {
              lineDash: [0],
              lineWidth: 2,
              stroke: '#000',
              cornerRadius: 4
            }
          },
          label: {
            position: 'middle',
            text: `-${lineData.percent.toFixed(2) * 100}%`,
            labelBackground: {
              padding: { left: 4, right: 4, top: 4, bottom: 4 },
              style: {
                fill: '#fff',
                fillOpacity: 1,
                stroke: '#000',
                lineWidth: 1,
                cornerRadius: 4
              }
            },
            style: {
              fill: '#000'
            }
          },
          endSymbol: {
            size: 12,
            refX: -4
          }
        };
      }),
      legends: {
        visible: true,
        orient: 'bottom',
        position: 'middle',
        item: {
          label: {
            style: {
              fill: '#000',
              fontSize: 16
            }
          }
        }
      }
    };

    const dsl: IStoryDSL = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: ['background'],
                  characterActions: [
                    {
                      action: 'appear'
                    }
                  ]
                },
                {
                  characterId: ['title', 'subTitle'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 400,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['chart'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 700,
                      payload: [
                        {
                          selector: ':not(bar)',
                          animation: {
                            duration: 100,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    },
                    {
                      action: 'appear',
                      startTime: 700,
                      payload: [
                        {
                          selector: 'bar',
                          animation: {
                            duration: 300,
                            easing: 'linear',
                            effect: 'grow'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['desc1'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1200,
                      payload: [
                        {
                          animation: {
                            duration: 800,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['desc2'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 2000,
                      payload: [
                        {
                          animation: {
                            duration: 800,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      characters: [
        {
          id: 'background',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 1024,
            height: 700
          },
          options: {
            graphic: {
              image: bg,
              fillOpacity: 0.2
            }
          }
        },
        {
          id: 'title',
          type: 'Text',
          zIndex: 1,
          position: {
            x: 512,
            y: 50,
            width: 1024,
            height: 200
          },
          options: {
            graphic: {
              text: [`DeepSeek's shockwave`, '\n', `AI's technological revolution`],
              fill: 'black',
              fontSize: 48,
              textAlign: 'center',
              fontWeight: 'bolder'
            }
          }
        },
        {
          id: 'subTitle',
          type: 'Text',
          zIndex: 1,
          position: {
            x: 250,
            y: 200,
            width: 400,
            height: 100
          },
          options: {
            graphic: {
              text: [`When Algorithms Crack`, '\n', `the Silicon Fortress`],
              fill: '#101010',
              fontSize: 28,
              textAlign: 'center',
              fontWeight: 'bolder'
            }
          }
        },
        {
          id: 'desc1',
          type: 'Text',
          zIndex: 1,
          position: {
            x: 540,
            y: 220,
            width: 400,
            height: 400
          },
          options: {
            graphic: {
              text: `DeepSeek's breakthrough exposes a seismic shift in computing economics. The synchronized collapse of chip leaders signals that AI's next phase may bypass brute-force hardware scaling.`,
              fill: '#101010',
              fontSize: 22,
              textAlign: 'left',
              fontWeight: 'bolder'
            }
          }
        },
        {
          id: 'desc2',
          type: 'Text',
          zIndex: 1,
          position: {
            x: 540,
            y: 410,
            width: 400,
            height: 400
          },
          options: {
            graphic: {
              text: ` NVIDIA's historic plunge—its worst performance since the crypto-mining crash—mirrors Wall Street's awakening: when algorithms can achieve 10x training efficiency, the semiconductor industry must reinvent its value proposition. This is a Copernican revolution in AI infrastructure.`,
              fill: '#101010',
              fontSize: 22,
              textAlign: 'left',
              fontWeight: 'bolder'
            }
          }
        },
        {
          id: 'chart',
          type: 'VChart',
          zIndex: 1,
          position: {
            x: 50,
            y: 250,
            width: 400,
            height: 400
          },
          options: {
            spec: spec
          }
        }
      ]
    };

    const story = new Story(dsl, {
      canvas,
      width: 1024,
      height: 700,
      scaleX: 'auto',
      scaleY: 'auto'
    });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
