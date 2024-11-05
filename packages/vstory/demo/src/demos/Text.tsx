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
  const canvas = createRef();

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

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
