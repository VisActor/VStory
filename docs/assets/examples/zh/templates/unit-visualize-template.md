---
category: examples
group: templates
title: unit-visualize-template
keywords: unit-visualize-template
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-visualize-template.gif
---

# 单元可视化模板

为了更方便的使用单元可视化组件，我们只做了此模板，可以轻松制作自己的单元可视化作品。
该模板的核心组件是[单元可视化组件](/vstory/demo/character/unit)。我们基于此模板制作了作品：[美国枪支死亡单元可视化](/vstory/demo/works-show/unit-gun-death)，可以查看作品的详细介绍。

你仅需准备一份spec，传入`createUnitTemplate`函数中，就可以得到一份作品的DSL。大致的制作流程如下：
1. 首先你需要准备一份数据，并将其设置到spec的data字段
2. 给spec设置布局、标题样式、unit默认配置
3. 在scenes数组里，定义你的故事情节，每一个情节包含一个标题以及一个nodes数组，数组每一项可通过`query`筛选数据，给数据设置对应点的样式，nodes数组支持通过children字段嵌套，进行嵌套的`query`

在这个demo里，我们随机生成一份坎巴拉星球的数据，其中有20000个坎巴拉星人，一些是蓝色的，一些是红色的，一些是大坎巴拉星人，一些是小坎巴拉星人，我们希望通过单元可视化组件，将这些数据可视化出来。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const data = new Array(20000).fill(0).map(() => ({ color: Math.random() > 0.5 ? 'B' : 'R', size: Math.random() * 80 }));
// 处理一下数据，将数据按照颜色和大小排序
const count = (datum) => (datum.color === 'B'? 10 : 5) + (datum.size > 50 ? 2 : 1);
data.sort((d1, d2) => {
  return count(d1) - count(d2);
});
const spec = {
  layout: {
    width: 1550,
    height: 800,
    viz: {
      padding: {
        top: 0
      },
      background: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-template-bg.png',
      backgroundOpacity: 0.3
    },
    title: {
      style: {
        fontSize: 36,
        fontWeight: 'bold'
      },
      height: 150
    }
  },
  unit: {
    gap: [0.5, 0.5],
    countPerSymbol: 1, // 每个点对应一条数据，如果数据量很大，建议一个点对应多个数据
    defaultStyle: {
      fill: '#222222'
    }
  },
  data,
  scenes: [
    {
      title: [
        {
          text: '坎巴拉星球有20000个坎巴拉星人'
        }
      ],
      nodes: [
        {
          style: {
            fill: '#ded034'
          }
        }
      ]
    },
    {
      title: [
        {
          text: `其中，有${data.filter(d => d.color === 'B').length}个坎巴拉人是蓝色的`
        }
      ],
      nodes: [
        {
          query: (datum) => datum.color === 'B',
          style: {
            fill: '#89a8ea'
          }
        }
      ]
    },
    {
      title: [
        {
          text: `其中，有${data.filter(d => d.color === 'R').length}个坎巴拉人是红色的`
        }
      ],
      nodes: [
        {
          query: (datum) => datum.color === 'R',
          style: {
            fill: '#e385a0'
          }
        }
      ]
    },
    {
      title: [
        {
          text: `蓝色坎巴拉星人中，有${data.filter(d => d.color === 'B' && d.size > 50).length}个是大坎巴拉星人`
        }
      ],
      nodes: [
        {
          query: (datum) => datum.color === 'B',
          style: {
            fill: '#89a8ea'
          },
          children: [
            {
              query: (datum) => datum.size > 50,
              style: {
                fill: '#2055c8'
              }
            }
          ]
        }
      ]
    },
    {
      title: [
        {
          text: `红坎巴拉星人中，有${data.filter(d => d.color === 'R' && d.size > 50).length}个是大坎巴拉星人`
        }
      ],
      nodes: [
        {
          query: (datum) => datum.color === 'R',
          style: {
            fill: '#e385a0'
          },
          children: [
            {
              query: (datum) => datum.size > 50,
              style: {
                fill: '#c82d59'
              }
            }
          ]
        }
      ]
    }
  ]
}
const dsl = VStory.createUnitTemplate(spec);

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0', scaleX: 0.35, scaleY: 0.35 });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);
window.vstory = story;
```
