import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAllSelection } from '../../../../../vstory-editor/src';
import { Edit, registerAll } from '../../../../src';

registerAll();
registerAllSelection();

export const LayoutGridComponent = () => {
  const id = 'LayoutGridComponent';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: new Array(12 * 8).fill(0).map((_, index) => index.toString()),
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          animation: {
                            duration: 1000,
                            effect: 'wipe',
                            easing: 'linear'
                          } as any
                        }
                      ]
                    },
                    {
                      startTime: 1000,
                      duration: 800,
                      action: 'style',
                      payload: {
                        graphic: {
                          fontSize: 40
                        },
                        animation: {
                          duration: 800
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      width: 1024,
      height: 768,
      gridConfig: {
        columns: 12,
        rows: 8,
        gutterColumn: 20,
        gutterRow: 20
      },
      characters: new Array(12 * 8).fill(0).map((_, index) => ({
        type: 'Rect',
        id: index.toString(),
        zIndex: 1,
        position: {
          columnSpan: [index % 12, (index % 12) + 1],
          rowSpan: [Math.floor(index / 12), Math.floor(index / 12) + 1]
        },
        options: {
          graphic: {
            fill: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )})`
          }
        }
      }))
    };

    const story = new Story(dsl as any, {
      canvas,
      width: 1024,
      height: 768,
      // layerBackground: 'pink',
      background: 'pink'
      // scaleX: 0.5,
      // scaleY: 0.5,
      // layerViewBox: { x1: 100, y1: 100, x2: 900, y2: 500 }
    });
    const player = new Player(story);
    story.init(player);

    player.play(-1);

    let selectedCharacter: any = null;
    const edit = new Edit(story as any);
    edit.on('startEdit', msg => {
      selectedCharacter = msg.actionInfo.character;
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        player.play();
      }
    });
    edit.on('endEdit', msg => {
      selectedCharacter = null;
    });
    edit.on('resize', msg => {
      // console.log('resize', msg);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
