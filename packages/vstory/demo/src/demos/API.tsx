import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const API = () => {
  const id = 'API';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    // story.addCharacterWithAppear({
    //   type: 'VChart',
    //   id: 'test-chart-0',
    //   zIndex: 9,
    //   position: {
    //     x: 100,
    //     y: 100,
    //     width: 300,
    //     height: 300
    //   },
    //   options: {
    //     padding: { left: 60, top: 60, right: 60, bottom: 60 },
    //     panel: {
    //       fill: 'red',
    //       cornerRadius: 10
    //     },
    //     spec: chartSpec
    //   }
    // });

    story.addCharacter(
      {
        type: 'Text',
        id: 'title1',
        zIndex: 1,
        position: {
          top: 100,
          left: 200
        },
        options: {
          graphic: {
            text: 'A BRIEF HISTORY',
            fontSize: 12,
            fontWeight: 'bold',
            fill: 'red',
            textAlign: 'center',
            textBaseline: 'middle'
          },
          panel: {
            fill: 'blue',
            cornerRadius: 30
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            payload: [
              {
                animation: {
                  duration: 2000,
                  easing: 'linear',
                  effect: ''
                } as any
              }
            ]
          }
        ]
      }
    );

    story.addCharacter(
      {
        type: 'Rect',
        id: 'rect',
        zIndex: 1,
        position: {
          top: 100,
          left: 100,
          width: 80,
          height: 60
        },
        options: {
          graphic: {
            stroke: false,
            fill: 'green'
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            payload: [
              {
                animation: {
                  duration: 2000,
                  easing: 'linear',
                  effect: 'wipe'
                } as any
              }
            ]
          }
        ]
      }
    );
    player.play();

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
