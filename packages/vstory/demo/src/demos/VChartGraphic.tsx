import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
import { Edit } from '../../../src/edit/edit';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';
import { loadAllSelection } from '../../../src/edit/edit-component';

loadAllSelection();
Edit.registerEditComponent('text', TextSelection);
Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);

const spec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: [
        {
          name: 'Apple',
          value: 214480
        },
        {
          name: 'Google',
          value: 155506
        },
        {
          name: 'Amazon',
          value: 100764
        },
        {
          name: 'Microsoft',
          value: 92715
        },
        {
          name: 'Coca-Cola',
          value: 66341
        },
        {
          name: 'Samsung',
          value: 59890
        },
        {
          name: 'Toyota',
          value: 53404
        },
        {
          name: 'Mercedes-Benz',
          value: 48601
        },
        {
          name: 'Facebook',
          value: 45168
        },
        {
          name: "McDonald's",
          value: 43417
        },
        {
          name: 'Intel',
          value: 43293
        },
        {
          name: 'IBM',
          value: 42972
        },
        {
          name: 'BMW',
          value: 41006
        },
        {
          name: 'Disney',
          value: 39874
        },
        {
          name: 'Cisco',
          value: 34575
        },
        {
          name: 'GE',
          value: 32757
        },
        {
          name: 'Nike',
          value: 30120
        },
        {
          name: 'Louis Vuitton',
          value: 28152
        },
        {
          name: 'Oracle',
          value: 26133
        },
        {
          name: 'Honda',
          value: 23682
        }
      ]
    }
  ],
  direction: 'horizontal',
  xField: 'value',
  yField: 'name',
  axes: [
    {
      orient: 'bottom',
      visible: false
    }
  ],
  label: {
    visible: true,
    animation: false
  }
};

export const VChartGraphic = () => {
  const id = 'storyBar';

  const chartData = [
    { year: '2017', value: 129 },
    { year: '2018', value: 150 },
    { year: '2019', value: 130 },
    { year: '2020', value: 126 },
    { year: '2021', value: 117 },
    { year: '2022', value: 180 },
    { year: 'Target', value: 200 }
  ];

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
          type: 'VChart',
          id: 'test-chart-0',
          zIndex: 10,
          position: {
            top: 40,
            left: 50,
            width: 500,
            height: 500
          },
          options: {
            spec
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
                      selector: '*',
                      payload: {
                        style: {},
                        animation: {
                          effect: 'move',
                          move: { pos: 'top' },
                          duration: 1000,
                          easing: 'linear'
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
                      action: 'appear',
                      selector: '*',
                      payload: {
                        style: {},
                        animation: {
                          effect: 'fade',
                          move: { pos: 'top' },
                          duration: 1000,
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
    story.play(false);
    const edit = new Edit(story);
    edit.emitter.on('startEdit', msg => {
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        story.play();
      }
    });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
