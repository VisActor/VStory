---
category: examples
group: character
title: ranking-bar
keywords: ranking-bar
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/rankingbar-preview.gif
---

# 动态条形图元素

动态条形图是一种交互性强且视觉效果显著的数据可视化工具。与传统的静态条形图不同，动态条形图通过动画效果展示数据的变化，使得不同类别之间的比较更加生动有趣。动态条形图不仅能够有效地传达数据的大小和趋势，而且能吸引观众的注意力，增强信息的传达效果。
设置`type: 'rankingBar'`即可使用该图表作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
async function loadDSL() {
  const res = await fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/ranking-bar-rawData.json');
  const { data: rawData } = await res.json();

  const startYear = 1960;
  const endYear = 2017;
  const yearsArray = [];

  const yearsData = new Map();
  const countryImage = new Map();

  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(`${year}`);
  }

  rawData.forEach((line) => {
    const { CountryName, ImageURL, Region } = line;
    if (!countryImage.has(CountryName)) {
      countryImage.set(CountryName, ImageURL);
    }
    for (let i = 0; i < yearsArray.length; i++) {
      const Year = yearsArray[i];
      const country_year_data = {
        Year,
        CountryName,
        Region,
        Value: line[Year]
      };
      if (!yearsData.has(Year)) {
        yearsData.set(Year, []);
      }
      yearsData.get(Year).push(country_year_data);
    }
  });

  const allData = [];
  yearsData.forEach(value => {
    allData.push(...value);
  });

  const rankingBarSpec = {
    type: 'rankingBar',
    data: allData,
    timeField: 'Year',
    xField: 'Value',
    yField: 'CountryName',
    icon: Array.from(countryImage).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {}),
    interval: 300,
    color: {
      China: 'red',
      USA: 'rgb(0,43,127)',
      India: '#FF9933',
      Russia: '#D52B1E',
      Japan: 'rgb(79,66,95)',
      Brazil: ' #009B3A',
      Mexico: 'rgb(1,101,69)',
      Indonesia: '#CE1126',
      Italy: '#009246',
      UK: 'rgb(27,63,126)',
      Germany: '#000000',
      France: '#0055A4',
      Pakistan: '#006600',
      Nigeria: '#008000'
    },
    timeLabel: {
      visible: true,
      style: {
        fontSize: 60,
      }
    },
    nameLabel: {
      visible: true,
      position: 'bar-start',
      style: {}
    }
  };
  return {
    characters: [
      {
        type: 'RankingBar',
        id: 'bar',
        zIndex: 10,
        position: {
          top: 50,
          left: 50,
          width: 500,
          height: 300
        },
        options: {
          spec: rankingBarSpec,
          panel: {
            fill: '#ffffff',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 8
          }
        }
      }
    ],
    acts: [
      {
        id: 'default-chapter',
        scenes: [
          {
            id: 'scene0',
            actions: [
              {
                characterId: 'bar',
                characterActions: [
                  { action: 'appear', payload: { animation: { duration: 1000, effect: 'fade' } } },
                  {
                    action: 'bounce',
                    payload: {
                      customEase:
                        'M0,0 C0,0 0,0 0.047,0 0.047,0 0.103,1 0.236,1 0.368,1 0.424,0 0.424,0 0.424,0 0.443,0 0.443,0 0.443,0 0.471,0.49 0.553,0.49 0.619,0.49 0.668,0 0.668,0 0.668,0 0.677,0 0.677,0 0.677,0 0.699,0.216 0.743,0.216 0.778,0.216 0.811,0 0.811,0 0.811,0 0.815,0 0.815,0 0.815,0 0.828,0.086 0.854,0.086 0.875,0.086 0.895,0 0.895,0 0.895,0 0.896,0 0.896,0 0.896,0 0.904,0.031 0.92,0.031 0.932,0.031 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.948,0.01 0.958,0.01 0.966,0.01 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.975,0.002 0.981,0.002 0.986,0.002 0.989,0 0.989,0 0.989,0 0.99,0 0.99,0 0.99,0 0.99,0 0.994,0 0.998,0 1,0 1,0 ',
                      animation: {
                        duration: 2000
                      }
                    }
                  },
                  {
                    action: 'play',
                    startTime: 1000
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

const dsl = await loadDSL();

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);

window['story'] = story;
window['vstory'] = story;
```
