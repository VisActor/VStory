---
category: examples
group: character
title: poptip
keywords: poptip
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/poptip.gif
---

# PopTip元素

`PopTip` 是一个标注元素，用于在某个位置上添加一个气泡，显示数据的详细信息，`PopTip` 的设计灵活多样，支持在不同方向上展示提示信息。这意味着开发者可以根据具体的需求和界面设计选择气泡的显示方向，例如上方、下方、左侧或右侧，从而确保提示信息不会遮挡重要的界面元素，并且用户能够轻松获取所需的信息。

此外，`PopTip` 还可以定制化，例如调整颜色、字体、大小等，以便与整体界面风格保持一致。这使得 `PopTip` 成为一种非常实用的工具，广泛应用于数据可视化、表单填写、导航提示等场景，为用户提供更为丰富和友好的交互体验。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册PopTip
VStory.registerPopTip();
VStory.registerPopTipAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#18253A' });
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
