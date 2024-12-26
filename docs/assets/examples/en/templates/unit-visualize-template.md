---
category: examples
group: templates
title: unit-visualize-template
keywords: unit-visualize-template
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-visualize-template.gif
---

# Unit Visualization Template

In order to use the unit visualization component more conveniently, we have made this template, which can easily create your own unit visualization works.
The core component of this template is the [unit visualization component](/vstory/demo/character/unit). We have created a work based on this template: [American Gun Death Unit Visualization](/vstory/demo/works-show/unit-gun-death), you can view the detailed introduction of the work.

You only need to prepare a spec, pass it into the `createUnitTemplate` function, and you can get a DSL of a work. The general production process is as follows:
1. First, you need to prepare a set of data and set it to the data field of the spec
2. Set the layout, title style, and unit default configuration for the spec
3. In the scenes array, define your story plot, each plot includes a title and a nodes array, each item in the array can filter data through `query`, and set the style of the corresponding points for the data, the nodes array supports nesting through the children field, and performs nested `query`

In this demo, we randomly generate a set of data from the planet Kambala, which includes 20,000 Kambala people, some are blue, some are red, some are big Kambala people, and some are small Kambala people. We hope to visualize these data through the unit visualization component.

## Code Demonstration

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

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0', width: 1920, height: 1080, scaleX: 'auto', scaleY: 'auto' });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);
window.vstory = story;

window['story'] = story;
window['vstory'] = story;
```
