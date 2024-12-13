---
category: examples
group: infographic
title: Pictogram Infographic(Cat Stroking Guide)
keywords: templates, visualization, pictogram, distribution
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/cat-stroke-preview.png
---

# 信息图模板-象形图: 新手撸猫指南

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const response = await fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/pictogram/cat.svg');
const cat = await response.text();
VStory.VChart.registerSVG('cat', cat);

const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: ['rect', 'rect-ground', '2'],
              characterActions: [
                {
                  action: 'appear',
                  duration: 1000,
                  payload: [
                    {
                      animation: {
                        duration: 1000,
                        easing: 'linear'
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: ['title', 'icon'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 500,
                  payload: [
                    {
                      animation: {
                        effect: 'move',
                        pos: 'top',
                        duration: 1000,
                        easing: 'expoInOut',
                        isVariableSpeed: false
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: ['chart'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 500,
                  payload: [
                    {
                      animation: {
                        effect: 'grow',
                        duration: 1000,
                        easing: 'expoInOut'
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
  ],
  characters: [
    {
      id: 'rect',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 760,
        height: 760
      },
      options: {
        graphic: {
          fill: '#7DC4B6'
        }
      }
    },
    {
      id: 'rect-ground',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 580,
        width: 760,
        height: 180
      },
      options: {
        graphic: {
          fill: '#5A957E'
        }
      }
    },
    {
      id: 'chart',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 70,
        y: 100,
        width: 600,
        height: 600
      },
      options: {
        initOption: {
          interactive: true
        },
        spec: {
          padding: 0,
          type: 'pictogram',
          data: {
            id: 'data',
            values: [{ name: 'Yes', value: 'Love This' }, { name: 'So-so' }, { name: 'Forbidden' }, { name: 'Horror' }]
          },
          seriesField: 'name',
          nameField: 'name',
          valueField: 'value',
          svg: 'cat',
          color: {
            specified: {
              Yes: '#4CAF50',
              'So-so': '#FFD56B',
              Forbidden: '#FF85A1',
              Horror: '#FF6B6B',
              undefined: 'transparent'
            }
          },
          pictogram: {
            style: {
              fill: {
                scale: 'color',
                field: 'name'
              }
            }
          }
        }
      }
    },
    {
      id: 'icon',
      type: 'Shape',
      zIndex: 0,
      position: {
        x: -140,
        y: -180,
        width: 600,
        height: 460
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType: `M838.746 7.71988Q854.544 7.13732 870.348 7.56146C921.559 8.88946 981.633 17.1767 1018.69 56.2672C1046.75 85.8581 1050.47 125.666 1032.34 161.529C1027.86 170.397 1018.67 181.437 1017.97 190.946C1016.19 215.235 1030.8 237.763 1030.08 262.297C1029.52 281.283 1018.91 297.49 1005.45 310.143C984.293 330.041 955.629 338.247 927.344 341.483C903.824 344.175 880.137 343.871 856.511 343.758C840.177 343.68 823.773 343.944 807.452 343.414C777.061 342.427 746.78 340.206 716.419 338.773Q667.8 336.965 619.157 337.988C497.145 339.862 375.539 357.51 253.371 353.694C197.161 351.818 136.114 342.972 92.6094 304.077C61.3989 276.173 45.5132 231.371 68.2178 192.96C73.102 184.698 86.0702 173.482 87.0681 164.728C88.1835 154.944 79.2948 143.659 75.9695 134.67C73.9405 129.185 72.8733 123.098 72.5558 117.257Q72.4709 115.476 72.4726 113.692Q72.4743 111.909 72.5626 110.128Q72.6508 108.346 72.8254 106.572Q73 104.797 73.2605 103.033Q73.521 101.268 73.8669 99.5187Q74.2127 97.7691 74.643 96.0383Q75.0733 94.3076 75.5871 92.5997Q76.101 90.8918 76.6971 89.2108Q77.2931 87.5299 77.9701 85.8798Q78.6471 84.2297 79.4033 82.6143Q80.1596 80.999 80.9933 79.4222Q81.8271 77.8454 82.7364 76.3108Q83.6457 74.7763 84.6284 73.2876Q85.6111 71.799 86.6649 70.3597Q87.7187 68.9204 88.841 67.5338Q89.9634 66.1473 91.1518 64.8168C111.952 41.729 142.492 32.2606 172.561 28.8931C225.373 22.9786 279.653 29.9338 332.457 33.451C397.442 37.7795 462.822 41.0881 527.955 40.0884C549.593 39.7563 572.236 39.3566 593.696 36.592C604.67 35.1783 615.578 32.3195 626.484 30.3611C642.861 27.4202 659.433 25.2061 675.918 22.9487Q731.295 15.1483 787.036 10.6368C804.272 9.30477 821.493 8.64403 838.746 7.71988Z`
        }
      }
    },
    {
      id: 'title',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 420,
        y: 136,
        width: 480,
        height: 400
      },
      options: {
        graphic: {
          scaleX: 0.95,
          textConfig: [{ text: 'WHERE SHOULD\n' }, { text: 'YOU PET A CAT?' }],
          fontSize: 48,
          fill: 'black',
          textBaseline: 'middle',
          textAlign: 'center',
          fontWeight: '600'
        }
      }
    },
    {
      id: '2',
      type: 'Text',
      position: {
        x: 380,
        y: 730,
        width: 200,
        height: 200
      },
      options: {
        graphic: {
          textConfig: [
            { text: 'Made with', fontSize: 14 },
            {
              image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/visactor.png',
              width: 18,
              height: 18,
              margin: [0, 4, 0, 6]
            },
            { text: 'VSTORY', fontSize: 14 }
          ],
          fill: 'white',
          textBaseline: 'middle',
          textAlign: 'center'
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
