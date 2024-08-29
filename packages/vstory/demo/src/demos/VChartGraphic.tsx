import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
import { Edit } from '../../../src/edit/edit';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';
import { loadAllSelection } from '../../../src/edit/edit-component';

loadAllSelection();
Edit.registerEditComponent('text', TextSelection);
Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);

const spec = {
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
          lineWidth: 1,
          fill: 'red'
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
      id: '65e60686-32b1-4cb6-b418-ed02f14def8d',
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
        text: '18%',
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
        refX: -4,
        symbolType:
          'M -0.0625 -0.3167 C -0.0625 -0.2821 -0.0346 -0.2542 0 -0.2542 C 0.0346 -0.2542 0.0625 -0.2821 0.0625 -0.3167 C 0.0625 -0.3167 -0.0625 -0.3167 -0.0625 -0.3167 Z M 0.0442 -0.4025 C 0.0196 -0.4271 -0.0196 -0.4271 -0.0442 -0.4025 C -0.0442 -0.4025 -0.4421 -0.0046 -0.4421 -0.0046 C -0.4662 0.0196 -0.4662 0.0592 -0.4421 0.0838 C -0.4175 0.1079 -0.3779 0.1079 -0.3538 0.0838 C -0.3538 0.0838 0 -0.27 0 -0.27 C 0 -0.27 0.3538 0.0838 0.3538 0.0838 C 0.3779 0.1079 0.4175 0.1079 0.4421 0.0838 C 0.4662 0.0592 0.4662 0.0196 0.4421 -0.0046 C 0.4421 -0.0046 0.0442 -0.4025 0.0442 -0.4025 Z M 0.0625 -0.3167 C 0.0625 -0.3167 0.0625 -0.3583 0.0625 -0.3583 C 0.0625 -0.3583 -0.0625 -0.3583 -0.0625 -0.3583 C -0.0625 -0.3583 -0.0625 -0.3167 -0.0625 -0.3167 C -0.0625 -0.3167 0.0625 -0.3167 0.0625 -0.3167 Z',
        style: {
          fill: '#000',
          lineWidth: 0,
          stroke: null
        }
      },
      _originValue_: [40, 47],
      zIndex: 510,
      coordinatesOffset: [
        {
          x: 0,
          y: -26.000000000000014
        },
        {
          x: 0,
          y: -26.000000000000007
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
        text: '17%',
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
        refX: -4,
        symbolType:
          'M -0.0625 -0.3167 C -0.0625 -0.2821 -0.0346 -0.2542 0 -0.2542 C 0.0346 -0.2542 0.0625 -0.2821 0.0625 -0.3167 C 0.0625 -0.3167 -0.0625 -0.3167 -0.0625 -0.3167 Z M 0.0442 -0.4025 C 0.0196 -0.4271 -0.0196 -0.4271 -0.0442 -0.4025 C -0.0442 -0.4025 -0.4421 -0.0046 -0.4421 -0.0046 C -0.4662 0.0196 -0.4662 0.0592 -0.4421 0.0838 C -0.4175 0.1079 -0.3779 0.1079 -0.3538 0.0838 C -0.3538 0.0838 0 -0.27 0 -0.27 C 0 -0.27 0.3538 0.0838 0.3538 0.0838 C 0.3779 0.1079 0.4175 0.1079 0.4421 0.0838 C 0.4662 0.0592 0.4662 0.0196 0.4421 -0.0046 C 0.4421 -0.0046 0.0442 -0.4025 0.0442 -0.4025 Z M 0.0625 -0.3167 C 0.0625 -0.3167 0.0625 -0.3583 0.0625 -0.3583 C 0.0625 -0.3583 -0.0625 -0.3583 -0.0625 -0.3583 C -0.0625 -0.3583 -0.0625 -0.3167 -0.0625 -0.3167 C -0.0625 -0.3167 0.0625 -0.3167 0.0625 -0.3167 Z',
        style: {
          fill: '#000',
          lineWidth: 0,
          stroke: null
        },
        visible: true
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
  width: 640,
  height: 360,
  background: 'yellow'
};

const spec1 = {
  type: 'bar',
  background: 'transparent',
  data: {
    values: [
      { type: 'Nail polish', country: 'Africa', value: 4229 },
      { type: 'Nail polish', country: 'EU', value: 4376 },
      { type: 'Nail polish', country: 'China', value: 3054 },
      { type: 'Nail polish', country: 'USA', value: 12814 },
      { type: 'Eyebrow pencil', country: 'Africa', value: 3932 },
      { type: 'Eyebrow pencil', country: 'EU', value: 3987 },
      { type: 'Eyebrow pencil', country: 'China', value: 5067 },
      { type: 'Eyebrow pencil', country: 'USA', value: 13012 },
      { type: 'Rouge', country: 'Africa', value: 5221 },
      { type: 'Rouge', country: 'EU', value: 3574 },
      { type: 'Rouge', country: 'China', value: 7004 },
      { type: 'Rouge', country: 'USA', value: 11624 },
      { type: 'Lipstick', country: 'Africa', value: 9256 },
      { type: 'Lipstick', country: 'EU', value: 4376 },
      { type: 'Lipstick', country: 'China', value: 9054 },
      { type: 'Lipstick', country: 'USA', value: 8814 },
      { type: 'Eyeshadows', country: 'Africa', value: 3308 },
      { type: 'Eyeshadows', country: 'EU', value: 4572 },
      { type: 'Eyeshadows', country: 'China', value: 12043 },
      { type: 'Eyeshadows', country: 'USA', value: 12998 }
    ]
  },
  xField: ['type', 'country'],
  yField: 'value',
  seriesField: 'country',
  legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
  axes: [
    {
      orient: 'left',
      label: {
        formatMethod(val) {
          return `${(val * 100).toFixed(2)}%`;
        }
      }
    }
  ]
};

const storySpec: IStorySpec = {
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id: 'scene0',
          actions: [
            {
              characterId: '58e9a996-7460-44de-8c7a-eceae2260308',
              characterActions: [
                {
                  startTime: 0,
                  action: 'appear',
                  selector: '*',
                  payload: {
                    style: {},
                    animation: {
                      effect: 'fade',
                      move: {
                        pos: 'top'
                      },
                      duration: 1000,
                      easing: 'linear'
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  characters: [
    {
      type: 'VChart',
      id: '58e9a996-7460-44de-8c7a-eceae2260308',
      position: {
        top: -25,
        left: 79.5,
        bottom: 319.8,
        right: 679.5
      },
      options: {
        spec: spec,
        initOption: { animation: false }
      }
    }
  ]
};

export const VChartGraphic = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const story = new Story(storySpec, { dom: id });
    window.story = story;
    story.play(false);
    story.canvas.getCanvas().style.background = 'blue';
    const edit = new Edit(story);
    window.edit = edit;

    setTimeout(() => {
      story.getCharactersById(storySpec.characters[0].id)?.graphic.updateSpec(spec1);
    }, 3000);
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
