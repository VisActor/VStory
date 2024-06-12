import React, { useEffect } from 'react';
import { cloneDeep } from '@visactor/vutils';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import { Edit } from '../../../src/edit/edit';
import '../../../src/story/index';
import { loadAllSelection } from '../../../src/edit/edit-component';
import img from '../assets/scene3/chart-3.png';

loadAllSelection();

export const GraphicEdit = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'RichTextComponent',
          id: `richtext`,
          zIndex: 1,
          position: {
            top: 450,
            left: 600,
            width: 400,
            height: 80
          },
          options: {
            graphic: {
              width: 400,
              fontSize: 22,
              fontWeight: 'bold',
              textConfig: [
                {
                  text: 'Powered By '
                },
                {
                  text: 'VChart',
                  fill: 'blue'
                }
              ]
            }
          }
        },
        {
          type: 'RectComponent',
          id: 'rect',
          zIndex: 0,
          position: {
            top: 40,
            left: 250,
            width: 200,
            height: 100
          },
          options: {
            graphic: {
              fill: 'red',
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
          type: 'ImageComponent',
          id: `image`,
          zIndex: 1,
          position: {
            top: 225,
            left: 260,
            width: 200,
            height: 160
          },
          options: {
            graphic: {
              image: img
            }
          }
        }
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene',
              actions: [
                {
                  characterId: 'richtext',
                  characterActions: [
                    {
                      startTime: 1,
                      duration: 800,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 700,
                          move: {
                            from: 'right'
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  characterId: 'rect',
                  characterActions: [
                    {
                      startTime: 1,
                      duration: 800,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 700
                        }
                      }
                    }
                  ]
                },
                {
                  characterId: 'image',
                  characterActions: [
                    {
                      startTime: 1,
                      duration: 800,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: 700
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
    const story = new Story(tempSpec, { dom: id });
    story.play();

    const edit = new Edit(story);
    edit.emitter.on('startEdit', msg => {
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        console.log(cloneDeep(msg.actionInfo.character.spec));
        // msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        console.log(cloneDeep(msg.actionInfo.character.spec));
        // story.play();
      }
    });

    // let i = 0;
    // story.getPlayer().setCurrentChapter(0);
    // setInterval(() => {
    //   story.getPlayer().tickTo(300 * i++);
    // }, 300);
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
