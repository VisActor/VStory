import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../vstory-core/src';
import { registerTextAction, registerVChartAction } from '../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerTextAction();
initVR();

export const API = () => {
  const id = 'API';
  const canvas = createRef();

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

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

    const story = new Story(null, { canvas: canvas.current, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    // story.addCharacterWithAppear({
    //   type: 'VChart',
    //   id: 'test-chart-0',
    //   zIndex: 9,
    //   position: {
    //     x: 100,
    //     y: 100,
    //     width: 300,
    //     height: 300
    //   },
    //   options: {
    //     padding: { left: 60, top: 60, right: 60, bottom: 60 },
    //     panel: {
    //       fill: 'red',
    //       cornerRadius: 10
    //     },
    //     spec: chartSpec
    //   }
    // });

    story.addCharacterWithAppear({
      type: 'Text',
      id: 'title1',
      zIndex: 1,
      position: {
        top: 100,
        left: 200
      },
      options: {
        graphic: {
          text: 'A BRIEF HISTORY',
          fontSize: 12,
          fontWeight: 'bold',
          fill: 'red',
          textAlign: 'center',
          textBaseline: 'middle'
        },
        panel: {
          fill: 'blue',
          cornerRadius: 30
        }
      }
    });
    player.play();

    return () => {
      story.release();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} id={id}>
      <canvas ref={canvas as any}></canvas>
    </div>
  );
};
