---
category: examples
group: unit
title: unit-gun-death
keywords: unit-gun-death
order: 2-2
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/gun-death.png
---

# 单元可视化叙事示例

> 该示例来源于：https://fivethirtyeight.com/features/gun-deaths/

## 代码演示

```javascript livedemo template=vstory
const data = await fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/sorted-gun-death-data.json').then(
  res => res.json()
);
const unitSpec = {
  layout: {
    width: 1550,
    height: 800,
    viz: {
      padding: {
        top: 0
      }
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
    defaultStyle: {
      fill: '#222222'
    }
  },
  data: data.filter(record => record.year === 2014),
  scenes: [
    {
      title: [
        {
          text: 'More than '
        },
        {
          text: '33,000',
          fontWeight: 'bold'
        },
        {
          text: ' people are fatally shot in the U.S. each year. '
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
          text: 'Nearly two-third of gun deaths are '
        },
        {
          text: 'suicides',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
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
          text: 'More than 85 percent of suicide victims are '
        },
        {
          text: 'male',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#f4cfbb'
          },
          children: [
            {
              query: datum => datum.sex === 'M',
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
          text: '... and more than half of all suicides are '
        },
        {
          text: 'men age 45 older',
          fontWeight: 'bold'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#f4cfbb'
          },
          children: [
            {
              query: datum => datum.sex === 'M' && datum.age >= 45,
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
          text: 'Another third of all gun deaths — about 12,000 in total each year — are '
        },
        {
          text: 'homicides',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent !== 'Homicide',
          style: {
            fill: '#dedede'
          }
        },
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        }
      ]
    },
    {
      title: [
        {
          text: 'More than half of homicide victims are '
        },
        {
          text: 'young men',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
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
          text: '… two-thirds of whom are '
        },
        {
          text: 'black',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
              style: {
                fill: '#A6B3CC'
              },
              children: [
                {
                  query: datum => datum.race === 'Black',
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
          text: 'Women',
          fontWeight: 'bold'
        },
        {
          text: ' are far less likely to be gun homicide victims — about 1,700 of them are killed each year, many in '
        },
        {
          text: 'domestic violence',
          fontWeight: 'bold'
        },
        {
          text: ' incidents.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'F',
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
          text: 'The remaining gun deawths are '
        },
        {
          text: 'accidents',
          fontWeight: 'bold'
        },
        {
          text: 'or are classified as undetermined.',
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
          query: datum => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: datum => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    },
    {
      title: [
        {
          text: 'The common element in all these deaths is a gun. But the causes are very different, and that means the solutions must be, too.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#e3662e'
          }
        },
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        },
        {
          query: datum => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: datum => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    }
  ]
};
// 准备一个图表
const spec = VStory.generateSpec(unitSpec);
const vstory = new VStory.Story(spec, { dom: CONTAINER_ID, playerOption: { scaleX: 1, scaleY: 1 } });
vstory.canvas.getStage().defaultLayer.scale(0.5, 0.5);
vstory.play(false);
window.vstory = vstory;
```
