---
category: examples
group: arrange
title: vchart-arrange
keywords: vchart-arrange
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vchart-arrange.gif
---

# VChart Animation Arrangement

The `VChart` chart component can refer to [VChart Chart Elements](/vstory/demo/character/vchart) and is a generic Character element that can configure any VChart spec. So, after configuring a VChart spec, we can use VStory's animation arrangement capabilities to control the animation effects of different components, series, axes, legends, and other components of the chart.

In this demo, we will demonstrate the arrangement logic between bars, lines, and axes in a combined chart.

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

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
                      // 除了柱子和右轴，其他模块执行appear动画
                      selector: ':not(bar) :not(#axes-right)',
                      animation: {
                        duration: 2000,
                        easing: 'linear'
                      }
                    }
                  ]
                },
                {
                  startTime: 3000,
                  action: 'appear',
                  payload: [
                    {
                      // 柱子执行appear动画
                      selector: 'bar',
                      animation: {
                        duration: 800,
                        easing: 'linear'
                      }
                    }
                  ]
                },
                {
                  startTime: 3000,
                  action: 'appear',
                  payload: [
                    {
                      // 右轴执行appear动画
                      selector: '#axes-right',
                      animation: {
                        duration: 800,
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

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, width: 600, height: 400, scaleX: 'auto', scaleY: 'auto', background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window.vstory = story;

window['story'] = story;
window['vstory'] = story;
```
