import React, { useEffect } from 'react';
import { Story } from '../../../src/story/story';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { Edit } from '../../../src/edit/edit';

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
    xField: 'month',
    yField: 'sales'
  };

  useEffect(() => {
    try {
      const story = new Story(null, { dom: id });
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

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
