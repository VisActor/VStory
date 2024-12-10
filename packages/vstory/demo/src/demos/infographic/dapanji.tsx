import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';

registerAll();
export const Dapanji = () => {
  const id = 'Dapanji';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: new Array(24)
                .fill(0)
                .map((_, index) => ({ characterId: index.toString(), characterActions: [{ action: 'appear' }] }))
            }
          ]
        }
      ],
      characters: [
        {
          id: '0',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 0.13541802159215877,
            y: 0.11784192898005585,
            width: 1282.9837942366496,
            height: 722.580020792749,
            angle: 0,
            anchor: [641.627315139917, 361.40785232535455]
          },
          options: { graphic: { image: 'http://localhost:8080/static/image/background-0.8ae5325c.png' } },
          extra: { temp: 'default-image-component', editor: 'visactor-editor' }
        },
        {
          id: '1',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 899.7399371804373,
            y: 265.03485395758474,
            width: 297.42258876661117,
            height: 293.02346345514945,
            angle: 0,
            anchor: [1048.451231563743, 411.54658568515947]
          },
          options: { graphic: { image: 'http://localhost:8080/static/image/chicken-dish.4b58fffe.png' } },
          extra: { temp: 'default-image-component', editor: 'visactor-editor' }
        },
        {
          id: '2',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 248.11027045265757,
            y: 384.82046823089814,
            width: 255.86025747508307,
            height: 162.34487904900334,
            angle: 0,
            anchor: [376.0403991901991, 465.9929077553998]
          },
          options: {
            spec: {
              type: 'circularProgress',
              categoryField: '_editor_dimension_field',
              valueField: '_editor_value_field',
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#C71414', '#FF533B', '#BD00FF', '#6356F8', '#56A1F8', '#00D9E7', '#00C5A6', '#007F67'],
              innerRadius: 0.8,
              outerRadius: 1,
              cornerRadius: 200,
              progress: { style: { innerPadding: 0, outerPadding: 0 } },
              legends: [],
              axes: [],
              width: 255.86025747508313,
              height: 162.34487904900334
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }]
          }
        },
        {
          id: '3',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 413.8481364202663,
            y: 389.2945520141206,
            width: 286.2512328696013,
            height: 163.86747300664447,
            angle: 0,
            anchor: [556.973752855067, 471.2282885174428]
          },
          options: {
            spec: {
              type: 'circularProgress',
              categoryField: '_editor_dimension_field',
              valueField: '_editor_value_field',
              title: [
                {
                  text: ['这是第一行标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#0C339C', '#1A48C5', '#3563DE', '#4E78E9', '#629EFF', '#7AACFF', '#8CB8FF', '#ACCCFF'],
              innerRadius: 0.8,
              outerRadius: 1,
              cornerRadius: 200,
              progress: { style: { innerPadding: 0, outerPadding: 0 } },
              legends: [],
              axes: [],
              width: 286.2512328696013,
              height: 163.86747300664445
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
            title: {
              default: {
                text: ['这是第一行标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            color: ['#0C339C', '#1A48C5', '#3563DE', '#4E78E9', '#629EFF', '#7AACFF', '#8CB8FF', '#ACCCFF'],
            rootConfig: { progress: { style: {} } },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            legends: {},
            axes: {},
            label: {}
          },
          extra: {
            temp: 'default-progress-ring-chart',
            editor: 'visactor-editor',
            data: [{ name: 'type', value: '0.75' }]
          }
        },
        {
          id: '4',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 284.6806348629567,
            y: 253.75558035714255,
            width: 182.05427221760806,
            height: 45.24823504983385,
            angle: 0,
            anchor: [375.70777097176074, 276.3796978820595]
          },
          options: {
            spec: {
              type: 'linearProgress',
              xField: '_editor_value_field',
              yField: '_editor_dimension_field',
              cornerRadius: 20,
              bandWidth: 16,
              title: [
                {
                  text: ['这是第一行标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#039176', '#08BB9F', '#00DCA7', '#56F8B4', '#FFDB7E', '#FFC149', '#FF9040', '#FF5C15'],
              axes: [],
              width: 182.05427221760806,
              height: 45.24823504983385,
              legends: []
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
            title: {
              default: {
                text: ['这是第一行标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            axes: {},
            legends: {},
            label: {},
            markStyle: {
              progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined: {
                seriesMatch: { type: 'linearProgress', specIndex: 0 },
                markName: 'progress',
                itemKeys: ['_editor_dimension_field', null],
                itemKeyMap: { _editor_dimension_field: 1 },
                id: 'progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined',
                style: { fill: '#32A645', fillOpacity: 1 }
              }
            }
          },
          extra: {
            temp: 'default-progress-bar-chart',
            editor: 'visactor-editor',
            data: [{ name: 'type', value: '0.75' }]
          }
        },
        {
          id: '5',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 499.4085470307318,
            y: 256.2854287790701,
            width: 180.77997819767438,
            height: 42.17025280315599,
            angle: 0,
            anchor: [589.798536129569, 277.3705551806481]
          },
          options: {
            spec: {
              type: 'linearProgress',
              xField: '_editor_value_field',
              yField: '_editor_dimension_field',
              cornerRadius: 20,
              bandWidth: 16,
              title: [
                {
                  text: ['这是第一行标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#039176', '#08BB9F', '#00DCA7', '#56F8B4', '#FFDB7E', '#FFC149', '#FF9040', '#FF5C15'],
              axes: [],
              width: 180.77997819767438,
              height: 45.14985205564767,
              legends: []
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
            title: {
              default: {
                text: ['这是第一行标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            axes: {},
            legends: {},
            label: {},
            markStyle: {
              progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined: {
                seriesMatch: { type: 'linearProgress', specIndex: 0 },
                markName: 'progress',
                itemKeys: ['_editor_dimension_field', null],
                itemKeyMap: { _editor_dimension_field: 1 },
                id: 'progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined',
                style: { fill: '#32A645', fillOpacity: 1 }
              }
            }
          },
          extra: {
            temp: 'default-progress-bar-chart',
            editor: 'visactor-editor',
            data: [{ name: 'type', value: '0.75' }]
          }
        },
        {
          id: '6',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 284.25899345930213,
            y: 274.43006384966804,
            width: 182.6492550872095,
            height: 103.18176391196002,
            angle: 0,
            anchor: [375.58362100290685, 326.02094580564807]
          },
          options: {
            spec: {
              type: 'linearProgress',
              xField: '_editor_value_field',
              yField: '_editor_dimension_field',
              cornerRadius: 20,
              bandWidth: 16,
              title: [
                {
                  text: ['这是第一行标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#039176', '#08BB9F', '#00DCA7', '#56F8B4', '#FFDB7E', '#FFC149', '#FF9040', '#FF5C15'],
              axes: [],
              width: 182.6492550872095,
              height: 103.18176391196005,
              legends: []
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
            title: {
              default: {
                text: ['这是第一行标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            axes: {},
            legends: {},
            label: {},
            markStyle: {
              progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined: {
                seriesMatch: { type: 'linearProgress', specIndex: 0 },
                markName: 'progress',
                itemKeys: ['_editor_dimension_field', null],
                itemKeyMap: { _editor_dimension_field: 1 },
                id: 'progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined',
                style: { fill: '#32A645', fillOpacity: 1 }
              }
            }
          },
          extra: {
            temp: 'default-progress-bar-chart',
            editor: 'visactor-editor',
            data: [{ name: 'type', value: '0.75' }]
          }
        },
        {
          id: '7',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 500.8655523255815,
            y: 303.2703358596346,
            width: 179.51973889119608,
            height: 44.22224096760783,
            angle: 0,
            anchor: [590.6254217711796, 325.3814563434385]
          },
          options: {
            spec: {
              type: 'linearProgress',
              xField: '_editor_value_field',
              yField: '_editor_dimension_field',
              cornerRadius: 20,
              bandWidth: 16,
              title: [
                {
                  text: ['这是第一行标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
              color: ['#039176', '#08BB9F', '#00DCA7', '#56F8B4', '#FFDB7E', '#FFC149', '#FF9040', '#FF5C15'],
              axes: [],
              width: 179.51973889119614,
              height: 44.22224096760783,
              legends: []
            },
            data: [{ id: '0', values: [{ _editor_dimension_field: 'type', _editor_value_field: '0.75' }] }],
            title: {
              default: {
                text: ['这是第一行标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            axes: {},
            legends: {},
            label: {},
            markStyle: {
              progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined: {
                seriesMatch: { type: 'linearProgress', specIndex: 0 },
                markName: 'progress',
                itemKeys: ['_editor_dimension_field', null],
                itemKeyMap: { _editor_dimension_field: 1 },
                id: 'progress_filedLink__editor_dimension_field_valueLink_1_filedLink_undefined_valueLink_undefined',
                style: { fill: '#32A645', fillOpacity: 1 }
              }
            }
          },
          extra: {
            temp: 'default-progress-bar-chart',
            editor: 'visactor-editor',
            data: [{ name: 'type', value: '0.75' }]
          }
        },
        {
          id: '8',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 448.3758824750844,
            y: 440.6129957433505,
            width: 157.08373131229246,
            height: 332.7020608388709,
            angle: 1.5707963267948966,
            anchor: [526.9177481312306, 606.964026162786]
          },
          options: {
            spec: {
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
                  bar: { style: {} }
                }
              ],
              title: [
                {
                  text: ['这是标题', '这是第二行标题'],
                  align: 'left',
                  textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontStyle: 'normal',
                    underline: 0,
                    fill: 'red',
                    stroke: 'transparent',
                    fontFamily: 'PingFang SC'
                  },
                  visible: false
                }
              ],
              legends: [{ orient: 'bottom', position: 'middle', visible: false }],
              data: [
                {
                  id: '0',
                  values: [
                    { _editor_dimension_field: '北京', _editor_value_field: '16400', _editor_type_field: '面积' },
                    { _editor_dimension_field: '广州', _editor_value_field: '7238', _editor_type_field: '面积' },
                    { _editor_dimension_field: '深圳', _editor_value_field: '1997', _editor_type_field: '面积' }
                  ]
                }
              ],
              color: ['#222A70', '#215F97', '#99B4D2', '#CBCBCB', '#FFC2BF', '#FF948F', '#F14C44', '#BE1519'],
              axes: [
                {
                  label: {
                    visible: false,
                    style: { fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', underline: 0 }
                  },
                  domainLine: { visible: false },
                  orient: 'bottom',
                  paddingInner: 0,
                  grid: { visible: false }
                },
                {
                  label: {
                    visible: false,
                    style: { fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', underline: 0 }
                  },
                  domainLine: { visible: false },
                  orient: 'left',
                  grid: { visible: false }
                }
              ],
              width: 157.08373131229246,
              height: 332.70206083887086
            },
            data: [
              {
                id: '0',
                values: [
                  { _editor_dimension_field: '北京', _editor_value_field: '16400', _editor_type_field: '面积' },
                  { _editor_dimension_field: '广州', _editor_value_field: '7238', _editor_type_field: '面积' },
                  { _editor_dimension_field: '深圳', _editor_value_field: '1997', _editor_type_field: '面积' }
                ]
              }
            ],
            title: {
              default: {
                text: ['这是标题', '这是第二行标题'],
                align: 'left',
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                },
                visible: false
              }
            },
            legends: { default: { orient: 'bottom', position: 'middle', visible: false } },
            axes: {
              'x-axis': {
                label: {
                  visible: false,
                  style: { fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', underline: 0 }
                },
                domainLine: { visible: false },
                orient: 'bottom',
                paddingInner: 0,
                grid: { visible: false }
              },
              'y-axis': {
                label: {
                  visible: false,
                  style: { fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', underline: 0 }
                },
                domainLine: { visible: false },
                orient: 'left',
                grid: { visible: false }
              }
            },
            label: {
              default: {
                visible: false,
                style: {
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  underline: 0,
                  fill: 'red',
                  stroke: 'transparent',
                  fontFamily: 'PingFang SC'
                }
              }
            },
            initOption: { animation: false, interactive: true, disableTriggerEvent: true },
            markStyle: {
              bar_filedLink__editor_dimension_field_valueLink_1_filedLink__editor_type_field_valueLink_1: {
                seriesMatch: { type: 'bar', specIndex: 0 },
                markName: 'bar',
                itemKeys: ['_editor_dimension_field', '_editor_type_field'],
                itemKeyMap: { _editor_dimension_field: 1, _editor_type_field: 1 },
                id: 'bar_filedLink__editor_dimension_field_valueLink_1_filedLink__editor_type_field_valueLink_1',
                style: { fill: '#F54A45', fillOpacity: 1 }
              },
              bar_filedLink__editor_dimension_field_valueLink_2_filedLink__editor_type_field_valueLink_1: {
                seriesMatch: { type: 'bar', specIndex: 0 },
                markName: 'bar',
                itemKeys: ['_editor_dimension_field', '_editor_type_field'],
                itemKeyMap: { _editor_dimension_field: 2, _editor_type_field: 1 },
                id: 'bar_filedLink__editor_dimension_field_valueLink_2_filedLink__editor_type_field_valueLink_1',
                style: { fill: '#FFE928', fillOpacity: 1 }
              },
              bar_filedLink__editor_dimension_field_valueLink_3_filedLink__editor_type_field_valueLink_1: {
                seriesMatch: { type: 'bar', specIndex: 0 },
                markName: 'bar',
                itemKeys: ['_editor_dimension_field', '_editor_type_field'],
                itemKeyMap: { _editor_dimension_field: 3, _editor_type_field: 1 },
                id: 'bar_filedLink__editor_dimension_field_valueLink_3_filedLink__editor_type_field_valueLink_1',
                style: { fill: '#ED6D0C', fillOpacity: 1 }
              }
            }
          },
          extra: {
            temp: 'default-bar-chart',
            editor: 'visactor-editor',
            data: [
              { 城市: '北京', 面积: '16400' },
              { 城市: '广州', 面积: '7238' },
              { 城市: '深圳', 面积: '1997' }
            ]
          }
        },
        {
          id: '9',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 348.8310319767444,
            y: 565.151811669434,
            width: 26.166619082225907,
            height: 24.330136524086356,
            angle: 0,
            anchor: [361.91434151785734, 577.3168799314772]
          },
          options: {
            graphic: {
              image:
                'data:image/png;base64,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'
            }
          },
          extra: { temp: 'default-image-component', editor: 'visactor-editor' }
        },
        {
          id: '10',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 348.8169772632889,
            y: 597.6978431270753,
            width: 28.37789399916943,
            height: 24.74709302325587,
            angle: 0,
            anchor: [363.0059242628736, 610.0713896387033]
          },
          options: {
            graphic: {
              image:
                'data:image/png;base64,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'
            }
          },
          extra: { temp: 'default-image-component', editor: 'visactor-editor' }
        },
        {
          id: '11',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 346.104417566445,
            y: 632.066302429401,
            width: 28.579344892026626,
            height: 26.920888704318912,
            angle: 0,
            anchor: [360.3940900124583, 645.5267467815605]
          },
          options: {
            graphic: {
              image:
                'data:image/png;base64,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'
            }
          },
          extra: { temp: 'default-image-component', editor: 'visactor-editor' }
        },
        {
          id: '12',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 1102.0681287958905,
            y: 22.24715650899701,
            width: 135.904829409885,
            height: 140.5937787594141,
            angle: 0.33819830435210424,
            anchor: [1170.020543500833, 92.54404588870406]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              verticalDirection: 'middle',
              fill: '#FFFFFF',
              textConfig: [
                {
                  textAlign: 'center',
                  text: '全',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '新',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '菜',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '品',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '\n',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '隆',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '重',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '上',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                },
                {
                  textAlign: 'center',
                  text: '线',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#FFFFFF'
                }
              ]
            },
            group: {
              lineWidth: 0,
              opacity: 1,
              background: false,
              color: 'black',
              cornerRadius: 100,
              fill: 'rgba(255,0,0, 1)',
              stroke: false
            }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '13',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 75.4855948920266,
            y: 523.7419409260792,
            width: 116.18705876245849,
            height: 48.541722902824034,
            angle: 0,
            anchor: [133.57912427325584, 548.0128023774912]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: '#C02A26',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '维',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '生',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '素',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '含',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '量',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '较',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '少',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '建',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '议',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '搭',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '配',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '一',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '个',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '水',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                },
                {
                  textAlign: 'left',
                  text: '果',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 134.59873338870432,
                  height: 60.909870743355526
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '14',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 349.5056582225916,
            y: 459.46505139119597,
            width: 81.3735335340532,
            height: 37.611840739202705,
            angle: 0,
            anchor: [390.1924249896182, 478.27097176079735]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: '#C02A26',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '卡',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#C02A26',
                  width: 81.3735335340532,
                  height: 37.61184073920268
                },
                {
                  textAlign: 'left',
                  text: '路',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#C02A26',
                  width: 81.3735335340532,
                  height: 37.61184073920268
                },
                {
                  textAlign: 'left',
                  text: '里',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#C02A26',
                  width: 81.3735335340532,
                  height: 37.61184073920268
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '15',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 267.6135278239203,
            y: 270.39167618355503,
            width: 31.774449750830627,
            height: 20.029394206810693,
            angle: 0,
            anchor: [283.50075269933564, 280.4063732869604]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: 'black',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '热',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 54.5056063122924,
                  height: 24.639340220099726
                },
                {
                  textAlign: 'left',
                  text: '量',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 54.5056063122924,
                  height: 24.639340220099726
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '16',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 486.37514275332205,
            y: 271.7081343438539,
            width: 32.004010070597985,
            height: 18.820688849667818,
            angle: 0,
            anchor: [502.3771477886211, 281.1184787686878]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: 'black',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '碳',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black'
                },
                {
                  textAlign: 'left',
                  text: '水',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black'
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '17',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 267.8852522840534,
            y: 319.40514690614623,
            width: 33.84049262873759,
            height: 20.455720514950187,
            angle: 0,
            anchor: [284.8054985984222, 329.6330071636213]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: 'black',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '脂',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 42.28737541528244,
                  height: 25.407664555647855
                },
                {
                  textAlign: 'left',
                  text: '肪',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 42.28737541528244,
                  height: 25.407664555647855
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '18',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 472.16114254568083,
            y: 322.01932360880414,
            width: 45.77294435215953,
            height: 19.682711274916983,
            angle: 0,
            anchor: [495.0476147217606, 331.86067924626263]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 14,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: 'black',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '蛋',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black'
                },
                {
                  textAlign: 'left',
                  text: '白',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black'
                },
                {
                  textAlign: 'left',
                  text: '质',
                  textAlign: 'left',
                  fontSize: 14,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black'
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '19',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 532.6807386835562,
            y: 465.1009914867111,
            width: 75.54082745016615,
            height: 49.85349615863788,
            angle: 0,
            anchor: [570.4511524086392, 490.02773956603005]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 20,
              fontWeight: 'bold',
              verticalDirection: 'top',
              fill: '#1456F0',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '蛋',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#1456F0',
                  width: 75.54082745016615,
                  height: 49.85349615863788
                },
                {
                  textAlign: 'left',
                  text: '白',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#1456F0',
                  width: 75.54082745016615,
                  height: 49.85349615863788
                },
                {
                  textAlign: 'left',
                  text: '质',
                  textAlign: 'left',
                  fontSize: 20,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#1456F0',
                  width: 75.54082745016615,
                  height: 49.85349615863788
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '20',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 43.637614202658,
            y: 37.82364773671067,
            width: 214.6122170888704,
            height: 68.34949906561462,
            angle: 0,
            anchor: [150.9437227470932, 71.99839726951798]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 40,
              fontWeight: 'bold',
              verticalDirection: 'top',
              fill: '#A44904',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 40,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#A44904',
                  width: 214.6122170888704,
                  height: 68.34949906561462
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 40,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#A44904',
                  width: 214.6122170888704,
                  height: 68.34949906561462
                },
                {
                  textAlign: 'left',
                  text: '大',
                  textAlign: 'left',
                  fontSize: 40,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#A44904',
                  width: 214.6122170888704,
                  height: 68.34949906561462
                },
                {
                  textAlign: 'left',
                  text: '盘',
                  textAlign: 'left',
                  fontSize: 40,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#A44904',
                  width: 214.6122170888704,
                  height: 68.34949906561462
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 40,
                  fontWeight: 'bold',
                  verticalDirection: 'top',
                  fill: '#A44904',
                  width: 214.6122170888704,
                  height: 68.34949906561462
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '21',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 92.51053779069815,
            y: 281.85563745847213,
            width: 56.62786804402009,
            height: 28.616824127906966,
            angle: 0,
            anchor: [120.8244718127082, 296.1640495224256]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              verticalDirection: 'middle',
              fill: '#FFFFFF',
              textConfig: [
                {
                  textAlign: 'center',
                  text: '咸',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 56.62786804402009,
                  height: 28.616824127906938
                },
                {
                  textAlign: 'center',
                  text: '鲜',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 56.62786804402009,
                  height: 28.616824127906938
                }
              ]
            },
            group: {
              lineWidth: 0,
              opacity: 1,
              background: false,
              color: 'black',
              cornerRadius: 7.869626635174416,
              fill: 'rgba(255, 61, 0, 1)',
              stroke: false,
              visible: true
            }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '22',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 90.73964389534859,
            y: 331.39850238787346,
            width: 56.63255294850512,
            height: 28.88386368355475,
            angle: 0,
            anchor: [119.05592036960115, 345.84043422965084]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              verticalDirection: 'middle',
              fill: '#FFFFFF',
              textConfig: [
                {
                  textAlign: 'center',
                  text: '饱',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 56.63255294850512,
                  height: 30.059774709302246
                },
                {
                  textAlign: 'center',
                  text: '腹',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 56.63255294850512,
                  height: 30.059774709302246
                }
              ]
            },
            group: {
              lineWidth: 0,
              opacity: 1,
              background: false,
              color: 'black',
              cornerRadius: 8.416736918604629,
              fill: 'rgba(255, 61, 0, 1)',
              stroke: false
            }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '23',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 88.61738216362096,
            y: 379.1985828488379,
            width: 58.78292410714289,
            height: 31.11856312292366,
            angle: 0,
            anchor: [118.0088442171924, 394.7578644102997]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              verticalDirection: 'middle',
              fill: '#FFFFFF',
              textConfig: [
                {
                  textAlign: 'center',
                  text: '热',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 58.78292410714289,
                  height: 31.118563122923632
                },
                {
                  textAlign: 'center',
                  text: '量',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  verticalDirection: 'middle',
                  fill: '#FFFFFF',
                  width: 58.78292410714289,
                  height: 31.118563122923632
                }
              ]
            },
            group: {
              lineWidth: 0,
              opacity: 1,
              background: false,
              color: 'black',
              cornerRadius: 9.957940199335571,
              fill: 'rgba(255, 61, 0, 1)',
              stroke: false
            }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        },
        {
          id: '24',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 43.03326152408644,
            y: 118.15102003737522,
            width: 836.2896724460134,
            height: 146.52181530315625,
            angle: 0,
            anchor: [461.17809774709315, 191.41192768895334]
          },
          options: {
            graphic: {
              text: 'This is Text',
              textAlign: 'left',
              fontSize: 16,
              fontWeight: 'normal',
              verticalDirection: 'top',
              fill: 'black',
              textConfig: [
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '大',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '盘',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '又',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '名',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '沙',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '湾',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '大',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '盘',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '、',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '辣',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '子',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '炒',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '是',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '维',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '吾',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '尔',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '自',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '治',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '区',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '塔',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '城',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '地',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '区',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '沙',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '湾',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '市',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '的',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '特',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '色',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '美',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '食',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '2',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '0',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '世',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '纪',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '8',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '0',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '年',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '代',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '起',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '源',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '于',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '公',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '路',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '边',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '饭',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '店',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '的',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '江',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '湖',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '菜',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '主',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '要',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '用',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '块',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '和',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '土',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '豆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '块',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '炒',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '炖',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '而',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '成',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '还',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '同',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '皮',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '带',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '面',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '搭',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '配',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '食',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '用',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '。',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '色',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '彩',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鲜',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '艳',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '爽',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '滑',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '麻',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '辣',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '的',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '肉',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '和',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '软',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '糯',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '甜',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '润',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '的',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '土',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '豆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '辣',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '中',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '有',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '香',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '、',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '粗',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '中',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '带',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '细',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '是',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '餐',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '桌',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '上',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '的',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '佳',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '品',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '\n',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '\n',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '2',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '0',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '1',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '8',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '年',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '9',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '月',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '1',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '0',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '日',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '“',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '中',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '国',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '菜',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '”',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '正',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '式',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '发',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '布',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '，',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '“',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '大',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '盘',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '鸡',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '”',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '被',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '评',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '为',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '新',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '疆',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '十',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '大',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '经',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '典',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '名',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                },
                {
                  textAlign: 'left',
                  text: '菜',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 'normal',
                  verticalDirection: 'top',
                  fill: 'black',
                  width: 630.7675975913621,
                  height: 149.26248442691042
                }
              ]
            },
            group: { lineWidth: 0, opacity: 1, background: false, color: 'black', cornerRadius: 0 }
          },
          extra: { temp: 'default-text-component', editor: 'visactor-editor' }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 1280, height: 720, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
