---
category: examples
group: works-show
title: unit-gun-death
keywords: unit-gun-death
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-gun-death.gif
---

# `Unit Visualization of Gun Deaths in the United States` Project Showcase

This project is a unit visualization about gun deaths in the United States, aiming to raise public awareness of this serious issue. In this visualization, each dot represents an American who lost their life due to gun violence. Over time, these dots are presented dynamically, showing the impact of gun violence on different genders, races, and age groups. The work uses various colors to distinguish these different groups, allowing the audience to intuitively feel the complexity and diversity of gun death incidents. Through smooth animation effects, this narrative process not only enhances the visual experience but also allows the audience to resonate emotionally with these tragic events, thereby understanding the social problems caused by gun violence more deeply.

The core component of this work is the [unit visualization component](/vstory/examples/character/unit). And it is implemented based on the [unit visualization template]().

## Code Demonstration

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
