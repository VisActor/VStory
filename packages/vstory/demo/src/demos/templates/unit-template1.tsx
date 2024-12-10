import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { loadExampleData, decompressData, createUnitTemplate } from '../../../../../vstory-templates/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDemoDSL() {
  const data = new Array(20000)
    .fill(0)
    .map(() => ({ color: Math.random() > 0.5 ? 'B' : 'R', size: Math.random() * 100 }));
  // 处理一下数据，将数据按照颜色和大小排序
  const count = (datum: { color: string; size: number }) => (datum.color === 'B' ? 10 : 5) + (datum.size > 50 ? 2 : 1);
  data.sort((d1, d2) => {
    return count(d1) - count(d2);
  });
  const spec = {
    layout: {
      width: 1550,
      height: 800,
      viz: {
        padding: {
          top: 0
        },
        background: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-template-bg.png',
        backgroundOpacity: 0.2
      },
      title: {
        style: {
          fontSize: 36
        },
        height: 150
      }
    },
    unit: {
      gap: [0.5, 0.5],
      countPerSymbol: 1, // 每个点对应一条数据，如果数据量很大，建议一个点对应多个数据
      defaultStyle: {
        fill: '#222222'
      }
    },
    data,
    scenes: [
      {
        title: [
          {
            text: '坎巴拉星球有20000个坎巴拉星人'
          }
        ],
        nodes: [
          {
            style: {
              fill: '#ded034'
            }
          }
        ]
      },
      {
        title: [
          {
            text: `其中，有${data.filter(d => d.color === 'B').length}个坎巴拉人是蓝色的`
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.color === 'B',
            style: {
              fill: '#89a8ea'
            }
          }
        ]
      },
      {
        title: [
          {
            text: `其中，有${data.filter(d => d.color === 'R').length}个坎巴拉人是红色的`
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.color === 'R',
            style: {
              fill: '#e385a0'
            }
          }
        ]
      },
      {
        title: [
          {
            text: `蓝色坎巴拉星人中，有${data.filter(d => d.color === 'B' && d.size > 50).length}个是大坎巴拉星人`
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.color === 'B',
            style: {
              fill: '#89a8ea'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.size > 50,
                style: {
                  fill: '#2055c8'
                }
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: `红坎巴拉星人中，有${data.filter(d => d.color === 'R' && d.size > 50).length}个是大坎巴拉星人`
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.color === 'R',
            style: {
              fill: '#e385a0'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.size > 50,
                style: {
                  fill: '#c82d59'
                }
              }
            ]
          }
        ]
      }
    ]
  };
  const dsl = createUnitTemplate(spec);
  console.log(dsl);
  return dsl;
}

export const UnitTemplate1 = () => {
  const id = 'UnitTemplate1';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 1000, height: 500, background: 'white', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);

    loadDemoDSL().then(dsl => {
      story.load(dsl);
      player.play(0);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
