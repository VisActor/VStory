---
category: examples
group: character
title: dynamic-line
keywords: dynamic-line
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/iphone-price.gif
---

# Dynamic-Line Element

`dynamic-line` is a special encapsulated line chart element that adds horizontal scrolling animation to the regular line chart. Compared to a normal line chart where data points can become densely packed when there is a large amount of data, dynamic-line maintains the spacing between data points even when displaying a large amount of data. This feature enhances the readability and interactivity of the data, especially when visualizing long time series or frequently changing data. In comparison to a regular line chart, dynamic-line not only improves user experience but also enhances data analysis efficiency.
Set `type: 'DynamicLine'` to use this chart as a Character.

Below is a comparison chart showing the prices of different iPhone versions.

## Code Demo

```javascript livedemo template=vstory
// Register all necessary content
VStory.registerAll();
VStory.registerDynamicLine();
VStory.registerDynamicLineAction();

// Prepare data
const data = [
  { year: 'June 10, 2008', name: 'iPhone 3G', price: 4193, bg: 'iphone3G.png' },
  { year: 'June 9, 2009', name: 'iPhone 3GS', price: 4193, bg: 'iphone3G.png' },
  { year: 'June 9, 2010', name: 'iPhone 4', price: 4999, bg: 'iphone4.png' },
  { year: 'October 5, 2011', name: 'iPhone 4S', price: 4988, bg: 'iphone4.png' },
  { year: 'September 13, 2012', name: 'iPhone 5', price: 5288, bg: 'iphone5.png' },
  { year: 'September 10, 2013', name: 'iPhone 5S', price: 5288, bg: 'iphone5.png' },
  { year: 'September 10, 2014', name: 'iPhone 6', price: 4488, bg: 'iphone6.png' },
  { year: 'September 10, 2015', name: 'iPhone 6S', price: 5288, bg: 'iphone6.png' },
  { year: 'September 8, 2016', name: 'iPhone 7', price: 5388, bg: 'iphone7.png' },
  { year: 'September 12, 2017', name: 'iPhone 8', price: 5888, bg: 'iphone8.png' },
  { year: 'September 13, 2018', name: 'iPhone Xs', price: 8699, bg: 'iphonex.png' },
  { year: 'September 11, 2019', name: 'iPhone 11', price: 5499, bg: 'iphone11.png' },
  { year: 'October 14, 2020', name: 'iPhone 12', price: 6299, bg: 'iphone12.png' },
  { year: 'September 15, 2021', name: 'iPhone 13', price: 5999, bg: 'iphone13.png' },
  { year: 'September 8, 2022', name: 'iPhone 14', price: 5999, bg: 'iphone14.png' },
  { year: 'September 15, 2022', name: 'iPhone 15', price: 5999, bg: 'iphone15.png' },
  { year: 'September 13, 2022', name: 'iPhone 16', price: 5999, bg: 'iphone16.png' }
].map(item => ({ ...item, bg: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/demo/${item.bg}` }));

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 600, height: 400, scaleX: 'auto', scaleY: 'auto', background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

story.addCharacter(
  {
    type: 'DynamicLine',
    id: 'dl',
    zIndex: 1,
    position: {
      top: 50,
      left: 100,
      width: 500,
      height: 300
    },
    options: {
      data: [
        {
          id: 'id0',
          values: data
        }
      ],
      axes: [
        {orient: 'left', label: { formatMethod: (t) => `￥${t}` }}
      ],
      rootConfig: {
        xField: 'year',
        yField: 'price',
        label: {
          visible: true,
          style: {
            text: (datum) => datum.name
          }
        },
        point: {
          style: {
            size: [35, 60],
            symbolType: 'rect',
            fill: 'transparent',
            background: (datum) => datum.bg
          }
        }
      },
      bottomRange: [0, 0.15],
      panel: {
        fill: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowBlur: 10,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        cornerRadius: 8
      },
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
              easing: 'linear'
            }
          }
        ]
      },
      {
        startTime: 1000,
        action: 'play',
        payload: {
          animation: {
            duration: 16000,
            easing: 'linear'
          }
        }
      }
    ]
  }
);

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
