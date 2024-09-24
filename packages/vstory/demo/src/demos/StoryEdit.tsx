import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
import { cloneDeep } from '@visactor/vutils';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { Edit } from '../../../src/edit/edit';

// Edit.registerEditComponent('common', CommonEditComponent);
loadAllSelection();

const chartSpec = {
  type: 'bar',
  animation: false,
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
          id: 'rect0',
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
          id: 'rect1',
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
          type: 'Image',
          id: 'image0',
          zIndex: 0,
          position: {
            top: 140,
            left: 250,
            width: 200,
            height: 100
          },
          options: {
            graphic: {
              image: Scene3ChartImage2
            },
            text: {
              text: 'Image',
              fill: 'black'
            },
            angle: 0,
            shapePoints: []
          }
        },
        // {
        //   type: 'Text',
        //   id: 'text0',
        //   zIndex: 0,
        //   position: {
        //     top: 140,
        //     left: 150,
        //     width: 200,
        //     height: 100
        //   },
        //   options: {
        //     graphic: {
        //       fill: 'pink',
        //       text: 'hahaha'
        //     },
        //     angle: 0,
        //     shapePoints: []
        //   }
        // },
        {
          type: 'Shape',
          id: 'shape0',
          zIndex: 0,
          position: {
            top: 240,
            left: 250,
            width: 200,
            height: 100
          },
          options: {
            graphic: {
              fill: 'green',
              symbolType: 'star'
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
                  characterId: ['rect0', 'rect1', 'image0', 'shape0'],
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: {
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
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 0
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
    const story = new Story(tempSpec, {
      dom: id,
      playerOption: { scaleX: 0.3, scaleY: 0.6, offsetX: 100, offsetY: 0 },
      background: 'transparent',
      layerBackground: 'pink'
    });
    story.play(false);
    const edit = new Edit(story);
    edit.emitter.on('startEdit', msg => {
      console.log('startEdit', msg);
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        console.log(cloneDeep(msg.actionInfo.character.spec));
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        console.log(cloneDeep(msg.actionInfo.character.spec));
        story.play();
      }
    });
    edit.emitter.on('endEdit', msg => {
      console.log('endEdit', msg);
    });
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
