---
category: examples
group: character
title: dynamic-line
keywords: dynamic-line
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/single-pie.gif
---

# single-pie元素

`single-pie`是一种类饼图的特殊元素，饼图通常通过将圆环分割成不同扇区来展示数据的不同部分。但有些场景中只需要两个数据对比，或者一个总数和一个子区域对比，此种场景的动画效果更好，通用饼图难以实现，`single-pie`元素就是为了满足此类场景的需求而设计的。
设置`type: 'SinglePie'`即可使用该图表作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
VStory.registerSinglePie();
VStory.registerSinglePieAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 500, height: 350, scaleX: 'auto', scaleY: 'auto', background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

['default', 'montage', 'contain'].forEach((temp, index) => {
  const effect = ['fade', 'angle', 'scale'];
  const easing = ['flicker5', 'quadOut', 'quadOut'];
  for (let j = 0; j < 2; j++) {
    story.addCharacter(
      {
        type: 'SinglePie',
        id: `pie-${temp}-${j}`,
        zIndex: 2,
        position: {
          top: 50 + j * 150,
          left: 50 + index * 150,
          width: 100,
          height: 100
        },
        options: {
          padding: { top: 10, right: 10, bottom: 10, left: 10 },
          graphic: {
            trackPie: {
              stroke: 'white',
              fill: j === 1 ? '#28f4b9' : false
            },
            pie: {
              boundsMode: 'imprecise',
              stroke: 'white',
              fill: '#f4b928',
              endAngle: Math.PI / 3,
              scaleCenter: ['50%', '100%']
            },
            template: temp
          },
          panel: {
            fill: '#cecece',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 10
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            startTime: 0,
            payload: {
              selector: '#trackPie',
              animation: {
                duration: 500,
                easing: 'quadOut',
                effect: 'scale',
                ratio: 0.9
              }
            }
          },
          {
            action: 'appear',
            startTime: 300,
            payload: {
              selector: '#pie',
              animation: {
                duration: 500,
                easing: easing[index],
                effect: effect[index]
              }
            }
          }
        ]
      }
    );
  }
});

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
