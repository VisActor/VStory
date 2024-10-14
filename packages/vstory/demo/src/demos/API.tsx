import React, { createRef, useEffect } from 'react';
import { Story } from '../../../src/story/story';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { Edit } from '../../../src/edit/edit';

loadAllSelection();

export const API = () => {
  const id = 'Appear';

  const chartSpec = {
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

  const canvas = createRef<HTMLCanvasElement>();

  useEffect(() => {
    try {
      const c = canvas.current!;
      const story: any = new Story(null, {
        canvas: c,
        width: c.width / 2,
        height: c.height / 2,
        playerOption: {
          scaleX: 0.6,
          scaleY: 0.6,
          offsetX: 100,
          offsetY: 60
        },
        background: 'transparent',
        layerBackground: 'white'
      });
      // 创建character
      const rect = story.addCharacterWithAppear({
        type: 'Rect',
        id: 'rect0',
        zIndex: 10,
        position: {
          top: 40,
          left: 50,
          width: 250,
          height: 100,
          angle: 0.3
        },
        options: {
          graphic: {
            fill: 'red'
          },
          text: {
            text: 'haha',
            fill: 'black'
          },
          angle: 0,
          shapePoints: []
        }
      });
      const image = story.addCharacterWithAppear({
        type: 'Image',
        id: 'image0',
        zIndex: 0,
        position: {
          top: 140,
          left: 250,
          width: 200,
          height: 100
        },
        options: {
          graphic: {
            image: Scene3ChartImage2
          },
          text: {
            text: 'Image',
            fill: 'black'
          },
          angle: 0,
          shapePoints: []
        }
      });
      const chart = story.addCharacterWithAppear({
        type: 'VChart',
        id: 'test-chart-0',
        zIndex: 9,
        position: {
          top: 100,
          left: 100,
          width: 400,
          height: 400,
          angle: 0.3
        },
        options: {
          spec: chartSpec
        }
      });
      const shape = story.addCharacterWithAppear({
        id: 'shape-0',
        type: 'Shape',
        zIndex: 0,
        position: {
          x: 200,
          y: 200,
          width: 200,
          height: 200,
          angle: 0.3
        },
        options: {
          graphic: {
            fill: 'white',
            stroke: 'black',
            symbolType: 'circle'
          }
        }
      });
      const text = story.addCharacterWithAppear({
        id: 'text-0',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 200,
          y: 200,
          width: 200,
          height: 200
        },
        options: {
          graphic: {
            fill: 'black',
            text: 'black',
            symbolType: 'circle'
          },
          group: {
            fill: 'red',
            visible: true
          }
        }
      });

      text.setConfig({ options: { graphic: { text: '这是普通文本' } } });
      setTimeout(() => {
        text.setConfig({ options: { group: { visible: false } } });
      }, 1000);

      chart.setConfig({ zIndex: 100 });

      setTimeout(() => {
        rect.setConfig({ zIndex: -100 });
      }, 1000);

      // 设置character
      // 添加character
      // 更新character
      story.play();
      let selectedCharacter: any = null;
      const edit = new Edit(story);
      edit.emitter.on('startEdit', msg => {
        selectedCharacter = msg.actionInfo.character;
        if (msg.type === 'commonEdit' && msg.actionInfo.character) {
          msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
          story.play();
        }
      });
      edit.emitter.on('endEdit', msg => {
        selectedCharacter = null;
      });
      edit.emitter.on('resize', msg => {
        console.log('resize', msg);
      });
      // 删除character
      document.addEventListener('keydown', e => {
        if (e.key === 'Backspace') {
          const sc = selectedCharacter;
          edit.stopEdit();
          sc && story.removeCharacter(sc.id);
          story.play(false);
          console.log('Backspace');
        }
      });
      // 导出DSL
      console.log(story.toDSL());

      // setTimeout(() => {
      //   edit.selectCharacter('test-chart-0');
      // }, 3000);
      // story读取DSL
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} id={id}>
      <canvas
        ref={canvas as any}
        width={3200}
        height={2000}
        style={{ width: '1600px', height: '1000px', background: 'grey' }}
      ></canvas>
    </div>
  );
};
