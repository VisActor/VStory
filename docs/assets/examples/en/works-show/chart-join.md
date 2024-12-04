---
category: examples
group: works-show
title: chart-join
keywords: chart-join
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/screenshot-20240715-204217.png
---

# `Chart Join` Work Showcase

This showcase demonstrates how to combine multiple charts that represent the same meaning into one, to convey an overall data concept.

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const getChartSpec = (i, showLeftAxis) => {
  const monthList = [['Paid-Ads', 'Preload', 'Sharing', 'SEO', 'Referral', 'Organic&Others'], ['Push', 'Sharing', 'SEO', 'Incentive', 'EDM'], ['Lite', 'Coin', 'Pad'], ['M10n', 'External-ban/unban', 'Applog Upgrade', 'Rec', 'Content&Product']];
  const dataList = [[[22.0, 33.8], [73.7, 96.5], [5.6, 8.8], [2.3, 2.5], [0.9, 0.5], [204.1, 202.1]], [[71.9, 85.6], [10.8, 11.9], [1.3, 2.2], [4.2, 3.6], [1.5, 1.1]], [[82.3, 109.3], [3.5, 9.8], [19.2, 20.8]], [[-13.9, -15.9], [4.6], [-2.0], [19.4], [61.7]]];
  const data = [];
  monthList[i].forEach((month, index) => {
    const dl = dataList[i][index];
    dl.forEach((item, i) => {
      data.push({
        month,
        value: item,
        type: `Attraction ${i + 1}`
      });
    })
  });

  return {
    type: 'bar',
    data: {
      values: data
    },
    xField: ['month', 'type'],
    yField: 'value',
    seriesField: 'type',
    label: {
      visible: true,
      position: 'top',
      overlap: false
    },
    axes: [
      {
        orient: 'left',
        grid: {
          visible: false,
        },
        nice: false,
        min: -20,
        max: 210,
        domainLine: {
          visible: true
        },
        tick: {
          visible: true,
          tickStep: 10,
        },
        visible: showLeftAxis
      },
      {
        orient: 'bottom',
        domainLine: {
          visible: true,
          onZero: true
        },
        tick: {
          visible: false
        }
      }
    ]
  };
}

const story = new VStory.Story(null, { dom: CONTAINER_ID, width: 2000 / 2, height: 800 / 2, background: '#ebecf0', scaleX: 0.5, scaleY: 0.5 });
const player = new VStory.Player(story);
story.init(player);

const leftPadding = 60;
let left = 0;
const dataCountList = [6, 5, 3, 5];
dataCountList.forEach((item, index) => {
  story.addCharacter({
    type: 'VChart',
    id: `chart-${index}`,
    zIndex: 9,
    position: {
      x: left + leftPadding,
      y: 250,
      width: item * 100,
      height: 500
    },
    options: {
      padding: { left: 0, top: 0, right: 0, bottom: 0 },
      // panel: {
      //   fill: 'red',
      //   cornerRadius: 10
      // },
      spec: getChartSpec(index, index === 0)
    }
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000 * index,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
            }
          }
        ]
      }
    ]
  });
  left += item * 100;
});

