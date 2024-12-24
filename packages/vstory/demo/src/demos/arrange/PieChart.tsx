import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { exportVideo } from '../utils';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const PieChart = () => {
  const id = 'PieChart';

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
          values: [
            { type: 'oxygen', value: '46.60' },
            { type: 'silicon', value: '27.72' },
            { type: 'aluminum', value: '8.13' },
            { type: 'iron', value: '5' },
            { type: 'calcium', value: '3.63' },
            { type: 'sodium', value: '2.83' },
            { type: 'potassium', value: '2.59' },
            { type: 'others', value: '3.5' }
          ]
        }
      ],
      outerRadius: 0.8,
      innerRadius: 0.6,
      valueField: 'value',
      categoryField: 'type',
      animation: false,
      label: {
        visible: true,
        animation: false,
        animationAppear: false,
        style: {
          fill: 'red'
        }
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
