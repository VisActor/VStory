import React, { useEffect } from 'react';
import { Story } from '../../../src/story/story';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';

export const API = () => {
  const id = 'Appear';

  const chartSpec = {
    type: 'bar',
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
          height: 100
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
          height: 400
        },
        options: {
          spec: chartSpec
        }
      });

      // 设置character
      // 添加character
      // 更新character
      story.play();
      // 导出DSL
      // story读取DSL
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
