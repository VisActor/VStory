import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerTextAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerTextAction();
initVR();

export const TextAnimate = () => {
  const id = 'TextAnimate';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

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
                          animation: {
                            duration: 2000,
                            effect: 'wipe',
                            easing: 'linear'
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
          type: 'Text',
          id: '0',
          zIndex: 1,
          position: {
            top: 100,
            left: 200
          },
          options: {
            graphic: {
              text: 'A BRIEF HISTORY',
              fontSize: 12,
              fontWeight: 'bold',
              fill: 'red',
              textAlign: 'center',
              textBaseline: 'middle'
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