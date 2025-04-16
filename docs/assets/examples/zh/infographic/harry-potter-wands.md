---
category: examples
group: infographic
title: 信息图模板-哈利波特魔杖使用统计
keywords: infographic, bar, pie
order: 2-1
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/harry-potter-wand-preview.png
---

# 信息图模板: 哈利波特魔杖使用统计

## 代码演示

```javascript livedemo template=vstory
VStory.registerAll();
const width = 2086;
const height = 2800;
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: []
        }
      ]
    }
  ],
  characters: [
    {
      id: 'background',
      type: 'Rect', // 类型
      zIndex: 0, // 层级
      position: {
        // 元素的位置大小
        x: 0,
        y: 0,
        width,
        height
      },
      options: {
        graphic: {
          fill: 'rgb(236,235,229)'
        }
      }
    },
    {
      id: 'Methodology',
      type: 'Text',
      zIndex: 1,
      position: { x: width / 2, y: 120, width: 1800, height: 300 },
      options: {
        graphic: {
          fill: 'rgb(11,88,83)',
          fontSize: 34,
          align: 'center',
          textConfig: [
            {
              text: 'Methodology: ',
              fontWeight: 'bolder'
            },
            {
              text: 'We tracked every use of a wand in all seven UK editions of the Harry Potter books.\n'
            },
            {
              text: 'Additional wand usage in the films was not included. We only included magical uses, where it was explicitly clear that a wand was used by an identifiable person or group of people. We did not include wand usage in dreams, daydreams, visions, flashbacks or hallucinations or reported incidents of wand usage. When two named characters performed the same spell at the same time we counted it as two separate incidents. Spells performed without a wand are not counted.'
            }
          ]
        }
      }
    },
    {
      id: 'Methodology',
      type: 'Text',
      zIndex: 1,
      position: { x: width / 2, y: 120, width: 1800, height: 300 },
      options: {
        graphic: {
          fill: 'rgb(11,88,83)',
          fontSize: 30,
          align: 'center',
          textConfig: [
            {
              text: 'Methodology: ',
              fontWeight: 'bolder'
            },
            {
              text: 'We tracked every use of a wand in all seven UK editions of the Harry Potter books.\n'
            },
            {
              text: 'Additional wand usage in the films was not included. We only included magical uses, where it was explicitly clear that a wand was used by an identifiable person or group of people. We did not include wand usage in dreams, daydreams, visions, flashbacks or hallucinations or reported incidents of wand usage. When two named characters performed the same spell at the same time we counted it as two separate incidents. Spells performed without a wand are not counted.'
            }
          ]
        }
      }
    },
    {
      type: 'Text',
      id: `vernon-words`,
      zIndex: 1,
      position: {
        top: 500,
        left: 600,
        width: 1340,
        height: 240
      },
      options: {
        graphic: {
          fontSize: 54,
          fontWeight: 100,
          fill: 'white',
          fontFamily: 'Times New Roman',
          scaleY: 0.9,
          dx: 30,
          dy: 40,
          textAlign: 'left', // 水平对齐方式，可选值：left, center, right
          textConfig: [
            {
              text: `He's going to Stonewall High and he'll be grateful for it.\n`
            },
            {
              text: `I've read those letters and he needs all sorts of rubbish\n`
            },
            {
              text: `– spell books and `
            },
            {
              text: `wands`,
              textDecoration: 'underline'
            },
            {
              text: ` and ...`
            }
          ]
        },
        panel: {
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 30,
          shadowOffsetX: -10,
          fill: 'rgb(160,18,92)',
          stroke: 'rgb(133,18,73)',
          lineWidth: 10
        }
      }
    },
    {
      type: 'Image',
      id: 'Vernon',
      zIndex: 2,
      position: {
        top: 390,
        left: 100,
        width: 600,
        height: 550
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/vernon.png`
        }
      }
    },
    {
      type: 'Text',
      id: `FirstMention`,
      zIndex: 2,
      position: {
        top: 770,
        left: 600,
        width: 1000,
        height: 100
      },
      options: {
        panel: {
          fill: 'white',
          cornerRadius: 80,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        },
        graphic: {
          fontSize: 36,
          textAlign: 'left', // 水平对齐方式，可选值：left, center, right
          fill: `rgb(32,146,126)`,
          dx: 60,
          dy: 10,
          fontWeight: 400,
          backgroundImg: true,
          textConfig: [
            {
              text: `First mention of a wand: `,
              fill: `rgb(160,18,92)`,
              fontWeight: 600
            },
            {
              text: `By Uncle Vernon,\n`
            },
            {
              text: `chapter four, `
            },
            {
              text: `Harry Potter and the Philosophers Stone`,
              fontStyle: 'italic'
            }
          ]
        }
      }
    },
    {
      type: 'Rect',
      id: 'Ollivanders-background',
      zIndex: 1,
      position: {
        top: 1080,
        left: 150,
        width: 1800,
        height: 640
      },
      options: {
        graphic: {
          fill: 'white',
          cornerRadius: 400,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      }
    },
    {
      type: 'Image',
      id: 'Ollivanders',
      zIndex: 1,
      position: {
        top: 1100,
        left: 160,
        width: 600,
        height: 600
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/Olliivanders.png`
        }
      }
    },
    {
      type: 'Image',
      id: 'Wand-9',
      zIndex: 1,
      position: {
        top: 1100,
        left: 740,
        width: 300,
        height: 400
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/wand-9.png`
        }
      }
    },
    {
      type: 'Image',
      id: 'Wand-7',
      zIndex: 1,
      position: {
        top: 1100,
        left: 1000,
        width: 300,
        height: 400
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/wand-7.png`
        }
      }
    },
    {
      type: 'Image',
      id: 'Wand-8.5',
      zIndex: 1,
      position: {
        top: 1100,
        left: 1260,
        width: 300,
        height: 400
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/wand-8.5.png`
        }
      }
    },
    {
      type: 'Image',
      id: 'Wand-Harry',
      zIndex: 2,
      position: {
        top: 960,
        left: 1520,
        width: 480,
        height: 760
      },
      options: {
        graphic: {
          image: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/harry-wand.png`
        }
      }
    },
    {
      type: 'Text',
      id: `9InchText`,
      zIndex: 1,
      position: {
        top: 1500,
        left: 720,
        width: 210,
        height: 210
      },
      options: {
        graphic: {
          fontSize: 32,
          textAlign: 'left', // 水平对齐方式，可选值：left, center, right
          fill: `#0F645F`,
          dx: 60,
          dy: 10,
          fontWeight: 600,
          backgroundImg: true,
          wordBreak: 'break-word',
          textConfig: [
            {
              text: `Beechwood and dragon heartstring, nice and flexible.`
            }
          ]
        }
      }
    },
    {
      type: 'Text',
      id: `7InchText`,
      zIndex: 1,
      position: {
        top: 1500,
        left: 1020,
        width: 200,
        height: 210
      },
      options: {
        graphic: {
          fontSize: 32,
          textAlign: 'left', // 水平对齐方式，可选值：left, center, right
          fill: `#0F645F`,
          dx: 60,
          dy: 10,
          fontWeight: 600,
          backgroundImg: true,
          wordBreak: 'break-word',
          textConfig: [
            {
              text: `Maple and phoenix feather, quite whippy.`
            }
          ]
        }
      }
    },
    {
      type: 'Text',
      id: `8halfInchText`,
      zIndex: 1,
      position: {
        top: 1500,
        left: 1280,
        width: 140,
        height: 210
      },
      options: {
        graphic: {
          fontSize: 32,
          textAlign: 'left', // 水平对齐方式，可选值：left, center, right
          fill: `#0F645F`,
          dx: 60,
          dy: 10,
          fontWeight: 600,
          backgroundImg: true,
          wordBreak: 'break-word',
          textConfig: [
            {
              text: `Ebony and unicorn hair, springy.`
            }
          ]
        }
      }
    },
    {
      id: 'barChart',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 100,
        y: 1800,
        width: 1800,
        height: 800
      },
      options: {
        spec: {
          type: 'bar',
          data: [
            {
              id: 'barData',
              values: [
                {
                  name: `Harry Potter and the Philosopher's Stone`,
                  value: 17
                },
                {
                  name: `Harry Potter and the Chamber of Secrets`,
                  value: 37
                },
                {
                  name: `Harry Potter and the Prisoner of Azkaban`,
                  value: 57
                },
                {
                  name: `Harry Potter and the Goblet of Fire`,
                  value: 125
                },
                {
                  name: `Harry Potter and the Order of the Phoenix`,
                  value: 158
                },
                {
                  name: `Harry Potter and the Half-Blood Prince`,
                  value: 122
                },
                {
                  name: `Harry Potter and the Deathly Hallows`,
                  value: 247
                }
              ]
            }
          ],
          padding: { right: 50, bottom: 20 },
          direction: 'horizontal',
          xField: 'value',
          yField: 'name',
          color: ['#028579'],
          axes: [
            {
              orient: 'bottom',
              visible: false,
              innerOffset: { right: 300 }
            },
            {
              orient: 'left',
              maxWidth: 300,
              paddingInner: 0.45,
              grid: {
                visible: true,
                alignWithLabel: false,
                style: {
                  lineWidth: 2,
                  lineDash: [4, 4]
                }
              },
              domainLine: {
                style: {
                  stroke: 'rgb(138,16,78)',
                  lineWidth: 4
                }
              },
              tick: { visible: false },
              label: {
                autoWrap: true,
                style: {
                  fontSize: 26,
                  wordBreak: 'break-word',
                  fontStyle: 'italic',
                  fill: '#0F645F',
                  fontWeight: 'bold'
                }
              }
            }
          ],
          bar: {
            style: {
              dx: 16
            }
          },
          extensionMark: [
            {
              type: 'symbol',
              dataId: 'barData',
              style: {
                symbolType:
                  'm.4387.0902c0-.001 0-.0019.001-.0029l.0134-.0144.0269-.0298-.023-.0336-.0086-.0125c0-.001 0-.0019 0-.0029l.0106-.0173.0202-.0346-.0298-.0269-.0115-.0106c0-.001 0-.0019-.001-.0029l.0067-.0192.0125-.0384-.0346-.0211-.0134-.0077c0-.001-.001-.0019-.001-.0029l.0019-.0202.0038-.0394-.0384-.0134-.0144-.0048c-.001-.001-.001-.0019-.0019-.0019l-.0019-.0202-.0029-.0394-.0403-.0048-.0154-.0019c-.001-.001-.001-.001-.0019-.0019l-.0067-.0192-.0125-.0384-.0403.0038-.0154.001c-.001 0-.0019-.001-.0029-.001l-.0096-.0173-.0192-.0355-.0384.0115-.0144.0048c-.001 0-.0019-.001-.0029-.001l-.0134-.0154-.0269-.0298-.0355.0192-.0134.0077c-.001 0-.0019 0-.0029 0l-.0163-.0115-.0326-.024-.0307.0259-.0115.0106c-.001 0-.0019 0-.0029 0l-.0182-.0077-.0289-.0163-.024.0317-.0096.0125c-.001 0-.0019.001-.0029.001l-.0192-.0048-.0394-.0086-.0173.0365-.0067.0144c-.001.001-.0019.001-.0029.001l-.0202 0-.0403 0-.0086.0394-.0038.0154c-.001.001-.001.001-.0019.0019l-.0202.0038-.0394.0086-.001.0403 0 .0154c0 0 0 .001-.001.001l-.0182.0086-.0365.0163.0077.0394.0029.0154c0 .001-.001.0019-.001.0029l-.0163.0115-.0336.023.0154.0365.0058.0144c0 .001 0 .0019-.001.0029l-.0134.0144-.0259.0298.023.0336.0086.0125c0 .001 0 .0019 0 .0029l-.0106.0173-.0192.0346.0298.0269.0115.0106c0 .001 0 .0019.001.0029l-.0067.0192-.0125.0384.0346.0211.0134.0077c0 .001.001.0019.001.0029l-.0019.0202-.0038.0394.0384.0134.0144.0048c.001.001.001.0019.0019.0019l.0019.0202.0038.0394.0403.0048.0154.0019c.001.001.001.001.0019.0019l.0067.0192.0125.0384.0403-.0038.0154-.001c.001 0 .0019.001.0029.001l.0096.0173.0202.0346.0384-.0115.0144-.0048c.001 0 .0019.001.0029.001l.0134.0144.0269.0298.0355-.0192.0134-.0077c.001 0 .0019 0 .0029 0l.0163.0115.0326.024.0307-.0259.0115-.0106c.001 0 .0019 0 .0029 0l.0182.0086.0365.0163.024-.0317.0096-.0125c.001 0 .0019-.001.0029-.001l.0202.0038.0394.0086.0173-.0365.0067-.0144c.001-.001.0019-.001.0029-.001l.0202 0 .0403 0 .0086-.0394.0038-.0154c.001-.001.001-.001.0019-.0019l.0202-.0038.0394-.0086.001-.0403 0-.0154c.001-.001.001-.001.0019-.0019l.0134-.0058.0365-.0163-.0077-.0394-.0029-.0154c0-.001.001-.0019.001-.0029l.0163-.0115.0326-.023-.0154-.0365-.0058-.0144z',
                fill: 'white',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 6,
                x: (datum, ctx) => {
                  const offset = datum.value > 200 ? 256 : 240;
                  return ctx.valueToX([datum.value]) + offset + (datum.value > 100 ? 10 : 0);
                },
                y: (datum, ctx) => {
                  return ctx.valueToY([datum.name]) + ctx.yBandwidth() / 2 + 4;
                },
                size: (datum, ctx) => {
                  const largest = datum.value > 200;
                  return largest ? 140 : 90;
                }
              }
            },
            {
              type: 'image',
              dataId: 'barData',
              style: {
                image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/HarryPotter/wand-symbol.png',
                height: (datum, ctx) => {
                  return ctx.yBandwidth() * 1.6;
                },
                scaleX: 0.9,
                fill: 'white',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 6,
                x: (datum, ctx) => {
                  return ctx.valueToX([datum.value]) + 12;
                },
                y: (datum, ctx) => {
                  return ctx.valueToY([datum.name]) - 10;
                }
              }
            }
          ],
          label: {
            visible: true,
            offset: 210,
            style: {
              fontSize: datum => {
                return datum.value > 200 ? 48 : 34;
              },
              dy: 4,
              fill: 'rgb(137,15,77)',
              fontWeight: 'bold',
              textAlign: 'center'
            }
          }
        }
      }
    },
    {
      id: 'pieChart',
      type: 'VChart',
      zIndex: 1,
      position: {
        x: 1400,
        y: 1750,
        width: 500,
        height: 500
      },
      options: {
        spec: {
          type: 'pie',
          data: [
            {
              id: 'pieData',
              values: [{ type: 'Wand usage', value: 763 }]
            }
          ],
          pie: {
            style: {
              stroke: 'rgb(157,23,90)',
              lineWidth: 14
            }
          },
          color: ['rgb(134,19,76)'],
          outerRadius: 0.8,
          valueField: 'value',
          categoryField: 'type',
          indicator: {
            visible: true,
            trigger: 'hover',
            title: {
              visible: true,
              autoFit: false,
              style: {
                dy: 0,
                fontFamily: 'Times New Roman',
                fill: 'rgb(138,16,78)',
                text: 'Wand usage',
                background: 'white',
                boundsPadding: [4, 20, 4, 20],
                backgroundCornerRadius: 20
              }
            },
            content: [
              {
                visible: true,
                style: {
                  fill: 'white',
                  fontFamily: 'Times New Roman',
                  fontSize: 160,
                  text: 763,
                  dy: 20
                }
              },
              {
                visible: true,
                fitStrategy: 'inscribed',
                style: {
                  dy: 50,
                  fill: 'white',
                  fontSize: 18,
                  fontWeight: 'bolder',
                  text: 'instances of wand'
                }
              },
              {
                visible: true,
                fitStrategy: 'inscribed',
                style: {
                  dy: 50,
                  fill: 'white',
                  fontSize: 18,
                  fontWeight: 'bolder',
                  text: 'use overall'
                }
              }
            ]
          },
          extensionMark: [
            {
              type: 'symbol',
              dataId: 'pieData',
              zIndex: -1,
              style: {
                symbolType:
                  'm.4387.0902c0-.001 0-.0019.001-.0029l.0134-.0144.0269-.0298-.023-.0336-.0086-.0125c0-.001 0-.0019 0-.0029l.0106-.0173.0202-.0346-.0298-.0269-.0115-.0106c0-.001 0-.0019-.001-.0029l.0067-.0192.0125-.0384-.0346-.0211-.0134-.0077c0-.001-.001-.0019-.001-.0029l.0019-.0202.0038-.0394-.0384-.0134-.0144-.0048c-.001-.001-.001-.0019-.0019-.0019l-.0019-.0202-.0029-.0394-.0403-.0048-.0154-.0019c-.001-.001-.001-.001-.0019-.0019l-.0067-.0192-.0125-.0384-.0403.0038-.0154.001c-.001 0-.0019-.001-.0029-.001l-.0096-.0173-.0192-.0355-.0384.0115-.0144.0048c-.001 0-.0019-.001-.0029-.001l-.0134-.0154-.0269-.0298-.0355.0192-.0134.0077c-.001 0-.0019 0-.0029 0l-.0163-.0115-.0326-.024-.0307.0259-.0115.0106c-.001 0-.0019 0-.0029 0l-.0182-.0077-.0289-.0163-.024.0317-.0096.0125c-.001 0-.0019.001-.0029.001l-.0192-.0048-.0394-.0086-.0173.0365-.0067.0144c-.001.001-.0019.001-.0029.001l-.0202 0-.0403 0-.0086.0394-.0038.0154c-.001.001-.001.001-.0019.0019l-.0202.0038-.0394.0086-.001.0403 0 .0154c0 0 0 .001-.001.001l-.0182.0086-.0365.0163.0077.0394.0029.0154c0 .001-.001.0019-.001.0029l-.0163.0115-.0336.023.0154.0365.0058.0144c0 .001 0 .0019-.001.0029l-.0134.0144-.0259.0298.023.0336.0086.0125c0 .001 0 .0019 0 .0029l-.0106.0173-.0192.0346.0298.0269.0115.0106c0 .001 0 .0019.001.0029l-.0067.0192-.0125.0384.0346.0211.0134.0077c0 .001.001.0019.001.0029l-.0019.0202-.0038.0394.0384.0134.0144.0048c.001.001.001.0019.0019.0019l.0019.0202.0038.0394.0403.0048.0154.0019c.001.001.001.001.0019.0019l.0067.0192.0125.0384.0403-.0038.0154-.001c.001 0 .0019.001.0029.001l.0096.0173.0202.0346.0384-.0115.0144-.0048c.001 0 .0019.001.0029.001l.0134.0144.0269.0298.0355-.0192.0134-.0077c.001 0 .0019 0 .0029 0l.0163.0115.0326.024.0307-.0259.0115-.0106c.001 0 .0019 0 .0029 0l.0182.0086.0365.0163.024-.0317.0096-.0125c.001 0 .0019-.001.0029-.001l.0202.0038.0394.0086.0173-.0365.0067-.0144c.001-.001.0019-.001.0029-.001l.0202 0 .0403 0 .0086-.0394.0038-.0154c.001-.001.001-.001.0019-.0019l.0202-.0038.0394-.0086.001-.0403 0-.0154c.001-.001.001-.001.0019-.0019l.0134-.0058.0365-.0163-.0077-.0394-.0029-.0154c0-.001.001-.0019.001-.0029l.0163-.0115.0326-.023-.0154-.0365-.0058-.0144z',
                fill: 'white',
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
                x: (datum, ctx) => {
                  return ctx.getRegion().getLayoutRect().width / 2;
                },
                y: (datum, ctx) => {
                  return ctx.getRegion().getLayoutRect().height / 2;
                },
                size: (datum, ctx) => {
                  return 450;
                }
              }
            }
          ]
        }
      }
    },
    // vertical split lines
    {
      id: 'lineH0',
      type: 'Line',
      zIndex: 2,
      position: {
        x: 760,
        y: 1080,
        width: 4,
        height: 640
      },
      options: {
        graphic: {
          stroke: 'rgb(2,133,121)',
          strokeOpacity: 0.5,
          lineDash: [10, 10],
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 640
            }
          ]
        }
      }
    },
    {
      id: 'lineH1',
      type: 'Line',
      zIndex: 2,
      position: {
        x: 1040,
        y: 1080,
        width: 4,
        height: 640
      },
      options: {
        graphic: {
          stroke: 'rgb(2,133,121)',
          strokeOpacity: 0.5,
          lineDash: [10, 10],
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 640
            }
          ]
        }
      }
    },
    {
      id: 'lineH2',
      type: 'Line',
      zIndex: 2,
      position: {
        x: 1280,
        y: 1080,
        width: 4,
        height: 640
      },
      options: {
        graphic: {
          stroke: 'rgb(2,133,121)',
          strokeOpacity: 0.5,
          lineDash: [10, 10],
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 640
            }
          ]
        }
      }
    },
    {
      id: 'lineH3',
      type: 'Line',
      zIndex: 2,
      position: {
        x: 1530,
        y: 1080,
        width: 4,
        height: 640
      },
      options: {
        graphic: {
          stroke: 'rgb(2,133,121)',
          strokeOpacity: 0.5,
          lineDash: [10, 10],
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 640
            }
          ]
        }
      }
    },
    // horizontal split lines
    {
      id: 'line0',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 100,
        y: 80,
        width: 1900,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'grey',
          strokeOpacity: 0.5,
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 1900,
              y: 0
            }
          ]
        }
      }
    },
    {
      id: 'line1',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 100,
        y: 380,
        width: 1900,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'grey',
          strokeOpacity: 0.5,
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 1900,
              y: 0
            }
          ]
        }
      }
    },
    {
      id: 'line2',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 100,
        y: 900,
        width: 1900,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'grey',
          strokeOpacity: 0.5,
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 1900,
              y: 0
            }
          ]
        }
      }
    },
    {
      id: 'line3',
      type: 'Line',
      zIndex: 0,
      position: {
        x: 100,
        y: 1760,
        width: 1900,
        height: 4
      },
      options: {
        graphic: {
          stroke: 'grey',
          strokeOpacity: 0.5,
          lineWidth: 6,
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 1900,
              y: 0
            }
          ]
        }
      }
    },
    // footer
    {
      type: 'Text',
      id: 'Footer',
      zIndex: 1,
      position: { x: width / 2, y: height - 100, width, height: 100 },
      options: {
        graphic: {
          text: [`Inspired by PotterMore`, 'Made by @VisActor/VStory'],
          lineHeight: 30,
          fontSize: 20,
          fill: 'white',
          textAlign: 'center',
          dy: 20
        },
        panel: {
          x: 0,
          y: 0,
          width,
          height: 100,
          fill: 'rgba(0,0,0,1)'
        }
      }
    }
  ]
};

dsl.characters.sort((a, b) => {
  const aTop = a.position.y ?? a.position.top ?? 0;
  const bTop = b.position.y ?? b.position.top ?? 0;
  return aTop - bTop;
});

dsl.characters.forEach((character, index) => {
  if (character.type === 'VChart') {
    dsl.acts[0].scenes[0].actions.push({
      characterId: [character.id],
      characterActions: [
        {
          action: 'appear',
          startTime: 100 + index * 100, // 开始动画的时间,
          payload: {
            animation: {
              duration: 1000, // 动画持续时间
              effect: 'grow'
            }
          }
        }
      ]
    });
  } else {
    dsl.acts[0].scenes[0].actions.push({
      characterId: [character.id],
      characterActions: [
        {
          action: 'appear',
          startTime: 100 + index * 100, // 开始动画的时间,
          payload: {
            animation: {
              duration: 1000, // 动画持续时间
              effect: character.type === 'Text' ? 'wipeIn' : 'fadeIn'
            }
          }
        }
      ]
    });
  }
});

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  width,
  height,
  scaleX: 'auto',
  scaleY: 'auto'
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
