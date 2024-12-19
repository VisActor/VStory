---
category: examples
group: infographic
title: Pie Chart Camera
keywords: templates, visualization, bar, left-right, comparison, horizontal
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/pie-chart-camera.png
---

# 相机占比统计-饼图

## 代码演示

```javascript livedemo template=vstory
VStory.registerAll();
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
import { CustomInfographic } from './demos/infographic/bar';
          id: 'defaultScene',
          actions: [
            {
              characterId: ['bgImage', 'cameraIcon', 'bg0', 'bg1', 'title', 'chart', 'displayImage'],
              characterActions: [
                {
                  action: 'appear'
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
      id: 'bg0',
      type: 'Rect',
      zIndex: 1,
      position: {
        x: 1120,
        y: 0,
        width: 80,
        height: 280
      },
      options: {
        graphic: {
          fill: '#fff',
          cornerRadius: [0,0,200,200]
        }
      }
    },
    {
      id: 'bg1',
      type: 'Rect',
      zIndex: 2,
      position: {
        x: 1120 + 4,
        y: 200 + 4,
        width: 72,
        height: 72
      },
      options: {
        graphic: {
          cornerRadius: 80,
          fill: '#fdda2f',
          fillOpacity: 0.7
        }
      }
    },
    {
      id: 'cameraIcon',
      type: 'Image',
      zIndex: 2,
      position: {
        x: 1120,
        y: 200,
        width: 80,
        height: 80
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/pie-chart-camera-icon.png'
        }
      }
    },
    {
      id: 'title',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 1100,
        y: 60,
        width: 1000,
        height: 400
      },
      options: {
        graphic: {
          text: [
            'Most Successful',
            'Camera Companies',
            'In 2023'
          ],
          textAlign: 'right',
          fontSize: 60,
          fontWeight: 'bolder',
          stroke: '#000',
          lineWidth: 2,
          fill: '#000'
        }
      }
    },
    {
      id: 'chart',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 40,
        y: 20,
        width: 600,
        height: 640
      },
      options: {
        spec: {
          type: 'pie',
          data: [
            {
              id: 'id0',
              values: [
                { type: 'Sony', value: 0.34 },
                { type: 'Canon', value: 0.17 },
                { type: 'Nikon', value: 0.16 },
                { type: 'Fujifilm', value: 0.1 },
                { type: 'Olympus', value: 0.09 },
                { type: 'Panasonic', value: 0.07 },
                { type: 'Others', value: 0.07 },
              ]
            }
          ],
          outerRadius: 0.75,
          valueField: 'value',
          categoryField: 'type',
          startAngle: Math.PI / 2,
          endAngle: Math.PI / 2,
          color: ['#36bfd4', '#1a949e', '#6e4c20', '#f3894c', '#f56c4e', '#3aa565', '#db3947'],
          legends: {
            visible: true,
            orient: 'bottom',
            padding: [20, 0, 0, 0],
            item: {
              width: 120,
              shape: {
                style: {
                  symbolType: 'square'
                }
              },
              label: {
                style: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  fill: '#000'
                }
              }
            }
          },
          label: {
            visible: true,
            position: 'inside',
            rotate: false,
            formatMethod: (value, datum) => `${Math.round(datum.value * 100)}%`,
            style: {
              fill: '#fff',
              stroke: false,
              fontWeight: 'bold',
              fontSize: 22
            },
            smartInvert: false,
            spaceWidth: 40
          },
          tooltip: {
            mark: {
              content: [
                {
                  key: datum => datum['type'],
                  value: datum => datum['value'] + '%'
                }
              ]
            }
          }
        }
      }
    },
    {
      id: 'displayImage',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 500,
        y: 100,
        width: 1000,
        height: 1000,
        angle: -Math.PI / 15,
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/resource/pie-chart-camera.png'
        }
      }
    },
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1280,
  height: 720,
  background: '#fdda2f'
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
