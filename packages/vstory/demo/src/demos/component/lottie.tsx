import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { registerLottie, registerLottieAction } from '../../../../../vstory-external/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerLottie();
registerLottieAction();
initVR();

export const Lottie = () => {
  const id = 'Lottie';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl: any = {
      characters: [
        {
          type: 'Lottie',
          id: 'lottie-test',
          zIndex: 2,
          position: {
            top: 50,
            left: 50,
            width: 300,
            height: 300
          },
          options: {
            graphic: {
              data: 'loading1'
            },
            panel: {
              fill: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 4
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
                  characterId: 'lottie-test',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: {
                        animation: {
                          duration: 1000,
                          easing: 'linear',
                          effect: 'scale'
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
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
