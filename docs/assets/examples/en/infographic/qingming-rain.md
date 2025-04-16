---
category: examples
group: infographic
title: QingMing Rain
keywords: templates, visualization, bar, left-right, comparison, horizontal
order: 1-0
cover: https://cdn.jsdelivr.net/gh/Kate199824/pics/cover.png
---

# Horizontal Bar Chart Infographic

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 需要用到的图表，一个普通柱状图就可以
const chartSpec = {
  type: 'bar',
  data: [
    {
      values: [
        { month: 'Mon', sales: 22 },
        { month: 'Tue', sales: 38 },
        { month: 'Wed', sales: 25 },
        { month: 'Thu', sales: 29 },
        { month: 'Fri', sales: 13 }
      ]
    }
  ],
  xField: 'month',
  yField: 'sales'
};

// 定义故事的dsl
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: ['background'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 1000,
                  payload: [
                    {
                      animation: {
                        effect: 'scale',
                        duration: 1500
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: ['liuzhi', 'liuzhi2'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 2500,
                  payload: [
                    {
                      animation: {
                        effect: 'fadeIn',
                        duration: 1500
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: 'jiewen',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 4000,
                  payload: [
                    {
                      animation: {
                        effect: 'wipe',
                        duration: 1500
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: 'Text',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 5500,
                  payload: [
                    {
                      animation: {
                        effect: 'typewriter',
                        duration: 1500
                      }
                    }
                  ]
                }
              ]
            },
            {
              characterId: 'swing-bar',
              characterActions: [
                {
                  action: 'appear',
                  startTime: 7000,
                  payload: [
                    {
                      selector: ':not(scatter)',
                      animation: {
                        duration: 500,
                        easing: 'linear'
                        // effect: 'fade'
                      }
                    },
                    {
                      selector: 'scatter',
                      animation: {
                        duration: 4000,
                        easing: 'linear',
                        effect: 'swing',
                        oneByOne: true,
                        dimensionCount: 7
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
      id: 'background',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1600,
        height: 1600
      },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/Kate199824/pics/qingming.png',
          fillOpacity: 0.7
        }
      }
    },
    {
      id: 'liuzhi',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 800,
        y: 0,
        width: 800,
        height: 800
      },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/Kate199824/pics/liuzhi.png',
          fillOpacity: 0.7
        }
      }
    },
    {
      id: 'liuzhi2',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 1000,
        y: 200,
        width: 800,
        height: 800
      },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/Kate199824/pics/liuzhi.png',
          fillOpacity: 0.7
        }
      }
    },
    {
      id: 'jiewen',
      type: 'Image',
      zIndex: 0,
      position: {
        x: 800 - 323 / 2,
        y: 800 - 772 / 2 - 300,
        width: 323,
        height: 772
      },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/Kate199824/pics/jiewen.png',
          fillOpacity: 0.7
        }
      }
    },
    {
      type: 'Text',
      id: 'Text',
      zIndex: 0,
      position: {
        x: 1600 - 200,
        y: 800,
        width: 323 / 2,
        height: 1172
      },
      options: {
        graphic: {
          text: '清明南方城市降雨指数',
          fontSize: 90,
          fontWeight: 'bold',
          fill: 'black',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      }
    },
    {
      type: 'ScatterBar',
      id: 'swing-bar',
      zIndex: 1,
      position: {
        top: 1600 - 700,
        left: 800 - 500,
        width: 1000,
        height: 600
      },
      options: {
        data: [
          {
            id: 'id0',
            values: [
              { city: '长沙', value: 0.6 },
              { city: '南昌', value: 0.8 },
              { city: '成都', value: 0.99 },
              { city: '福州', value: 0.54 },
              { city: '杭州', value: 0.9 },
              { city: '贵阳', value: 0.5 },
              { city: '广州', value: 0.3 }
            ]
          }
        ],
        rootConfig: {
          xField: 'city',
          yField: 'value',
          axes: [
            {
              orient: 'left',
              label: {
                style: {
                  fontSize: 50,
                  fontWeight: 'bold'
                }
              }
            },
            {
              orient: 'bottom',
              label: {
                style: {
                  fontSize: 50,
                  fontWeight: 'bold'
                }
              }
            }
          ]
        },
        panel: {
          fill: 'rgba(255, 255, 255, 0.5)',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        }
      }
    }
  ]
};

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  width: 1600,
  height: 1600,
  scaleX: 'auto',
  scaleY: 'auto',
  background: '#ebecf0'
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
