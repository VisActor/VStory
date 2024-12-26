import React, { useEffect } from 'react';
import {
  Player,
  Story,
  initVR,
  registerGraphics,
  registerCharacters,
  IStoryDSL
} from '../../../../../../vstory-core/src';
import {
  registerVComponentAction,
  registerVChartAction,
  registerVTableAction
} from '../../../../../../vstory-player/src';
import { pivotChartOption } from '../option-pivot-chart';
import { cloneDeep } from '@visactor/vutils';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerVTableAction();
initVR();

function loadDSL() {
  const dsl: IStoryDSL = {
    characters: [
      {
        type: 'PivotChart',
        id: 'table0',
        zIndex: 10,
        position: {
          top: 20,
          left: 20,
          width: 1100,
          height: 750
        },
        options: {
          spec: cloneDeep(pivotChartOption),
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          }
        }
      }
    ],
    acts: []
  };
  dsl.acts = [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: dsl.characters.map(i => i.id),
              characterActions: [
                {
                  action: 'bounce',
                  payload: {
                    animation: {
                      duration: 2000,
                      easing: 'quadOut'
                    },
                    type: 'bounce4',
                    flipY: true
                    // dy: 30,
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return dsl;
}

export const PivotChartBase = () => {
  const id = 'PivotChartBase';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 1200, height: 800, background: 'gray' });
    const player = new Player(story);
    story.init(player);
    // @ts-ignore
    window.story = story;
    // @ts-ignore
    window.player = player;
    const dsl = loadDSL();
    story.load(dsl);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
