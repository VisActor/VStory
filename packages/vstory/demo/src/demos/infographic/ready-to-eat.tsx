import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';

registerAll();
export const ReadyToEat = () => {
  const id = 'ReadyToEat';
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
                  characterId: ['0', '1', '2', 'text-1', 'text-2'],
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
      ],
      characters: [
        {
          id: '0',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 800,
            y: 0,
            width: 480,
            height: 720
          },
          options: {
            graphic: {
              image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/cereal.jpeg'
            }
          }
        },
        {
          id: '1',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 800,
            height: 720
          },
          options: {
            spec: {
              type: 'bar',
              data: [
                {
                  id: 'barData',
                  values: [
                    { type: 'Lucky Charms', energy: 555 },
                    { type: 'Frosted Flaked', energy: 780 },
                    { type: 'Fruit Loops', energy: 450 },
                    { type: 'Special K', energy: 500 },
                    { type: 'Honey Nut Cheerios', energy: 325 },
                    { type: `Reese's Puffs`, energy: 150 }
                  ]
                }
              ],
              xField: 'type',
              yField: 'energy',
              seriesField: 'type',
              color: ['#92CF9D', '#FAAA69', '#9095ca', '#b3d6fa', '#ef737a', '#fddb79'],
              label: {},
              legends: {
                visible: true,
                position: 'start',
                item: {
                  padding: [4, 16, 0, 10],
                  shape: {
                    style: {
                      size: 24
                    }
                  },
                  label: {
                    style: {
                      fontSize: 24
                    }
                  }
                }
              },
              axes: [
                { orient: 'bottom', visible: false },
                { orient: 'left', visible: false }
              ]
            }
          }
        },
        {
          id: 'text-1',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 1040,
            y: 20,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'READY-TO-EAT',
              textAlign: 'center',
              fontSize: 42,
              fontWeight: 'bold',
              fill: '#5A3E36'
            }
          }
        },
        {
          id: 'text-2',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 1040,
            y: 100,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'CEREAL SALES',
              textAlign: 'center',
              fontSize: 42,
              fontWeight: 'bold',
              fill: '#FF8C00'
            }
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 1280, height: 720, background: '#DDE6E8' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
