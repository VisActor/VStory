---
category: examples
group: infographic
title: U.S. Cancer Map
keywords: templates, visualization, line, trend, left-right
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/us-cancer.png
---

# 美国癌症地图模板-地图

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

function csvToJson(csv) {
  // 将 CSV 按行分割
  const lines = csv.trim().split('\n');

  // 获取表头
  const headers = lines[0].split(',');

  // 将每一行数据转换为对象
  const jsonArray = lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index] ? values[index].trim() : null;
    });
    return obj;
  });

  return jsonArray;
}

const getSpec = async colors => {
  const [geoData, csvdata] = await Promise.all([
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/geojson/usa.json'),
    fetch('https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/USCSOverviewMap.csv')
  ]);
  const geojson = await geoData.json();
  const csvText = await csvdata.text();
  VStory.VChart.registerMap('usa', geojson);

  const data = csvToJson(csvText).map(item => ({
    ...item,
    value: isFinite(parseFloat(item['Case Count'])) ? parseFloat(item['Case Count']) : 0,
    name: item['Area']
  }));

  const spec = {
    type: 'map',
    color: {
      type: 'linear',
      range: colors
    },
    area: {
      style: {
        fill: {
          field: 'value',
          scale: 'color',
          changeDomain: 'replace'
        },
        stroke: 'white',
        lineWidth: 2
      }
    },
    data: [
      {
        values: data
      }
    ],
    nameField: 'name',
    valueField: 'Case Count',
    nameProperty: 'name',
    map: 'usa',
    region: [
      {
        roam: true,
        projection: {
          type: 'albersUsa'
        }
      }
    ],
    legends: [
      {
        visible: false
      }
    ]
  };

  return { spec, data };
};

const colors = ['rgb(252,250,97)', 'rgb(252,150,134)', 'rgb(87,33,15)'];
const { spec, data } = await getSpec(colors);
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: new Array(4).fill(0).map((_, index) => ({
            characterId: index.toString(),
            characterActions: [
              {
                action: 'appear',
                payload: { animation: index === 2 ? { duration: 1000, effect: 'grow' } : { duration: 1000 } }
              }
            ]
          }))
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
        width: 1280,
        height: 120
      },
      options: {
        graphic: {
          fill: 'rgb(252,250,97)'
        },
        text: {
          text: 'Rate of New Cancers in the U.S.',
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold',
          fontSize: 56
        }
      }
    },
    {
      id: '1',
      type: 'Image',
      zIndex: 0,
      position: {
        top: 0,
        left: 0,
        width: 1280,
        height: 720
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/cancer-us-bg.png',
          background: 'rgb(47, 43, 40)'
        }
      }
    },
    {
      id: '2',
      type: 'VChart',
      zIndex: 1,
      position: {
        top: 120,
        left: 280,
        width: 1000,
        height: 500
      },
      options: {
        padding: { top: 60, bottom: 0, left: 0, right: 0 },
        spec,
        panel: {
          scaleCenter: [620, 350]
        }
      }
    },
    {
      id: '3',
      type: 'Text',
      zIndex: 1,
      position: {
        top: 180,
        left: 80
      },
      options: {
        graphic: {
          text: ['All Types of Cancer', 'All Ages', 'All Races and Ethnicities', 'Male and Female'],
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 22,
          lineHeight: 36,
          fontWeight: 'bold',
          fill: 'white'
        }
      }
    }
  ]
};

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1280,
  height: 720
});
const player = new VStory.Player(story);
story.init(player);

const minVal = Math.min(...data.map(item => item.value).filter(item => !!item));
const maxVal = Math.max(...data.map(item => item.value));
const val = [
  `> ${(minVal / 1000).toFixed(1)}k`,
  `${(minVal / 1000).toFixed(1)}k - ${(maxVal / 1000).toFixed(1)}k`,
  `< ${(maxVal / 1000).toFixed(1)}k`
];
colors.forEach((item, index) => {
  const size = 40;
  story.addCharacterWithAppear({
    type: 'Shape',
    id: `shape_${index}`,
    zIndex: 1,
    position: {
      top: 380 + index * (size + 50),
      left: 80,
      width: size,
      height: size
    },
    options: {
      graphic: {
        symbolType: 'circle',
        fill: item,
        stroke: 'white'
      }
    }
  });
  story.addCharacterWithAppear({
    type: 'Text',
    id: `text_${index}`,
    zIndex: 1,
    position: {
      top: 380 + index * (size + 50) + 18,
      left: 80 + size + 30
    },
    options: {
      graphic: {
        text: val[index],
        fill: 'white',
        fontSize: 22,
        lineHeight: 36,
        textAlign: 'left',
        textBaseline: 'middle'
      }
    }
  });
});

story.addCharacterWithAppear({
  type: 'Text',
  id: 'annotation',
  zIndex: 1,
  position: {
    top: 660,
    left: 1230
  },
  options: {
    graphic: {
      text: ['Reference', 'https://gis.cdc.gov/Cancer/USCS/'],
      fill: 'white',
      fontSize: 18,
      fontFamily: 'san',
      lineHeight: 26,
      textAlign: 'right',
      textBaseline: 'middle'
    }
  }
});

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
