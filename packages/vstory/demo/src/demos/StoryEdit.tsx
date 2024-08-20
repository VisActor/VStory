import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import { Edit } from '../../../src/edit/edit';
import '../../../src/story/index';
import { cloneDeep } from '@visactor/vutils';
import { CommonEditComponent } from '../../../src/edit/edit-component/common';
import { ChartSelection } from '../../../src/edit/edit-component/chart-selection';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';

// Edit.registerEditComponent('common', CommonEditComponent);
Edit.registerEditComponent('chart', ChartSelection);
Edit.registerEditComponent('text', TextSelection);
Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);

const chartSpec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: [
        { month: 'Monday', sales: 22 },
        { month: 'Tuesday', sales: 13 },
        { month: 'Wednesday', sales: 25 },
        { month: 'Thursday', sales: 29 },
        { month: 'Friday', sales: 38 }
      ]
    }
  ],
  xField: 'month',
  yField: 'sales'
};

export const StoryEdit = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'Rect',
          id: 'test-graphics-0',
          zIndex: 10,
          position: {
            top: 40,
            left: 50,
            width: 250,
            height: 100
          },
          options: {
            graphic: {
              fill: 'red'
            },
            text: {
              text: 'haha',
              fill: 'black'
            },
            angle: 0,
            shapePoints: []
          }
        },
        {
          type: 'Rect',
          id: 'test-graphics-1',
          zIndex: 0,
          position: {
            top: 40,
            left: 250,
            width: 200,
            height: 100
          },
          options: {
            graphic: {
              fill: 'blue',
              visible: false
            },
            text: {
              text: 'title2',
              fill: 'black'
            },
            angle: 0,
            shapePoints: []
          }
        },
        {
          type: 'VChart',
          id: 'test-chart-0',
          zIndex: 9,
          position: {
            top: 100,
            left: 100,
            width: 400,
            height: 400
          },
          options: {
            spec: chartSpec
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
                  characterId: 'test-graphics-0',
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 100,
                          easing: 'linear',
                          effect: 'fadeIn'
                        } as any
                      }
                    }
                  ]
                },
                {
                  characterId: 'test-graphics-1',
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 100,
                          easing: 'linear',
                          effect: 'fadeIn'
                        } as any
                      }
                    }
                  ]
                },
                {
                  characterId: 'test-chart-0',
                  characterActions: [
                    {
                      startTime: 0,
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
    story.play(false);
    const edit = new Edit(story);
    edit.emitter.on('startEdit', msg => {
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        console.log(cloneDeep(msg.actionInfo.character.spec));
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        console.log(cloneDeep(msg.actionInfo.character.spec));
        story.play();
      }
    });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
