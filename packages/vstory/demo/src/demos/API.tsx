import React, { createRef, useEffect } from 'react';
import { Story } from '../../../src/story/story';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { Edit } from '../../../src/edit/edit';
import VChart from '@visactor/vchart';

const response = await fetch('https://tosv.byted.org/obj/dpvis/yjt/a.json');
const geojson = await response.json();
VChart.registerMap('china', geojson);

loadAllSelection();

export const API = () => {
  const id = 'Appear';

  const chartSpec = {
    type: 'bar',
    animation: false,
    data: [
      {
        id: 'barData',
        values: [
          { month: 'Monday', sales: 22 },
          { month: 'Tuesday', sales: 13 },
          { month: 'Wednesday', sales: 25 },
          { month: 'Thursday', sales: 29 },
          { month: 'Friday', sales: 38 }
        ]
      }
    ],
    label: {
      animation: false
    },
    xField: 'month',
    yField: 'sales'
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

      setTimeout(() => {
        console.log('aaaaaaaaa');
        story.addCharacterWithAppear({
          type: 'VChart',
          id: 'test-chart-1',
          zIndex: 9,
          position: {
            top: 300,
            left: 300,
            width: 400,
            height: 400
            // angle: 0.3
          },
          options: {
            panel: {
              fill: 'red'
            },
            spec: {
              type: 'map',
              nameField: 'name',
              valueField: 'value',
              nameProperty: 'name',
              map: 'china'
            }
          }
        });
        story.play();
      }, 6000);
      // 创建character
      // const rect = story.addCharacterWithAppear({
      //   type: 'Rect',
      //   id: 'rect0',
      //   zIndex: 10,
      //   position: {
      //     top: 40,
      //     left: 50,
      //     width: 250,
      //     height: 100,
      //     angle: 0.3
      //   },
      //   options: {
      //     graphic: {
      //       fill: 'red'
      //     },
      //     text: {
      //       text: 'haha',
      //       fill: 'black'
      //     },
      //     angle: 0,
      //     shapePoints: []
      //   }
      // });
      // const image = story.addCharacterWithAppear({
      //   type: 'Image',
      //   id: 'image0',
      //   zIndex: 0,
      //   position: {
      //     top: 140,
      //     left: 250,
      //     width: 200,
      //     height: 100
      //   },
      //   options: {
      //     graphic: {
      //       image: Scene3ChartImage2
      //     },
      //     text: {
      //       text: 'Image',
      //       fill: 'black'
      //     },
      //     angle: 0,
      //     shapePoints: []
      //   }
      // });
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
          panel: {
            fill: 'red'
          },
          spec: chartSpec
        }
      });
      // const shape = story.addCharacterWithAppear({
      //   id: 'shape-0',
      //   type: 'Shape',
      //   zIndex: 0,
      //   position: {
      //     x: 200,
      //     y: 200,
      //     width: 200,
      //     height: 200,
      //     angle: 0.3
      //   },
      //   options: {
      //     graphic: {
      //       fill: 'white',
      //       stroke: 'black',
      //       symbolType: 'circle'
      //     }
      //   }
      // });
      const text = story.addCharacterWithAppear({
        id: '0',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 45.921826774691255,
          y: 51.289400077160394,
          width: 197.8617380401235,
          height: 182.78187692901236,
          angle: 0,
          anchor: [144.852695794753, 142.68033854166657]
        },
        options: {
          graphic: {
            text: 'This is Text',
            fontSize: 16,
            fontWeight: 'bold',
            verticalDirection: 'top'
          },
          group: {
            lineWidth: 0,
            opacity: 1,
            background: false,
            color: 'black',
            cornerRadius: 0,
            fill: 'rgba(143, 29, 204, 1)',
            stroke: false
          }
        },
        extra: {
          temp: 'default-text-component',
          editor: 'visactor-editor'
        }
      });
      // const progress = story.addCharacterWithAppear({
      //   id: '111',
      //   type: 'VChart',
      //   zIndex: 0,
      //   position: {
      //     left: 300,
      //     top: 10,
      //     width: 500,
      //     height: 500
      //   },
      //   options: {
      //     spec: {
      //       type: 'circularProgress',
      //       categoryField: '_editor_dimension_field',
      //       valueField: '_editor_value_field',
      //       radius: 0.8,
      //       cornerRadius: 20
      //     },
      //     data: [
      //       {
      //         id: '0',
      //         values: [
      //           {
      //             _editor_dimension_field: 'type',
      //             _editor_value_field: '0.75'
      //           }
      //         ]
      //       }
      //     ],
      //     color: [
      //       'linear-gradient(90deg, #222A70 0%, rgba(34, 42, 112, 0) 100%)',
      //       'linear-gradient(90deg, #215F97 0%, rgba(33, 95, 151, 0) 100%)',
      //       'linear-gradient(90deg, #99B4D2 0%, rgba(153, 180, 210, 0) 100%)',
      //       'linear-gradient(90deg, #CBCBCB 0%, rgba(203, 203, 203, 0) 100%)',
      //       'linear-gradient(90deg, #FFC2BF 0%, rgba(255, 194, 191, 0) 100%)',
      //       'linear-gradient(90deg, #FF948F 0%, rgba(255, 148, 143, 0) 100%)',
      //       'linear-gradient(90deg, #F14C44 0%, rgba(241, 76, 68, 0) 100%)',
      //       'linear-gradient(90deg, #BE1519 0%, rgba(190, 21, 25, 0) 100%)'
      //     ],
      //     initOption: {
      //       animation: false,
      //       interactive: true,
      //       disableTriggerEvent: true
      //     }
      //   },
      //   extra: {
      //     temp: 'default-progress-ring-chart',
      //     editor: 'visactor-editor',
      //     data: [
      //       {
      //         name: 'type',
      //         value: '0.75'
      //       }
      //     ]
      //   }
      // });

      // debugger;
      // text.setConfig({
      //   options: {
      //     graphic: {
      //       innerTextAlign: 'center'
      //     },
      //     group: {}
      //   }
      // });
      console.log(text);
      const button = document.createElement('button');
      button.innerText = 'set color';
      document.body.appendChild(button);
      button.addEventListener('click', () => {
        text.setConfig({ options: { graphic: { fill: 'red' } } });
      });
      (window as any).story = story;
      // setTimeout(() => {
      //   text.setConfig({ options: { group: { visible: false } } });
      // }, 1000);

      // chart.setConfig({ zIndex: -100 });

      // setTimeout(() => {
      //   chart.setConfig({
      //     options: {
      //       title: {
      //         default: {
      //           text: '这是标题'
      //         }
      //       }
      //     }
      //   });
      // }, 2000);

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
      // document.addEventListener('keydown', e => {
      //   if (e.key === 'Backspace') {
      //     const sc = selectedCharacter;
      //     edit.stopEdit();
      //     sc && story.removeCharacter(sc.id);
      //     story.play(false);
      //     console.log('Backspace');
      //   }
      // });
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
