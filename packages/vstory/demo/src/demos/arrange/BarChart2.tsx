import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const BarChart2 = () => {
  const id = 'BarChart2';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const spec = {
      type: 'common',
      animation: false,
      seriesField: 'color',
      data: [
        {
          id: 'id0',
          values: [
            { x: '周一', type: '早餐', y: 15 },
            { x: '周一', type: '午餐', y: 25 },
            { x: '周二', type: '早餐', y: 12 },
            { x: '周二', type: '午餐', y: 30 },
            { x: '周三', type: '早餐', y: 15 },
            { x: '周三', type: '午餐', y: 24 },
            { x: '周四', type: '早餐', y: 10 },
            { x: '周四', type: '午餐', y: 25 },
            { x: '周五', type: '早餐', y: 13 },
            { x: '周五', type: '午餐', y: 20 },
            { x: '周六', type: '早餐', y: 10 },
            { x: '周六', type: '午餐', y: 22 },
            { x: '周日', type: '早餐', y: 12 },
            { x: '周日', type: '午餐', y: 19 }
          ]
        },
        {
          id: 'id1',
          values: [
            { x: '周一', type: '饮料', y: 22 },
            { x: '周二', type: '饮料', y: 43 },
            { x: '周三', type: '饮料', y: 33 },
            { x: '周四', type: '饮料', y: 22 },
            { x: '周五', type: '饮料', y: 10 },
            { x: '周六', type: '饮料', y: 30 },
            { x: '周日', type: '饮料', y: 50 }
          ]
        }
      ],
      series: [
        {
          type: 'bar',
          id: 'bar',
          dataIndex: 0,
          label: { visible: false },
          seriesField: 'type',
          dataIndex: 0,
          xField: ['x', 'type'],
          yField: 'y'
        },
        {
          type: 'line',
          id: 'line',
          dataIndex: 1,
          label: { visible: false },
          seriesField: 'type',
          xField: 'x',
          yField: 'y',
          stack: false
        }
      ],
      axes: [
        {
          orient: 'left',
          id: 'axes-left',
          domainLine: { visible: true },
          seriesId: ['line'],
          grid: { visible: false }
        },
        { orient: 'right', id: 'axes-right', domainLine: { visible: true }, seriesId: ['bar'], seriesIndex: [0] },
        { orient: 'bottom', label: { visible: true }, type: 'band' }
      ],
      legends: {
        visible: true,
        orient: 'bottom'
      }
    };

    const dsl = {
      characters: [
        {
          type: 'VChart',
          id: 'bar-line-series',
          position: {
            top: 50,
            left: 50,
            width: 500,
            height: 300
          },
          options: {
            spec,
            panel: {
              fill: '#ffffff',
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowBlur: 10,
              shadowOffsetX: 4,
              shadowOffsetY: 4,
              cornerRadius: 8
            }
          }
        }
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                {
                  characterId: 'bar-line-series',
                  characterActions: [
                    {
                      startTime: 0,
                      action: 'appear',
                      payload: [
                        {
                          selector: ':not(bar) :not(#axes-right)',
                          animation: {
                            duration: 2000,
                            easing: 'linear'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 2000,
                      action: 'appear',
                      payload: [
                        {
                          selector: 'bar',
                          animation: {
                            duration: 2000,
                            easing: 'linear'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 2000,
                      action: 'appear',
                      payload: [
                        {
                          selector: '#axes-right',
                          animation: {
                            duration: 2000,
                            easing: 'linear'
                          }
                        }
                      ]
                    },
                    {
                      startTime: 5500,
                      action: 'disappear',
                      payload: {
                        style: {},
                        animation: {
                          // effect: 'fade',
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
      ]
    };

    const story = new Story(dsl, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    console.log(story);
    player.play(0);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
