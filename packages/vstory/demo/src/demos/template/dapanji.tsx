import React, { useEffect } from 'react';
import { IStoryDSL } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';

export const Dapanji = () => {
  const id = 'Appear';

  useEffect(() => {
    try {
      const tempSpec = {
        acts: [
          {
            id: 'defaultAct',
            scenes: [
              {
                id: 'defaultScene',
                actions: [
                  { characterId: '0', characterActions: [{ action: 'appear' }] },
                  { characterId: '1', characterActions: [{ action: 'appear' }] },
                  { characterId: '2', characterActions: [{ action: 'appear' }] }
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
              x: -0.4623780107973232,
              y: 0.5073972176077746,
              width: 1284.8224278446842,
              height: 720.1040412167773,
              angle: 0,
              anchor: [641.9488359115447, 360.55941782599643]
            },
            options: { graphic: { image: 'http://localhost:8080/static/image/background-0.8ae5325c.png' } }
          },
          {
            id: '1',
            type: 'Image',
            zIndex: 0,
            position: {
              x: 922.3513678363803,
              y: 271.4869575373757,
              width: 252.23668500830547,
              height: 236.5984738372092,
              angle: 0,
              anchor: [1048.469710340533, 389.7861944559803]
            },
            options: { graphic: { image: 'http://localhost:8080/static/image/chicken-dish.4b58fffe.png' } }
          },
          {
            id: '2',
            type: 'Text',
            zIndex: 0,
            position: {
              x: 67.7801339285715,
              y: 44.449309593023074,
              width: 394.578436461794,
              height: 89.09923951411963,
              angle: 0,
              anchor: [265.0693521594685, 88.99892935008289]
            },
            options: {
              graphic: {
                text: ['新疆大盘鸡'],
                textAlign: 'left',
                fontSize: 68,
                fontWeight: 'bold',
                fontStyle: 'normal',
                underline: 0,
                fill: 'rgba(253, 155, 1, 1)',
                stroke: 'transparent',
                fontFamily: 'PingFang SC'
              }
            }
          }
        ]
      };
      console.log('debug tempSpec', tempSpec);
      const story = new Story(tempSpec as IStoryDSL, { dom: id });
      story.play();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
