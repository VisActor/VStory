---
category: examples
group: character
title: vchart
keywords: vchart
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vchart.gif
---

# VChart Chart Elements

`VChart` is a general Character element, you can visit the [VChart official website](/vchart) to see more types of charts. Configure the chart you want, and then put it in VStory for secondary definition and configuration.
Set `type: 'VChart'` to use this chart as a Character.

## Code Demonstration

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
      label: { visible: true },
      seriesField: 'type',
      dataIndex: 0,
      xField: ['x', 'type'],
      yField: 'y'
    },
    {
      type: 'line',
      id: 'line',
      dataIndex: 1,
      label: { visible: true },
      seriesField: 'type',
      xField: 'x',
      yField: 'y',
      stack: false
    }
  ],
  axes: [
    { orient: 'left', seriesIndex: [0] },
    { orient: 'right', seriesId: ['line'], grid: { visible: false } },
    { orient: 'bottom', label: { visible: true }, type: 'band' }
  ],
  legends: {
    visible: true,
    orient: 'bottom'
  }
};
// dsl配置
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: 'bar-line-series',
      position: {
        top: 50,
        left: 50,
        width: 300,
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
        },
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
                      animation: {
                        duration: 2000,
                        easing: 'linear'
                      }
                    },
                    {
                      selector: 'bar',
                      animation: {
                        duration: 5000,
                        easing: 'linear',
                        effect: 'barLeap'
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

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);
window.vstory = story;
```
