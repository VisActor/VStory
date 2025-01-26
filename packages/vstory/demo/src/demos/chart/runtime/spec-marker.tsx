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
          formatConfig: {}
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
          }
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
          formatConfig: {}
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
          }
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
      }
    },
    region: [
      {
        id: 'region-0'
      }
    ],
    tooltip: {
      visible: true,
      mark: {
        content: [{}]
      },
      dimension: {
        content: [{}]
      }
    },
    title: {
      id: 'chart_title',
      visible: true,
      minWidth: '100%',
      verticalAlign: 'middle',
      textStyle: {
        lineHeight: '150%',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        underline: 0,
        stroke: false,
        align: 'left',
        textBaseline: 'middle',
        fill: '#000',
        background: false,
        fontFamily: 'D-Din'
      },
      subtextStyle: {
        visible: false
      },
      _initialize_: true
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
          formatConfig: {},
          formatMethod: null
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
    padding: [50, 50, 50, 50]
  };
  const pieSpec = {
    type: 'common',
    color: ['#00295C', '#2568BD', '#9F9F9F', '#C5C5C5', '#00B0F0', '#4BCFFF', '#C2C2C2', '#D7D7D7'],
    series: [
      {
        type: 'pie',
        outerRadius: 0.8,
        pie: {
          state: {
            hover: {
              stroke: '#000',
              lineWidth: 1
            }
          }
        },
        label: {
          visible: true,
          style: {
            lineHeight: '100%',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'D-Din',
            ellipsis: false
          },
          overlap: true,
          smartInvert: true,
          rotate: false,
          formatConfig: {}
        },
        valueField: '_editor_value_field',
        categoryField: '_editor_dimension_field',
        dataId: '0',
        seriesField: '_editor_dimension_field',
        id: 'series-0'
      }
    ],
    legends: {
      id: 'legend-discrete',
      visible: true,
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
      }
    },
    region: [
      {
        id: 'region-0'
      }
    ],
    tooltip: {
      visible: true,
      mark: {
        content: [{}]
      },
      dimension: {
        content: [{}]
      }
    },
    title: {
      id: 'chart_title',
      visible: true,
      minWidth: '100%',
      verticalAlign: 'middle',
      textStyle: {
        lineHeight: '150%',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'normal',
        underline: 0,
        stroke: false,
        align: 'left',
        textBaseline: 'middle',
        fill: '#000',
        background: false,
        fontFamily: 'D-Din'
      },
      subtextStyle: {
        visible: false
      },
      _initialize_: true
    },
    data: [
      {
        id: '0',
        sourceKey: 'a',
        values: [
          {
            _editor_dimension_field: 'Test5',
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
            _editor_dimension_field: 'Test5',
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
    ]
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
          // chartType: 'pie',
          // spec: barSpec0,
          spec: pieSpec,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          },
          marker: {
            markArea: [],
            markLine: [
              {
                id: 'bde9d471-5cd6-4fdc-bbe2-68d9deb2d65c',
                name: 'partition-line',
                interactive: true,
                x: '0%',
                x1: '100%',
                y: '9.355380050968366%',
                y1: '71.4296226415042%',
                endSymbol: {
                  visible: false,
                  originSymbolType: 'arrow',
                  size: 10,
                  autoRotate: true,
                  style: {
                    stroke: '#000',
                    fill: false,
                    lineWidth: 1,
                    color: '#000'
                  },
                  symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
                  refX: 0
                },
                startSymbol: {
                  visible: false,
                  originSymbolType: 'arrow',
                  size: 10,
                  autoRotate: true,
                  style: {
                    stroke: '#000',
                    fill: false,
                    lineWidth: 1,
                    color: '#000'
                  },
                  symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
                  refX: 0
                },
                label: {
                  visible: false,
                  refY: 0,
                  style: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    fill: '#21252c'
                  },
                  labelBackground: {
                    padding: {
                      top: 2,
                      bottom: 2,
                      right: 4,
                      left: 4
                    },
                    style: {
                      cornerRadius: 3,
                      fill: '#f1f2f5'
                    }
                  },
                  refX: 0
                },
                line: {
                  style: {
                    stroke: '#000',
                    lineWidth: 1,
                    pickStrokeBuffer: 4,
                    lineDash: [3, 3]
                  }
                },
                zIndex: 510
              }
            ],
            markPoint: []
          }
          // marker: {
          //   markLine: [
          //     {
          //       id: 'b2caede5-1f65-46a2-ab85-9d963851fee9',
          //       interactive: true,
          //       name: 'total-diff-line',
          //       type: 'type-step',
          //       coordinates: [
          //         {
          //           _editor_dimension_field: 'x1',
          //           _editor_value_field: 40,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 0,
          //           __VCHART_DEFAULT_DATA_KEY: 0,
          //           __VCHART_STACK_END: 40,
          //           __VCHART_STACK_START: 20,
          //           __VCHART_STACK_KEY: 'x1',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.5,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 40,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_615: 0,
          //           refRelativeSeriesId: 'series-1'
          //         },
          //         {
          //           _editor_dimension_field: 'x2',
          //           _editor_value_field: 47,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 1,
          //           __VCHART_DEFAULT_DATA_KEY: 1,
          //           __VCHART_STACK_END: 47,
          //           __VCHART_STACK_START: 23,
          //           __VCHART_STACK_KEY: 'x2',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.48936170212765956,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 47,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_615: 1,
          //           refRelativeSeriesId: 'series-1'
          //         }
          //       ],
          //       connectDirection: 'top',
          //       expandDistance: '10.56338028169014%',
          //       line: {
          //         style: {
          //           stroke: '#000',
          //           lineWidth: 1,
          //           pickStrokeBuffer: 10,
          //           lineDash: [0],
          //           cornerRadius: 4
          //         }
          //       },
          //       label: {
          //         position: 'middle',
          //         text: '+18%',
          //         labelBackground: {
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold'
          //         },
          //         refY: 0,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       endSymbol: {
          //         size: 12,
          //         originSymbolType: 'arrow',
          //         style: {
          //           stroke: '#000',
          //           fill: false,
          //           lineWidth: 1,
          //           color: '#000'
          //         },
          //         symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //         refX: 0
          //       },
          //       _originValue_: [40, 47],
          //       zIndex: 510,
          //       coordinatesOffset: [
          //         {
          //           x: 0,
          //           y: -26.000000000000014
          //         },
          //         {
          //           x: 0,
          //           y: -26.000000000000007
          //         }
          //       ]
          //     },
          //     {
          //       id: 'ee3c2995-a6af-4fb2-b1d3-af2edd091406',
          //       interactive: true,
          //       name: 'hierarchy-diff-line',
          //       type: 'type-step',
          //       coordinates: [
          //         {
          //           _editor_dimension_field: 'x1',
          //           _editor_value_field: 40,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 0,
          //           __VCHART_DEFAULT_DATA_KEY: 0,
          //           __VCHART_STACK_END: 40,
          //           __VCHART_STACK_START: 20,
          //           __VCHART_STACK_KEY: 'x1',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.5,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 40,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_667: 0,
          //           refRelativeSeriesId: 'series-1'
          //         },
          //         {
          //           _editor_dimension_field: 'x2',
          //           _editor_value_field: 47,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 1,
          //           __VCHART_DEFAULT_DATA_KEY: 1,
          //           __VCHART_STACK_END: 47,
          //           __VCHART_STACK_START: 23,
          //           __VCHART_STACK_KEY: 'x2',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.48936170212765956,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 47,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_667: 1,
          //           refRelativeSeriesId: 'series-1'
          //         }
          //       ],
          //       connectDirection: 'right',
          //       expandDistance: '54.93421052631579%',
          //       label: {
          //         position: 'middle',
          //         text: '+18%',
          //         labelBackground: {
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold'
          //         },
          //         refY: 0,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       line: {
          //         multiSegment: true,
          //         mainSegmentIndex: 1,
          //         style: [
          //           {
          //             stroke: '#000',
          //             lineWidth: 1,
          //             pickStrokeBuffer: 10,
          //             lineDash: [3, 3]
          //           },
          //           {
          //             stroke: '#000',
          //             lineWidth: 1,
          //             pickStrokeBuffer: 10
          //           },
          //           {
          //             stroke: '#000',
          //             lineWidth: 1,
          //             pickStrokeBuffer: 10,
          //             lineDash: [3, 3]
          //           }
          //         ]
          //       },
          //       endSymbol: {
          //         size: 12,
          //         originSymbolType: 'arrow',
          //         style: {
          //           stroke: '#000',
          //           fill: false,
          //           lineWidth: 1,
          //           color: '#000'
          //         },
          //         symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //         refX: 0
          //       },
          //       startSymbol: {
          //         size: 12,
          //         originSymbolType: 'arrow',
          //         style: {
          //           stroke: '#000',
          //           fill: false,
          //           lineWidth: 1,
          //           color: '#000'
          //         },
          //         symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //         refX: 0
          //       },
          //       _originValue_: [40, 47],
          //       zIndex: 510
          //     },
          //     {
          //       id: '6305e079-a0b0-4c5e-b9b4-6f50c578ea3e',
          //       interactive: true,
          //       name: 'growth-line',
          //       coordinates: [
          //         {
          //           _editor_dimension_field: 'x1',
          //           _editor_value_field: 40,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 0,
          //           __VCHART_DEFAULT_DATA_KEY: 0,
          //           __VCHART_STACK_END: 40,
          //           __VCHART_STACK_START: 20,
          //           __VCHART_STACK_KEY: 'x1',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.5,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 40,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_45: 0,
          //           refRelativeSeriesId: 'series-1'
          //         },
          //         {
          //           _editor_dimension_field: 'x3',
          //           _editor_value_field: 55,
          //           _editor_type_field: 'b',
          //           __VCHART_DEFAULT_DATA_INDEX: 2,
          //           __VCHART_DEFAULT_DATA_KEY: 2,
          //           __VCHART_STACK_END: 55,
          //           __VCHART_STACK_START: 26,
          //           __VCHART_STACK_KEY: 'x3',
          //           __VCHART_STACK_TOTAL_TOP: true,
          //           __VCHART_STACK_START_PERCENT: 0.4727272727272727,
          //           __VCHART_STACK_END_PERCENT: 1,
          //           __VCHART_STACK_TOTAL: 55,
          //           __VCHART_STACK_TOTAL_PERCENT: 1,
          //           VGRAMMAR_DATA_ID_KEY_45: 2,
          //           refRelativeSeriesId: 'series-1'
          //         }
          //       ],
          //       line: {
          //         style: {
          //           stroke: '#000',
          //           lineWidth: 1,
          //           pickStrokeBuffer: 10,
          //           lineDash: [0]
          //         }
          //       },
          //       label: {
          //         position: 'middle',
          //         text: '+17%',
          //         labelBackground: {
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           },
          //           padding: {
          //             top: 2,
          //             bottom: 2,
          //             right: 4,
          //             left: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold',
          //           fontStyle: 'normal'
          //         },
          //         pickable: true,
          //         childrenPickable: false,
          //         refY: 0,
          //         refX: 0
          //       },
          //       endSymbol: {
          //         size: 12,
          //         originSymbolType: 'arrow',
          //         style: {
          //           stroke: '#000',
          //           fill: false,
          //           lineWidth: 1,
          //           color: '#000'
          //         },
          //         symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //         refX: 0,
          //         visible: true
          //       },
          //       coordinatesOffset: [
          //         {
          //           x: 0,
          //           y: '-46.544402729525544%'
          //         },
          //         {
          //           x: 0,
          //           y: '-46.544402729525544%'
          //         }
          //       ],
          //       _originValue_: [40, 55],
          //       zIndex: 510,
          //       startSymbol: {
          //         visible: false,
          //         symbolType: 'triangle',
          //         size: 10,
          //         style: {
          //           fill: '#606773',
          //           stroke: null,
          //           lineWidth: 0
          //         }
          //       }
          //     },
          //     {
          //       id: '33fdbca9-811a-43bc-9087-3dabbd8b873d',
          //       name: 'v-line',
          //       interactive: true,
          //       x: '76.39524633595428%',
          //       endSymbol: {
          //         visible: true,
          //         size: 10,
          //         refX: 6,
          //         symbolType: 'triangleDown',
          //         autoRotate: false,
          //         style: {
          //           fill: '#000',
          //           lineWidth: 0,
          //           stroke: null
          //         }
          //       },
          //       label: {
          //         visible: true,
          //         autoRotate: false,
          //         text: 'x3',
          //         position: 'end',
          //         labelBackground: {
          //           visible: true,
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           },
          //           padding: {
          //             top: 2,
          //             bottom: 2,
          //             right: 4,
          //             left: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold',
          //           textAlign: 'center',
          //           textBaseline: 'bottom',
          //           fontStyle: 'normal'
          //         },
          //         refX: 16,
          //         refY: 0,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       line: {
          //         style: {
          //           stroke: '#000',
          //           lineWidth: 1,
          //           pickStrokeBuffer: 10,
          //           lineDash: [3, 3]
          //         }
          //       },
          //       _originValue_: 'x3',
          //       zIndex: 510,
          //       startSymbol: {
          //         visible: false,
          //         symbolType: 'triangle',
          //         size: 10,
          //         style: {
          //           fill: '#606773',
          //           stroke: null,
          //           lineWidth: 0
          //         }
          //       },
          //       expression: null
          //     },
          //     {
          //       id: 'de8edc2e-6ce2-4ff7-a7b8-d599303747b3',
          //       name: 'h-line',
          //       interactive: true,
          //       y: '73.58500030748544%',
          //       endSymbol: {
          //         visible: true,
          //         size: 10,
          //         refX: 6,
          //         symbolType: 'triangleLeft',
          //         autoRotate: false,
          //         style: {
          //           fill: '#000',
          //           lineWidth: 0,
          //           stroke: null
          //         }
          //       },
          //       label: {
          //         visible: true,
          //         autoRotate: false,
          //         text: 15,
          //         position: 'end',
          //         labelBackground: {
          //           visible: true,
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           },
          //           padding: {
          //             top: 2,
          //             bottom: 2,
          //             right: 4,
          //             left: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold',
          //           fontStyle: 'normal'
          //         },
          //         refX: 16,
          //         refY: 0,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       line: {
          //         style: {
          //           stroke: '#000',
          //           lineWidth: 1,
          //           pickStrokeBuffer: 10,
          //           lineDash: [3, 3]
          //         }
          //       },
          //       _originValue_: 15.84899981550873,
          //       zIndex: 510,
          //       startSymbol: {
          //         visible: false,
          //         symbolType: 'triangle',
          //         size: 10,
          //         style: {
          //           fill: '#606773',
          //           stroke: null,
          //           lineWidth: 0
          //         }
          //       },
          //       expression: null
          //     }
          //   ],
          //   markArea: [
          //     {
          //       id: 'e0177c4b-c54f-45f5-a069-3d4cfb6ae64b',
          //       name: 'v-area',
          //       interactive: true,
          //       x: '0%',
          //       x1: '13.149839342053854%',
          //       area: {
          //         style: {
          //           fill: '#005DFF',
          //           fillOpacity: '0.1'
          //         }
          //       },
          //       label: {
          //         position: 'top',
          //         text: 'x1',
          //         labelBackground: {
          //           visible: true,
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           },
          //           padding: {
          //             top: 2,
          //             bottom: 2,
          //             right: 4,
          //             left: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold',
          //           fontStyle: 'normal'
          //         },
          //         dy: -6,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       _originValue_: ['x1', 'x1'],
          //       zIndex: 500,
          //       expression: null
          //     },
          //     {
          //       id: '8906a5bf-5eb2-4b25-86ea-46c2247bd59e',
          //       name: 'h-area',
          //       interactive: true,
          //       y: '100%',
          //       y1: '82.70994159801448%',
          //       area: {
          //         style: {
          //           fill: '#005DFF',
          //           fillOpacity: 0.1
          //         }
          //       },
          //       label: {
          //         position: 'right',
          //         text: '0 - 10',
          //         labelBackground: {
          //           visible: true,
          //           style: {
          //             fill: '#fff',
          //             fillOpacity: 1,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             cornerRadius: 4
          //           },
          //           padding: {
          //             top: 2,
          //             bottom: 2,
          //             right: 4,
          //             left: 4
          //           }
          //         },
          //         style: {
          //           fill: '#1F2329',
          //           fontSize: 16,
          //           fontWeight: 'bold',
          //           fontStyle: 'normal'
          //         },
          //         dx: 6,
          //         pickable: true,
          //         childrenPickable: false
          //       },
          //       _originValue_: [0, 10.374035041191313],
          //       zIndex: 500,
          //       expression: null
          //     }
          //   ],
          //   markPoint: [
          //     {
          //       id: '0d29515e-1022-42c3-9049-b538c5bff890',
          //       name: 'mark-point',
          //       interactive: true,
          //       position: {
          //         x: '59.318712731379044%',
          //         y: '14.157994608351732%'
          //       },
          //       regionRelative: true,
          //       itemContent: {
          //         offsetX: -61.811619258329756,
          //         offsetY: -80.56228389216851,
          //         type: 'text',
          //         autoRotate: false,
          //         confine: false,
          //         position: 'middle',
          //         text: {
          //           text: '请输入标注文本',
          //           containerTextAlign: 'center',
          //           padding: 4,
          //           style: {
          //             fontSize: 16,
          //             fill: '#000'
          //           },
          //           labelBackground: {
          //             visible: false,
          //             style: {
          //               lineWidth: 1,
          //               stroke: '#000'
          //             }
          //           }
          //         },
          //         refX: 0,
          //         refY: 0
          //       },
          //       itemLine: {
          //         type: 'type-arc',
          //         arcRatio: 0.02,
          //         startSymbol: {
          //           visible: true,
          //           size: 10,
          //           originSymbolType: 'arrow',
          //           style: {
          //             fill: false,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             color: '#000'
          //           },
          //           symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //           refX: 0
          //         },
          //         endSymbol: {
          //           visible: false,
          //           size: 10,
          //           originSymbolType: 'arrow',
          //           style: {
          //             fill: false,
          //             stroke: '#000',
          //             lineWidth: 1,
          //             color: '#000'
          //           },
          //           symbolType: '<svg><path d="M -1 1 L 0 0 L 1 1"/></svg>',
          //           refX: 0
          //         },
          //         line: {
          //           style: {
          //             stroke: '#000',
          //             pickStrokeBuffer: 5
          //           }
          //         },
          //         decorativeLine: {
          //           visible: false
          //         }
          //       },
          //       targetSymbol: {
          //         visible: true,
          //         style: {
          //           size: 10,
          //           fill: '#000',
          //           lineWidth: 0
          //         },
          //         offset: 4
          //       },
          //       zIndex: 520
          //     }
          //   ]
          // }
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

export const SpecMarker = () => {
  const id = 'spec-marker';

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
