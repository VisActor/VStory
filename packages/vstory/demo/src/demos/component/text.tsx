import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';

registerAll();

export const TextComponent = () => {
  const id = 'TextComponent';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    ['这是普通的一大段内容', '这是Blur的一大段内容', '这是缩放的一大段内容', '这是FadeUp的一大段内容'].forEach(
      (text, index) => {
        story.addCharacter(
          {
            type: 'Text',
            id: 'title' + index,
            zIndex: 1,
            position: {
              top: 100 + index * 100,
              left: 100
            },
            options: {
              graphic: {
                text: text,
                textAlign: 'left',
                fontSize: 36,
                fontWeight: 'bold',
                fill: 'red'
              }
            }
          },
          {
            sceneId: 'defaultScene',
            actions: [
              {
                action: 'appear',
                startTime: 1000 * index,
                payload: [
                  {
                    animation: {
                      duration: 1000,
                      easing: 'linear',
                      effect: 'typewriter',
                      params:
                        index === 0
                          ? {}
                          : index === 1
                          ? {
                              effect: 'blur',
                              delta: 0.5,
                              characterEasing: 'cubicOut'
                            }
                          : index === 2
                          ? {
                              effect: 'scale',
                              characterEasing: 'cubicOut'
                            }
                          : {
                              effect: 'fadeUp',
                              characterEasing: 'cubicOut',
                              dy: 10
                            }
                    } as any
                  }
                ]
              }
            ]
          }
        );
      }
    );

    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
