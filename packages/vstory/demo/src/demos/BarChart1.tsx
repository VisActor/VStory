import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const BarChart1 = () => {
  const id = 'BarChart1';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const chartSpec = {
      type: 'bar',
      animation: false,
      data: [
        {
          id: 'barData',
          values: [
            { month: 'Monday', sales: 22 },
            { month: 'Tuesday', sales: 13 },
            { month: 'Wednesday', sales: 25 },
            { month: 'Thursday', sales: 29 },
            { month: 'Friday', sales: 38 }
          ]
        }
      ],
      label: {
        animation: false
      },
      xField: 'month',
      yField: 'sales'
    };

    const spec = {
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
    };

    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: '0',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
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
                      startTime: 1500,
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
                }
              ]
            }
          ]
        }
      ],
      characters: [
        {
          type: 'VChart',
          id: `0`,
          zIndex: 1,
          position: {
            top: 100,
            left: 199,
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
            spec
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    console.log(story);
    player.play(0);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
