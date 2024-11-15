import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { loadExampleData, decompressData, createUnitTemplate } from '../../../../../vstory-templates/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDSL() {
  const compressedData = await loadExampleData();
  const data = decompressData(compressedData);
  const spec = {
    layout: {
      width: 1550,
      height: 800,
      viz: {
        padding: {
          top: 0
        }
      },
      title: {
        style: {
          fontSize: 36
        },
        height: 150
      }
    },
    unit: {
      gap: [0.2, 0.2],
      countPerSymbol: 1,
      defaultStyle: {
        fill: '#222222'
      }
    },
    data: data.filter(record => record.year === 2014),
    scenes: [
      {
        title: [
          {
            text: '美国每年有超过'
          },
          {
            text: ' 33,000 ',
            fontWeight: 'bold'
          },
          {
            text: '个人被枪杀'
          }
        ],
        nodes: [
          {
            style: {
              fill: '#dedede'
            }
          }
        ]
      },
      {
        title: [
          {
            text: '近三分之二的枪支死亡事件为 '
          },
          {
            text: '自杀',
            fontWeight: 'bold'
          },
          {
            text: '.'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Suicide',
            style: {
              fill: '#e3662e'
            }
          }
        ]
      },
      {
        sceneDuration: 3000,
        animationDuration: 500,
        title: [
          {
            text: '超过85%的自杀受害者是 '
          },
          {
            text: '男性',
            fontWeight: 'bold'
          },
          {
            text: '...'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Suicide',
            style: {
              fill: '#f4cfbb'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.sex === 'M',
                style: {
                  fill: '#e3662e'
                }
              }
            ]
          }
        ]
      },
      {
        sceneDuration: 3000,
        animationDuration: 500,
        title: [
          {
            text: '... 超过一半的自杀者是 '
          },
          {
            text: '45岁以上的男性',
            fontWeight: 'bold'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Suicide',
            style: {
              fill: '#f4cfbb'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.sex === 'M' && datum.age >= 45,
                style: {
                  fill: '#e3662e'
                }
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: '另外三分之一的枪支死亡——每年约12000人 —— 是 '
          },
          {
            text: '凶杀案',
            fontWeight: 'bold'
          },
          {
            text: '.'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent !== 'Homicide',
            style: {
              fill: '#dedede'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Homicide',
            style: {
              fill: '#5D76A3'
            }
          }
        ]
      },
      {
        title: [
          {
            text: '超过一半的凶杀案受害者是 '
          },
          {
            text: '年轻男性',
            fontWeight: 'bold'
          },
          {
            text: '...'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Homicide',
            style: {
              fill: '#C6CEDF'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
                style: {
                  fill: '#5D76A3'
                }
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: '… 其中三分之二是 '
          },
          {
            text: '黑人',
            fontWeight: 'bold'
          },
          {
            text: '.'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Homicide',
            style: {
              fill: '#C6CEDF'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
                style: {
                  fill: '#A6B3CC'
                },
                children: [
                  {
                    query: (datum: typeof data[0]) => datum.race === 'Black',
                    style: {
                      fill: '#5D76A3'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: '女性',
            fontWeight: 'bold'
          },
          {
            text: ' 成为枪支凶杀案受害者的可能性要小得多，每年约有1700人被杀，其中许多人死于严重的 '
          },
          {
            text: '家庭暴力',
            fontWeight: 'bold'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Homicide',
            style: {
              fill: '#C6CEDF'
            },
            children: [
              {
                query: (datum: typeof data[0]) => datum.sex === 'F',
                style: {
                  fill: '#5D76A3'
                }
              }
            ]
          }
        ]
      },
      {
        title: [
          {
            text: '其余的枪支死亡是 '
          },
          {
            text: '意外',
            fontWeight: 'bold'
          },
          {
            text: '或被归类为未确定。',
            fontWeight: 'bold'
          }
        ],
        nodes: [
          {
            style: {
              fill: '#dedede'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Accidental',
            style: {
              fill: '#D4BC45'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Undetermined',
            style: {
              fill: '#999999'
            }
          }
        ]
      },
      {
        title: [
          {
            text: '所有这些死亡事件的共同点是枪支。但原因非常不同，这意味着解决方案也会有所不同。\n'
          },
          {
            text: '—— 数据来源美国枪支死亡统计\n',
            fontSize: 20,
            fill: 'grey',
            textAlign: 'right'
          }
        ],
        nodes: [
          {
            query: (datum: typeof data[0]) => datum.intent === 'Suicide',
            style: {
              fill: '#e3662e'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Homicide',
            style: {
              fill: '#5D76A3'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Accidental',
            style: {
              fill: '#D4BC45'
            }
          },
          {
            query: (datum: typeof data[0]) => datum.intent === 'Undetermined',
            style: {
              fill: '#999999'
            }
          }
        ]
      }
    ]
  };
  const dsl = createUnitTemplate(spec);
  console.log(dsl);
  return dsl;
}

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
