---
category: examples
group: arrange
title: vchart-arrange
keywords: vchart-arrange
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vchart-arrange.gif
---

# 折线图动画编排

`VChart`图表组件可以参考[VChart图表元素](/vstory/demo/character/vchart)是一种通用的Character元素，可以配置任意的VChart spec。那么当配置好了一个VChart的spec之后，我们就基于VStory的动画编排能力，去控制该图表不同组件、系列、坐标轴、图例等组件的动画效果。

这个demo，我们将演示对多系列折线图里线段动画的编排。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const typeList = ['Nail polish', 'Eyebrow pencil', 'Rouge', 'Lipstick', 'Eyeshadows', 'Eyeliner', 'Foundation', 'Lip gloss', 'Mascara'];
const USA = typeList.map((item, i) => ({
  type: item,
  country: 'USA',
  value: Math.random() * 1000
}));
const EU = typeList.map((item, i) => ({
  type: item,
  country: 'EU',
  value: 1000 + Math.random() * 1000
}));
const China = typeList.map((item, i) => ({
  type: item,
  country: 'China',
  value: 2000 + Math.random() * 1000
}));
const Africa = typeList.map((item, i) => ({
  type: item,
  country: 'Africa',
  value: 3000 + Math.random() * 1000
}));

const spec = {
  type: 'common',
  series: [USA, EU, China, Africa].map((item, i) => ({
    type: 'line',
    id: 'line' + i,
    data: {
      id: '' + i,
      values: item
    },
    point: {
      visible: false
    },
    xField: 'type',
    yField: 'value'
  })),
  axes: [
    {
      orient: 'left',
      type: 'linear'
    },
    {
      orient: 'bottom',
      type: 'band'
    }
  ]
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
                      selector: ':not(line)',
                      animation: {
                        duration: 1000,
                        easing: 'linear'
                      }
                    }
                  ]
                },
                {
                  startTime: 0,
                  action: 'appear',
                  payload: [
                    {
                      selector: '#line0',
                      animation: {
                        duration: 1000,
                        easing: 'linear'
                      }
                    }
                  ]
                },
                {
                  startTime: 1000,
                  action: 'appear',
                  payload: [
                    {
                      selector: '#line1',
                      animation: {
                        duration: 1000,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  ]
                },
                {
                  startTime: 2000,
                  action: 'appear',
                  payload: [
                    {
                      selector: '#line2',
                      animation: {
                        duration: 600,
                        easing: 'linear',
                        effect: 'growPoints',
                        params: {
                          direction: 'vertical'
                        }
                      }
                    }
                  ]
                },
                {
                  startTime: 3000,
                  action: 'appear',
                  payload: [
                    {
                      selector: '#line3',
                      animation: {
                        duration: 600,
                        easing: 'linear',
                        effect: 'growPoints',
                        params: {
                          direction: 'horizontal'
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
