// @ts-nocheck
import { ICharacterSpec } from '../../../../src/story/character';
import { ISceneSpec } from '../../../../src/story/interface';

const chartSpecList = [
  {
    title: 'Timeline Chart',
    characterType: 'RangeColumnChart',
    spec: {
      type: 'rangeColumn',
      title: {
        text: 'Timeline Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      direction: 'horizontal',
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
      },
      axes: [
        {
          orient: 'bottom',
          domainLine: { visible: true },
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        },
        {
          orient: 'left',
          domainLine: { visible: false },
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        }
      ],
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
      ]
    }
  },
  {
    title: 'Bar Chart',
    characterType: 'BarChart',
    spec: {
      type: 'bar',
      color: ['#4CC9E4', '#4954E6'],
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
      },
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
      axes: [
        {
          orient: 'bottom',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        },
        {
          orient: 'left',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        }
      ]
    }
  },
  {
    title: 'Line/Area Chart',
    characterType: 'AreaChart',
    spec: {
      type: 'area',
      title: {
        text: 'Line/Area Chart',
        orient: 'bottom',
        align: 'center',
        textStyle: {
          fontSize: 10,
          lineHeight: 10
        }
      },
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      point: {
        visible: false
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
      axes: [
        {
          orient: 'bottom',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        },
        {
          orient: 'left',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        }
      ]
    }
  },
  {
    title: 'Pie Chart',
    characterType: 'Pie',
    spec: {
      type: 'pie',
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
      animation: false,
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
      valueField: 'value',
      categoryField: 'name',
      radius: 1,
      innerRadius: 0
    }
  },
  {
    title: 'Scatter Chart',
    spec: {
      type: 'scatter',
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
      axes: [
        {
          orient: 'bottom',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        },
        {
          orient: 'left',
          tick: { visible: false },
          label: { visible: false },
          grid: { visible: false }
        }
      ],
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      point: {
        style: {
          size: 4
        }
      }
    }
  },
  {
    title: 'Rose Chart',
    characterType: 'RoseChart',
    spec: {
      type: 'rose',
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
      valueField: 'value',
      seriesField: 'name',
      categoryField: 'name',
      radius: 1,
      innerRadius: 0,
      axes: [
        {
          orient: 'radius',
          domainLine: { visible: false, smooth: false },
          label: {
            visible: false
          },
          tick: {
            visible: false
          },
          grid: { visible: false }
        },
        {
          orient: 'angle',
          domainLine: { visible: false, smooth: false },
          label: {
            visible: false
          },
          tick: {
            visible: false
          },
          grid: { visible: false }
        }
      ]
    }
  },
  {
    title: 'Radar Chart',
    spec: {
      type: 'radar',
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
      startAngle: 90,
      axes: [
        {
          orient: 'radius',
          domainLine: { visible: false, smooth: false },
          label: {
            visible: false
          },
          tick: {
            visible: false
          },
          grid: { visible: false }
        },
        {
          orient: 'angle',
          domainLine: { visible: false, smooth: false },
          label: {
            visible: false
          },
          tick: {
            visible: false
          },
          grid: { visible: false }
        }
      ]
    }
  },
  {
    title: 'Word Cloud',
    characterType: 'WordCloudChart',
    spec: {
      type: 'wordCloud',
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
      valueField: 'sum_count',
      seriesField: 'challenge_name',
      nameField: 'challenge_name',
      wordCloudConfig: {
        drawOutOfBound: 'clip'
      },
      maskShape: 'circle',
      fontSizeRange: [5, 8]
    }
  },
  {
    title: 'TreeMap Chart',
    characterType: 'TreeMapChart',
    spec: {
      type: 'treemap',
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
  },
  {
    title: 'Sunburst Chart',
    characterType: 'SunburstChart',
    spec: {
      type: 'sunburst',
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
      offsetX: 0,
      offsetY: 0,
      categoryField: 'name',
      valueField: 'value',
      outerRadius: 1,
      innerRadius: 0,
      gap: 1,
      sunburst: { style: { stroke: false, lineWidth: 0 } },
      label: {
        visible: false
      }
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

export const chartCharacters = chartSpecList.map((item, i) => ({
  type: 'VChart',
  id: `chart${i}`,
  zIndex: 1,
  position: {
    top: i < 5 ? 50 : 570,
    left: 220 + (i % 5) * (110 + 72),
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

export const scene1Characters = [
  ...chartCharacters,
  {
    type: 'Text',
    id: `title1`,
    zIndex: 1,
    position: {
      top: 290,
      left: 680,
      width: 775,
      height: 200
    },
    options: {
      graphic: { text: 'A BRIEF HISTORY', fontSize: 75, fontWeight: 'bold' }
    }
  },
  {
    type: 'Text',
    id: `title2`,
    zIndex: 1,
    position: {
      top: 390,
      left: 680,
      width: 600,
      height: 200
    },
    options: {
      graphic: { text: 'OF CHARTS', fontSize: 75, fontWeight: 'bold' }
    }
  },
  {
    type: 'Text',
    id: `titlesubtitle`,
    zIndex: 1,
    position: {
      top: 470,
      left: 770,
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
  }
];

export const scene1 = {
  id: 'scene1',
  actions: [
    ...new Array(5).fill(0).map((_, i) => ({
      characterId: `chart${i}`,
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
      characterId: `chart${9 - i}`,
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
      characterId: `title1`,
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
      characterId: `title2`,
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
      characterId: `chart${9 - i}`,
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
    ...new Array(10).fill(0).map((_, i) => ({
      characterId: `chart${i}`,
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
      characterId: `titlesubtitle`,
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
      characterId: `chart${9 - i}`,
      characterActions: [
        {
          startTime: 6000,
          duration: 1000,
          action: 'disappear',
          payload: {
            animation: {
              duration: 1000
            },
            fade: { isBaseOpacity: true }
          }
        }
      ]
    })),
    {
      characterId: `titlesubtitle`,
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
