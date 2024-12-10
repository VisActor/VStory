---
category: examples
group: character
title: dynamic-line
keywords: dynamic-line
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/iphone-price.gif
---

# dynamic-line元素

`dynamic-line`是一种特殊封装的折线图表元素，其在普通折线图的基础上增加了横向滚动的动画，相比于普通折线图在数据过多时间隔很紧密，动态折线图展示大量数据的时候依然可以保持数据的间隔，这使得dynamic-line在数据可视化中，尤其是在需要展示长时间序列或频繁变化的数据时，具备了更高的可读性和交互性。与普通折线图相比，它不仅提升了用户体验，还增强了数据分析的效率。
设置`type: 'DynamicLine'`即可使用该图表作为Character。

下面展示不同iPhone版本的价格对比图。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
VStory.registerDynamicLine();
VStory.registerDynamicLineAction();

// 准备数据
const data = [
  { year: '2008年6月10日', name: 'iPhone 3G', price: 4193, bg: 'iphone3G.png' },
  { year: '2009年6月9日', name: 'iPhone 3GS', price: 4193, bg: 'iphone3G.png' },
  { year: '2010年6月9日', name: 'iPhone 4', price: 4999, bg: 'iphone4.png' },
  { year: '2011年10月5日', name: 'iPhone 4S', price: 4988, bg: 'iphone4.png' },
  { year: '2012年9月13日', name: 'iPhone 5', price: 5288, bg: 'iphone5.png' },
  { year: '2013年9月10日', name: 'iPhone 5S', price: 5288, bg: 'iphone5.png' },
  { year: '2014年9月10日', name: 'iPhone 6', price: 4488, bg: 'iphone6.png' },
  { year: '2015年9月10日', name: 'iPhone 6S', price: 5288, bg: 'iphone6.png' },
  { year: '2016年9月8日', name: 'iPhone 7', price: 5388, bg: 'iphone7.png' },
  { year: '2017年9月12日', name: 'iPhone 8', price: 5888, bg: 'iphone8.png' },
  { year: '2018年9月13日', name: 'iPhone Xs', price: 8699, bg: 'iphonex.png' },
  { year: '2019年9月11日', name: 'iPhone 11', price: 5499, bg: 'iphone11.png' },
  { year: '2020年10月14日', name: 'iPhone 12', price: 6299, bg: 'iphone12.png' },
  { year: '2021年9月15日', name: 'iPhone 13', price: 5999, bg: 'iphone13.png' },
  { year: '2022年9月8日', name: 'iPhone 14', price: 5999, bg: 'iphone14.png' },
  { year: '2022年9月15日', name: 'iPhone 15', price: 5999, bg: 'iphone15.png' },
  { year: '2022年9月13日', name: 'iPhone 16', price: 5999, bg: 'iphone16.png' }
].map(item => ({ ...item, bg: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/demo/${item.bg}` }));

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
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
