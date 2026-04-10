import React, { useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';

registerAll();

const diamondPath = 'M60,0 L120,60 L60,120 L0,60 Z';
const wavePath = 'M0,30 C20,0 40,0 60,30 S100,60 120,30';

export const PathComponent = () => {
  const id = 'PathComponent';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: '#f2e8dc', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    story.addCharacter(
      {
        type: 'Path',
        id: 'path-fill',
        zIndex: 1,
        position: {
          top: 120,
          left: 120,
          width: 180,
          height: 180
        },
        options: {
          padding: { top: 30, right: 30, bottom: 30, left: 30 },
          graphic: {
            path: diamondPath,
            fill: '#c84c2f',
            stroke: '#4d1d12',
            lineWidth: 4
          },
          text: {
            text: 'Path',
            textAlign: 'center',
            textBaseline: 'middle',
            fill: '#fff8f1',
            fontSize: 26,
            fontWeight: 'bold'
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            payload: [
              {
                animation: {
                  duration: 1200,
                  easing: 'linear',
                  effect: 'clipRange'
                }
              }
            ]
          }
        ]
      }
    );

    story.addCharacter(
      {
        type: 'Path',
        id: 'path-stroke',
        zIndex: 1,
        position: {
          top: 150,
          left: 380,
          width: 180,
          height: 120
        },
        options: {
          graphic: {
            path: wavePath,
            fill: false,
            stroke: '#1f3b73',
            lineWidth: 8,
            lineCap: 'round'
          },
          text: {
            text: 'SVG Path',
            textAlign: 'center',
            textBaseline: 'bottom',
            fill: '#1f3b73',
            fontSize: 24,
            fontWeight: 'bold'
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            startTime: 300,
            payload: [
              {
                animation: {
                  duration: 1200,
                  easing: 'linear',
                  effect: 'clipRange'
                }
              }
            ]
          }
        ]
      }
    );

    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
