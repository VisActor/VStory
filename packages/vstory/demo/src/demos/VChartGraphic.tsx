import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';
import { Edit } from '../../../src/edit/edit';
import { BoxSelection } from '../../../src/edit/edit-component/box-selection';
import { TextSelection } from '../../../src/edit/edit-component/text-selection';
import { SeriesMarkSelection } from '../../../src/edit/edit-component/series-mark/series-mark-selection';
// import { RichTextSelection } from '../../../src/edit/edit-component/richtext-selection';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { StroyAllDataGroup } from '../../../src/story/character';

loadAllSelection();
Edit.registerEditComponent('text', TextSelection);
// Edit.registerEditComponent('richtext', RichTextSelection);
Edit.registerEditComponent('box-selection', BoxSelection);
// Edit.registerEditComponent('series-mark-selection', SeriesMarkSelection);

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
      xField: ['_editor_dimension_field', '_editor_type_field'],
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
      xField: ['_editor_dimension_field', '_editor_type_field'],
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
      paddingInner: [0.18791312559017942, 0],
      paddingOuter: [0.18791312559017942, 0]
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
  labelLayout: 'region',
  background: 'transparent'
};

const spec2 = {
  type: 'common',
  animation: false,
  series: [
    {
      type: 'bar',
      xField: ['_editor_dimension_field', '_editor_type_field'],
      yField: '_editor_value_field',
      seriesField: '_editor_type_field',
      direction: 'vertical',
      stack: true,
      dataId: '0',
      label: {
        visible: true,
        style: {
          stroke: false
        },
        smartInvert: false,
        animation: false
      },
      bar: {
        style: {}
      }
    },
    {
      type: 'bar',
      xField: ['_editor_dimension_field', '_editor_type_field'],
      yField: '_editor_value_field',
      seriesField: '_editor_type_field',
      direction: 'vertical',
      stack: true,
      dataId: '1',
      label: {
        visible: true,
        style: {
          stroke: false
        },
        smartInvert: false,
        animation: false
      },
      bar: {
        style: {}
      }
    }
  ],
  legends: {
    orient: 'bottom',
    position: 'middle',
    visible: false
  },
  title: {
    visible: true,
    align: 'left',
    text: ['这是标题', '这是第二行标题'],
    subtext: '',
    style: {},
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'normal',
      underline: 0,
      fill: 'red',
      stroke: 'transparent',
      fontFamily: 'PingFang SC'
    }
  },
  axes: [
    {
      animation: true,
      id: 'y-axis',
      orient: 'left',
      sampling: false,
      showAllGroupLayers: true,
      tick: {
        visible: false
      },
      title: {
        visible: false,
        style: {
          fill: '#FFFFFF'
        }
      },
      label: {
        autoLimit: true,
        style: {
          fontSize: 11,
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: 0
        },
        visible: true
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#404349',
          lineWidth: 1
        }
      },
      grid: {
        visible: false,
        style: {
          lineDash: [3, 3],
          stroke: '#404349'
        }
      },
      type: 'linear',
      inverse: false
    },
    {
      animation: true,
      orient: 'bottom',
      visible: true,
      sampling: false,
      showAllGroupLayers: true,
      title: {
        visible: false,
        style: {
          fill: '#FFFFFF'
        }
      },
      label: {
        autoLimit: true,
        style: {
          fontSize: 11,
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: 0
        },
        visible: true
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#404349',
          lineWidth: 1
        }
      },
      tick: {
        visible: false
      },
      grid: {
        visible: false,
        style: {
          lineDash: [3, 3],
          stroke: '#404349'
        }
      },
      type: 'band',
      paddingInner: 0,
      id: 'x-axis'
    }
  ],
  data: [
    {
      id: '0',
      values: [
        {
          _editor_dimension_field: '北京',
          _editor_value_field: '16400',
          _editor_type_field: '面积'
        },
        {
          _editor_dimension_field: '广州',
          _editor_value_field: '7238',
          _editor_type_field: '面积'
        },
        {
          _editor_dimension_field: '深圳',
          _editor_value_field: '1997',
          _editor_type_field: '面积'
        },
        {
          _editor_dimension_field: '上海',
          _editor_value_field: '6340',
          _editor_type_field: '面积'
        }
      ]
    },
    {
      id: '1',
      values: [
        {
          _editor_dimension_field: '北京',
          _editor_value_field: '12345',
          _editor_type_field: 'GDP'
        },
        {
          _editor_dimension_field: '广州',
          _editor_value_field: '3356',
          _editor_type_field: 'GDP'
        },
        {
          _editor_dimension_field: '深圳',
          _editor_value_field: '4567',
          _editor_type_field: 'GDP'
        },
        {
          _editor_dimension_field: '上海',
          _editor_value_field: '5656',
          _editor_type_field: 'GDP'
        }
      ]
    }
  ],
  color: [
    'linear-gradient(90deg, #222A70 0%, rgba(34, 42, 112, 0) 100%)',
    'linear-gradient(90deg, #215F97 0%, rgba(33, 95, 151, 0) 100%)',
    'linear-gradient(90deg, #99B4D2 0%, rgba(153, 180, 210, 0) 100%)',
    'linear-gradient(90deg, #CBCBCB 0%, rgba(203, 203, 203, 0) 100%)',
    'linear-gradient(90deg, #FFC2BF 0%, rgba(255, 194, 191, 0) 100%)',
    'linear-gradient(90deg, #FF948F 0%, rgba(255, 148, 143, 0) 100%)',
    'linear-gradient(90deg, #F14C44 0%, rgba(241, 76, 68, 0) 100%)',
    'linear-gradient(90deg, #BE1519 0%, rgba(190, 21, 25, 0) 100%)'
  ]
};

