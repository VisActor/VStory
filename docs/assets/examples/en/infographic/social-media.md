---
category: examples
group: infographic
title: Global Social Media
keywords: templates, visualization, line, trend, left-right
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/global-media.png
---

# Social Media Template - Funnel Chart

## Code Demo

```javascript livedemo template=vstory
// Register all required content
VStory.registerAll();
const colors = ['#5C95FF', '#B9E6FF', '#FFA9A3', '#F87575', '#7E6C6C'];

const data = [
  {
    value: 40,
    name: 'Russia'
  },
  {
    value: 55,
    name: 'Japan'
  },
  {
    value: 70,
    name: 'Brazil'
  },
  {
    value: 85,
    name: 'India'
  },
  {
    value: 100,
    name: 'United States'
  }
];
const spec = {
  type: 'funnel',
  categoryField: 'name',
  valueField: 'value',
  shape: 'rect',
  color: colors,
  data: [
    {
      id: 'funnel',
      values: data
    }
  ],
  funnel: {
    style: {
      cornerRadius: [5, 5, 0, 0]
    }
  },
  label: {
    visible: true,
    formatMethod: (_, datum) => {
      return `${datum.value}M`;
    },
    style: {
      fontWeight: 'bolder'
    }
  },
  legends: {
    visible: false
  }
};

const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: new Array(6)
            .fill(0)
            .map((_, index) => ({ characterId: index.toString(), characterActions: [{ action: 'appear' }] }))
        }
      ]
    }
  ],
  characters: [
    {
      id: '0',
      type: 'Rect',
      zIndex: 1,
      position: {
        top: 0,
        left: 0,
        width: 800,
        height: 230
      },
      options: {
        graphic: {
          fill: 'linear-gradient(150deg, rgb(200, 121, 105) 0%, rgb(196, 77, 107) 30%, rgb(196, 77, 107) 100%)'
        }
      }
    },
    {
      id: '1',
      type: 'Rect',
      zIndex: 1,
      position: {
        top: 670,
        left: 0,
        width: 800,
        height: 80
      },
      options: {
        graphic: {
          fill: 'linear-gradient(170deg, rgb(200, 121, 105) 0%, rgb(196, 77, 107) 50%, rgb(196, 77, 107) 100%)'
        },
        text: {
          textConfig: [
            { text: 'made with', fontSize: 18 },
            {
              image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/visactor.png',
              width: 30,
              height: 30,
              margin: [0, 6, 0, 6]
            },
            { text: 'VSTORY', fontSize: 26 }
          ],
          fill: 'white',
          textBaseline: 'middle',
          textAlign: 'center'
        }
      }
    },
    {
      id: '2',
      type: 'Text',
      zIndex: 1,
      position: {
        top: 80,
        left: 350
      },
      options: {
        graphic: {
          textConfig: [
            { text: 'Social Media\n', fontSize: 30, lineHeight: 50 },
            { text: 'Global User Ranking', fontSize: 36, fontWeight: 'bold' }
          ],
          fill: 'white',
          textAlign: 'left',
          textBaseline: 'middle'
        }
      }
    },
    {
      id: '3',
      type: 'Image',
      zIndex: 1,
      position: {
        top: 15,
        left: 150,
        width: 200,
        height: 200
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/infographic-instra-icon.png'
        }
      }
    },
    {
      id: '4',
      type: 'Text',
      zIndex: 1,
      position: {
        top: 160,
        left: 500
      },
      options: {
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        graphic: {
          text: 'VisActor InfoGraphic',
          fill: 'white',
          fontSize: 30,
          textAlign: 'center',
          textBaseline: 'middle'
        },
        panel: {
          fill: 'orange',
          cornerRadius: 100
        }
      }
    },
    {
      id: '5',
      type: 'VChart',
      zIndex: 1,
      position: {
        top: 230,
        left: 0,
        width: 500,
        height: 440
      },
      options: {
        padding: { top: 70, bottom: 70, left: 0, right: 0 },
        spec
      }
    }
  ]
};

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  background: '#ebecf0',
  scaleX: 0.5,
  scaleY: 0.5
});
const player = new VStory.Player(story);
story.init(player);

const pos = [
  { top: 330, left: 400 },
  { top: 390, left: 430 },
  { top: 450, left: 460 },
  { top: 510, left: 490 },
  { top: 570, left: 520 }
];
pos.forEach((item, index) => {
  story.addCharacterWithAppear({
    id: `line_${index}`,
    type: 'Line',
    zIndex: -1,
    position: {
      top: item.top,
      left: item.left - 200,
      width: 200,
      height: 12
    },
    options: {
      graphic: {
        points: [
          { x: 0, y: 0 },
          { x: item.left - 200, y: 0 }
        ],
        stroke: colors[index],
        lineWidth: 2
      }
    }
  });
  story.addCharacterWithAppear({
    id: `symbol_${index}`,
    type: 'Shape',
    zIndex: 1,
    position: {
      top: item.top - 6,
      left: item.left - 6,
      width: 12,
      height: 12
    },
    options: {
      graphic: {
        symbolType: 'circle',
        fill: colors[index],
        size: 12
      }
    }
  });
  const text = data[index].name;
  story.addCharacterWithAppear({
    id: `text_${index}`,
    type: 'Text',
    zIndex: 1,
    position: {
      top: item.top,
      left: item.left + 100,
      width: 150
    },
    options: {
      padding: { top: 5, bottom: 5, left: 0, right: 0 },
      graphic: {
        text,
        fill: 'white',
        fontSize: 16,
        textAlign: 'center',
        textBaseline: 'middle'
      },
      panel: {
        fill: colors[index],
        cornerRadius: 100
      }
    }
  });
});

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
