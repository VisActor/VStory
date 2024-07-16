import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
import { Edit } from '../../../src/edit/edit';
import { CommonEditComponent } from '../../../src/edit/edit-component/common';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';

Edit.registerEditComponent('common', CommonEditComponent);
Edit.registerEditComponent('text', TextSelection);
Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);

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
          type: 'RectComponent',
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
          type: 'BarChart',
          id: 'test-chart-0',
          zIndex: 9,
          position: {
            top: 200,
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
                values: chartData
              }
            ],
            direction: 'vertical',
            seriesSpec: [
              {
                matchInfo: { specIndex: 'all' },
                spec: {
                  type: 'bar',
                  xField: 'year',
                  yField: 'value'
                }
              }
            ],
            componentSpec: [
              {
                specKey: 'axes',
                matchInfo: { orient: 'left' },
                spec: {
                  label: {
                    style: {
                      fontSize: 20
                    }
                  }
                }
              },
              {
                specKey: 'axes',
                matchInfo: { orient: 'bottom' },
                spec: {
                  type: 'band'
                }
              },
              {
                specKey: 'markLine',
                matchInfo: { orient: 'left' },
                spec: {
                  coordinates: [chartData[0], chartData[5]],
                  line: {
                    style: {
                      lineDash: [0],
                      lineWidth: 2,
                      stroke: '#000'
                    }
                  },
                  label: {
                    position: 'middle',
                    text: `asdadsasd% CARG`,
                    labelBackground: {
                      padding: 8,
                      style: {
                        fill: '#fff',
                        fillOpacity: 1,
                        stroke: '#3CC780',
                        lineWidth: 2,
                        cornerRadius: 8
                      }
                    },
                    style: {
                      fill: '#3CC780'
                    }
                  },
                  endSymbol: {
                    size: 12,
                    refX: -4
                  },
                  offsetY: -100
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
                  characterId: 'test-graphics-0',
                  characterActions: [
                    {
                      startTime: 0,
                      duration: 0,
                      action: 'appear',
                      payload: {
                        style: {},
                        animation: {
                          duration: 0,
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
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        story.play();
      }
    });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
