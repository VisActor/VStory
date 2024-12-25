import React, { useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters, IStoryDSL } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction, registerVTableAction } from '../../../../../vstory-player/src';
import { pivotTableOption } from './option-pivot-table';
import { listTableOption } from './option-list-table';
import { pivotChartOption } from './option-pivot-chart';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerVTableAction();
initVR();

function loadDSL() {
  const tableSpec0 = listTableOption;
  const tableSpec1 = pivotTableOption;
  const tableSpec2 = pivotChartOption;
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
          spec: tableSpec0,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          }
        }
      },
      {
        type: 'VTable',
        id: 'table1',
        zIndex: 10,
        position: {
          top: 350,
          left: 20,
          width: 500,
          height: 300
        },
        options: {
          spec: tableSpec1,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          }
        }
      },
      {
        type: 'VTable',
        id: 'table2',
        zIndex: 10,
        position: {
          top: 20,
          left: 540,
          width: 600,
          height: 630
        },
        options: {
          spec: tableSpec2,
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
                  action: 'appear'
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

export const TableBase = () => {
  const id = 'table-base';

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
