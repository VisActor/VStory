import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import React, { useEffect } from 'react';

export const Unit = () => {
  const id = 'unit';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = {
      characters: [
        {
          type: 'RectComponent',
          id: 'background-top',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 200,
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
                      duration: 0
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
    story.play();
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
