import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const BasicUnit = () => {
  const id = 'BasicUnit';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl: any = {
      characters: [
        {
          type: 'Unit',
          id: 'unit-test',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 1200,
            height: 1000
          },
          options: {
            graphic: {
              fill: '#f1f1f0',
              padding: {
                top: 100,
                bottom: 100,
                right: 50,
                left: 50
              },
              count: 250,
              units: [
                {
                  range: [0, 66],
                  style: {
                    symbolType: 'rect',
                    fill: '#4e8ae0'
                  }
                },
                {
                  range: [66],
                  style: {
                    symbolType: 'circle',
                    fill: '#f6c86d'
                  }
                }
              ],
              gap: [0.5, 0.75],
              aspect: 1,
              direction: 'vertical'
            }
          }
        }
      ],
      acts: [
        {
          id: 'page1',
          scenes: [
            {
              id: '1',
              actions: [
                {
                  characterId: 'unit-test',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: {
                        animation: {
                          duration: 1000,
                          easing: 'linear',
                          effect: 'default'
                        }
                      }
                    },
                    {
                      action: 'style',
                      startTime: 1000,
                      payload: {
                        animation: {
                          duration: 1000,
                          easing: 'linear',
                          effect: 'default',
                          stagger: {
                            enable: true
                          }
                        },
                        graphic: {
                          units: [
                            {
                              range: [0, 66],
                              style: {
                                symbolType: 'rect',
                                fill: '#4e8ae0'
                              }
                            },
                            {
                              range: [66, 99],
                              style: {
                                symbolType: 'circle',
                                fill: '#f6c86d'
                              }
                            },
                            {
                              range: [99],
                              style: {
                                symbolType: 'circle',
                                fill: '#6638f0'
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      action: 'style',
                      startTime: 6000,
                      payload: {
                        animation: {
                          duration: 2000,
                          easing: 'linear',
                          effect: 'default',
                          stagger: {
                            enable: true
                          }
                        },
                        graphic: {
                          units: [
                            {
                              range: [],
                              style: {
                                fill: '#4af2a1'
                              }
                            }
                          ]
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
    };

    const story = new Story(dsl, { canvas, width: 800, height: 500, background: 'pink', scaleX: 0.5, scaleY: 0.5 });
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
