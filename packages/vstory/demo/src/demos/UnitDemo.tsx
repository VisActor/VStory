import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import React, { useEffect } from 'react';

export const UnitDemo = () => {
  const id = 'unit-demo';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = {
      characters: [
        {
          type: 'Rect',
          id: 'background-top',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 1920,
            height: 254
          },
          options: {
            graphic: {
              fill: '#2D6BA0',
              stroke: false
            }
          }
        }
      ],
      acts: [
        {
          id: 'page1',
          scenes: [
            {
              id: 'singleScene',
              actions: [
                {
                  characterId: 'background-top',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: {
                        animation: {
                          effect: 'move',
                          duration: 100
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
    const story = new Story(spec, { dom: id, playerOption: { scaleX: 0.5, scaleY: 0.5 } });
    // const story = new Story(spec, { dom: id, playerOption: {} });
    story.play(false);
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
