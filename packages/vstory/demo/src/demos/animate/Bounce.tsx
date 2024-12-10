import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import {
  registerCommonBounceAction,
  registerVComponentAction,
  registerVChartAction
} from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerCommonBounceAction();
initVR();

export const Bounce = () => {
  const id = 'Bounce';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const chartSpec = {
      type: 'bar',
      animation: false,
      data: [
        {
          id: 'barData',
          values: [
            { month: 'Mon', sales: 22 },
            { month: 'Tue', sales: 13 },
            { month: 'Wed', sales: 25 },
            { month: 'Thu', sales: 29 },
            { month: 'Fri', sales: 38 }
          ]
        }
      ],
      label: {
        animation: false
      },
      xField: 'month',
      yField: 'sales'
    };

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    story.addCharacter(
      {
        id: '0',
        type: 'VChart',
        zIndex: 0,
        position: {
          x: 100,
          y: 100,
          width: 300,
          height: 300,
          angle: 0
        },
        options: {
          panel: {
            fill: 'white'
          },
          spec: chartSpec
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            startTime: 0,
            action: 'appear',
            payload: [
              {
                selector: ':not(bar)',
                animation: {
                  duration: 2000,
                  easing: 'linear'
                  // effect: 'fade'
                } as any
              }
            ]
          },
          {
            startTime: 0,
            action: 'appear',
            payload: [
              {
                selector: 'bar',
                animation: {
                  duration: 3000,
                  easing: 'linear',
                  effect: 'barBounce',
                  oneByOne: true,
                  dimensionCount: 5
                } as any
              }
            ]
          }
        ]
      }
    );

    const pieSpec = {
      type: 'pie',
      data: [
        {
          id: 'id0',
          values: [
            { type: 'A', value: '7.72' },
            { type: 'B', value: '8.13' },
            { type: 'C', value: '5' },
            { type: 'D', value: '6.63' },
            { type: 'E', value: '3.83' }
          ]
        }
      ],
      outerRadius: 0.8,
      valueField: 'value',
      categoryField: 'type',
      label: {
        visible: true
      }
    };
    story.addCharacter(
      {
        id: '1',
        type: 'VChart',
        zIndex: 0,
        position: {
          x: 500,
          y: 100,
          width: 300,
          height: 300,
          angle: 0
        },
        options: {
          panel: {
            fill: 'white'
          },
          spec: pieSpec
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            startTime: 0,
            action: 'appear',
            payload: [
              {
                selector: ':not(arc)',
                animation: {
                  duration: 2000,
                  easing: 'linear'
                  // effect: 'fade'
                } as any
              }
            ]
          },
          {
            startTime: 0,
            action: 'appear',
            payload: [
              {
                selector: 'arc',
                animation: {
                  duration: 3000,
                  easing: 'linear',
                  effect: 'arcBounce',
                  oneByOne: true,
                  dimensionCount: 5
                } as any
              }
            ]
          }
        ]
      }
    );

    console.log(story);
    player.play(1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
