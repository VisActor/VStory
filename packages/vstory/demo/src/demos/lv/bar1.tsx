import React, { useEffect } from 'react';
import { IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
import '../../../../src/story/index';
import { cloneDeep } from '@visactor/vutils';

export const LV_BAR1 = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'BarChart',
          id: 'test-chart-0',
          zIndex: 9,
          position: {
            top: 100,
            left: 100,
            width: 400,
            height: 400
          },
          options: {
            title: {
              text: 'Timeline Chart',
              orient: 'bottom',
              align: 'center',
              textStyle: {
                fontSize: 10,
                lineHeight: 10
              }
            },
            padding: 12,
            data: [
              {
                id: 'id0',
                values: [
                  { type: 'a', value: 0.36, value2: 0.06 },
                  { type: 'b', value: 0.66, value2: 0.26 },
                  { type: 'c', value: 0.4, value2: 0.0 },
                  { type: 'd', value: 0.6, value2: 0.2 }
                ]
              }
            ],
            direction: 'vertical',
            seriesSpec: [
              {
                matchInfo: { specIndex: 'all' },
                spec: {
                  xField: 'type',
                  yField: 'value'
                }
              }
            ]
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
                  characterId: 'test-chart-0',
                  characterActions: [
                    {
                      startTime: 0,
                      duration: 0,
                      action: 'appear'
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
