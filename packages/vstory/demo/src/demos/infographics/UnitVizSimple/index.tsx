import { IStorySpec } from '../../../../../src/story/interface';
import { Story } from '../../../../../src/story/story';
import React, { useEffect } from 'react';
import { unitTrees } from './read-api';
import { createUnitViz } from './dsl';

const screenWidth = 1920;
const screenHeight = 1080;
const titleHeight = 254;
const titleMargin = {
  x: 100,
  y: 100
};

const suicideUnits = createUnitViz(unitTrees[0], 0);
const manInSuicideUnits = createUnitViz(unitTrees[1], 1);

export const UnitVizSimple = () => {
  const id = 'unit-viz-simple';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = {
      characters: [
        {
          type: 'RectComponent',
          id: 'background-top',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 1920,
            height: titleHeight
          },
          options: {
            graphic: {
              fill: '#2D6BA0',
              stroke: false
            }
          }
        },
        {
          type: 'RectComponent',
          id: 'background-bottom-filter',
          zIndex: 0,
          position: {
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight
          },
          options: {
            graphic: {
              fill: '#193446',
              fillOpacity: 1,
              stroke: false
            }
          }
        },
        {
          type: 'RichTextComponent',
          id: 'title-1',
          zIndex: 3,
          position: {
            top: titleHeight / 2,
            left: 1920 / 2,
            width: 1920,
            height: 1080
          },
          options: {
            graphic: {
              width: 1920 - 2 * titleMargin.x,
              height: 1080,
              fontSize: 40,
              wordBreak: 'break-word',
              textAlign: 'center',
              fill: 'white',
              fontWeight: 200,
              textConfig: [
                {
                  text: 'In America, nearly '
                },
                {
                  text: 'two-thirds',
                  fontWeight: 'bold'
                },
                {
                  text: ' of gun deaths are '
                },
                { text: 'suicides', fontWeight: 'bold' }
              ]
            }
          }
        },
        {
          type: 'RichTextComponent',
          id: 'title-2',
          zIndex: 3,
          position: {
            top: titleHeight / 2,
            left: 1920 / 2,
            width: 1920,
            height: 1080
          },
          options: {
            graphic: {
              width: 1920 - 2 * titleMargin.x,
              height: 1080,
              fontSize: 40,
              wordBreak: 'break-word',
              textAlign: 'center',
              fill: 'white',
              fontWeight: 200,
              textConfig: [
                {
                  text: 'More than '
                },
                {
                  text: '85 percent',
                  fontWeight: 'bold'
                },
                {
                  text: ' of suicide victims are'
                },
                { text: 'male', fontWeight: 'bold' }
              ]
            }
          }
        },
        ...suicideUnits.characters,
        ...manInSuicideUnits.characters
      ],
      acts: [
        {
          id: 'page1',
          scenes: [
            {
              id: 'scene-1',
              actions: [
                {
                  characterId: 'background-top',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      duration: 0
                    }
                  ]
                },
                {
                  characterId: 'background-bottom-filter',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      duration: 0
                    }
                  ]
                },
                {
                  characterId: 'title-1',
                  characterActions: [
                    {
                      startTime: animationDuration,
                      duration: animationDuration,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: animationDuration,
                          easing: 'linear',
                          effect: 'fade'
                        }
                      }
                    }
                  ]
                },
                ...suicideUnits.actions
              ]
            },
            {
              id: 'scene-2',
              actions: [
                {
                  characterId: 'title-1',
                  characterActions: [
                    {
                      startTime: sceneDuration - animationDuration,
                      duration: animationDuration,
                      action: 'disappear',
                      payload: {
                        animation: {
                          duration: animationDuration,
                          easing: 'linear',
                          effect: 'fade'
                        }
                      }
                    }
                  ]
                },
                {
                  characterId: 'title-2',
                  characterActions: [
                    {
                      startTime: sceneDuration + animationDuration,
                      duration: animationDuration,
                      action: 'appear',
                      payload: {
                        animation: {
                          duration: animationDuration,
                          easing: 'linear',
                          effect: 'fade'
                        }
                      }
                    }
                  ]
                },
                ...manInSuicideUnits.actions
              ]
            }
          ]
        }
      ]
    };
    const story = new Story(spec, { dom: id, playerOption: { scaleX: 0.5, scaleY: 0.5 } });
    // const story = new Story(spec, { dom: id, playerOption: {} });
    story.play();
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
