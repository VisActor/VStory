import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const TimelineAnimate = () => {
  const id = 'TimelineAnimate';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl: any = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: 'timeline',
                  characterActions: [
                    {
                      startTime: 1000,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 5000,
                          effect: 'default'
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
          type: 'Timeline',
          id: 'timeline',
          zIndex: 1,
          position: {
            top: 100,
            left: 100,
            width: 1200,
            height: 100
          },
          options: {
            graphic: {
              times: [
                { label: '1486', desc: '' },
                { label: '1644', desc: '' },
                { label: '1765', desc: '' },
                { label: '1786', desc: '' },
                { label: '1801', desc: '' },
                { label: '1833', desc: '' },
                { label: '1856', desc: '' },
                { label: '1877', desc: '' },
                { label: '1976', desc: '' },
                { label: '1990s', desc: '' },
                { label: '', desc: '' }
              ],
              lineStyle: {
                lineDash: [1, 1]
              },
              labelStyle: {
                fontSize: 16,
                fontWeight: 'bold'
              },
              activeSymbolStyle: {
                size: 20
              },
              activeLabelStyle: {
                fontSize: 22,
                fontWeight: 'bold'
              }
            },
            panel: {
              fill: 'blue',
              cornerRadius: 30
            }
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
