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

    const typeList = [
      'Nail polish',
      'Eyebrow pencil',
      'Rouge',
      'Lipstick',
      'Eyeshadows',
      'Eyeliner',
      'Foundation',
      'Lip gloss',
      'Mascara'
    ];
    const USA = typeList.map((item, i) => ({
      type: item,
      country: 'USA',
      value: Math.random() * 1000
    }));
    const EU = typeList.map((item, i) => ({
      type: item,
      country: 'EU',
      value: 1000 + Math.random() * 1000
    }));
    const China = typeList.map((item, i) => ({
      type: item,
      country: 'China',
      value: 2000 + Math.random() * 1000
    }));
    const Africa = typeList.map((item, i) => ({
      type: item,
      country: 'Africa',
      value: 3000 + Math.random() * 1000
    }));

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
