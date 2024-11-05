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
  const canvas = createRef();

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

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
                          // selector: 'cartesianAxis-band',
                          animation: {
                            duration: 2000,
                            easing: 'linear'
                          } as any
                        }
                      ]
                    }
                    // {
                    //   startTime: 2000,
                    //   action: 'appear',
                    //   payload: [
                    //     {
                    //       selector: 'cartesianAxis-linear',
                    //       animation: {
                    //         duration: 2000,
                    //         easing: 'linear'
                    //       } as any
                    //     }
                    //   ]
                    // },
                    // {
                    //   startTime: 4000,
                    //   action: 'appear',
                    //   payload: [
                    //     {
                    //       selector: ':not(cartesianAxis-band) :not(cartesianAxis-linear)',
                    //       animation: {
                    //         duration: 2000,
                    //         easing: 'linear'
                    //       } as any
                    //     }
                    //   ]
                    // }
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

    const story = new Story(dsl, { canvas: canvas.current, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    console.log(story);
    player.play();

    return () => {
      story.release();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} id={id}>
      <canvas ref={canvas as any}></canvas>
    </div>
  );
};
