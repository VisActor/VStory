---
category: examples
group: character
title: poptip
keywords: poptip
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/poptip.gif
---

# PopTip Element

`PopTip` is an annotation element used to add a bubble at a specific position to display detailed information. The design of `PopTip` is flexible and diverse, supporting the display of tips in different directions. This means developers can choose the direction of the bubble display, such as top, bottom, left, or right, based on specific needs and interface design, ensuring that the tip information does not obstruct important interface elements and users can easily access the information they need.

Moreover, `PopTip` can be customized, such as adjusting colors, fonts, sizes, etc., to maintain consistency with the overall interface style. This makes `PopTip` a very practical tool widely used in scenarios such as data visualization, form filling, navigation tips, providing users with a richer and more user-friendly interactive experience.

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册PopTip
VStory.registerPopTip();
VStory.registerPopTipAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 400, height: 300, scaleX: 'auto', scaleY: 'auto', background: '#18253A' });
const player = new VStory.Player(story);
story.init(player);

const panelStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4,
  fill: 'white',
  cornerRadius: 4,
  size: 9
};
const commonStyle = {
  content: '$123,45',
  position: 'tl',
  padding: { top: 6, bottom: 6, left: 6, right: 6 },
  contentStyle: {
    fontSize: 12,
    fill: '#08979c'
  }
};

const p1 = {
  ...commonStyle,
  panel: {
    ...panelStyle
  }
};
const p2 = {
  ...commonStyle,
  triangleMode: 'concise',
  panel: {
    ...panelStyle,
    cornerRadius: 0
  }
};
const p3 = {
  ...commonStyle,
  triangleMode: 'concise',
  panel: {
    ...panelStyle,
    fill: false,
    stroke: 'white',
    cornerRadius: 0,
    size: 0
  }
};
const p4 = {
  ...commonStyle,
  position: 'top',
  panel: {
    ...panelStyle,
    square: true,
    cornerRadius: 100,
    size: 12
  }
};

const p5 = {
  content: '123,45',
  padding: { top: 3, bottom: 3, left: 12, right: 6 },
  position: 'tl',
  contentStyle: {
    fontSize: 12,
    fill: '#08979c'
  },
  panel: {
    ...panelStyle,
    cornerRadius: [0, 20, 20, 0]
  },
  logoSymbol: {
    symbolType: 'circle',
    fill: 'red',
    size: 'auto'
  },
  logoText: '$',
  logoTextStyle: {
    fill: 'white',
    fontSize: 12
  }
};

const p6 = {
  content: '123,45',
  position: 'tl',
  padding: { top: 3, bottom: 3, left: 13, right: 8 },
  contentStyle: {
    fontSize: 12,
    fill: '#08979c'
  },
  panel: {
    ...panelStyle,
    cornerRadius: [0, 0, 6, 0],
    cornerType: 'bevel',
    size: 0
  },
  logoSymbol: {
    symbolType: 'rect',
    fill: 'red',
    size: [20, 'auto'],
    cornerType: 'bevel'
  },
  logoText: '🤡',
  logoTextStyle: {
    fill: 'white',
    fontSize: 12
  }
};

[p1, p2, p3, p4, p5, p6].forEach((item, index) => {
  story.addCharacter(
    {
      type: 'PopTip',
      id: `poptip-${index}`,
      zIndex: 1,
      position: {
        top: 100 + Math.floor(index / 3) * 120,
        left: 50 + (index % 3) * 120
      },
      options: {
        graphic: item
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          startTime: 0,
          action: 'appear',
          payload: [
            {
              animation: {
                duration: 300,
                easing: 'quadOut',
                wave: 0.3
              }
            }
          ]
        },
        {
          startTime: 1000,
          action: 'disappear',
          payload: {
            animation: {
              duration: 300,
              easing: 'aIn3'
            }
          }
        }
      ]
    }
  );
});

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
