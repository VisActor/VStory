---
category: examples
group: character
title: story-label-item
keywords: story-label-item
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/label-item.gif
---

# 叙事Label元素

`story-label-item` 是一种标注元素，专门用于在特定位置添加解释性文本或说明信息。与传统的直接在目标周围展示信息的方式不同，`story-label-item` 通过一条额外的连接线，将说明与其对应的目标元素连接起来。这种设计使得标注可以灵活地放置在目标周围的较大范围内，而不必局限于紧贴目标的边缘。

这种灵活性不仅提高了界面的美观性，还能有效避免信息重叠或遮挡，确保用户在浏览时可以清晰地看到标注内容。具体来说，`story-label-item` 可以根据界面的布局和设计需求，选择最佳的位置展示标注，无论是在目标的上方、下方、左侧还是右侧，甚至是在更远的地方，只需通过连接线清楚地指向目标即可。

此外，`story-label-item` 还支持多种样式和定制选项，开发者可以根据具体的应用场景调整其外观，以确保与整体设计风格的协调。这使得 `story-label-item` 成为一种非常实用的工具，广泛应用于数据可视化、用户说明、交互设计等多个领域，为用户提供更为直观和友好的信息传递体验。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册PopTip
VStory.registerLabelItem();
VStory.registerLabelItemAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#18253A' });
const player = new VStory.Player(story);
story.init(player);

const l1 = {
  contentOffsetX: 200,
  contentOffsetY: -60,
  titleSpace: [0, 3],
  titleTop: 'Powered By VisActor'
};
const l2 = {
  contentOffsetX: 200,
  contentOffsetY: -60,
  titleSpace: [0, 3],
  titleTop: 'Powered By VisActor',
  titleBottom: 'this is the VStory label',
  titleBottomStyle: {
    fontSize: 10
  }
};
const l3 = {
  contentOffsetX: 200,
  contentOffsetY: -60,
  titleSpace: [6, 6],
  titleTop: 'Powered By VisActor',
  titleTopStyle: {
    fontSize: 12,
    fill: 'black'
  },
  titleTopPanelStyle: {
    fill: 'white',
    visible: true,
    padding: { top: 3, bottom: 3 }
  }
};

const l4 = {
  contentOffsetX: 200,
  contentOffsetY: -60,
  titleSpace: [6, 6],
  titleTop: 'Powered By VisActor',
  titleTopStyle: {
    fontSize: 12,
    fill: 'black'
  },
  titleBottom: 'this is the VStory label',
  titleBottomStyle: {
    fontSize: 10,
    fill: 'black'
  },
  titleTopPanelStyle: {
    fill: 'white',
    visible: true,
    padding: { top: 3, bottom: 3 }
  },
  titleBottomPanelStyle: {
    fill: 'white',
    visible: true,
    padding: { top: 3, bottom: 6 }
  }
};

const l5 = {
  contentOffsetX: 200,
  contentOffsetY: -60,
  titleTop: 'Powered By VisActor',
  titleTopStyle: {
    fontSize: 12
  },
  titleTopPanelStyle: {
    stroke: 'white',
    visible: true
    // padding: { top: 3, bottom: 3 }
  },
  theme: 'simple'
};

[l1, l2, l3, l4, l5, l1, l2, l3, l4, l5].forEach((item, index) => {
  story.addCharacter(
    {
      type: 'LabelItem',
      id: `label-item-${index}`,
      zIndex: 1,
      position: {
        top: 100 + Math.floor(index / 3) * 100,
        left: 50 + (index % 3) * 230
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
                duration: 1000,
                easing: 'cubicIn',
                symbolStartOuterType: Math.floor(index / 5) === 0 ? 'scale' : 'clipRange',
                titleType: Math.floor(index / 5) === 0 ? 'move' : 'typewriter',
                titlePanelType: index === 4 ? 'stroke' : 'scale'
              }
            }
          ]
        },
        {
          startTime: 2000,
          action: 'disappear',
          payload: {
            animation: {
              duration: 700,
              easing: 'cubicIn',
              mode: Math.floor(index / 5) === 0 ? 'default' : 'scale'
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
