---
category: examples
group: animate
title: programming-language-popularity
keywords: programming-language-popularity, ranking-bar, timeline, pie-chart
order: 1-1
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/program-languages-order-compress2.gif
---

# 编程语言流行度可视化故事

这个示例展示了如何使用 VStory 创建一个交互式的编程语言流行度可视化故事。它结合了时间轴、动态排名条形图和饼图等多种可视化方式，生动地展示了编程语言流行度的历史变化。

## 代码演示
```javascript livedemo template=vstory
VStory.registerAll();

async function loadDSL() {
  // 时间轴数据
  const timelineData = {
    times: [
      { label: ['Fortran', '1957'], desc: '1957' },
      { label: ['COBOL', '1959'], desc: '1959' },
      { label: ['C', '1972'], desc: '1972' },
      { label: ['C++', '1983'], desc: '1983' },
      { label: ['Python', '1991'], desc: '1991' },
      { label: ['Java,Javascript', '1995'], desc: '1995' },
      { label: ['C#', '2000'], desc: '2000' },
      { label: ['Visual Basic NET', '2002'], desc: '2002' },
      { label: ['PHP', '2004'], desc: '2004' },
      { label: ['Swift', '2014'], desc: '2014' },
    ],
    labelStyle: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    activeSymbolStyle: {
      size: 20
    },
    activeLabelStyle: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  };

  // 排名条形图数据
  const dataJson = {
    data: [
      { "Year": 2008, "Language": "Java", "Rank": 1 },
      { "Year": 2008, "Language": "C", "Rank": 4 },
      { "Year": 2008, "Language": "Python", "Rank": 7 },
      { "Year": 2008, "Language": "C++", "Rank": 5 },
      { "Year": 2008, "Language": "C#", "Rank": 6},
      { "Year": 2008, "Language": "Visual Basic NET", "Rank": 8 },
      { "Year": 2008, "Language": "Javascript", "Rank": 2 },
      { "Year": 2008, "Language": "PHP", "Rank": 3 },
      { "Year": 2008, "Language": "Ruby", "Rank": 9 },
      { "Year": 2008, "Language": "Perl", "Rank": 10 },

      { "Year": 2009, "Language": "Java", "Rank": 1 },
      { "Year": 2009, "Language": "C", "Rank": 5 },
      { "Year": 2009, "Language": "Python", "Rank": 6 },
      { "Year": 2009, "Language": "C++", "Rank": 4 },
      { "Year": 2009, "Language": "C#", "Rank":7 },
      { "Year": 2009, "Language": "Visual Basic NET", "Rank": 8 },
      { "Year": 2009, "Language": "Javascript", "Rank": 2 },
      { "Year": 2009, "Language": "PHP", "Rank": 3 },
      { "Year": 2009, "Language": "Ruby", "Rank": 9 },
      { "Year": 2009, "Language": "Matlab", "Rank": 10 },

      { "Year": 2010, "Language": "Java", "Rank": 1 },
      { "Year": 2010, "Language": "C", "Rank": 5 },
      { "Year": 2010, "Language": "Python", "Rank": 6 },
      { "Year": 2010, "Language": "C++", "Rank": 4 },
      { "Year": 2010, "Language": "C#", "Rank": 5 },
      { "Year": 2010, "Language": "Visual Basic NET", "Rank": 9 },
      { "Year": 2010, "Language": "Javascript", "Rank": 2 },
      { "Year": 2010, "Language": "PHP", "Rank": 3 },
      { "Year": 2010, "Language": "Ruby", "Rank": 10 },
      { "Year": 2010, "Language": "Objective-C", "Rank": 8 },

      { "Year": 2011, "Language": "Java", "Rank": 1 },
      { "Year": 2011, "Language": "C", "Rank": 7 },
      { "Year": 2011, "Language": "Python", "Rank": 4 },
      { "Year": 2011, "Language": "C++", "Rank": 6 },
      { "Year": 2011, "Language": "C#", "Rank": 5 },
      { "Year": 2011, "Language": "Matlab", "Rank": 10 },
      { "Year": 2011, "Language": "Javascript", "Rank": 2 },
      { "Year": 2011, "Language": "PHP", "Rank": 3 },
      { "Year": 2011, "Language": "Ruby", "Rank": 9 },
      { "Year": 2011, "Language": "Objective-C", "Rank": 8 },

      { "Year": 2012, "Language": "Java", "Rank": 1 },
      { "Year": 2012, "Language": "C", "Rank": 7 },
      { "Year": 2012, "Language": "Python", "Rank": 5 },
      { "Year": 2012, "Language": "C++", "Rank": 4 },
      { "Year": 2012, "Language": "C#", "Rank": 6 },
      { "Year": 2012, "Language": "Visual Basic NET", "Rank": 10 },
      { "Year": 2012, "Language": "Javascript", "Rank": 2 },
      { "Year": 2012, "Language": "PHP", "Rank": 3 },
      { "Year": 2012, "Language": "Ruby", "Rank": 9 },
      { "Year": 2012, "Language": "Objective-C", "Rank": 8 },

      { "Year": 2013, "Language": "Java", "Rank": 1 },
      { "Year": 2013, "Language": "C", "Rank": 8 },
      { "Year": 2013, "Language": "Python", "Rank": 4 },
      { "Year": 2013, "Language": "C++", "Rank": 6 },
      { "Year": 2013, "Language": "C#", "Rank": 5 },
      { "Year": 2013, "Language": "Matlab", "Rank": 10 },
      { "Year": 2013, "Language": "Javascript", "Rank": 2 },
      { "Year": 2013, "Language": "PHP", "Rank": 3 },
      { "Year": 2013, "Language": "Objective-C", "Rank": 7 },
      { "Year": 2013, "Language": "Ruby", "Rank": 9 },

      { "Year": 2014, "Language": "Java", "Rank": 1 },
      { "Year": 2014, "Language": "C", "Rank": 7 },
      { "Year": 2014, "Language": "Python", "Rank": 3 },
      { "Year": 2014, "Language": "C++", "Rank": 6 },
      { "Year": 2014, "Language": "C#", "Rank": 5 },
      { "Year": 2014, "Language": "R", "Rank": 10 },
      { "Year": 2014, "Language": "Javascript", "Rank": 2 },
      { "Year": 2014, "Language": "PHP", "Rank": 4 },
      { "Year": 2014, "Language": "Objective-C", "Rank": 8 },
      { "Year": 2014, "Language": "Swift", "Rank": 9 },

      { "Year": 2015, "Language": "Java", "Rank": 1 },
      { "Year": 2015, "Language": "C", "Rank": 7 },
      { "Year": 2015, "Language": "Python", "Rank": 3 },
      { "Year": 2015, "Language": "C++", "Rank": 6 },
      { "Year": 2015, "Language": "C#", "Rank": 5 },
      { "Year": 2015, "Language": "R", "Rank": 10 },
      { "Year": 2015, "Language": "Javascript", "Rank": 2 },
      { "Year": 2015, "Language": "PHP", "Rank": 4 },
      { "Year": 2015, "Language": "Swift", "Rank": 9 },
      { "Year": 2015, "Language": "Objective-C", "Rank": 8 },

      { "Year": 2016, "Language": "Java", "Rank": 1 },
      { "Year": 2016, "Language": "C", "Rank": 7 },
      { "Year": 2016, "Language": "Python", "Rank": 3 },
      { "Year": 2016, "Language": "C++", "Rank": 6 },
      { "Year": 2016, "Language": "C#", "Rank": 5 },
      { "Year": 2016, "Language": "R", "Rank": 9 },
      { "Year": 2016, "Language": "Javascript", "Rank": 2 },
      { "Year": 2016, "Language": "PHP", "Rank": 4 },
      { "Year": 2016, "Language": "Swift", "Rank": 10 },
      { "Year": 2016, "Language": "Objective-C", "Rank": 8 },

      { "Year": 2017, "Language": "Java", "Rank": 1 },
      { "Year": 2017, "Language": "C", "Rank": 7 },
      { "Year": 2017, "Language": "Python", "Rank": 3 },
      { "Year": 2017, "Language": "C++", "Rank": 6 },
      { "Year": 2017, "Language": "C#", "Rank": 5 },
      { "Year": 2017, "Language": "R", "Rank": 8 },
      { "Year": 2017, "Language": "Javascript", "Rank": 2 },
      { "Year": 2017, "Language": "PHP", "Rank": 4 },
      { "Year": 2017, "Language": "Swift", "Rank": 10 },
      { "Year": 2017, "Language": " Objective-C", "Rank": 9 },

      { "Year": 2018, "Language": "Java", "Rank": 1 },
      { "Year": 2018, "Language": "C", "Rank": 7 },
      { "Year": 2018, "Language": "Python", "Rank": 3 },
      { "Year": 2018, "Language": "C++", "Rank": 6 },
      { "Year": 2018, "Language": "C#", "Rank": 5 },
      { "Year": 2018, "Language": "R", "Rank": 8 },
      { "Year": 2018, "Language": "Javascript", "Rank": 2 },
      { "Year": 2018, "Language": "PHP", "Rank": 4 },
      { "Year": 2018, "Language": "Swift", "Rank": 10 },
      { "Year": 2018, "Language": " Objective-C", "Rank": 9 },

      { "Year": 2019, "Language": "Java", "Rank": 3 },
      { "Year": 2019, "Language": "C", "Rank": 7 },
      { "Year": 2019, "Language": "Python", "Rank": 1 },
      { "Year": 2019, "Language": "C++", "Rank": 6 },
      { "Year": 2019, "Language": "C#", "Rank": 4 },
      { "Year": 2019, "Language": "Objective-C", "Rank": 10 },
      { "Year": 2019, "Language": "Javascript", "Rank": 2 },
      { "Year": 2019, "Language": "PHP", "Rank": 5 },
      { "Year": 2019, "Language": "Swift", "Rank": 9 },
      { "Year": 2019, "Language": "R", "Rank": 8 },

      { "Year": 2020, "Language": "Java", "Rank": 1 },
      { "Year": 2020, "Language": "C", "Rank": 2 },
      { "Year": 2020, "Language": "Python", "Rank": 3 },
      { "Year": 2020, "Language": "C++", "Rank": 4 },
      { "Year": 2020, "Language": "C#", "Rank": 5 },
      { "Year": 2020, "Language": "Visual Basic NET", "Rank": 6 },
      { "Year": 2020, "Language": "Javascript", "Rank": 7 },
      { "Year": 2020, "Language": "PHP", "Rank": 8 },
      { "Year": 2020, "Language": "Swift", "Rank": 9 },
      { "Year": 2020, "Language": "SQL", "Rank": 10 },

      { "Year": 2021, "Language": "Python", "Rank": 1 },
      { "Year": 2021, "Language": "Java", "Rank": 2 },
      { "Year": 2021, "Language": "C", "Rank": 3 },
      { "Year": 2021, "Language": "C++", "Rank": 4 },
      { "Year": 2021, "Language": "Javascript", "Rank": 5 },
      { "Year": 2021, "Language": "C#", "Rank": 6 },
      { "Year": 2021, "Language": "R", "Rank": 7 },
      { "Year": 2021, "Language": "Go", "Rank": 8 },
      { "Year": 2021, "Language": "HTML", "Rank": 9 },
      { "Year": 2021, "Language": "Swift", "Rank": 10 },

      { "Year": 2022, "Language": "Python", "Rank": 1 },
      { "Year": 2022, "Language": "Java", "Rank": 2 },
      { "Year": 2022, "Language": "JavaScript", "Rank": 3 },
      { "Year": 2022, "Language": "C", "Rank": 4 },
      { "Year": 2022, "Language": "C++", "Rank": 5 },
      { "Year": 2022, "Language": "PHP", "Rank": 6 },
      { "Year": 2022, "Language": "Ruby", "Rank": 7 },
      { "Year": 2022, "Language": "Swift", "Rank": 8 },
      { "Year": 2022, "Language": "Go", "Rank": 9 },
      { "Year": 2022, "Language": "R", "Rank": 10 },

      { "Year": 2023, "Language": "Python", "Rank": 1 },
      { "Year": 2023, "Language": "Java", "Rank": 2 },
      { "Year": 2023, "Language": "JavaScript", "Rank": 3 },
      { "Year": 2023, "Language": "C", "Rank": 4 },
      { "Year": 2023, "Language": "C++", "Rank": 5 },
      { "Year": 2023, "Language": "PHP", "Rank": 6 },
      { "Year": 2023, "Language": "Ruby", "Rank": 7 },
      { "Year": 2023, "Language": "Swift", "Rank": 8 },
      { "Year": 2023, "Language": "Go", "Rank": 9 },
      { "Year": 2023, "Language": "R", "Rank": 10 },

      { "Year": 2024, "Language": "Python", "Rank": 1 },
      { "Year": 2024, "Language": "Java", "Rank": 2 },
      { "Year": 2024, "Language": "JavaScript", "Rank": 3 },
      { "Year": 2024, "Language": "C", "Rank": 4 },
      { "Year": 2024, "Language": "C++", "Rank": 5 },
      { "Year": 2024, "Language": "PHP", "Rank": 6 },
      { "Year": 2024, "Language": "Ruby", "Rank": 7 },
      { "Year": 2024, "Language": "Swift", "Rank": 8 },
      { "Year": 2024, "Language": "Go", "Rank": 9 },
      { "Year": 2024, "Language": "R", "Rank": 10 },

    ]
  };

  const yearsData = new Map();
  const languageImage = new Map();
  const allData = [];

  dataJson.data.forEach((line) => {
    const { Language, Rank, Year } = line;
    const language_year_data = { Year, Language, Rank };
    if (!yearsData.has(Year)) {
      yearsData.set(Year, []);
    }
    yearsData.get(Year).push(language_year_data);
  });

  yearsData.forEach(value => {
    allData.push(...value);
  });

  // 排名条形图规格
  const rankingBarSpec = {
    type: 'rankingBar',
    data: allData,
    timeField: 'Year',
    xField: 'Rank',
    yField: 'Language',
    //icon: Object.fromEntries(languageImage),
    interval: 2000,
    color: {
      Python: 'blue',
      Java: '#F8981D',
      JavaScript: '#F0DB4F',
      C: 'red',
      Ruby: '#CC342D',
      PHP: '#4F5B93',
      Swift: '#F05138',
      Go: '#00ADD8',
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
      style: { fill: 'white' },
      formatMethod: (text, datum) => {
        if (datum.Language === 'C') {
          return { text: text, style: { fontWeight: 'bold', fill: 'red' } };
        }
        return { text: text };
      }
    }
  };

  // 饼图配置
  const chartSpec = {
    type: 'pie',
    
    data: [
      {
        values: [
          { language: 'C', percentage: 88 },
          { language: 'Other', percentage: 12 }
        ]
      }
    ],
    outerRadius: 0.8,
    valueField: 'percentage',
    categoryField: 'language',
    title: {
      visible: true,
      text: 'C语言占比',
      
    },
    legends: {
      visible: true,
      orient: 'left'
    },
    label: {
      visible: true,
      formatMethod: (text, datum) => `${datum.percentage}%`, // 显示百分比
      style: {
      fill: 'white', 
      fontSize: 14, 
      fontWeight: 'bold' 
      },
    }
  };

  return {
    characters: [

      // 添加时间轴
      {
        type: 'Timeline',
        id: 'timeline',
        zIndex: 1,
        position: {
          top: 90,
          left: 0,
          width: 1100,
          height: 100,
        },
        options: {
          graphic: timelineData,
        }
      },
      // 添加排名条形图
      {
        type: 'RankingBar',
        id: 'bar',
        zIndex: 10,
        position: {
          top: 170,
          left: 20,
          width: 600,
          height: 400
        },
        options: {
          spec: rankingBarSpec,
          panel: {
            fill: 'linear-gradient(135deg,rgb(255, 215, 245) 50%,#667eea 0%)',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 8
          }
        },
      },
      // 添加标题
      {
        type: 'Text',
        id: 'title',
        zIndex: 11,
        position: {
          top: 20,
          left: 500,
        },
        options: {
          graphic: {
            text: 'Programming Language Popularity',
            fontSize: 24,
            fontWeight: 'bold',
            fill: 'white'
          }
        }
      },
      //内容
      {
        type: 'Text',
        id: 'wenben',
        zIndex: 11,
        position: {
          top: 170,
          left: 850,
        },
        options: {
          graphic: {
            text: 'C 语言经久不衰',
            fontSize: 20,
            fontWeight: 'bold',
            fill: 'linear-gradient(135deg,rgb(192, 169, 214) 50%,#667eea 0%)'
          }
        }
      },

      //副内容
      {
        type: 'Text',
        id: 'fuwenben',
        zIndex: 11,
        position: {
          top: 190,
          left: 850,
          width:302,
          height:0,
        },
        options: {
          graphic: {
            text: '自1972年诞生以来，C 语言一直是最流行的编程语言之一。它的语法简单、灵活，并且具有高效的运行速度。C 语言广泛应用于系统编程、嵌入式开发、游戏开发等领域。',
            fill: 'white'
          }
        }
      },
      //副副内容
      {
        type: 'Text',
        id: 'fufwenben',
        zIndex: 11,
        startTime:10000,
        position: {
          top: 315,
          left: 850,
          width:302,
          height:0,
        },
        options: {
          graphic: {
            text: '',
            fontWeight:'bold',
            fill: '#333'
          }
        }
      },
      // 添加饼图
      {
        type: 'VChart',
        id: 'cPieChart',
        zIndex: 10,
        position: {
          top: 290,
          left: 700, 
          width: 300,
          height: 280
        },
        options: {
          spec: chartSpec,
          panel: {
            fill: 'linear-gradient(135deg,rgb(192, 169, 214) 50%,#667eea 0%)',
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
              // 时间轴动作
              {
                characterId: 'timeline',
                characterActions: [
                  {
                    startTime: 1000,
                    action: 'appear',
                    payload: {
                      animation: {
                        duration: 2000,
                        effect: 'default'
                      }
                    }
                  },
                  ...(new Array(timelineData.times.length+1).fill(0).map((item, index) => {
                    return {
                      startTime: 3000 + index * 3100,
                      action: 'state',
                      payload: {
                        animation: {
                          duration: 3000,
                          effect: 'forward'
                        }
                      }
                    };
                  }))
                ]
              },

              // 排名条形图动画
              {
                characterId: 'bar',
                characterActions: [
                  {
                    action: 'appear',
                    payload: { animation: { duration: 1000, effect: 'fade' } }
                  },
                  {
                    action: 'bounce',
                    payload: {
                      customEase: 'M0,0 C0,0 0,0 0.047,0 0.047,0 0.103,1 0.236,1 0.368,1 0.424,0 0.424,0 0.424,0 0.443,0 0.443,0 0.443,0 0.471,0.49 0.553,0.49 0.619,0.49 0.668,0 0.668,0 0.668,0 0.677,0 0.677,0 0.677,0 0.699,0.216 0.743,0.216 0.778,0.216 0.811,0 0.811,0 0.811,0 0.815,0 0.815,0 0.815,0 0.828,0.086 0.854,0.086 0.875,0.086 0.895,0 0.895,0 0.895,0 0.896,0 0.896,0 0.896,0 0.904,0.031 0.92,0.031 0.932,0.031 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.948,0.01 0.958,0.01 0.966,0.01 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.975,0.002 0.981,0.002 0.986,0.002 0.989,0 0.989,0 0.989,0 0.99,0 0.99,0 0.99,0 0.99,0 0.994,0 0.998,0 1,0 1,0',
                      animation: { duration: 2000 }
                    }
                  }
                ]
              },
              // 标题动画
              {
                characterId: 'title',
                characterActions: [
                  {
                    action: 'appear',
                    payload: { animation: { duration: 1000, effect: 'fade' } }
                  }
                ]
              },
              //文本动画
              {
                characterId: 'wenben',
                characterActions: [
                  {
                    action: 'appear',
                    payload: { animation: { duration: 10000, effect: 'fade' } }
                  }
                ]
              },
              //副文本动画
              {
                characterId: 'fuwenben',
                characterActions: [
                  {
                    action: 'appear',
                    payload: { animation: { duration: 20000, effect: 'fade' } }
                  }
                ]
              },

              //副副文本动画
              {
                characterId: 'fufwenben',
                characterActions: [
                  {
                    action: 'appear',
                    payload: { animation: { duration: 1000, effect: 'fade' } }
                  }
                ]
              },
              // 饼图动画
              {
                characterId: 'cPieChart',
                characterActions: [
                  {
                    startTime:10000,
                    action: 'appear',
                    payload: { animation: { duration: 1000, effect: 'fade' } }
                  }
                ]
              },

            ]
          },
        ]
      }
    ]
  };
}

// 加载并初始化
const dsl = await loadDSL();

const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  width: 1100,
  height: 600,
  scaleX: 'auto',
  scaleY: 'auto',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
});
const player = new VStory.Player(story);
story.init(player);

player.play(0);

window['story'] = story;
window['vstory'] = story;
```
