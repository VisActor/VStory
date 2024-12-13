---
category: examples
group: infographic
title: Regional Sales
keywords: templates, visualization, bar, ranking
order: 1-8
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/regional-sales.png
---

# 地区销售额-条形图

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

async function loadDSL() {
  const barSpec = {
    type: 'bar',
    color: [
      'rgba(96, 182, 195)',
      'rgba(112, 151, 169)',
      'rgba(239, 149, 77)',
      'rgba(239, 174, 117)',
      'rgba(182, 78, 67)'
    ],
    padding: {
      left: 20,
      bottom: 80
    },
    data: [
      {
        id: 'id0',
        values: [
          {
            Region: 'Asia',
            Sales: 23000
          },
          {
            Region: 'South America',
            Sales: 16000
          },
          {
            Region: 'Europe',
            Sales: 12000
          },
          {
            Region: 'North America',
            Sales: 8000
          },
          {
            Region: 'Africa',
            Sales: 7200
          }
        ]
      }
    ],
    direction: 'horizontal',
    xField: 'Sales',
    yField: 'Region',
    seriesField: 'Region',
    title: {
      visible: true,
      text: 'Regional Sales',
      align: 'center',
      textStyle: {
        fontSize: 50,
        fill: '#fff'
      }
    },
    axes: [
      {
        orient: 'left',
        visible: false,
        paddingInner: 0.3
      },
      {
        orient: 'bottom',
        visible: false
      }
    ],
    legends: [
      {
        visible: true,
        orient: 'top',
        item: {
          label: {
            style: {
              fill: '#fff'
            }
          }
        }
      }
    ],
    label: {
      visible: true,
      position: 'inside',
      formatMethod: (text, datum) => {
        return `${datum.Sales / 10000}M`;
      },
      smartInvert: false,
      style: {
        fill: '#fff',
        fontSize: 20,
        lineWidth: 0
      }
    },
    background: 'rgba(0,0,0,0.2)'
  };
  return {
    characters: [
      {
        type: 'VChart',
        id: 'bar',
        zIndex: 10,
        position: {
          top: 50,
          left: 0,
          width: 1280,
          height: 720
        },
        options: {
          spec: barSpec
        }
      },
      {
        id: '0',
        type: 'Image',
        zIndex: 0,
        position: {
          x: 0,
          y: 0,
          width: 1280,
          height: 720
        },
        options: {
          graphic: {
            image:
              'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/singleBar-background.jpg'
          }
        }
      },
      {
        id: '1',
        type: 'Rect',
        zIndex: 1,
        position: {
          x: 0,
          y: 0,
          width: 1280,
          height: 720
        },
        options: {
          graphic: {
            fill: 'black',
            fillOpacity: 0.7
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
                characterId: ['bar', '0', '1'],
                characterActions: [
                  {
                    action: 'appear',
                    payload: {
                      animation: {
                        duration: 500
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
}

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 1280, height: 720, scaleX: 0.7, scaleY: 0.7 });
const player = new VStory.Player(story);
story.init(player);

loadDSL().then(dsl => {
  story.load(dsl);
  player.play(0);
});
window['story'] = story;
window['vstory'] = story;
```
