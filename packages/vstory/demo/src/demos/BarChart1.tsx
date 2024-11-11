import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerTextAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerTextAction();
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
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          selector: ':not(bar)',
                          animation: {
                            duration: 2000,
                            easing: 'linear'
                            // effect: 'fade'
                          } as any
                        }
                      ]
                    },
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          selector: 'bar',
                          animation: {
                            duration: 3000,
                            easing: 'linear',
                            effect: 'barLeap',
                            oneByOne: true,
                            dimensionCount: 5
                          } as any
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
          id: '0',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 100,
            y: 100,
            width: 300,
            height: 300,
            angle: 0
          },
          options: {
            panel: {
              fill: 'white'
            },
            spec: chartSpec
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    console.log(story);
    player.play(1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
