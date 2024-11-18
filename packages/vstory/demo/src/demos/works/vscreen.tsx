import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDSL() {
  const mockData: any = [];
  const types = ['A', 'B', 'C'];

  types.forEach(type => {
    for (let i = 1; i <= 12; i++) {
      mockData.push({ month: i + 'th', value: Math.random() * 100 + 10, type });
    }
  });

  const bar1 = {
    type: 'bar',
    data: [
      {
        id: 'id0',
        values: mockData
      }
    ],
    xField: ['month', 'type'],
    yField: 'value',
    seriesField: 'type',
    axes: [
      { orient: 'bottom', type: 'band' },
      { orient: 'left', type: 'linear' }
    ]
  };

  return {
    characters: [
      {
        type: 'Text',
        id: 'Title',
        zIndex: 3,
        position: {
          top: 70,
          left: 1920 / 2,
          width: 1920,
          height: 90
        },
        options: {
          graphic: {
            fontSize: 70,
            wordBreak: 'break-word',
            textAlign: 'center',
            textBaseline: 'middle',
            fill: 'black',
            fontWeight: 200,
            text: 'VStory简易仪表盘'
          }
        }
      },
      {
        type: 'VChart',
        id: 'bar1',
        zIndex: 3,
        position: {
          top: 100,
          left: 30,
          width: 500,
          height: 260
        },
        options: {
          spec: bar1,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
          }
        }
      }
    ],
    acts: [
      {
        id: 'page1',
        scenes: [
          {
            id: 'singleScene',
            actions: [
              {
                characterId: ['Title', 'bar1'],
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    payload: {
                      animation: {
                        duration: 1000,
                        oneByOne: true
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

export const VScreen = () => {
  const id = 'VScreen';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      width: 1920 / 2,
      height: 1080 / 2,
      background: 'rgb(245, 246, 247)',
      scaleX: 0.5,
      scaleY: 0.5
    });
    const player = new Player(story);
    story.init(player);

    loadDSL().then(dsl => {
      story.load(dsl);
      player.play(0);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
