---
category: examples
group: character
title: story-label-item
keywords: story-label-item
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/label-item.gif
---

# Narrative Label Element

`story-label-item` is a labeling element specifically designed to add explanatory text or information at specific locations. Unlike traditional ways of displaying information directly around the target, `story-label-item` connects the explanation to its corresponding target element through an additional connecting line. This design allows the label to be flexibly placed within a larger area around the target, without being limited to the edges of the target.

This flexibility not only enhances the aesthetics of the interface but also effectively avoids information overlap or obstruction, ensuring that users can clearly see the labeled content while browsing. Specifically, `story-label-item` can choose the best position to display the label based on the layout and design requirements of the interface, whether it is above, below, to the left, or to the right of the target, or even further away, as long as it clearly points to the target through the connecting line.

Furthermore, `story-label-item` supports various styles and customization options. Developers can adjust its appearance according to specific application scenarios to ensure coordination with the overall design style. This makes `story-label-item` a very practical tool, widely used in data visualization, user instructions, interactive design, and many other fields, providing users with a more intuitive and friendly information delivery experience.

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册PopTip
VStory.registerLabelItem();
VStory.registerLabelItemAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 750, height: 450, scaleX: 'auto', scaleY: 'auto', background: '#18253A' });
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
