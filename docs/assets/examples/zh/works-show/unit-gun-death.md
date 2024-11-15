---
category: examples
group: works-show
title: unit-gun-death
keywords: unit-gun-death
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-gun-death.gif
---

# `美国枪支死亡单元可视化` 作品展示

该作品是一个关于美国枪支死亡的单元可视化项目，旨在引发公众对这一严峻问题的关注。在这个可视化中，每一个点都代表着一个因枪支暴力而失去生命的美国人。随着时间的推移，这些点通过动态的方式呈现，展现出不同性别、种族和年龄段的人群所遭受的枪支暴力的影响。作品使用了多种颜色来区分这些不同的群体，使得观众能够直观地感受到枪支死亡事件的复杂性和多样性。通过流畅的动画效果，这个叙事过程不仅增强了视觉体验，也使得观众得以在情感上与这些悲剧性事件产生共鸣，从而更深刻地理解枪支暴力带来的社会问题。

该作品的核心组件是[单元可视化组件](/vstory/examples/character/unit)。并基于[单元可视化模板]()实现

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const compressedData = await VStory.loadExampleData();
const data = VStory.decompressData(compressedData);
const spec = {
  layout: {
    width: 1550,
    height: 800,
    viz: {
      padding: {
        top: 0
      },
      background: 'white'
    },
    title: {
      style: {
        fontSize: 36
      },
      height: 150
    }
  },
  unit: {
    gap: [0.2, 0.2],
    countPerSymbol: 1,
    defaultStyle: {
      fill: '#222222'
    }
  },
  data: data.filter(record => record.year === 2014),
  scenes: [
    {
      title: [
        {
          text: '美国每年有超过'
        },
        {
          text: ' 33,000 ',
          fontWeight: 'bold'
        },
        {
          text: '个人被枪杀'
        }
      ],
      nodes: [
        {
          style: {
            fill: '#dedede'
          }
        }
      ]
    },
    {
      title: [
        {
          text: '近三分之二的枪支死亡事件为 '
        },
        {
          text: '自杀',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Suicide',
          style: {
            fill: '#e3662e'
          }
        }
      ]
    },
    {
      sceneDuration: 3000,
      animationDuration: 500,
      title: [
        {
          text: '超过85%的自杀受害者是 '
        },
        {
          text: '男性',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Suicide',
          style: {
            fill: '#f4cfbb'
          },
          children: [
            {
              query: (datum) => datum.sex === 'M',
              style: {
                fill: '#e3662e'
              }
            }
          ]
        }
      ]
    },
    {
      sceneDuration: 3000,
      animationDuration: 500,
      title: [
        {
          text: '... 超过一半的自杀者是 '
        },
        {
          text: '45岁以上的男性',
          fontWeight: 'bold'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Suicide',
          style: {
            fill: '#f4cfbb'
          },
          children: [
            {
              query: (datum) => datum.sex === 'M' && datum.age >= 45,
              style: {
                fill: '#e3662e'
              }
            }
          ]
        }
      ]
    },
    {
      title: [
        {
          text: '另外三分之一的枪支死亡——每年约12000人 —— 是 '
        },
        {
          text: '凶杀案',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent !== 'Homicide',
          style: {
            fill: '#dedede'
          }
        },
        {
          query: (datum) => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        }
      ]
    },
    {
      title: [
        {
          text: '超过一半的凶杀案受害者是 '
        },
        {
          text: '年轻男性',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: (datum) => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
              style: {
                fill: '#5D76A3'
              }
            }
          ]
        }
      ]
    },
    {
      title: [
        {
          text: '… 其中三分之二是 '
        },
        {
          text: '黑人',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: (datum) => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
              style: {
                fill: '#A6B3CC'
              },
              children: [
                {
                  query: (datum) => datum.race === 'Black',
                  style: {
                    fill: '#5D76A3'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: [
        {
          text: '女性',
          fontWeight: 'bold'
        },
        {
          text: ' 成为枪支凶杀案受害者的可能性要小得多，每年约有1700人被杀，其中许多人死于严重的 '
        },
        {
          text: '家庭暴力',
          fontWeight: 'bold'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: (datum) => datum.sex === 'F',
              style: {
                fill: '#5D76A3'
              }
            }
          ]
        }
      ]
    },
    {
      title: [
        {
          text: '其余的枪支死亡是 '
        },
        {
          text: '意外',
          fontWeight: 'bold'
        },
        {
          text: '或被归类为未确定。',
          fontWeight: 'bold'
        }
      ],
      nodes: [
        {
          style: {
            fill: '#dedede'
          }
        },
        {
          query: (datum) => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: (datum) => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    },
    {
      title: [
        {
          text: '所有这些死亡事件的共同点是枪支。但原因非常不同，这意味着解决方案也会有所不同。\n'
        },
        {
          text: '—— 数据来源美国枪支死亡统计\n',
          fontSize: 20,
          fill: 'grey',
          textAlign: 'right'
        }
      ],
      nodes: [
        {
          query: (datum) => datum.intent === 'Suicide',
          style: {
            fill: '#e3662e'
          }
        },
        {
          query: (datum) => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        },
        {
          query: (datum) => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: (datum) => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    }
  ]
};
const dsl = VStory.createUnitTemplate(spec);
console.log(dsl);


const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0', scaleX: 0.5, scaleY: 0.5 });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);
window.vstory = story;
```
