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
              type: 'pie',
              title: {
                text: 'Pie Chart',
                orient: 'bottom',
                align: 'center',
                textStyle: {
                  fontSize: 10,
                  lineHeight: 10
                }
              },
              padding: 12,
              animation: false,
              data: [
                {
                  id: 'data1',
                  values: [
                    {
                      value: 348,
                      name: '中介渠道: 34.8%'
                    },
                    {
                      value: 152,
                      name: '会员: 15.2%'
                    },
                    {
                      value: 500,
                      name: '散客: 50%'
                    }
                  ]
                }
              ],
              valueField: 'value',
              categoryField: 'name',
              radius: 1,
              innerRadius: 0
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
