import { IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
import React, { useEffect } from 'react';

export const UnitComponentDemo = () => {
  const id = 'unit-component-demo';

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
            width: 20,
            height: 20
          },
          options: {
            graphic: {
              fill: '#2D6BA0',
              stroke: false
            }
          }
        },
        {
          type: 'Unit',
          id: 'unit-test',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 1200,
            height: 1000
          },
          options: {
            graphic: {
              fill: '#f1f1f0',
              padding: {
                top: 100,
                bottom: 100,
                right: 50,
                left: 50
              },
              count: 250,
              styleFunc: (index: number) => {
                return index < 66 ? { symbolType: 'rect', fill: '#4e8ae0' } : { fill: '#f6c86d' };
              },
              gap: [0.5, 0.75],
              aspect: 1,
              direction: 'vertical'
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
                },
                {
                  characterId: 'unit-test',
                  characterActions: [
                    {
                      action: 'style',
                      startTime: 1,
                      payload: {
                        animation: {
                          // styleFunc: (index: number) => {
                          //   return index > 99 ? { symbolType: 'rect', fill: '#6638f0' } : {};
                          // },
                          startIndex: 100,
                          style: { fill: '#6638f0' },
                          effect: 'style',
                          duration: 1000,
                          easing: 'linear',
                          stagger: {
                            enable: true
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: '2',
              actions: [
                {
                  characterId: 'unit-test',
                  characterActions: [
                    {
                      action: 'style',
                      startTime: 1000,
                      payload: {
                        animation: {
                          // styleFunc: (index: number) => {
                          //   return index > 99 ? { symbolType: 'rect', fill: '#6638f0' } : {};
                          // },
                          style: { fill: '#4af2a1' },
                          effect: 'style',
                          duration: 5000,
                          easing: 'linear',
                          stagger: {
                            enable: true
                          }
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
