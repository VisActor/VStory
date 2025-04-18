import React, { useEffect } from 'react';
import {
  Player,
  Story,
  initVR,
  registerGraphics,
  registerCharacters,
  IStoryDSL
} from '../../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../../vstory-player/src';
import { StroyAllDataGroup } from '../../../../../../vstory-core/src/interface/dsl/chart';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

function loadDSL() {
  const barSpec0 = {
    direction: 'vertical',
    type: 'common',
    color: ['#00295C', '#2568BD', '#9F9F9F', '#C5C5C5', '#00B0F0', '#4BCFFF', '#C2C2C2', '#D7D7D7'],
    series: [
      {
        type: 'bar',
        stack: true,
        direction: 'vertical',
        bar: {
          style: {
            stroke: '',
            lineWidth: 1
          },
          state: {
            hover: {
              stroke: '#000',
              lineWidth: 1
            }
          }
        },
        barBackground: {
          style: {
            stroke: '',
            lineWidth: 1
          }
        },
        label: {
          position: 'inside',
          style: {
            lineHeight: '100%',
            fontSize: 16,
            fontWeight: 'bold'
          },
          overlap: {
            strategy: []
          },
          smartInvert: true,
          formatConfig: {},
          interactive: true
        },
        totalLabel: {
          visible: true,
          position: 'top',
          overlap: false,
          clampForce: false,
          formatConfig: {
            fixed: 0,
            content: 'value'
          },
          style: {
            lineHeight: '100%',
            lineWidth: 1,
            fill: '#1F2329',
            stroke: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold'
          },
          interactive: true
        },
        seriesLabel: {
          visible: true,
          position: 'end',
          label: {
            style: {
              lineHeight: '100%',
              lineWidth: 1,
              stroke: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold'
            },
            space: 10
          }
        },
        xField: '_editor_dimension_field',
        yField: '_editor_value_field',
        dataId: '0',
        id: 'series-0',
        EDITOR_SERIES_DATA_KEY: 'a',
        seriesField: '_editor_type_field'
      },
      {
        type: 'bar',
        stack: true,
        direction: 'vertical',
        bar: {
          style: {
            stroke: '',
            lineWidth: 1
          },
          state: {
            hover: {
              stroke: '#000',
              lineWidth: 1
            }
          }
        },
        barBackground: {
          style: {
            stroke: '',
            lineWidth: 1
          }
        },
        label: {
          position: 'inside',
          style: {
            lineHeight: '100%',
            fontSize: 16,
            fontWeight: 'bold'
          },
          overlap: {
            strategy: []
          },
          smartInvert: true,
          formatConfig: {},
          interactive: true
        },
        totalLabel: {
          visible: true,
          position: 'top',
          overlap: false,
          clampForce: false,
          formatConfig: {
            fixed: 0,
            content: 'value'
          },
          style: {
            lineHeight: '100%',
            lineWidth: 1,
            fill: '#1F2329',
            stroke: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold'
          },
          interactive: true
        },
        seriesLabel: {
          visible: true,
          position: 'end',
          label: {
            style: {
              lineHeight: '100%',
              lineWidth: 1,
              stroke: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold'
            },
            space: 10
          }
        },
        xField: '_editor_dimension_field',
        yField: '_editor_value_field',
        dataId: '1',
        id: 'series-1',
        EDITOR_SERIES_DATA_KEY: 'b',
        seriesField: '_editor_type_field'
      }
    ],
    legends: {
      id: 'legend-discrete',
      visible: false,
      autoPage: false,
      position: 'start',
      interactive: false,
      item: {
        label: {
          style: {
            fill: '#1F2329',
            fontSize: 16
          }
        }
      },
      _originalVisible: false
    },
    region: [
      {
        id: 'region-0'
      }
    ],
    tooltip: {
      visible: true,
      mark: {
        content: [{}],
        title: {}
      },
      dimension: {
        content: [{}],
        title: {}
      }
    },
    axes: [
      {
        orient: 'left',
        id: 'axis-left',
        type: 'linear',
        label: {
          autoLimit: false,
          style: {
            fill: '#1F2329',
            fontSize: 16
          },
          formatConfig: {}
        },
        domainLine: {
          visible: true,
          style: {
            stroke: '#000000'
          }
        },
        tick: {
          visible: true,
          style: {
            stroke: '#000000'
          }
        },
        grid: {
          visible: false,
          style: {
            stroke: '#bbbfc4'
          }
        },
        autoIndent: false,
        maxWidth: null,
        maxHeight: null
      },
      {
        orient: 'bottom',
        id: 'axis-bottom',
        type: 'band',
        label: {
          autoLimit: false,
          style: {
            fill: '#1F2329',
            fontSize: 16
          },
          formatConfig: {}
        },
        domainLine: {
          visible: true,
          style: {
            stroke: '#000000'
          },
          onZero: true
        },
        tick: {
          visible: true,
          style: {
            stroke: '#000000'
          }
        },
        grid: {
          visible: false,
          style: {
            stroke: '#bbbfc4'
          }
        },
        autoIndent: false,
        maxWidth: null,
        maxHeight: null,
        trimPadding: false,
        paddingInner: [0.2, 0],
        paddingOuter: [0.2, 0]
      }
    ],
    data: [
      {
        id: '0',
        sourceKey: 'a',
        values: [
          {
            _editor_dimension_field: 'x1',
            _editor_value_field: 20,
            _editor_type_field: 'a'
          },
          {
            _editor_dimension_field: 'x2',
            _editor_value_field: 23,
            _editor_type_field: 'a'
          },
          {
            _editor_dimension_field: 'x3',
            _editor_value_field: 26,
            _editor_type_field: 'a'
          }
        ],
        specField: {
          _editor_dimension_field: {
            type: 'dimension',
            order: 0
          },
          _editor_type_field: {
            type: 'series',
            order: 0
          },
          _editor_value_field: {
            type: 'value',
            order: 0
          }
        }
      },
      {
        id: '1',
        sourceKey: 'b',
        values: [
          {
            _editor_dimension_field: 'x1',
            _editor_value_field: 20,
            _editor_type_field: 'b'
          },
          {
            _editor_dimension_field: 'x2',
            _editor_value_field: 24,
            _editor_type_field: 'b'
          },
          {
            _editor_dimension_field: 'x3',
            _editor_value_field: 29,
            _editor_type_field: 'b'
          }
        ],
        specField: {
          _editor_dimension_field: {
            type: 'dimension',
            order: 0
          },
          _editor_type_field: {
            type: 'series',
            order: 0
          },
          _editor_value_field: {
            type: 'value',
            order: 0
          }
        }
      }
    ],
    labelLayout: 'region'
  };
  const barSpec1 = {
    type: 'bar',
    data: [
      {
        values: [
          { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'p', color: 'A_p' },
          { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'p', color: 'A_p' },
          { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'p', color: 'B_p' },
          { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'p', color: 'B_p' },

          { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'k', color: 'A_k' },
          { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'k', color: 'A_k' },
          { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'k', color: 'B_k' },
          { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'k', color: 'B_k' }
        ]
      }
    ],
    xField: ['type', 'range', 'type2'],
    yField: 'min',
    seriesField: 'color',
    paddingInner: [0.6, 0.6, 0.6],
    bandPadding: [0.6, 0.6, 0.6],
    label: {
      position: 'bothEnd'
    },
    axes: [
      {
        orient: 'bottom',
        showAllGroupLayers: true,
        sampling: false,
        tick: {
          tickCount: 2
        }
      }
    ],
    legends: {
      visible: true
    }
  };
  const dsl: IStoryDSL = {
    characters: [
      {
        type: 'VChart',
        id: 'chart0',
        zIndex: 10,
        position: {
          top: 50,
          left: 50,
          width: 500,
          height: 300
        },
        options: {
          spec: barSpec0,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          },
          dataGroupStyle: {
            [StroyAllDataGroup]: {
              bar: {
                style: {
                  fill: 'green',
                  stroke: 'yellow',
                  lineWidth: 2
                }
              }
            },
            a: {
              bar: {
                style: {
                  fill: 'red'
                }
              }
            },
            b: {
              bar: {
                style: {
                  stroke: 'blue',
                  lineWidth: 5
                }
              }
            }
          }
        }
      },
      {
        type: 'VChart',
        id: 'chart1',
        zIndex: 10,
        position: {
          top: 380,
          left: 50,
          width: 500,
          height: 300
        },
        options: {
          spec: barSpec1,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          },
          dataGroupStyle: {
            [StroyAllDataGroup]: {
              bar: {
                style: {
                  fill: 'green',
                  stroke: 'yellow',
                  lineWidth: 2
                }
              }
            },
            A_p: {
              bar: {
                style: {
                  fill: 'red'
                }
              }
            },
            B_k: {
              bar: {
                style: {
                  stroke: 'blue',
                  lineWidth: 5
                }
              }
            }
          },
          // 'type', 'range', 'type2'
          markStyle: {
            '_type_1_&_range_1_&_type2_1_&_color_1': {
              markName: 'bar',
              seriesMatch: { type: 'bar' },
              itemKeys: ['type', 'range', 'type2', 'color'],
              itemKeyMap: {
                type: { scaleIndex: 1 },
                range: { scaleIndex: 1 },
                type2: { scaleIndex: 1 },
                color: { scaleIndex: 1 }
              },
              style: {
                fill: 'black'
              }
            }
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

export const RuntimeSeriesMark = () => {
  const id = 'RuntimeSeriesMark';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 800, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    // @ts-ignore
    window.story = story;
    // @ts-ignore
    window.player = player;
    const dsl = loadDSL();
    story.load(dsl);
    player.play(-1);

    const chart0 = story.getCharacterById('chart0');
    // @ts-ignore
    window.chart0 = chart0;

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
