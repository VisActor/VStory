import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerLabelItem, registerLabelItemAction } from '../../../../../vstory-external/src';
import { registerAll } from '../../../../src';

registerAll();
registerLabelItem();
registerLabelItemAction();

export const LabelItemAnimate = () => {
  const id = 'LabelItemAnimate';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 1300, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    const l1 = {
      contentOffsetX: 200,
      contentOffsetY: -60,
      titleSpace: [0, 3],
      titleTop: 'Powered By VisActor'
    };
    const l2 = {
      contentOffsetX: 200,
      contentOffsetY: -60,
      titleSpace: [0, 3],
      titleTop: 'Powered By VisActor',
      titleBottom: 'this is the VStory label',
      titleBottomStyle: {
        fontSize: 10
      }
    };
    const l3 = {
      contentOffsetX: 200,
      contentOffsetY: -60,
      titleSpace: [6, 6],
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 12,
        fill: 'black'
      },
      titleTopPanelStyle: {
        fill: 'white',
        visible: true,
        padding: { top: 3, bottom: 3 }
      }
    };

    const l4 = {
      contentOffsetX: 200,
      contentOffsetY: -60,
      titleSpace: [6, 6],
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 12,
        fill: 'black'
      },
      titleBottom: 'this is the VStory label',
      titleBottomStyle: {
        fontSize: 10,
        fill: 'black'
      },
      titleTopPanelStyle: {
        fill: 'white',
        visible: true,
        padding: { top: 3, bottom: 3 }
      },
      titleBottomPanelStyle: {
        fill: 'white',
        visible: true,
        padding: { top: 3, bottom: 6 }
      }
    };

    const l5 = {
      contentOffsetX: 200,
      contentOffsetY: -60,
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 12
      },
      titleTopPanelStyle: {
        stroke: 'white',
        visible: true
        // padding: { top: 3, bottom: 3 }
      },
      theme: 'simple'
    };

    [l1, l2, l3, l4, l5, l1, l2, l3, l4, l5].forEach((item, index) => {
      story.addCharacter(
        {
          type: 'LabelItem',
          id: `label-item-${index}`,
          zIndex: 1,
          position: {
            top: 100 + Math.floor(index / 5) * 200,
            left: 50 + (index % 5) * 230
          },
          options: {
            graphic: item
          }
        },
        {
          sceneId: 'defaultScene',
          actions: [
            {
              startTime: 0,
              action: 'appear',
              payload: [
                {
                  animation: {
                    duration: 1000,
                    easing: 'cubicIn',
                    symbolStartOuterType: Math.floor(index / 5) === 0 ? 'scale' : 'clipRange',
                    titleType: Math.floor(index / 5) === 0 ? 'move' : 'typewriter',
                    titlePanelType: index === 4 ? 'stroke' : 'scale'
                  }
                }
              ]
            },
            {
              startTime: 2000,
              action: 'disappear',
              payload: {
                animation: {
                  duration: 700,
                  easing: 'cubicIn',
                  mode: Math.floor(index / 5) === 0 ? 'default' : 'scale'
                }
              }
            }
          ]
        }
      );
    });

    player.play(0);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
