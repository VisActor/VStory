---
category: examples
group: works-show
title: annotation-show
keywords: annotation-show
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/annotation-works.gif
---

# Showcase of `Annotation Capability`

This showcase demonstrates the annotation capabilities animation provided by VStory, showcasing a variety of annotation components and animation abilities.

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册Label
VStory.registerLabelItem();
VStory.registerLabelItemAction();
// 注册PopTip
VStory.registerPopTip();
VStory.registerPopTipAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 2000 / 2, height: 800 / 2, background: '#ebecf0', scaleX: 0.5, scaleY: 0.5 });
const player = new VStory.Player(story);
story.init(player);

const perSceneDuring = 3000;

story.addCharacter({
  type: 'Rect',
  id: `background`,
  zIndex: 0,
  position: {
    left: 0,
    top: 0,
    width: 1080,
    height: 720
  },
  options: {
    graphic: {
      fill: '#18253A',
    },
    text: {
      text: 'ANIMATE 1',
      fontSize: 80,
      fill: 'white',
      textAlign: 'center',
      fontWeight: 'bolder',
      textBaseline: 'middle'
    }
  }
}, {
  sceneId: 'defaultScene',
  actions: [
    {
      action: 'appear',
      startTime: 0,
      payload: [
        {
          animation: {
            duration: 300,
            easing: 'linear',
            effect: 'fade'
          }
        }
      ]
    },
    {
      action: 'style',
      startTime: perSceneDuring,
      payload: [
        {
          animation: {
            duration: 200,
            easing: 'linear',
          },
          graphic: {
            fill: '#2E6670',
          },
          text: {
            text: 'ANIMATE 2',
          }
        }
      ]
    }
  ]
});

const panelStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4,
  fill: 'white',
  cornerRadius: 8,
  size: 18
};
const commonStyle = {
  content: 'Hello Vis',
  position: 'right',
  padding: { top: 16, bottom: 16, left: 16, right: 16 },
  contentStyle: {
    fontSize: 22,
    fill: '#1F4C4B'
  }
};

const poptipList = [
  {
    x: 180, y: 130, type: 'PopTip',
    options: {
      ...commonStyle,
      position: 'bl',
      triangleMode: 'concise',
      panel: {
        ...panelStyle,
        cornerRadius: 0
      }
    }
  },
  {
    x: 180, y: 130, type: 'PopTip',
    options: {
      ...commonStyle,
      position: 'tr',
      contentStyle: {
        fontSize: 16,
        fill: 'white'
      },
      triangleMode: 'concise',
      panel: {
        ...panelStyle,
        cornerRadius: 0,
        fill: 'red',
      }
    }
  },
  {
    x: 400, y: 100, type: 'PopTip',
    options: {
      ...commonStyle,
      panel: {
        ...panelStyle,
        size: 0
      }
    }
  },
  {
    x: 630, y: 100, type: 'PopTip',
    options: {
      ...commonStyle,
      position: 'right',
      contentStyle: {
        fontSize: 22,
        fill: 'white',
        fontWeight: 'bolder'
      },
      panel: {
        ...panelStyle,
        fill: 'red',
        cornerRadius: 0,
        size: 0
      }
    }
  },
  {
    x: 850, y: 100, type: 'PopTip',
    options: {
      ...commonStyle,
      padding: { top: 16, bottom: 16, left: 23, right: 18 },
      position: 'right',
      panel: {
        ...panelStyle,
        cornerRadius: [0, 0, 6, 0],
        cornerType: 'bevel',
        size: 0
      },
      logoSymbol: {
        symbolType: 'rect',
        fill: 'red',
        size: [36, 'auto'],
        cornerType: 'bevel'
      },
      logoText: '🤡',
      logoTextStyle: {
        fill: 'white',
        fontSize: 26
      }
    }
  },


  {
    x: 120, y: 280, type: 'PopTip',
    options: {
      ...commonStyle,
      padding: { top: 16, bottom: 16, left: 23, right: 18 },
      position: 'bl',
      panel: {
        ...panelStyle,
        cornerType: 'bevel',
        size: 0
      },
      logoSymbol: {
        symbolType: 'rect',
        fill: 'red',
        size: [36, 'auto'],
        cornerType: 'bevel'
      },
      logoText: '🤡',
      logoTextStyle: {
        fill: 'white',
        fontSize: 26
      }
    }
  },
  {
    x: 470, y: 280, type: 'PopTip',
    options: {
      ...commonStyle,
      position: 'top',
      panel: {
        ...panelStyle
      }
    }
  },
  {
    x: 850, y: 240, type: 'PopTip',
    options: {
      ...commonStyle,
      padding: { top: 16, bottom: 16, left: 26, right: 12 },
      content: '123,45',
      position: 'right',
      panel: {
        ...panelStyle,
        cornerRadius: 0
      },
      logoSymbol: {
        symbolType: 'rect',
        fill: 'red',
        size: [30, 'auto']
      },
      logoText: '￥',
      logoTextStyle: {
        fill: 'white',
        fontSize: 28
      }
    }
  },


  {
    x: 120, y: 460, type: 'PopTip',
    options: {
      ...commonStyle,
      padding: { top: 16, bottom: 16, left: 33, right: 18 },
      content: '123,45',
      position: 'bl',
      panel: {
        ...panelStyle,
        cornerRadius: [0, 100, 100, 0]
      },
      logoSymbol: {
        symbolType: 'circle',
        fill: 'red',
        size: 'auto'
      },
      logoText: '￥',
      logoTextStyle: {
        fill: 'white',
        fontSize: 28
      }
    }
  },
  {
    x: 500, y: 560, type: 'PopTip',
    options: {
      ...commonStyle,
      content: 'Hi 👋',
      position: 'bottom',
      panel: {
        ...panelStyle,
        square: true,
        cornerRadius: 100,
        size: 12
      }
    }
  },
  {
    x: 860, y: 520, type: 'PopTip',
    options: {
      ...commonStyle,
      contentStyle: {
        fontSize: 22,
        fill: 'wihte'
      },
      triangleMode: 'concise',
      panel: {
        ...panelStyle,
        fill: false,
        stroke: 'white',
        cornerRadius: 0,
        size: 0
      }
    }
  },


  {
    x: 270, y: 630, type: 'PopTip',
    options: {
      ...commonStyle,
      panel: {
        ...panelStyle,
        cornerRadius: 100,
        size: 0
      }
    }
  },
  {
    x: 630, y: 630, type: 'PopTip',
    options: {
      ...commonStyle,
      panel: {
        ...panelStyle
      }
    }
  },
];

