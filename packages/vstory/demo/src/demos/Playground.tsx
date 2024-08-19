import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import { Edit } from '../../../src/edit/edit';
import '../../../src/story/index';
import { cloneDeep } from '@visactor/vutils';
import { CommonEditComponent } from '../../../src/edit/edit-component/common';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Resizable, Enable } from 're-resizable';

// Edit.registerEditComponent('common', CommonEditComponent);
// Edit.registerEditComponent('text', TextSelection);
// Edit.registerEditComponent('richtext', RichTextSelection);
// Edit.registerEditComponent('box-selection', BoxSelection);

const defaultCode = `const chartSpecList = [
  {
    title: 'Timeline Chart',
    characterType: 'RangeColumnChart',
    options: {
      title: {
        text: 'Timeline Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'id0',
          values: [
            { type: 'a', value: 0.36, value2: 0.06 },
            { type: 'b', value: 0.66, value2: 0.26 },
            { type: 'c', value: 0.4, value2: 0.0 },
            { type: 'd', value: 0.6, value2: 0.2 }
          ]
        }
      ],

      direction: 'horizontal',
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            minField: 'value',
            maxField: 'value2',
            yField: 'type',
            bar: {
              maxWidth: 2,
              style: {
                maxWidth: 2
              }
            },
            label: {
              style: {
                visible: false
              }
            }
          }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'bottom' },
          spec: {
            domainLine: { visible: true },
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'left' },
          spec: {
            domainLine: { visible: false },
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        }
      ]
    }
  },
  {
    title: 'Bar Chart',
    characterType: 'BarChart',
    options: {
      title: {
        text: 'BarChart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data',
          values: [
            {
              x: 'Mon',
              y: 100,
              type: '销售额'
            },
            {
              x: 'Tues',
              y: 66,
              type: '销售额'
            },
            {
              x: 'Wed',
              y: 95,
              type: '销售额'
            },
            {
              x: 'Mon',
              y: 43,
              type: '利润'
            },
            {
              x: 'Tues',
              y: 80,
              type: '利润'
            },
            {
              x: 'Wed',
              y: 68,
              type: '利润'
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            xField: ['x', 'type'],
            yField: 'y',
            seriesField: 'type',
            bar: {
              style: {
                fill: {
                  gradient: 'linear',
                  stops: [
                    {
                      offset: 1
                    },
                    {
                      offset: 0,
                      opacity: 0.6
                    }
                  ]
                }
              },
              state: {
                selected: {
                  stroke: '#000',
                  strokeWidth: 1
                }
              }
            },
            label: {
              style: {
                visible: false
              }
            }
          }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'bottom' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'left' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        }
      ],
      color: ['#4CC9E4', '#4954E6']
    }
  },
  {
    title: 'Line/Area Chart',
    characterType: 'AreaChart',
    options: {
      title: {
        text: 'Line/Area Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data2',
          values: [
            { x: 1, y: 70, type: 'a' },
            { x: 2, y: 20, type: 'a' },
            { x: 3, y: 30, type: 'a' },
            { x: 4, y: 10, type: 'a' },

            { x: 1, y: 70, type: 'b' },
            { x: 2, y: 20, type: 'b' },
            { x: 3, y: 30, type: 'b' },
            { x: 4, y: 10, type: 'b' }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            xField: 'x',
            yField: 'y',
            seriesField: 'type',
            point: {
              visible: false
            }
          }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'bottom' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'left' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        }
      ]
    }
  },
  {
    title: 'Pie Chart',
    characterType: 'PieChart',
    options: {
      title: {
        text: 'Pie Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data1',
          values: [
            {
              value: 348,
              name: '中介渠道: 34.8%'
            },
            {
              value: 152,
              name: '会员: 15.2%'
            },
            {
              value: 500,
              name: '散客: 50%'
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: { valueField: 'value', categoryField: 'name', radius: 1, innerRadius: 0 }
        }
      ]
    }
  },
  {
    title: 'Scatter Chart',
    characterType: 'ScatterChart',
    options: {
      title: {
        text: 'Scatter Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data2',
          values: [
            { x: 1, y: 70, type: 'a' },
            { x: 2, y: 20, type: 'a' },
            { x: 3, y: 30, type: 'a' },
            { x: 4, y: 10, type: 'a' },

            { x: 1, y: 70, type: 'b' },
            { x: 2, y: 20, type: 'b' },
            { x: 3, y: 30, type: 'b' },
            { x: 4, y: 10, type: 'b' }
          ]
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'bottom' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'left' },
          spec: {
            tick: { visible: false },
            label: { visible: false },
            grid: { visible: false }
          }
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            xField: 'x',
            yField: 'y',
            seriesField: 'type',
            point: {
              style: {
                size: 4
              }
            }
          }
        }
      ]
    }
  },
  {
    title: 'Rose Chart',
    characterType: 'RoseChart',
    options: {
      title: {
        text: 'Rose Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data1',
          values: [
            {
              value: 348,
              name: '中介渠道: 34.8%'
            },
            {
              value: 152,
              name: '会员: 15.2%'
            },
            {
              value: 500,
              name: '散客: 50%'
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: { valueField: 'value', seriesField: 'name', categoryField: 'name', radius: 1, innerRadius: 0 }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'radius' },
          spec: {
            domainLine: { visible: false, smooth: false },
            label: {
              visible: false
            },
            tick: {
              visible: false
            },
            grid: { visible: false }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'angle' },
          spec: {
            domainLine: { visible: false, smooth: false },
            label: {
              visible: false
            },
            tick: {
              visible: false
            },
            grid: { visible: false }
          }
        }
      ]
    }
  },
  {
    title: 'Radar Chart',
    characterType: 'RadarChart',
    options: {
      title: {
        text: 'Radar Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data2',
          values: [
            {
              theta: 0,
              type: 'A',
              value: 833
            },
            {
              theta: 1,
              type: 'A',
              value: 898
            },
            {
              theta: 2,
              type: 'A',
              value: 672
            },
            {
              theta: 3,
              type: 'A',
              value: 889
            },
            {
              theta: 4,
              type: 'A',
              value: 889
            },
            {
              theta: 5,
              type: 'A',
              value: 658
            },
            {
              theta: 6,
              type: 'A',
              value: 822
            },
            {
              theta: 7,
              type: 'A',
              value: 825
            },
            {
              theta: 0,
              type: 'B',
              value: 659
            },
            {
              theta: 1,
              type: 'B',
              value: 896
            },
            {
              theta: 2,
              type: 'B',
              value: 822
            },
            {
              theta: 3,
              type: 'B',
              value: 874
            },
            {
              theta: 4,
              type: 'B',
              value: 742
            },
            {
              theta: 5,
              type: 'B',
              value: 878
            },
            {
              theta: 6,
              type: 'B',
              value: 643
            },
            {
              theta: 7,
              type: 'B',
              value: 604
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            categoryField: 'theta',
            valueField: 'value',
            seriesField: 'type',
            line: {
              style: {
                strokeWidth: 2
              }
            },
            legends: {
              visible: false
            },
            label: {
              visible: false
            },
            animationAppear: {
              preset: 'clipIn'
            },
            point: {
              style: {
                size: 2,
                strokeWidth: 1
              }
            },
            startAngle: 90
          }
        }
      ],
      componentSpec: [
        {
          specKey: 'axes',
          matchInfo: { orient: 'radius' },
          spec: {
            domainLine: { visible: true, smooth: false },
            label: {
              visible: false
            },
            tick: {
              visible: false
            },
            grid: { visible: true }
          }
        },
        {
          specKey: 'axes',
          matchInfo: { orient: 'angle' },
          spec: {
            domainLine: { visible: false, smooth: false },
            label: {
              visible: false
            },
            grid: { visible: false }
          }
        }
      ]
    }
  },
  {
    title: 'Word Cloud',
    characterType: 'WordCloudChart',
    options: {
      title: {
        text: 'Word Cloud',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data1',
          values: [
            {
              challenge_id: 1658490688121879,
              challenge_name: '宅家剧场',
              sum_count: 128
            },
            {
              challenge_id: 1640007327696910,
              challenge_name: '我的观影报告',
              sum_count: 103
            },
            {
              challenge_id: 1557656100811777,
              challenge_name: '抖瓜小助手',
              sum_count: 76
            },
            {
              challenge_id: 1553513807372289,
              challenge_name: '搞笑',
              sum_count: 70
            },
            {
              challenge_id: 1599321527572563,
              challenge_name: '我要上热门',
              sum_count: 69
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            valueField: 'sum_count',
            seriesField: 'challenge_name',
            nameField: 'challenge_name',
            wordCloudConfig: {
              drawOutOfBound: 'clip'
            },
            maskShape: 'circle',
            fontSizeRange: [5, 8]
          }
        }
      ]
    }
  },
  {
    title: 'TreeMap Chart',
    characterType: 'TreeMapChart',
    options: {
      title: {
        text: 'TreeMap Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data',
          values: [
            {
              name: 'Second',
              children: [
                {
                  name: 'B2',
                  value: 98
                },
                {
                  name: 'B3',
                  value: 56
                }
              ]
            },
            {
              name: 'First',
              children: [
                {
                  name: 'A2',
                  value: 60
                },
                {
                  name: 'A3',
                  value: 30
                }
              ]
            },
            {
              name: 'Third',
              children: [
                {
                  name: 'C1',
                  value: 33
                },
                {
                  name: 'C2',
                  value: 30
                },
                {
                  name: 'C3',
                  value: 40
                }
              ]
            },
            {
              name: 'Fourth',
              children: [
                {
                  name: 'D4',
                  value: 64
                },
                {
                  name: 'D5',
                  value: 60
                }
              ]
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            categoryField: 'name',
            valueField: 'value',
            legends: { visible: false },
            nodePadding: 1,
            nonLeaf: {
              visible: false
            },
            nonLeafLabel: {
              visible: false
            },
            label: {
              visible: false
            }
          }
        }
      ]
    }
  },
  {
    title: 'Sunburst Chart',
    characterType: 'SunburstChart',
    options: {
      title: {
        text: 'Sunburst Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      padding: 12,
      data: [
        {
          id: 'data',
          values: [
            {
              name: 'Grandpa',
              children: [
                {
                  name: 'Uncle Leo',
                  value: 15,
                  children: [
                    {
                      name: 'Cousin Jack',
                      value: 2
                    },
                    {
                      name: 'Cousin Mary',
                      value: 5,
                      children: [
                        {
                          name: 'Jackson',
                          value: 2
                        }
                      ]
                    },
                    {
                      name: 'Cousin Ben',
                      value: 4
                    }
                  ]
                },
                {
                  name: 'Father',
                  value: 10,
                  children: [
                    {
                      name: 'Me',
                      value: 5
                    },
                    {
                      name: 'Brother Peter',
                      value: 1
                    }
                  ]
                }
              ]
            },
            {
              name: 'Nancy',
              children: [
                {
                  name: 'Uncle Nike',
                  children: [
                    {
                      name: 'Cousin Betty',
                      value: 1
                    },
                    {
                      name: 'Cousin Jenny',
                      value: 2
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      seriesSpec: [
        {
          matchInfo: { specIndex: 'all' },
          spec: {
            offsetX: 0,
            offsetY: 0,
            categoryField: 'name',
            valueField: 'value',
            outerRadius: 1,
            innerRadius: 0,
            label: {
              visible: false
            }
          }
        }
      ]
    }
  }
].map(item => ({
  ...item,
  options: {
    ...item.options,
    panel: {
      fill: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowBlur: 10,
      shadowOffsetX: 4,
      shadowOffsetY: 4
    }
  }
}));

const scene1Characters = chartSpecList.map((item, i) => ({
  type: item.characterType ?? 'CharacterChart',
  id: \`chart\${i}\`,
  zIndex: 1,
  position: {
    top: i < 5 ? 50 : 570,
    left: 100 + (i % 5) * 170 + 20,
    width: 110,
    height: 110
  },
  options: {
    spec: item.spec,
    // data: data1,
    // @ts-ignore
    attribute: {},
    // @ts-ignore
    ...(item.options ?? {})
  }
}));

const scene1 = {
  id: 'scene1',
  actions: [
    ...new Array(5).fill(0).map((_, i) => ({
      characterId: \`chart\${i}\`,
      characterActions: [
        {
          startTime: i * 300 + 500,
          duration: 1000,
          action: 'appear',
          payload: {
            animation: {
              duration: 1000
            }
          }
        }
      ]
    })),
    ...new Array(5).fill(0).map((_, i) => ({
      characterId: \`chart\${9 - i}\`,
      characterActions: [
        {
          startTime: i * 300 + 500,
          duration: 1000,
          action: 'appear',
          payload: {
            animation: {
              duration: 1000
            }
          }
        }
      ]
    })),
    {
      characterId: 'title1',
      characterActions: [
        {
          startTime: 1500,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              effect: 'typewriter',
              easing: 'quadIn'
            }
          }
        }
      ]
    },
    {
      characterId: 'title2',
      characterActions: [
        {
          startTime: 2000,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 500,
              effect: 'typewriter',
              easing: 'quadIn'
            }
          }
        }
      ]
    },
    ...new Array(5).fill(0).map((_, i) => ({
      characterId: \`chart\${9 - i}\`,
      characterActions: [
        {
          startTime: i * 100 + 2500,
          duration: 2000,
          action: 'bounce',
          payload: {
            animation: {
              duration: 2000
            }
          }
        }
      ]
    })),
    ...new Array(5).fill(0).map((_, i) => ({
      characterId: \`chart\${i}\`,
      characterActions: [
        {
          startTime: i * 100 + 2500,
          duration: 2000,
          action: 'bounce',
          payload: {
            animation: {
              duration: 2000
            }
          }
        }
      ]
    })),
    {
      characterId: 'titlesubtitle',
      characterActions: [
        {
          startTime: 2700,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              duration: 200,
              easing: 'linear',
              effect: 'fade'
            }
          }
        }
      ]
    },
    ...new Array(10).fill(0).map((_, i) => ({
      characterId: \`chart\${9 - i}\`,
      characterActions: [
        {
          startTime: 6000,
          duration: 1000,
          action: 'disappear',
          payload: {
            animation: {
              duration: 1000
            }
          }
        }
      ]
    })),
    {
      characterId: 'titlesubtitle',
      characterActions: [
        {
          startTime: 6000,
          duration: 1000,
          action: 'disappear',
          payload: {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: 'fade'
            }
          }
        }
      ]
    }
  ]
};

const scene2Characters = [
  {
    type: 'Text',
    id: 'title1',
    zIndex: 1,
    position: {
      top: 300,
      left: 500,
      width: 500,
      height: 200
    },
    options: {
      graphic: { text: 'A BRIEF HISTORY', fontSize: 55, fontWeight: 'bold' }
    }
  },
  {
    type: 'Text',
    id: 'title2',
    zIndex: 1,
    position: {
      top: 380,
      left: 500,
      width: 400,
      height: 60
    },
    options: {
      graphic: { text: 'OF CHARTS', fontSize: 55, fontWeight: 'bold' }
    }
  },
  {
    type: 'RichText',
    id: 'titlesubtitle',
    zIndex: 1,
    position: {
      top: 450,
      left: 600,
      width: 400,
      height: 80
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 22,
        fontWeight: 'bold',
        textConfig: [
          {
            text: 'Powered By '
          },
          {
            text: 'VChart',
            fill: 'blue'
          }
        ]
      }
    }
  },
  {
    type: 'Text',
    id: 'scene2-title2',
    zIndex: 1,
    position: {
      top: 50,
      left: 150,
      width: 200,
      height: 20
    },
    options: {
      graphic: {
        width: 400,
        fontSize: 12,
        fill: '#292729',
        text: 'DEVELOPMENT ROADMAP'
      }
    }
  }
]

const scene2 = {
  id: 'scene2',
  actions: [
    {
      characterId: 'title1',
      characterActions: [
        {
          startTime: 0,
          duration: 800,
          action: 'moveTo',
          destination: {
            x: 250,
            y: 80
          },
          payload: {
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        },
        {
          startTime: 0,
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
    },
    {
      characterId: 'title2',
      characterActions: [
        {
          startTime: 0,
          duration: 800,
          action: 'moveTo',
          destination: {
            x: 550,
            y: 80
          },
          payload: {
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        },
        {
          startTime: 0,
          duration: 800,
          action: 'style',
          payload: {
            graphic: {
              fontSize: 40
            },
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene2-title2',
      characterActions: [
        {
          startTime: 800,
          duration: 800,
          action: 'appear',
          payload: {
            animation: {
              duration: 800,
              easing: 'linear',
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'title1',
      characterActions: [
        {
          startTime: 2000,
          duration: 800,
          action: 'moveTo',
          destination: {
            x: -650,
            y: 80
          },
          payload: {
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        }
      ]
    },
    {
      characterId: 'title2',
      characterActions: [
        {
          startTime: 2000,
          duration: 800,
          action: 'moveTo',
          destination: {
            x: -350,
            y: 80
          },
          payload: {
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene2-title2',
      characterActions: [
        {
          startTime: 2000,
          duration: 800,
          action: 'moveTo',
          destination: {
            x: -750,
            y: 80
          },
          payload: {
            animation: {
              duration: 800,
              easing: 'quadInOut'
            }
          }
        }
      ]
    }
  ]
}

scene1Characters.forEach(c => {
  c.position.left = c.position.left / 3 * 2;
  c.position.top = c.position.top / 3 * 2;
});
scene2Characters.forEach(c => {
  c.position.left = c.position.left / 3 * 2;
  c.position.top = c.position.top / 3 * 2;
});

const tempSpec = {
    characters: [
    ...scene1Characters,
    ...scene2Characters
    ],
    acts: [
    {
        id: 'default-chapter',
        scenes: [
          scene1,
          scene2
        ]
    }
    ]
};

return tempSpec;`;

