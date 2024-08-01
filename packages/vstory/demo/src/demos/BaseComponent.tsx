import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
// import { Animate } from '@visactor/vrender-core';

// Animate.AddInterpolate('clipRange', (k, r, from, to, target, out) => {
//   console.log('animate', k, r, from, to);
// });

export const BaseComponent = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        ...new Array(3).fill(0).map((_, i) => {
          return {
            type: 'Rect',
            id: 'rect' + i,
            zIndex: 10,
            position: {
              top: 20,
              left: 20 + i * 50,
              width: 30,
              height: 30
            },
            options: {
              graphic: {
                fill: 'red',
                // background: '/assets/scene4/matrix.png',
                stroke: false
              }
            }
          };
        })
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                ...new Array(3).fill(0).map((_, i) => {
                  return {
                    characterId: 'rect' + i,
                    characterActions: [
                      {
                        startTime: i * 1000,
                        action: 'appear',
                        payload: {
                          animation: {
                            duration: 700,
                            effect: ['fadeIn', 'scaleIn', 'wipeIn'][i]
                          }
                        }
                      }
                    ]
                  };
                })
              ]
            }
          ]
        }
      ]
    };
    const story = new Story(tempSpec, { dom: id });
    story.play();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