const circleTop = 160;
[[['+11.8', '+7.1%'], ['+22.8', '+13.7%'], ['+3.2', '+1.9%'], ['+0.2', '+0.1%'], ['-0.4', '-0.3%'], ['-2.0', '-1.2%']], [['+13.7', '+8.2%'], ['+1.1', '+0.7%'], ['+0.9', '+0.6%'], ['-0.4', '-0.3%'], ['-0.4', '-0.3%']], [['+27.0', '+16.2%'], ['+6.3', '+3.8%'], ['+1.6', '+0.9%']], [['-2.0', '-1.2%'], ['+4.6', '+2.8%'], ['-2.0', '-1.2%'], ['+19.4', '+11.6%'], ['+61.7', '+37.0%']]].forEach((item, index) => {
  // let left = (dataCountList[index-1] || 0) * 100;
  let left = dataCountList.slice(0, index).reduce((a, b) => {
    return a + b * 100;
  }, 0);
  let step = 100;
  if (index === 0) {
    left = 40;
    step = (600 - 40) / 6;
  }
  const top = circleTop;
  item.forEach((textList, i) => {
    const text1 = textList[0];
    const textNumber = parseFloat(text1);
    const text2 = textList[1];
    story.addCharacter({
      type: 'Text',
      id: `text1-${index}-${i}`,
      zIndex: 10,
      position: {
        left: left + step * i + step / 2 + leftPadding,
        top,
      },
      options: {
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        graphic: {
          text: text1,
          fontSize: 13,
          fill: 'black',
          // align: 'center',
          textBaseline: 'middle'
        },
        panel: {
          fill: textNumber > 0 ? 'green' : 'red',
          fillOpacity: Math.min(Math.max(Math.abs(textNumber / 20), 2 / 20), 1),
          cornerRadius: 30
        }
      }
    }, {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 1000 * index + 1000 / item.length * i,
          payload: [
            {
              animation: {
                duration: 1000,
                easing: 'linear',
              }
            }
          ]
        }
      ]
    });
    story.addCharacter({
      type: 'Text',
      id: `text2-${index}-${i}`,
      zIndex: 10,
      position: {
        left: left + step * i + step / 2 + leftPadding,
        top: top + 40,
      },
      options: {
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
        graphic: {
          text: text2,
          fontSize: 13,
          fill: textNumber > 0 ? 'green' : 'red',
          fontStyle: 'italic',
          // align: 'center',
          textBaseline: 'middle'
        },
      }
    }, {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 1000 * index + 1000 / item.length * i,
          payload: [
            {
              animation: {
                duration: 1000,
                easing: 'linear',
                effect: 'scale'
              }
            }
          ]
        }
      ]
    });
  });
});

[['User Acquisition + 35.6M', '(21.3%)'], ['User Acquisition + 14.9M', '(8.9%)'], ['User Acquisition + 34.9M', '(20.9%)'], ['User Acquisition + 81.7M', '(48.9%)']].forEach((item, index) => {
  let left = dataCountList.slice(0, index).reduce((a, b) => {
    return a + b * 100;
  }, 0);

  story.addCharacter({
    type: 'Text',
    id: `text-title-${index}`,
    zIndex: 10,
    position: {
      left: left + dataCountList[index] * 100 / 2 + leftPadding,
      top: 100,
    },
    options: {
      graphic: {
        text: item,
        fontSize: 13,
        fill: 'black',
        // align: 'center',
        textBaseline: 'middle'
      },
    }
  }, {
    sceneId: 'defaultScene',
    actions: [
      {
        action: 'appear',
        startTime: 1000 * index,
        payload: [
          {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: 'wipe'
            }
          }
        ]
      }
    ]
  });
});

story.addCharacter({
  type: 'Text',
  id: `circleDesc1`,
  zIndex: 10,
  position: {
    left: 0,
    top: circleTop,
  },
  options: {
    graphic: {
      textConfig: [{ text: 'contribution\n', fontWeight: 'bold' }, { text: '(24YTD vs 23 YTD)' }],
      fontSize: 13,
      fill: 'black',
      textAlign: 'left',
      textBaseline: 'middle'
    },
  }
}, {
  sceneId: 'defaultScene',
  actions: [
    {
      action: 'appear',
      startTime: 1000,
      payload: [
        {
          animation: {
            duration: 1000,
            easing: 'linear',
          }
        }
      ]
    }
  ]
});
story.addCharacter({
  type: 'Text',
  id: `circleDesc2`,
  zIndex: 10,
  position: {
    left: 0,
    top: circleTop + 40,
  },
  options: {
    graphic: {
      text: 'contribution%',
      fontSize: 13,
      fill: 'black',
      fontWeight: 'bold',
      textAlign: 'left',
      textBaseline: 'middle'
    },
  }
}, {
  sceneId: 'defaultScene',
  actions: [
    {
      action: 'appear',
      startTime: 1000,
      payload: [
        {
          animation: {
            duration: 1000,
            easing: 'linear',
          }
        }
      ]
    }
  ]
});
story.addCharacter({
  type: 'Text',
  id: `title`,
  zIndex: 10,
  position: {
    left: 20,
    top: 20,
  },
  options: {
    graphic: {
      text: 'Global DAU Increment Attribution (1054.7M→1221.8M, +167.1M)',
      fontSize: 22,
      fill: 'black',
      textAlign: 'left',
      fontWeight: 'bold',
      textBaseline: 'top'
    },
  }
}, {
  sceneId: 'defaultScene',
  actions: [
    {
      action: 'appear',
      startTime: 1000,
      payload: [
        {
          animation: {
            duration: 2000,
            easing: 'linear',
            effect: 'typewriter'
          }
        }
      ]
    }
  ]
});

player.play(0);

window['story'] = story;
window['vstory'] = story;
```
