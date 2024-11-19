---
category: examples
group: animate
title: pie-leap
keywords: pie-leap
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/pie-leap.gif
---

# 饼图Leap动画

`pieLeap`动画是对饼图的扇区的一种特殊动画，带着一些活跃的感觉，该动画适配通用`VChart`配置，所有带有`pie`系列的图表都可以配置`pieLeap`动画。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 需要用到的图表，一个普通饼图就可以
const chartSpec = {
  type: 'pie',
  data: [
    {
      values: [
        { month: 'Mon', sales: 22 },
        { month: 'Tue', sales: 38 },
        { month: 'Wed', sales: 25 },
        { month: 'Thu', sales: 29 },
        { month: 'Fri', sales: 13 }
      ]
    }
  ],
  outerRadius: 0.8,
  valueField: 'sales',
  categoryField: 'month',
};

// 定义故事的dsl
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: 'pie1',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4
        },
        spec: chartSpec
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
              characterId: 'pie1',
              characterActions: [
                {
                  action: 'appear',
                  payload: [
                    {
                      selector: ':not(pie)', // 其他组件使用默认动画就行
                      animation: { duration: 3000 }
                    },
                    {
                      selector: 'pie', // 柱子使用leap动画
                      animation: { duration: 3000, effect: 'pieLeap', oneByOne: true, dimensionCount: 5 }
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    }
  ]
}

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
