import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import React, { useEffect } from 'react';
import { ICharacterSpec } from '../../../src/story/character';

export const Units = () => {
  const id = 'units';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = {
      characters: [
        {
          type: 'RectComponent',
          id: 'background-top',
          zIndex: 1,
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
        },
        {
          type: 'UnitsComponent',
          id: 'units-test',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 1920,
            height: 254
          },
          options: {
            graphic: {
              fill: 'red'
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
                },
                {
                  characterId: 'units-test',
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
    // const story = new Story(spec, { dom: id, playerOption: {} });
    story.play();
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
