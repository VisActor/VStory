import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const LineChartArrange = () => {
  const id = 'LineChartArrange';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const USA = [
      {
        type: 'Nail polish',
        country: 'USA',
        value: 12814
      },
      {
        type: 'Eyebrow pencil',
        country: 'USA',
        value: 13012
      },
      {
        type: 'Rouge',
        country: 'USA',
        value: 11624
      },
      {
        type: 'Lipstick',
        country: 'USA',
        value: 8814
      },
      {
        type: 'Eyeshadows',
        country: 'USA',
        value: 12998
      },
      {
        type: 'Eyeliner',
        country: 'USA',
        value: 12321
      },
      {
        type: 'Foundation',
        country: 'USA',
        value: 10342
      },
      {
        type: 'Lip gloss',
        country: 'USA',
        value: 22998
      },
      {
        type: 'Mascara',
        country: 'USA',
        value: 11261
      }
    ].map(item => ({ ...item, value: 1000 + Math.random() * 1000 }));

    const EU = [
      {
        type: 'Nail polish',
        country: 'EU',
        value: 4376
      },
      {
        type: 'Eyebrow pencil',
        country: 'EU',
        value: 3987
      },
      {
        type: 'Rouge',
        country: 'EU',
        value: 3574
      },
      {
        type: 'Lipstick',
        country: 'EU',
        value: 4376
      },
      {
        type: 'Eyeshadows',
        country: 'EU',
        value: 4572
      },
      {
        type: 'Eyeliner',
        country: 'EU',
        value: 3417
      },
      {
        type: 'Foundation',
        country: 'EU',
        value: 5231
      },
      {
        type: 'Lip gloss',
        country: 'EU',
        value: 4572
      },
      {
        type: 'Mascara',
        country: 'EU',
        value: 6134
      }
    ].map(item => ({ ...item, value: 2000 + Math.random() * 1000 }));

    const China = [
      {
        type: 'Nail polish',
        country: 'China',
        value: 3054
      },
      {
        type: 'Eyebrow pencil',
        country: 'China',
        value: 5067
      },
      {
        type: 'Rouge',
        country: 'China',
        value: 7004
      },
      {
        type: 'Lipstick',
        country: 'China',
        value: 9054
      },
      {
        type: 'Eyeshadows',
        country: 'China',
        value: 12043
      },
      {
        type: 'Eyeliner',
        country: 'China',
        value: 15067
      },
      {
        type: 'Foundation',
        country: 'China',
        value: 10119
      },
      {
        type: 'Lip gloss',
        country: 'China',
        value: 12043
      },
      {
        type: 'Mascara',
        country: 'China',
        value: 10419
      }
    ].map(item => ({ ...item, value: 3000 + Math.random() * 1000 }));

    const Africa = [
      {
        type: 'Nail polish',
        country: 'Africa',
        value: 4229
      },
      {
        type: 'Eyebrow pencil',
        country: 'Africa',
        value: 3932
      },
      {
        type: 'Rouge',
        country: 'Africa',
        value: 5221
      },
      {
        type: 'Lipstick',
        country: 'Africa',
        value: 9256
      },
      {
        type: 'Eyeshadows',
        country: 'Africa',
        value: 3308
      },
      {
        type: 'Eyeliner',
        country: 'Africa',
        value: 5432
      },
      {
        type: 'Foundation',
        country: 'Africa',
        value: 13701
      },
      {
        type: 'Lip gloss',
        country: 'Africa',
        value: 4008
      },
      {
        type: 'Mascara',
        country: 'Africa',
        value: 18712
      }
    ].map(item => ({ ...item, value: 4000 + Math.random() * 1000 }));

    const spec = {
      type: 'common',
      series: [USA, EU, China, Africa].map((item, i) => ({
        type: 'line',
        id: 'line' + i,
        data: {
          id: '' + i,
          values: item
        },
        point: {
          visible: false
        },
        xField: 'type',
        yField: 'value'
      })),
      axes: [
        {
          orient: 'left',
          type: 'linear'
        },
        {
          orient: 'bottom',
          type: 'band'
        }
      ]
    };

    console.log(spec);

    const dsl = {
      characters: [
        {
          type: 'VChart',
          id: 'bar-line-series',
          position: {
            top: 50,
            left: 50,
            width: 500,
            height: 300
          },
          options: {
            spec,
            panel: {
              fill: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 4,
              cornerRadius: 8
            }
          }
        }
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                {
                  characterId: 'bar-line-series',
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          selector: ':not(line)',
                          animation: {
                            duration: 1000,
                            easing: 'linear'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          selector: '#line0',
                          animation: {
                            duration: 1000,
                            easing: 'linear'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 1000,
                      action: 'appear',
                      payload: [
                        {
                          selector: '#line1',
                          animation: {
                            duration: 1000,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 2000,
                      action: 'appear',
                      payload: [
                        {
                          selector: '#line2',
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'growPoints',
                            params: {
                              direction: 'vertical'
                            }
                          }
                        }
                      ]
                    },
                    {
                      startTime: 3000,
                      action: 'appear',
                      payload: [
                        {
                          selector: '#line3',
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'growPoints',
                            params: {
                              direction: 'horizontal'
                            }
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
