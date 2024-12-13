---
category: examples
group: infographic
title: Venn Chart Infographic
keywords: templates, visualization, venn, percentage, left-right
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/venn-chart.png
---

# 信息图模板-韦恩图

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: ['bg', '0', '2', 'topLeftText', 'rect', 'line', 'logo', 'rectVS', 'vs', 'youtube'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000
                    }
                  }
                }
              ]
            },
            {
              characterId: ['1'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000,
                      effect: 'grow'
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  characters: [
    {
      id: 'bg',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 644,
        height: 720
      },
      options: {
        graphic: {
          fill: 'white'
        }
      }
    },
    {
      id: '0',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 0,
        y: 60,
        width: 644,
        height: 660
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/zhmzh_00006_.png'
        }
      }
    },

    {
      id: 'rect',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 644,
        y: 0,
        width: 636,
        height: 720
      },
      options: {
        graphic: {
          fill: 'rgb(252,200,4)'
        }
      }
    },
    {
      id: 'logo',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 1100,
        y: 60,
        width: 80,
        height: 40
      },
      options: {
        graphic: {
          image: `<svg t="1733222500967" class="icon" viewBox="0 0 1604 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10360" width="200" height="200"><path d="M905.123646 758.992713a252.997571 252.997571 0 1 1 252.997571-252.997571 252.997571 252.997571 0 0 1-252.997571 252.997571z m0-59.514478a193.467833 193.467833 0 1 0-193.467833-193.483093 193.452573 193.452573 0 0 0 193.467833 193.467833z m0 0" p-id="10361"></path><path d="M458.658242 744.114093a252.997571 252.997571 0 1 1 252.997571-252.997571 252.997571 252.997571 0 0 1-252.997571 252.997571z m0-59.514477a193.467833 193.467833 0 1 0-193.467833-193.483094 193.452573 193.452573 0 0 0 193.467833 193.467833zM1351.58905 744.114093a252.997571 252.997571 0 1 1 253.012831-252.997571 252.997571 252.997571 0 0 1-253.012831 252.997571z m0-59.514477a193.467833 193.467833 0 1 0-193.467833-193.483094A193.452573 193.452573 0 0 0 1351.58905 684.584355z" p-id="10362"></path><path d="M443.779622 684.584355H59.514478V29.757239Q59.514478 0 29.757239 0T0 29.757239v684.584355q0 29.772499 29.757239 29.772499h414.022383q29.757239 0 29.757239-29.772499t-29.757239-29.757239zM1128.363978 423.666781q-29.772499 0-29.772499 29.757239v318.066733a193.467833 193.467833 0 0 1-386.935666-0.488324h-0.259422c-4.684858-37.723023-55.806268-33.877472-59.087195 0h-0.183121v2.151677a3.219886 3.219886 0 0 1 0 0.381503v0.335723a252.982311 252.982311 0 0 0 505.79676 5.646245c0.091561-1.29711 0.152601-2.624741 0.152601-4.013412V453.42402q0.04578-29.757239-29.711458-29.757239z" p-id="10363"></path></svg>`
        }
      }
    },
    {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 500,
        y: 90,
        width: 700,
        height: 600
      },
      options: {
        spec: {
          padding: 0,
          type: 'venn',
          data: {
            values: [
              {
                sets: ['A'],
                value: 10,
                title: 'Youtube',
                text: 'Long-form and short-form Popular among 22-44 years olds',
                image: `<svg t="1733219544079" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6717" width="200" height="200"><path d="M236.032 222.165333c118.250667-5.888 210.218667-8.832 275.925333-8.832s157.717333 2.944 276.032 8.853334a128 128 0 0 1 121.173334 117.162666c5.418667 64.725333 8.128 121.728 8.128 171.029334 0 49.898667-2.773333 107.690667-8.32 173.397333a128 128 0 0 1-119.189334 116.970667c-101.141333 6.613333-193.749333 9.92-277.824 9.92-84.053333 0-176.64-3.306667-277.717333-9.92a128 128 0 0 1-119.189333-116.906667c-5.610667-66.197333-8.426667-124.032-8.426667-173.461333 0-48.853333 2.752-105.877333 8.213333-171.093334a128 128 0 0 1 121.173334-117.12z" fill="#FFFFFF" p-id="6718"></path><path d="M448 418.346667v187.648a18.282667 18.282667 0 0 0 28.373333 15.253333l140.736-93.013333a18.282667 18.282667 0 0 0 0.128-30.442667l-140.757333-94.634667a18.282667 18.282667 0 0 0-28.48 15.168z" fill="#000000" p-id="6719"></path></svg>`,
                width: 60,
                height: 60
              },
              {
                sets: ['B'],
                value: 10,
                title: 'Instagram',
                width: 40,
                height: 40,
                text: 'Short-form Images, Reels Popular among 18-34 years olds',
                image: `<svg t="1733219715256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6539" width="200" height="200"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FAB915" p-id="6540"></path><path d="M512 193.536c-86.528 0-97.28 0.256-131.328 2.048-33.792 1.536-57.088 6.912-77.312 14.848-20.992 8.192-38.656 18.944-56.32 36.864-17.664 17.664-28.672 35.584-36.864 56.32-7.936 20.224-13.312 43.52-14.848 77.312-1.536 34.048-1.792 44.8-1.792 131.328s0.512 97.28 2.048 131.328c1.536 33.792 6.912 57.088 14.848 77.312 8.192 20.992 18.944 38.656 36.864 56.32 17.664 17.664 35.584 28.672 56.32 36.864 20.224 7.936 43.52 13.312 77.312 14.848 34.048 1.536 44.8 2.048 131.328 2.048s97.28-0.256 131.328-2.048c33.792-1.536 57.088-6.912 77.312-14.848a153.344 153.344 0 0 0 56.32-36.864c17.664-17.664 28.672-35.584 36.864-56.32 7.936-20.224 13.312-43.52 14.848-77.312 1.536-34.048 2.048-44.8 2.048-131.328s-0.512-97.28-2.048-131.328c-1.536-33.792-6.912-57.088-14.848-77.312a153.344 153.344 0 0 0-36.864-56.32 156.672 156.672 0 0 0-56.32-36.864c-20.224-7.936-43.52-13.312-77.312-14.848-34.048-1.536-44.8-2.048-131.328-2.048zM483.328 250.88H512c84.992 0 95.232 0.256 128.768 1.792 30.976 1.536 47.872 6.656 59.136 11.008 14.848 5.888 25.344 12.8 36.608 23.808 11.264 11.264 18.176 21.76 23.808 36.608 4.352 11.264 9.472 28.16 11.008 59.136 1.536 33.536 1.792 43.776 1.792 128.768s-0.256 95.232-1.792 128.768c-1.536 30.976-6.656 47.872-11.008 59.136-5.888 14.848-12.8 25.344-23.808 36.608-11.264 11.264-21.76 18.176-36.608 23.808-11.264 4.352-28.16 9.472-59.136 11.008-33.536 1.536-43.776 1.792-128.768 1.792s-95.232-0.256-128.768-1.792c-30.976-1.536-47.872-6.656-59.136-11.008-14.848-5.888-25.6-12.8-36.608-23.808-11.264-11.264-18.176-21.76-23.808-36.608-4.352-11.264-9.472-28.16-11.008-59.136-1.536-33.536-1.792-43.776-1.792-128.768s0.256-95.232 1.792-128.768c1.536-30.976 6.656-47.872 11.008-59.136 5.888-14.848 12.8-25.6 23.808-36.608 11.264-11.264 21.76-18.176 36.608-23.808 11.264-4.352 28.16-9.472 59.136-11.008 29.44-1.28 40.704-1.792 100.096-1.792z m198.656 52.992c-20.992 0-38.144 17.152-38.144 38.144s17.152 38.144 38.144 38.144 38.144-17.152 38.144-38.144-17.152-38.144-38.144-38.144zM512 348.416c-90.368 0-163.584 73.216-163.584 163.584s73.216 163.584 163.584 163.584 163.584-73.216 163.584-163.584-73.216-163.584-163.584-163.584z m0 57.344c58.624 0 106.24 47.616 106.24 106.24s-47.616 106.24-106.24 106.24-106.24-47.616-106.24-106.24 47.616-106.24 106.24-106.24z" fill="#00000 " p-id="6541"></path></svg>`
              },
              { sets: ['A', 'B'], value: 4, title: 'Both', text: 'Videos Slideshows Content engagement' }
            ]
          },
          color: ['rgba(0,0,0,1)', 'rgba(255,255,255,0.8)'],
          background: 'yellow',
          circle: {
            style: {
              opacity: 1
            }
          },
          overlap: {
            zIndex: 100
          },
          label: {
            formatMethod: (text, datum) => {
              return {
                type: 'rich',
                text: [
                  {
                    image: datum.image,
                    width: datum.width,
                    height: datum.height,
                    textAlign: 'center',
                    lineHeight: 60
                  },
                  {
                    text: `\n${datum.title}\n`,
                    textAlign: 'center',
                    fontWeight: '800',
                    fontSize: 20,
                    lineHeight: 40
                  },
                  { text: `${datum.text}`, textAlign: 'center', fontSize: 16, lineHeight: 24 }
                ]
              };
            },
            style: {
              fill: datum => (datum.sets.includes('A') ? 'white' : 'black'),
              stroke: false,
              maxLineWidth: 140,
              wordBreak: 'break-word',
              scaleY: 0.95,
              dy: datum => (60 - datum.height) / 2
            }
          },
          overlapLabel: {
            zIndex: 101,
            smartInvert: false,
            formatMethod: (text, datum) => {
              return {
                type: 'rich',
                text: [
                  {
                    text: `\n${datum.title}\n`,
                    textAlign: 'center',
                    fontWeight: '800',
                    fontSize: 20,
                    lineHeight: 40
                  },
                  { text: `${datum.text}`, textAlign: 'center', fontSize: 18, lineHeight: 26 }
                ]
              };
            },
            style: {
              fill: 'black',
              stroke: false,
              maxLineWidth: 120,
              wordBreak: 'break-word',
              scaleY: 0.95,
              dy: 30
            }
          },
          categoryField: 'sets',
          valueField: 'value',
          seriesField: 'sets'
        }
      }
    },
    {
      id: 'line',
      type: 'Line',
      zIndex: 0,
      position: {
        x: 80,
        y: 96,
        width: 1010,
        height: 10
      },
      options: {
        graphic: {
          stroke: 'black',
          lineWidth: 2,
          points: [
            { x: 0, y: 0 },
            { x: 1010, y: 0 }
          ]
        }
      }
    },
    {
      id: 'topLeftText',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 140,
        y: 74,
        width: 1010,
        height: 20
      },
      options: {
        graphic: {
          text: 'Venn via VChart',
          fontSize: 16,
          fill: 'black',
          scaleY: 0.85,
          fontWeight: 300
        }
      }
    },
    {
      id: '2',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 78,
        y: 320,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          text: 'INSTAGRAM',
          textAlign: 'left',
          fontSize: 60,
          fontWeight: '800',
          textBaseline: 'top',
          scaleY: 0.95
        }
      }
    },
    {
      id: 'rectVS',
      type: 'Shape',
      zIndex: 0,
      position: {
        x: 215,
        y: 400,
        width: 98,
        height: 42
      },
      options: {
        graphic: {
          fill: 'rgb(252,200,4)',
          symbolType: 'rect',
          fontSize: 40,
          fontWeight: '300',
          textBaseline: 'top'
        }
      }
    },
    {
      id: 'vs',
      type: 'Text',
      zIndex: 1,
      position: {
        x: 237,
        y: 396,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          text: 'VS',
          textAlign: 'left',
          fontSize: 40,
          fontWeight: '300',
          textBaseline: 'top'
        }
      }
    },
    {
      id: 'youtube',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 111,
        y: 456,
        width: 600,
        height: 200
      },
      options: {
        graphic: {
          scaleY: 0.95,
          text: 'YOUTUBE',
          textAlign: 'left',
          fontSize: 60,
          fontWeight: '800',
          textBaseline: 'top'
        }
      }
    }
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 0.7,
  scaleY: 0.7
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
