---
category: examples
group: infographic
title: Line Chart Infographic(Spring Solar Term Temperature Changes)
keywords: templates, visualization, line, temperature,seasonal
order: 1-0
cover: https://cdn.jsdelivr.net/gh/fzr365/images/dc1fc9697bd653b7d15331e7aa184471.jpg
---

# Line Chart Infographic: Spring Solar Term Temperature Changes

## 代码演示

```javascript livedemo template=vstory
VStory.registerAll();

const spec = {
  type: 'line',
  data: [
    {
      id: 'temperature',
      values: [
        { 节气: '立春', 平均气温: 5 },
        { 节气: '雨水', 平均气温: 7 },
        { 节气: '惊蛰', 平均气温: 10 },
        { 节气: '春分', 平均气温: 13 },
        { 节气: '清明', 平均气温: 16 },
        { 节气: '谷雨', 平均气温: 18 }
      ]
    }
  ],
  xField: '节气',
  yField: '平均气温',
  color: '#FF6B6B',
  point: { shape: 'circle' },
  line: {
    style: {
      lineWidth: 3,
      stroke: '#FF6B6B',
      opacity: 0.8
    }
  },
  axes: [
    {
      orient: 'left',
      title: {
        text: '平均气温 (°C)',
        style: { fontSize: 16, fill: '#333' }
      }
    },
    {
      orient: 'bottom',
      title: {
        text: '节气',
        style: { fontSize: 16, fill: '#333' }
      }
    }
  ]
};

const dsl = {
  characters: [
    {
      id: 'background',
      type: 'Image',
      zIndex: 0,
      position: { x: 0, y: 0, width: 1280, height: 720 },
      options: {
        graphic: {
          image: 'https://cdn.jsdelivr.net/gh/fzr365/images/dc1fc9697bd653b7d15331e7aa184471.jpg'
        }
      }
    },
    {
      type: 'VChart',
      id: 'chart',
      position: {
        x: (1280 - 1280 * 0.7) / 2,
        y: (720 - 720 * 0.7) / 2,
        width: 1280 * 0.7,
        height: 720 * 0.7
      },
      options: {
        spec,
        panel: {
          fill: 'rgba(255, 255, 255, 0.8)',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        }
      }
    },
    {
      id: 'title',
      type: 'Text',
      zIndex: 0,
      position: { x: 1280 / 2, y: 40, width: 1280, height: 720 },
      options: {
        graphic: {
          text: ['春季节气平均气温变化'],
          textAlign: 'center',
          fontSize: 35,
          fontFamily: 'Roboto Light',
          fontWeight: 'bold',
          fill: '#333'
        }
      }
    },
    {
      id: 'subtitle',
      type: 'Text',
      zIndex: 0,
      position: { x: 1280 / 2, y: 620, width: 1280, height: 720 },
      options: {
        graphic: {
          text: ['天气常变，关怀不变'],
          textAlign: 'center',
          fontSize: 25,
          fontFamily: 'Roboto Light',
          fontWeight: 'bold',
          fill: '#333'
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
              characterId: ['chart', 'title', 'subtitle', 'background'],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      startTime: 300,
                      duration: 3000
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
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1280,
  height: 720
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
