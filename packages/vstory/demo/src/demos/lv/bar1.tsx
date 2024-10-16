import React, { useEffect } from 'react';
import { IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
import { Edit } from '../../../../src/edit/edit';
import '../../../../src/story/index';
import { cloneDeep } from '@visactor/vutils';
import { BoxSelection } from '../../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../../src/edit/edit-component/text-selection';
// import { RichTextSelection } from '../../../../src/edit/edit-component/richtext-selection';

// Edit.registerEditComponent('common', CommonEditComponent);
Edit.registerEditComponent('text', TextSelection);
// Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);

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
    const edit = new Edit(story);
    edit.emitter.on('startEdit', msg => {
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        console.log(cloneDeep(msg.actionInfo.character.config));
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        console.log(cloneDeep(msg.actionInfo.character.config));
        story.play();
      }
    });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
