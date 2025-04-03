import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAllSelection, SnapshotPlugin } from '../../../../../vstory-editor/src';
import { Edit, registerAll } from '../../../../src';

registerAll();
registerAllSelection();

const spec = {
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

export const Playground = () => {
  const id = 'Playground';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const scaleX = 0.7;
    const scaleY = 0.7;
    const story = new Story(null, {
      canvas,
      width: 1000 * scaleX,
      height: 600 * scaleY,
      // layerBackground: 'white',
      background: 'pink',
      scaleX,
      scaleY
    });
    const player = new Player(story);
    story.init(player);

    window.addEventListener('resize', () => {
      const scaleX = 1000 / container!.clientWidth;
      const scaleY = scaleX;
      story.canvas.resize(container!.clientWidth / 2, container!.clientHeight / 2, { scaleX, scaleY });
    });

    story.addCharacterWithAppear({
      type: 'Text',
      id: 'text1',
      zIndex: 1,
      position: {
        top: 100,
        left: 100,
        width: 200,
        height: 60
      },
      options: {
        graphic: {
          text: 'Hello World',
          fontSize: 20,
          align: 'left',
          baseline: 'top'
        }
      }
    });
    story.addCharacterWithAppear({
      type: 'Rect',
      id: 'rect1',
      zIndex: 1,
      position: {
        top: 200,
        left: 100,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: 'red',
          stroke: 'blue',
          lineWidth: 20
        }
      }
    });
    story.addCharacterWithAppear({
      type: 'Shape',
      id: 'shape1',
      zIndex: 1,
      position: {
        top: 300,
        left: 300,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          symbolType: 'star',
          fill: 'red',
          stroke: 'blue',
          lineWidth: 6
        }
      }
    });
    // story.addCharacterWithAppear({
    //   type: 'VChart',
    //   id: 'vchart1',
    //   zIndex: 1,
    //   position: {
    //     top: 300,
    //     left: 300,
    //     width: 130,
    //     height: 130
    //   },
    //   options: {
    //     spec
    //   }
    // });

    player.play(-1);

    const edit = new Edit(story as any);
    edit.on('startEdit', msg => {
      console.log('startEdit', msg);
    });
    edit.on('endEdit', msg => {
      console.log('endEdit', msg);
    });
    edit.on('resize', msg => {
      console.log('resize', msg.position);
    });
    edit.on('startEdit', msg => {});
    edit.on('endEdit', msg => {});
    edit.on('resize', msg => {
      // console.log('resize', msg);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