interface IPlayerPropsType {
  code: string;
}

export function Player(props: IPlayerPropsType) {
  const storyRef = useRef<Story>();
  useEffect(() => {
    if (!props.code) {
      return;
    }
    if (storyRef.current) {
      storyRef.current.release();
    }
    let json;
    try {
      json = JSON.parse(props.code);
    } catch (err) {
      try {
        const func = new Function(props.code);
        json = func();
      } catch (err) {
        return;
      }
    }
    console.log(json);
    const story = new Story(json, { dom: 'abc', playerOption: { scaleX: 0.5, scaleY: 0.5 } });
    storyRef.current = story;
    story.play();
  }, [props.code]);
  return <div style={{ width: '100%', height: '100%' }} id="abc"></div>;
}

export const Playground = () => {
  const [code, setCode] = useState(defaultCode);
  const stoRef = useRef<NodeJS.Timeout>();
  const time = 1000;

  const handleChangeCode = useCallback((code: string) => {
    if (stoRef.current) {
      clearTimeout(stoRef.current);
    }
    stoRef.current = setTimeout(() => {
      setCode(code);
    }, time);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ fontSize: 26, height: 100 }}>VStory Playground</div>
      <div style={{ width: '100%', height: 600, display: 'flex', padding: '0 16px', boxSizing: 'border-box' }}>
        <div style={{ flexGrow: 1, border: '1px solid #cecece', height: '100%' }}>
          <Player code={code} />
        </div>
        <Resizable
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
          }}
          defaultSize={{
            width: 600
          }}
        >
          <div style={{ width: '100%', border: '1px solid #cecece', height: '100%', borderLeft: '2px solid #cecece' }}>
            <Editor defaultLanguage="javascript" defaultValue={defaultCode} onChange={v => handleChangeCode(v || '')} />
          </div>
        </Resizable>
      </div>
    </div>
  );
};
