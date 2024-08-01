import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
// import { Animate } from '@visactor/vrender-core';

// Animate.AddInterpolate('clipRange', (k, r, from, to, target, out) => {
//   console.log('animate', k, r, from, to);
// });

export const wordcloud = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'VChart',
          id: 'bar-series',
          zIndex: 10,
          position: {
            top: 40,
            left: 50,
            width: 500,
            height: 500
          },
          options: {
            spec: {
              type: 'wordCloud',
              nameField: 'name',
              valueField: 'value',
              wordCloudConfig: {
                zoomToFit: {
                  enlarge: true,
                  fontSizeLimitMax: 20
                }
              },
              data: {
                name: 'baseData',
                values: [
                  {
                    name: '螺蛳粉',
                    value: 957
                  },
                  {
                    name: '钵钵鸡',
                    value: 942
                  },
                  {
                    name: '板栗',
                    value: 842
                  },
                  {
                    name: '胡辣汤',
                    value: 828
                  },
                  {
                    name: '关东煮',
                    value: 665
                  },
                  {
                    name: '羊肉汤',
                    value: 627
                  },
                  {
                    name: '热干面',
                    value: 574
                  }
                ]
              }
            }
          }
        }
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                {
                  characterId: 'bar-series',
                  characterActions: [
                    {
                      startTime: 10,
                      action: 'appear',
                      payload: {
                        style: {},
                        animation: {
                          duration: 10000,
                          easing: 'linear'
                        } as any
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
    const story = new Story(tempSpec, { dom: id });
    story.play();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