const spec3 = {
  type: 'bar',
  animation: false,
  xField: '城市',
  yField: '面积',
  seriesField: '城市',
  label: {
    visible: true,
    interactive: true
  },
  legends: {
    orient: 'bottom',
    position: 'middle',
    visible: false
  },
  title: {
    visible: true,
    align: 'left',
    text: ['这是标题', '这是第二行标题'],
    subtext: '',
    style: {},
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'normal',
      underline: 0,
      fill: 'red',
      stroke: 'transparent',
      fontFamily: 'PingFang SC'
    }
  },
  axes: [
    {
      animation: true,
      id: 'y-axis',
      orient: 'left',
      sampling: false,
      showAllGroupLayers: true,
      tick: {
        visible: false
      },
      title: {
        visible: false,
        style: {
          fill: '#FFFFFF'
        }
      },
      label: {
        autoLimit: true,
        style: {
          fontSize: 11,
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: 0
        },
        visible: true
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#404349',
          lineWidth: 1
        }
      },
      grid: {
        visible: false,
        style: {
          lineDash: [3, 3],
          stroke: '#404349'
        }
      },
      type: 'linear',
      inverse: false
    },
    {
      animation: true,
      orient: 'bottom',
      visible: true,
      sampling: false,
      showAllGroupLayers: true,
      title: {
        visible: false,
        style: {
          fill: '#FFFFFF'
        }
      },
      label: {
        autoLimit: true,
        style: {
          fontSize: 11,
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: 0
        },
        visible: true
      },
      domainLine: {
        visible: true,
        style: {
          stroke: '#404349',
          lineWidth: 1
        }
      },
      tick: {
        visible: false
      },
      grid: {
        visible: false,
        style: {
          lineDash: [3, 3],
          stroke: '#404349'
        }
      },
      type: 'band',
      paddingInner: 0,
      id: 'x-axis'
    }
  ],
  data: {
    id: 'id0',
    values: [
      {
        城市: '北京',
        面积: '16400',
        GDP: '12345'
      },
      {
        城市: '广州',
        面积: '7238',
        GDP: '3356'
      },
      {
        城市: '深圳',
        面积: '1997',
        GDP: '4567'
      },
      {
        城市: '上海',
        面积: '6340',
        GDP: '5656'
      }
    ]
  },
  color: [
    'linear-gradient(90deg, #222A70 0%, rgba(34, 42, 112, 0) 100%)',
    'linear-gradient(90deg, #215F97 0%, rgba(33, 95, 151, 0) 100%)',
    'linear-gradient(90deg, #99B4D2 0%, rgba(153, 180, 210, 0) 100%)',
    'linear-gradient(90deg, #CBCBCB 0%, rgba(203, 203, 203, 0) 100%)',
    'linear-gradient(90deg, #FFC2BF 0%, rgba(255, 194, 191, 0) 100%)',
    'linear-gradient(90deg, #FF948F 0%, rgba(255, 148, 143, 0) 100%)',
    'linear-gradient(90deg, #F14C44 0%, rgba(241, 76, 68, 0) 100%)',
    'linear-gradient(90deg, #BE1519 0%, rgba(190, 21, 25, 0) 100%)'
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
              characterId: 'vchart',
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
            // {
            //   characterId: 'vchart2',
            //   characterActions: [
            //     {
            //       startTime: 0,
            //       action: 'appear',
            //       selector: '*',
            //       payload: {
            //         style: {},
            //         animation: {
            //           effect: 'fade',
            //           move: {
            //             pos: 'top'
            //           },
            //           duration: 1000,
            //           easing: 'linear'
            //         }
            //       }
            //     }
            //   ]
            // },
            // {
            //   characterId: 'rect',
            //   characterActions: [
            //     {
            //       startTime: 1,
            //       duration: 800,
            //       action: 'appear',
            //       payload: {
            //         animation: {
            //           duration: 700
            //         }
            //       }
            //     }
            //   ]
            // }
          ]
        }
      ]
    }
  ],
  characters: [
    // {
    //   type: 'Rect',
    //   id: 'rect',
    //   zIndex: 0,
    //   position: {
    //     top: 50,
    //     left: 10,
    //     width: 500,
    //     height: 200
    //   },
    //   options: {
    //     graphic: {
    //       fill: 'red',
    //       visible: false
    //     },
    //     text: {
    //       text: 'title2',
    //       fill: 'black'
    //     },
    //     angle: 0,
    //     shapePoints: []
    //   }
    // },
    {
      type: 'VChart',
      id: 'vchart',
      zIndex: 100,
      position: {
        x: 100,
        y: 100,
        width: 400,
        height: 400
      },
      options: {
        spec: spec3,
        dataGroupStyle: {
          [StroyAllDataGroup]: {
            bar: {
              style: {
                fill: 'black'
              }
            },
            label: {
              visible: true,
              style: {
                fill: 'red',
                fontSize: 40,
                stroke: 'green',
                lineWidth: 10
              }
            }
          },
          北京: {
            bar: {
              style: {
                fill: 'yellow'
              }
            },
            label: {
              visible: true,
              style: {
                fill: 'blue',
                stroke: 'yellow',
                lineWidth: 5
              }
            }
          }
        },
        markStyle: {
          bar_filedLink_城市_valueLink_4: {
            seriesMatch: {
              specIndex: 0,
              type: 'bar'
            },
            markName: 'bar',
            id: 'bar_filedLink_城市_valueLink_4', // 唯一id，避免单个元素有多个匹配样式
            itemKeys: ['城市'], // 数据匹配维度
            itemKeyMap: { 城市: 4 }, // 匹配维度值
            style: {
              fill: 'red'
            }
          }
        },
        labelStyle: {
          label_filedLink_城市_valueLink_4: {
            seriesMatch: {
              specIndex: 0,
              type: 'bar'
            },
            markName: 'label',
            id: 'label_filedLink_城市_valueLink_4', // 唯一id，避免单个元素有多个匹配样式
            itemKeys: ['城市'], // 数据匹配维度
            itemKeyMap: { 城市: 4 }, // 匹配维度值
            style: {
              fill: 'black',
              lineWidth: 20
            }
          }
        },
        initOption: {
          animation: false,
          interactive: true,
          disableTriggerEvent: true,
          performanceHook: {
            afterInitializeChart: () => {
              console.log('afterInitializeChart');
            },
            afterVRenderDraw: () => {
              console.log('afterVRenderDraw');
            }
          }
        }
      }
    }
    // {
    //   type: 'VChart',
    //   id: 'vchart2',
    //   zIndex: 200,
    //   position: {
    //     x: 50,
    //     y: 150,
    //     width: 400,
    //     height: 400
    //   },
    //   options: {
    //     spec: { ...spec, color: ['red', 'blue'] },
    //     initOption: {
    //       animation: false,
    //       interactive: true,
    //       disableTriggerEvent: false,
    //       performanceHook: {
    //         afterInitializeChart: () => {
    //           console.log('afterInitializeChart');
    //         },
    //         afterVRenderDraw: () => {
    //           console.log('afterVRenderDraw');
    //         }
    //       }
    //     }
    //   }
    // }
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
    edit.emitter.on('startEdit', (...args) => {
      console.log(args);
    });
    edit.emitter.on('resize', (...args) => {
      console.log('resize', args);
    });

    // const vchart = story.getCharactersById('vchart')?.graphic.vchart;
    // window.vchart = vchart;
    // const vchart2 = story.getCharactersById('vchart2')?.graphic.vchart;
    // window.vchart2 = vchart2;
    // console.log('vchart', vchart);
    // vchart.on('pointerdown', (event: any) => {
    //   console.log('vchart on pointerdown', event);
    // });
    // vchart2.on('pointerdown', (event: any) => {
    //   console.log('vchart2 on pointerdown', event);
    // });
    // story.canvas.getStage().defaultLayer.translate(200, 100);
    story.canvas.getStage().on('pointerdown', (event: any) => {
      console.log('stage on pointerdown', [...event.detailPath], event.detailPath?.[2]?._uid);
    });
    // setTimeout(() => {
    //   window.chartGraphic?.graphic.updateSpec(spec1, null, false, false);
    // }, 3000);
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