poptipList.forEach((item, i) => {
  story.addCharacter({
    type: item.type,
    id: `${item.type}-${i}`,
    zIndex: 10,
    position: {
      left: item.x,
      top: item.y,
    },
    options: {
      graphic: item.options
    }
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        startTime: 300,
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
        startTime: perSceneDuring / 3 * 2,
        action: 'disappear',
        payload: {
          animation: {
            duration: 300,
            easing: 'aIn3'
          }
        }
      },
      {
        startTime: perSceneDuring + 500,
        action: 'appear',
        payload: [
          {
            animation: {
              duration: 300,
              easing: 'quadOut',
            }
          }
        ]
      },
      {
        startTime: perSceneDuring + perSceneDuring / 3 * 2,
        action: 'disappear',
        payload: {
          animation: {
            duration: 300,
            easing: 'aIn3'
          }
        }
      },
    ]
  })
})

const labelList = [
  {
    x: 900, y: 360,
    options: {
      contentOffsetX: -300,
      contentOffsetY: -100,
      titleSpace: [0, 3],
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 22,
      }
    }
  },
  {
    x: 100, y: 670,
    options: {
      contentOffsetX: 300,
      contentOffsetY: -100,
      titleSpace: [0, 3],
      titleTop: 'Powered By VisActor',
      titleBottom: 'this is the VStory label',
      titleTopStyle: {
        fontSize: 22,
      },
      titleBottomStyle: {
        fontSize: 16
      }
    }
  },
  {
    x: 500, y: 560,
    options: {
      contentOffsetX: 300,
      contentOffsetY: -100,
      titleSpace: [6, 6],
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 22,
        fill: 'black'
      },
      titleTopPanelStyle: {
        fill: 'white',
        visible: true,
        padding: { top: 3, bottom: 3 }
      }
    }
  },
  {
    x: 500, y: 560,
    options: {
      contentOffsetX: -300,
      contentOffsetY: -130,
      titleTop: 'Powered By VisActor',
      titleTopStyle: {
        fontSize: 22
      },
      titleTopPanelStyle: {
        stroke: 'white',
        visible: true
      },
      theme: 'simple'
    }
  }
]


labelList.forEach((label, index) => {
  story.addCharacter(
    {
      type: 'LabelItem',
      id: `label-item-${index}`,
      zIndex: 100,
      position: {
        top: label.y,
        left: label.x
      },
      options: {
        graphic: label.options
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          startTime: 300,
          action: 'appear',
          payload: [
            {
              animation: {
                duration: 1000,
                easing: 'cubicIn',
                symbolStartOuterType: 'scale',
                titleType: 'typewriter',
                titlePanelType: label.options.theme === 'simple' ? 'stroke' : 'scale'
              }
            }
          ]
        },
        {
          startTime: perSceneDuring / 3 * 2,
          action: 'disappear',
          payload: {
            animation: {
              duration: 700,
              easing: 'cubicIn',
              mode: 'default'
            }
          }
        },
        {
          startTime: perSceneDuring,
          action: 'appear',
          payload: [
            {
              animation: {
                duration: 1000,
                easing: 'cubicIn',
                symbolStartOuterType: 'clipRange',
                titleType: 'move',
                titlePanelType: label.options.theme === 'simple' ? 'stroke' : 'scale'
              }
            }
          ]
        },
        {
          startTime: perSceneDuring + perSceneDuring / 3 * 2,
          action: 'disappear',
          payload: {
            animation: {
              duration: 700,
              easing: 'cubicIn',
              mode: 'scale'
            }
          }
        }
      ]
    }
  );
})

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
