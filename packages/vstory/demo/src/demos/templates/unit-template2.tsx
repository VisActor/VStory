import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { loadExampleData, decompressData, createUnitTemplate } from '../../../../../vstory-templates/src';
import { exportVideo } from '../utils';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDemoDSL() {
  let id = 0;
  const data = new Array(15600).fill(0).map((_, index) => {
    if (index < 600) {
      return {
        group: 0,
        color: 'R'
      };
    } else if (index < 960) {
      return {
        group: 1,
        color: index < 950 ? 'R' : 'G'
      };
    } else if (index < 2040) {
      return {
        group: 2,
        color: index < 1932 ? 'R' : 'G'
      };
    } else if (index < 3600) {
      return {
        group: 3,
        color: index < 3280 ? 'R' : 'G'
      };
    } else if (index < 4800) {
      return {
        group: 4,
        color: index < 4500 ? 'R' : 'G'
      };
    } else if (index < 7200) {
      return {
        group: 5,
        color: index < 6480 ? 'R' : 'G'
      };
    } else if (index < 10200) {
      return {
        group: 6,
        color: index < 9000 ? 'R' : 'G'
      };
    } else {
      return {
        group: 7,
        color: index < 13170 ? 'R' : 'G'
      };
    }
  });
  const spec = {
    layout: {
      width: 1920,
      height: 1080,
      viz: {
        padding: {
          top: 0
        },
        background: 'transparent'
      },
      title: {
        style: {
          fontSize: 36
        },
        height: 0
      }
    },
    unit: {
      gap: [0.1, 0.1],
      countPerSymbol: 1, // 每个点对应一条数据，如果数据量很大，建议一个点对应多个数据
      defaultStyle: {
        fill: '#222222',
        symbolType:
          '<svg t="1733663156014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5195" width="200" height="200"><path d="M554.666667 597.333333v42.666667h-85.333334v-42.666667H384v-85.333333h76.8l-68.266667-68.266667L456.533333 384l55.466667 55.466667L567.466667 384l59.733333 59.733333-64 68.266667H640v85.333333h-85.333333z m341.333333-213.333333v384H128V256h768v128z m-85.333333 21.333333V341.333333H213.333333v64c25.6 21.333333 42.666667 51.2 42.666667 85.333334s-17.066667 64-42.666667 85.333333V682.666667h597.333334v-106.666667c-25.6-21.333333-42.666667-51.2-42.666667-85.333333s17.066667-64 42.666667-85.333334z" p-id="5196"></path></svg>'
      }
    },
    data,
    scenes: [
      {
        title: [
          {
            text: ''
          }
        ],
        nodes: [
          {
            style: {
              fill: '#cecece'
            }
          }
        ]
      },
      {
        title: [
          {
            text: ``
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.group === 0,
            style: {
              fill: 'rgb(170, 56, 30)'
            }
          }
        ]
      },
      {
        title: [
          {
            text: ``
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.group === 1,
            style: {
              fill: 'rgb(170, 56, 30)'
            }
          }
        ]
      },
      {
        title: [
          {
            text: ``
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.group === 1,
            style: {
              fill: 'rgb(170, 56, 30)'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.group === 1 && datum?.color === 'G',
                style: {
                  fill: 'rgb(231, 164, 148)'
                }
              }
            ]
          }
        ]
      }
    ]
  };
  new Array(6).fill(0).forEach((_, index) => {
    index += 2;
    spec.scenes.push({
      title: [
        {
          text: ``
        }
      ],
      nodes: [
        {
          query: (datum: typeof data[0]) => datum.group === index,
          style: {
            fill: 'rgb(170, 56, 30)'
          }
        }
      ]
    });

    spec.scenes.push({
      title: [
        {
          text: ``
        }
      ],
      nodes: [
        {
          query: (datum: typeof data[0]) => datum.group === index,
          style: {
            fill: 'rgb(170, 56, 30)'
          },
          children: [
            {
              query: (datum: typeof data[0]) => datum.group === index && datum?.color === 'G',
              style: {
                fill: 'rgb(231, 164, 148)'
              }
            }
          ]
        }
      ]
    });
  });
  spec.scenes.push;
  const dsl = createUnitTemplate(spec);
  console.log(dsl);
  return dsl;
}

export const UnitTemplate2 = () => {
  const id = 'UnitTemplate2';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      width: 1920 / 2,
      height: 1080 / 2,
      background: 'transparent',
      scaleX: 0.5,
      scaleY: 0.5
    });
    const player = new Player(story);
    story.init(player);

    loadDemoDSL().then(dsl => {
      story.load(dsl);
      player.play(0);
    });
    exportVideo(story);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
