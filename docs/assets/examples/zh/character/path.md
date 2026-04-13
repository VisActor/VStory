---
category: examples
group: character
title: path
keywords: path
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vgraphic.gif
---

# Path 图元

`Path` 是一个基于 SVG path 数据的基础图元 Character，适合用来承载不规则轮廓、图标轮廓或需要自定义矢量造型的内容。设置 `type: 'Path'` 即可将它作为 Character 使用。

## 代码演示

```javascript livedemo template=vstory
VStory.registerAll();

const diamondPath = 'M60,0 L120,60 L60,120 L0,60 Z';
const wavePath = 'M0,30 C20,0 40,0 60,30 S100,60 120,30';

const story = new VStory.Story(null, {
  dom: CONTAINER_ID,
  width: 500,
  height: 320,
  scaleX: 'auto',
  scaleY: 'auto',
  background: '#f2e8dc'
});
const player = new VStory.Player(story);
story.init(player);

story.addCharacter(
  {
    type: 'Path',
    id: 'path-fill',
    zIndex: 1,
    position: {
      top: 70,
      left: 60,
      width: 180,
      height: 180
    },
    options: {
      padding: { top: 24, right: 24, bottom: 24, left: 24 },
      graphic: {
        path: diamondPath,
        fill: '#c84c2f',
        stroke: '#4d1d12',
        lineWidth: 4
      },
      text: {
        text: 'Path',
        textAlign: 'center',
        textBaseline: 'middle',
        fill: '#fff8f1',
        fontSize: 24,
        fontWeight: 'bold'
      }
    }
  },
  {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        payload: [
          {
            animation: {
              duration: 1200,
              easing: 'linear',
              effect: 'clipRange'
            }
          }
        ]
      }
    ]
  }
);

story.addCharacter(
  {
    type: 'Path',
    id: 'path-stroke',
    zIndex: 1,
    position: {
      top: 120,
      left: 280,
      width: 180,
      height: 100
    },
    options: {
      graphic: {
        path: wavePath,
        fill: false,
        stroke: '#1f3b73',
        lineWidth: 8,
        lineCap: 'round'
      },
      text: {
        text: 'SVG Path',
        textAlign: 'center',
        textBaseline: 'bottom',
        fill: '#1f3b73',
        fontSize: 22,
        fontWeight: 'bold'
      }
    }
  },
  {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 300,
        payload: [
          {
            animation: {
              duration: 1200,
              easing: 'linear',
              effect: 'clipRange'
            }
          }
        ]
      }
    ]
  }
);

player.play(1);
window['story'] = story;
window['vstory'] = story;
```
