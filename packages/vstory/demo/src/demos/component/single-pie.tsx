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

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    ['default', 'montage', 'contain'].forEach((temp, index) => {
      const effect = ['fade', 'angle', 'scale'];
      const easing = ['flicker5', 'quadOut', 'quadOut'];
      story.addCharacter(
        {
          type: 'SinglePie',
          id: `pie-${temp}`,
          zIndex: 2,
          position: {
            top: 200,
            left: 200 + index * 300,
            width: 200,
            height: 200
          },
          options: {
            graphic: {
              trackPie: {
                fill: 'rgb(247, 233, 108)'
              },
              pie: {
                boundsMode: 'imprecise',
                fill:
                  index === 1
                    ? {
                        gradient: 'radial',
                        x0: 0.5,
                        y0: 0.5,
                        x1: 0.5,
                        y1: 0.5,
                        stops: [
                          { color: 'rgba(226, 149, 59, 1)', offset: 0 },
                          { color: 'rgba(226, 149, 59, 0.2)', offset: 1 }
                        ]
                      }
                    : 'rgba(226, 149, 59, 1)',
                endAngle: (Math.PI / 3) * 2,
                scaleCenter: ['50%', '100%']
              },
              template: temp
            },
            panel: {
              fill: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 4
            }
          }
        },
        {
          sceneId: 'defaultScene',
          actions: [
            {
              action: 'appear',
              startTime: 0,
              payload: {
                selector: '#trackPie',
                animation: {
                  duration: 500,
                  easing: 'quadOut',
                  effect: 'scale',
                  ratio: 0.9
                }
              }
            },
            {
              action: 'appear',
              startTime: 300,
              payload: {
                selector: '#pie',
                animation: {
                  duration: 500,
                  easing: easing[index],
                  effect: effect[index]
                }
              }
            }
          ]
        }
      );
    });

    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
