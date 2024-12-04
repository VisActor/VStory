import React, { useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { merge } from '@visactor/vutils';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

async function loadDSL() {
  const rankingBarSpec = {
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
          visible: true,
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
          visible: true,
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
    markLine: [
      {
        id: 'e3a46901-3fef-460a-abec-bf339ae73e96',
        interactive: true,
        name: 'total-diff-line',
        type: 'type-step',
        coordinates: [
          {
            _editor_dimension_field: 'x1',
            _editor_value_field: 40,
            _editor_type_field: 'b',
            refRelativeSeriesId: 'series-1'
          },
          {
            _editor_dimension_field: 'x2',
            _editor_value_field: 47,
            _editor_type_field: 'b',
            refRelativeSeriesId: 'series-1'
          }
        ],
        connectDirection: 'top',
        expandDistance: '10.273972602739725%',
        line: {
          style: {
            stroke: '#000',
            lineWidth: 1,
            pickStrokeBuffer: 10,
            lineDash: [0],
            cornerRadius: 4
          }
        },
        label: {
          position: 'middle',
          text: '+18%',
          labelBackground: {
            style: {
              fill: '#fff',
              fillOpacity: 1,
              stroke: '#000',
              lineWidth: 1,
              cornerRadius: 4
            }
          },
          style: {
            fill: '#1F2329',
            fontSize: 16,
            fontWeight: 'bold'
          },
          pickable: true,
          childrenPickable: false
        },
        endSymbol: {
          size: 12,
          originSymbolType: 'arrow',
          style: {
            fill: false,
            lineWidth: 1,
            stroke: '#000',
            color: '#000'
          },
          symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          refX: 0
        },
        _originValue_: [40, 47],
        zIndex: 510,
        coordinatesOffset: [
          {
            x: 0,
            y: -26
          },
          {
            x: 0,
            y: -26
          }
        ]
      },
      {
        id: 'be65e8ee-26c8-4c99-aa0f-33171ba5458e',
        interactive: true,
        name: 'growth-line',
        coordinates: [
          {
            _editor_dimension_field: 'x2',
            _editor_value_field: 47,
            _editor_type_field: 'b',
            refRelativeSeriesId: 'series-1'
          },
          {
            _editor_dimension_field: 'x3',
            _editor_value_field: 55,
            _editor_type_field: 'b',
            refRelativeSeriesId: 'series-1'
          }
        ],
        line: {
          style: {
            stroke: '#000',
            lineWidth: 1,
            pickStrokeBuffer: 10,
            lineDash: [0]
          }
        },
        label: {
          position: 'middle',
          text: '+17%',
          labelBackground: {
            style: {
              fill: '#fff',
              fillOpacity: 1,
              stroke: '#000',
              lineWidth: 1,
              cornerRadius: 4
            },
            padding: {
              top: 2,
              bottom: 2,
              right: 4,
              left: 4
            }
          },
          style: {
            fill: '#1F2329',
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'normal'
          },
          pickable: true,
          childrenPickable: false
        },
        endSymbol: {
          size: 12,
          originSymbolType: 'arrow',
          style: {
            fill: false,
            lineWidth: 1,
            stroke: '#000',
            color: '#000'
          },
          visible: true,
          symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          refX: 0
        },
        coordinatesOffset: [
          {
            x: 0,
            y: '-30%'
          },
          {
            x: 0,
            y: '-30%'
          }
        ],
        _originValue_: [47, 55],
        zIndex: 510,
        startSymbol: {
          visible: false,
          symbolType: 'triangle',
          size: 10,
          style: {
            fill: '#606773',
            stroke: null,
            lineWidth: 0
          }
        },
        expression: null
      }
    ],
    markArea: [],
    labelLayout: 'region',
    customMark: [
      {
        type: 'component',
        componentType: 'seriesLabel',
        interactive: false,
        style: {
          id: 'bd5120c8-bad8-4163-a913-6fe6b67a9c00',
          position: 'end',
          label: {
            space: 10,
            style: {
              lineHeight: '100%',
              lineWidth: 1,
              stroke: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold'
            }
          }
        }
      }
    ]
  };
  return {
    characters: [
      {
        type: 'VChart',
        id: 'chart0',
        zIndex: 10,
        position: {
          top: 50,
          left: 0,
          width: 400,
          height: 200
        },
        options: {
          spec: rankingBarSpec,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          }
        }
      },
      {
        type: 'VChart',
        id: 'chart1',
        zIndex: 1,
        position: {
          top: 150,
          left: 200,
          width: 400,
          height: 200
        },
        options: {
          spec: rankingBarSpec,
          initOption: {
            vchartBoundsMode: 'auto',

            interactive: true,
            animation: false,
            disableTriggerEvent: false,
            disableDirtyBounds: true
          }
        }
      }
    ],
    acts: [
      {
        id: 'defaultAct',
        scenes: [
          {
            id: 'defaultScene',
            actions: [
              {
                characterId: ['chart0', 'chart1'],
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
    ]
  };
}

export const BaseChart = () => {
  const id = 'BaseChart';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    // @ts-ignore
    window.story = story;
    // @ts-ignore
    window.player = player;
    loadDSL().then(dsl => {
      story.load(dsl);
      player.play(-1);

      const chart1 = story.getCharacterById('chart1');

      // setTimeout(() => {
      //   chart1?.setConfig(
      //     merge(chart1?.config, {
      //       position: {
      //         top: 100,
      //         left: 200,
      //         width: 400,
      //         height: 300
      //       }
      //     })
      //   );
      // }, 1000);

      // setTimeout(() => {
      //   chart1?.setConfig(
      //     merge(chart1?.config, {
      //       position: {
      //         top: 150,
      //         left: 200,
      //         width: 300,
      //         height: 200
      //       }
      //     })
      //   );
      // }, 2000);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
