---
category: examples
group: character
title: dynamic-line
keywords: dynamic-line
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/single-pie.gif
---

# single-pie Element

`single-pie` is a special element similar to a pie chart. Pie charts usually display different parts of data by dividing a circle into different sectors. However, in some scenarios, only two data points need to be compared, or a total value needs to be compared with a subregion. In such scenarios, the animation effect is better, and it is difficult to achieve with a general pie chart. The `single-pie` element is designed to meet the needs of such scenarios. Set `type: 'SinglePie'` to use this chart as a Character.

## Code Demo

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
VStory.registerSinglePie();
VStory.registerSinglePieAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
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
