import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { registerPopTip, registerPopTipAction } from '../../../../../vstory-external/src';
import { registerAll } from '../../../../src';

registerAll();
registerPopTip();
registerPopTipAction();

export const PopTipAnimate = () => {
  const id = 'PopTipAnimate';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    const panelStyle = {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 10,
      shadowOffsetX: 4,
      shadowOffsetY: 4,
      fill: 'white',
      cornerRadius: 4,
      size: 9
    };
    const commonStyle = {
      content: '$123,45',
      position: 'tl',
      padding: { top: 6, bottom: 6, left: 6, right: 6 },
      contentStyle: {
        fontSize: 12,
        fill: '#08979c'
      }
    };

    const p1 = {
      ...commonStyle,
      panel: {
        ...panelStyle
      }
    };
    const p2 = {
      ...commonStyle,
      triangleMode: 'concise',
      panel: {
        ...panelStyle,
        cornerRadius: 0
      }
    };
    const p3 = {
      ...commonStyle,
      triangleMode: 'concise',
      panel: {
        ...panelStyle,
        fill: false,
        stroke: 'white',
        cornerRadius: 0,
        size: 0
      }
    };
    const p4 = {
      ...commonStyle,
      position: 'top',
      panel: {
        ...panelStyle,
        square: true,
        cornerRadius: 100,
        size: 12
      }
    };

    const p5 = {
      content: '123,45',
      padding: { top: 3, bottom: 3, left: 12, right: 6 },
      contentStyle: {
        fontSize: 12,
        fill: '#08979c'
      },
      panel: {
        ...panelStyle,
        cornerRadius: [0, 20, 20, 0]
      },
      logoSymbol: {
        symbolType: 'circle',
        fill: 'red',
        size: 'auto'
      },
      logoText: '$',
      logoTextStyle: {
        fill: 'white',
        fontSize: 12
      }
    };

    const p6 = {
      content: '123,45',
      position: 'right',
      padding: { top: 3, bottom: 3, left: 13, right: 8 },
      contentStyle: {
        fontSize: 12,
        fill: '#08979c'
      },
      panel: {
        ...panelStyle,
        cornerRadius: [0, 0, 6, 0],
        cornerType: 'bevel',
        size: 0
      },
      logoSymbol: {
        symbolType: 'rect',
        fill: 'red',
        size: [20, 'auto'],
        cornerType: 'bevel'
      },
      logoText: '🤡',
      logoTextStyle: {
        fill: 'white',
        fontSize: 12
      }
    };

    [p1, p2, p3, p4, p5, p6].forEach((item, index) => {
      story.addCharacter(
        {
          type: 'PopTip',
          id: `poptip-${index}`,
          zIndex: 1,
          position: {
            top: 100,
            left: 50 + index * 120
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
                    duration: 300,
                    easing: 'quadOut',
                    wave: 0.3
                  }
                }
              ]
            },
            {
              startTime: 1000,
              action: 'disappear',
              payload: {
                animation: {
                  duration: 300,
                  easing: 'aIn3'
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
