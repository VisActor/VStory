import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { exportVideo } from '../utils';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const Pie1 = () => {
  const id = 'Pie1';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const spec = {
      type: 'pie',
      background: 'transparent',
      data: [
        {
          id: 'id0',
          values: [{ type: 'total', value: '100' }]
        }
      ],
      outerRadius: 0.8,
      valueField: 'value',
      categoryField: 'type',
      pie: {
        style: {
          fill: datum => {
            return datum.type === 'total' ? '#0509fd' : 'grey';
          },
          stroke: 'white',
          lineWidth: 1
        }
      },
      legends: {
        visible: false,
        orient: 'left'
      },
      label: {
        visible: false
      }
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
                        id: 'id0',
                        duration: 1000,
                        values: [
                          { type: 'shebao', value: '4.6' },
                          { type: 'total', value: '100' }
                        ]
                      }
                    },
                    {
                      action: 'update',
                      startTime: 2500,
                      payload: {
                        duration: 1000,
                        id: 'id0',
                        values: [
                          { type: 'shebao', value: '4.6' },
                          { type: 'gjj', value: 3 },
                          { type: 'total', value: 100 }
                        ]
                      }
                    },
                    {
                      action: 'update',
                      startTime: 5500,
                      payload: {
                        duration: 1000,
                        id: 'id0',
                        values: [
                          { type: 'shebao', value: '4.6' },
                          { type: 'gjj', value: 3 },
                          { type: 'total', value: 100 }
                        ]
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
            top: 0,
            left: 0,
            width: 600,
            height: 600
          },
          options: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
            spec
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 600, height: 600, background: 'transparent' });
    const player = new Player(story);
    story.init(player);
    console.log(story);
    player.play(0);

    exportVideo(story);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
