import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';

registerAll();

export const ShapeComponent = () => {
  const id = 'ShapeComponent';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    story.addCharacter(
      {
        type: 'Shape',
        id: 'shape',
        zIndex: 1,
        position: {
          top: 200,
          left: 200,
          width: 80,
          height: 60
        },
        options: {
          graphic: {
            stroke: 'red',
            symbolType: 'star'
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
                  duration: 2000,
                  easing: 'linear',
                  effect: 'clipRange'
                }
              }
            ]
          }
        ]
      }
    );

    player.tickTo(0);
    player.tickTo(1600);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
