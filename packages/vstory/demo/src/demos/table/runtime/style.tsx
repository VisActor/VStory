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
import { listTableOption } from '../option-list-table';
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
        type: 'VTable',
        id: 'table0',
        zIndex: 10,
        position: {
          top: 20,
          left: 20,
          width: 500,
          height: 300
        },
        options: {
          spec: cloneDeep(listTableOption),
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          },
          colStyle: {
            1: {
              bgColor: '#14afee'
            }
          },
          rowStyle: {
            [-1]: {
              bgColor: '#af538e'
            },
            2: {
              bgColor: '#af538e'
            }
          },
          contentColStyle: {
            1: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#7815ae'
            }
          },
          contentRowStyle: {
            1: {
              fontSize: 12,
              fontWeight: 'bold',
              color: '#1113df'
            }
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

export const TableStyle = () => {
  const id = 'table-style';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 700, height: 500, background: 'gray' });
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
