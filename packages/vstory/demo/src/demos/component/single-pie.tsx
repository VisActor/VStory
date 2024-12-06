import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { registerSinglePie, registerSinglePieAction } from '../../../../../vstory-external/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerSinglePie();
registerSinglePieAction();
initVR();

export const SinglePie = () => {
  const id = 'SinglePie';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl: any = {
      characters: [
        {
          type: 'SinglePie',
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
              trackPie: {
                fill: 'red'
              },
              pie: {
                fill: 'orange',
                endAngle: Math.PI / 3
              }
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
                        selector: '#trackPie',
                        animation: {
                          duration: 300,
                          easing: 'linear',
                          effect: 'scale',
                          ratio: 0.9
                        }
                      }
                    },
                    {
                      action: 'appear',
                      startTime: 200,
                      payload: {
                        selector: '#pie',
                        animation: {
                          duration: 1000,
                          easing: 'linear',
                          effect: 'angle'
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
