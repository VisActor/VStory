---
category: examples
group: infographic
title: Ultraman TV Chronicle
keywords: templates, visualization, timeline, infographic
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/ultraman/ultraman.png
---

# Ultraman TV Chronicle

## Code Demo

```javascript livedemo template=vstory
VStory.registerAll();

const Multilingual = {
  year: 'year',
  height: 'height',
  weight: 'weight',
  flight_speed: 'flight_speed',
  grip_strength: 'grip_strength'
};

const data = [
  {
    year: 1966,
    text: 'Ultraman',
    desc: 'Ultraman\nThe foundational work, the first Ultra hero from Nebula M78. His classic appearance and soundtrack influenced generations.',
    height_m: 40, // Height (m) [1]
    weight_t: 35000, // Weight (t) [1]
    flight_speed_mach: 5, // Flight Speed (Mach) [1]
    grip_strength_t: null // Grip Strength (t) - Not officially provided [1], only arm strength described [2]
  },
  {
    year: 1967,
    text: 'Ultraseven',
    desc: 'Ultraseven\nIndependent worldview, deeper sci-fi plot, exploring profound themes like humanity and the universe, war and peace.',
    height_m: 40, // Height (m) [3]
    weight_t: 35000, // Weight (t) [3]
    flight_speed_mach: 7, // Flight Speed (Mach) [3]
    grip_strength_t: null // Grip Strength (t) - Not officially provided [3], only arm strength described [4]
  },
  {
    year: 1971,
    text: 'Return of Ultraman',
    desc: 'Return of Ultraman\nThe reboot work of the Showa series, first introduced the "Ultra Brothers" concept, showcasing the desperate struggle between the Earth Defense Force and monsters.',
    height_m: 40, // Height (m) [5]
    weight_t: 35000, // Weight (t) [5]
    flight_speed_mach: 5, // Flight Speed (Mach) [5]
    grip_strength_t: null // Grip Strength (t) - Not officially provided [5], only arm strength described [6]
  },
  {
    year: 1972,
    text: 'Ultraman Ace',
    desc: 'Ultraman Ace\nThe first Ultraman transformed by two people merging, strengthening the brotherhood setting. His unique superpowers and beam skills are impressive.',
    height_m: 40, // Height (m) [7, 8]
    weight_t: 45000, // Weight (t) [7, 8]
    flight_speed_mach: 20, // Flight Speed (Mach) [8]
    grip_strength_t: null // Grip Strength (t) - Wikipedia describes as arm strength [8]
  },
  {
    year: 1973,
    text: 'Ultraman Taro',
    desc: "Ultraman Taro\nCommemorative work for Tsuburaya Productions' 10th anniversary, light-hearted and humorous style. Protagonist Taro's growth story is full of passion and courage.",
    height_m: 53, // Height (m) [7]
    weight_t: 55000, // Weight (t) [7]
    flight_speed_mach: 20, // Flight Speed (Mach) - Confirmed via external Wiki
    grip_strength_t: null // Grip Strength (t) - Confirmed via external Wiki that there's no clear grip strength value
  },
  {
    year: 1974,
    text: 'Ultraman Leo',
    desc: 'Ultraman Leo\nThe first warrior not from Nebula M78, plot leans towards dark realism, telling the story of Leo constantly honing himself and getting stronger through harsh battles.',
    height_m: 52, // Height (m) [9]
    weight_t: 48000, // Weight (t) [9]
    flight_speed_mach: 7, // Flight Speed (Mach) [9]
    grip_strength_t: null // Grip Strength (t) - Not officially provided [9], only arm strength described [10]
  },
  {
    year: 1980,
    text: 'Ultraman 80',
    desc: "Ultraman 80\nThe concluding work of the Showa series, the protagonist has no defeats, emphasizing the importance of humanity's own strength and environmental protection.",
    height_m: 50, // Height (m) [11]
    weight_t: 44000, // Weight (t) [11]
    flight_speed_mach: 9, // Flight Speed (Mach) [11]
    grip_strength_t: null // Grip Strength (t) - Not provided by official sources or Wiki [11, 12]
  },
  {
    year: 1990,
    text: 'Ultraman Great',
    desc: 'Ultraman Great\nCo-produced with Australia, the first international Ultraman. His rugged appearance and unique transformation method left a deep impression on the audience.',
    height_m: 60, // Height (m) [13]
    weight_t: 58000, // Weight (t) [13]
    flight_speed_mach: 26, // Flight Speed (Mach) [13]
    grip_strength_t: null // Grip Strength (t) - Not provided by official or other sources [13]
  },
  {
    year: 1996,
    text: 'Ultraman Tiga',
    desc: 'Ultraman Tiga\nThe beginning of the Heisei trilogy, introduced the "form change" setting. Won wide acclaim for its excellent production and profound plot.',
    height_m: 53, // Height (m) - Confirmed via external Wiki [14]
    weight_t: 44000, // Weight (t) - Confirmed via external Wiki [14]
    flight_speed_mach: 5, // Flight Speed (Mach) - Confirmed via external Wiki [14]
    grip_strength_t: 50000 // Grip Strength (t) - Confirmed via external Wiki [15]
  },
  {
    year: 1997,
    text: 'Ultraman Dyna',
    desc: "Ultraman Dyna\nContinues the Tiga worldview, expands the setting to space. Protagonist Shin Asuka's optimistic spirit infected countless viewers.",
    height_m: 55, // Height (m) - Confirmed via external Wiki
    weight_t: 45000, // Weight (t) - Confirmed via external Wiki
    flight_speed_mach: 8, // Flight Speed (Mach) - Confirmed via external Wiki
    grip_strength_t: 60000 // Grip Strength (t) - Confirmed via external Wiki
  },
  {
    year: 1998,
    text: 'Ultraman Gaia',
    desc: "Ultraman Gaia\nFirst setting with two opposing Ultramen, explores the theme of Earth's own will coexisting with humanity.",
    height_m: 50, // Height (m) - Confirmed via external Wiki (V2 Form)
    weight_t: 42000, // Weight (t) - Confirmed via external Wiki (V2 Form)
    flight_speed_mach: 20, // Flight Speed (Mach) - Confirmed via external Wiki (V2 Form)
    grip_strength_t: 70000 // Grip Strength (t) - Confirmed via external Wiki (V2 Form)
  },
  {
    year: 2001,
    text: 'Ultraman Cosmos',
    desc: 'Ultraman Cosmos\nLongest TV series (65 episodes), theme emphasizes peace, showcasing the philosophy of solving problems through communication and understanding.',
    height_m: 47, // Height (m) [16]
    weight_t: 42000, // Weight (t) [16]
    flight_speed_mach: 7, // Flight Speed (Mach) [16]
    grip_strength_t: 60000 // Grip Strength (t) [16]
  },
  {
    year: 2004,
    text: 'Ultraman Nexus',
    desc: 'Ultraman Nexus\nAimed at adults, cut short to 38 episodes due to ratings, but its profound plot and oppressive atmosphere are highly rated among fans.',
    height_m: 49, // Height (m) - Confirmed via external Wiki (Anphans Form)
    weight_t: 40000, // Weight (t) - Confirmed via external Wiki (Anphans Form)
    flight_speed_mach: 3, // Flight Speed (Mach) - Confirmed via external Wiki (Anphans Form)
    grip_strength_t: 55000 // Grip Strength (t) - Confirmed via external Wiki (Anphans Form)
  },
  {
    year: 2006,
    text: 'Ultraman Mebius',
    desc: "Ultraman Mebius\nReturn to the Showa worldview, commemorates the series' 40th anniversary, paying homage to classic works like the original Ultraman.",
    height_m: 49, // Height (m) [17, 18]
    weight_t: 35000, // Weight (t) [17, 18]
    flight_speed_mach: 10, // Flight Speed (Mach) [17, 18]
    grip_strength_t: 90000 // Grip Strength (t) [19]
  },
  {
    year: 2013,
    text: 'Ultraman Ginga',
    desc: 'Ultraman Ginga\nBeginning of the New Generation series, introduced the "Spark Dolls" setting, opening a new chapter for the Ultraman series.',
    height_m: 'Micro - Infinity', // Height (m) - Special setting/stats [20]
    weight_t: '0 - Infinity', // Weight (t) - Special setting/stats [20]
    flight_speed_mach: 'Immeasurable', // Flight Speed (Mach) - Special setting/stats [20]
    grip_strength_t: null // Grip Strength (t) - Confirmed missing via Wiki [20]
  },
  {
    year: 2015,
    text: 'Ultraman X',
    desc: 'Ultraman X\nFirst to combine "Cyber Armor" in battles, showcasing the fusion of technology and Ultra power.',
    height_m: 45, // Height (m) [21]
    weight_t: 45000, // Weight (t) [21]
    flight_speed_mach: 9, // Flight Speed (Mach) [21]
    grip_strength_t: 82000 // Grip Strength (t) [21]
  },
  {
    year: 2016,
    text: 'Ultraman Orb',
    desc: 'Ultraman Orb\nThe "borrowing power" model fusing strengths of predecessors, allowing audiences to revisit classic images of past Ultramen.',
    height_m: 50, // Height (m) - Confirmed via official query [22] (Spacium Zeperion Form)
    weight_t: 50000, // Weight (t) - Confirmed via official query [22] (Spacium Zeperion Form)
    flight_speed_mach: 6.5, // Flight Speed (Mach) [23] (Spacium Zeperion Form)
    grip_strength_t: 65000 // Grip Strength (t) [23] (Spacium Zeperion Form)
  },
  {
    year: 2019,
    text: 'Ultraman Taiga',
    desc: 'Ultraman Taiga\nThe first protagonist who is an "Ultra\'s son" after Zero, telling the story of a New Generation three-Ultraman team.',
    height_m: 50, // Height (m) [24]
    weight_t: 50000, // Weight (t) [24] (Using official data)
    flight_speed_mach: 10, // Flight Speed (Mach) [25]
    grip_strength_t: 45000 // Grip Strength (t) [25]
  },
  {
    year: 2020,
    text: 'Ultraman Z',
    desc: 'Ultraman Z\nA highly acclaimed work, winner of the Seiun Award in Japan. Its tight plot and exciting fight scenes are beloved by audiences.',
    height_m: 52, // Height (m) [26] (Original Form)
    weight_t: 33000, // Weight (t) [26] (Original Form)
    flight_speed_mach: 7, // Flight Speed (Mach) [27, 28] (Original Form)
    grip_strength_t: 62000 // Grip Strength (t) [27, 28] (Original Form)
  },
  {
    year: 2023,
    text: 'Ultraman Blazar',
    desc: 'Ultraman Blazar\nReturns to a primal, wild fighting style. Attracted significant attention with its unique narrative style and monster design.',
    height_m: 47, // Height (m) - Confirmed via external official source
    weight_t: 33000, // Weight (t) - Confirmed via external official source
    flight_speed_mach: 20, // Flight Speed (Mach) - Confirmed missing via external official source
    grip_strength_t: null // Grip Strength (t) - Confirmed missing via external official source
  }
];
//
const yearDistance = 60;
const yearTime = 2000;
const playStartTime = 1000;

const activeColor = '#FFA500';

const symbolDefaultStyle = {
  size: 8,
  symbolType: 'circle',
  fill: 'gray',
  stroke: false
};
const symbolActiveStyle = {
  size: 15,
  fill: activeColor
};

const textDefaultStyle = {
  fontSize: 16,
  fill: 'gray'
};

const textActiveStyle = {
  fontSize: 22,
  fill: activeColor,
  fontWeight: 'bold'
};

function addTimeLine(story) {
  const startPos = { x: 1065, y: 90 };

  story.addCharacter(
    {
      type: 'Rect',
      id: `timeline_bg`,
      zIndex: 1,
      position: { x: startPos.x - 40, y: startPos.y - 40, width: 400, height: 1250 },
      options: {
        graphic: {
          fill: 'white',
          cornerRadius: 10
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        }
      ]
    }
  );

  data.forEach(({ year, text }, index) => {
    addYearComponent(story, Number(year), index, text, startPos, 'vertical', false);
  });

  addLine(story, startPos, data.length);
}

function addYearComponent(story, year, index, text, startPos, direction, revertLayoutSide) {
  const startTime = playStartTime + index * yearTime;
  const pos = {
    ...startPos,
    width: 500,
    height: 500
  };
  if (direction === 'horizontal') {
    pos.x = startPos.x + index * yearDistance * (revertLayoutSide ? -1 : 1);
  } else {
    pos.y = startPos.y + index * yearDistance * (revertLayoutSide ? -1 : 1);
  }
  // symbol
  story.addCharacter(
    {
      type: 'Shape',
      id: `year_${year}`,
      zIndex: 5,
      position: { ...pos },
      options: {
        graphic: { ...symbolDefaultStyle }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        },
        {
          action: 'style',
          startTime: startTime,
          payload: {
            animation: {
              duration: 200,
              easing: 'cubicInOut'
            },
            graphic: { ...symbolActiveStyle }
          }
        }
      ]
    }
  );

  // year text
  const labelPos = { ...pos };
  if (direction === 'horizontal') {
    labelPos.y = startPos.y + 30 * (revertLayoutSide ? 1 : -1);
  } else {
    labelPos.x = startPos.x + 30;
    labelPos.y += 3.5;
  }
  story.addCharacter(
    {
      type: 'Text',
      id: `text_${year}`,
      zIndex: 5,
      position: labelPos,
      options: {
        graphic: {
          ...textDefaultStyle,
          text: `${year}`,
          textBaseline: 'middle',
          textAlign: direction === 'vertical' ? 'left' : 'center'
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        },
        {
          action: 'style',
          startTime: startTime,
          payload: {
            animation: {
              duration: 200,
              easing: 'quadIn'
            },
            text: textActiveStyle
          }
        }
      ]
    }
  );

  story.addCharacter(
    {
      type: 'Text',
      id: `text_movie_${year}`,
      zIndex: 5,
      position: {
        ...labelPos,
        x: labelPos.x + 80
      },
      options: {
        graphic: {
          ...textActiveStyle,
          text,
          textBaseline: 'middle',
          textAlign: direction === 'vertical' ? 'left' : 'center'
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: startTime,
          payload: {
            animation: {
              duration: 1000,
              easing: 'linear',
              effect: 'typewriter'
            }
          }
        }
      ]
    }
  );

  // 添加描述文本
  const descStrings = data[index].desc.split('\n');
  story.addCharacter(
    {
      type: 'Text',
      id: `tv_desc_${year}_title`,
      zIndex: 1,
      position: {
        top: 160,
        left: 170,
        width: 680,
        height: 320
      },
      options: {
        graphic: {
          fill: 'black',
          fontSize: 38,
          text: descStrings[0],
          textAlign: 'center',
          align: 'left',
          lineHeight: 40,
          fontFamily: 'cursive'
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: startTime - 200,
          payload: {
            animation: {
              duration: 500,
              easing: 'linear',
              effect: 'typewriter'
            }
          }
        },
        {
          action: 'disappear',
          startTime: startTime + yearTime - 200,
          payload: {
            animation: {
              duration: 1
            }
          }
        }
      ]
    }
  );
  story.addCharacter(
    {
      type: 'Text',
      id: `tv_desc_${year}`,
      zIndex: 1,
      position: {
        top: 240,
        left: 190,
        width: 640,
        height: 320
      },
      options: {
        graphic: {
          fill: 'black',
          fontSize: 28,
          text: descStrings[1],
          textAlign: 'center',
          align: 'left',
          lineHeight: 50,
          fontFamily: 'cursive'
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: startTime + 500 - 200,
          payload: {
            animation: {
              duration: yearTime - 500 - 200,
              easing: 'linear',
              effect: 'typewriter'
            }
          }
        },
        {
          action: 'disappear',
          startTime: startTime + yearTime - 200,
          payload: {
            animation: {
              duration: 1
            }
          }
        }
      ]
    }
  );
}

function addLine(story, startPos, total) {
  const position = {
    x: startPos.x + 2,
    y: startPos.y,
    width: 4,
    height: 1500
  };
  const graphic = () => {
    return {
      stroke: 'rgba(0, 0, 0, 0.5)',
      lineWidth: 1,
      points: [
        { x: 2, y: 0 },
        { x: 2, y: (total - 1) * yearDistance }
      ]
    };
  };
  story.addCharacter(
    {
      type: 'Line',
      id: `line_dash`,
      zIndex: 2,
      position: { ...position },
      options: {
        graphic: {
          ...graphic(),
          lineDash: [4, 4]
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        }
      ]
    }
  );

  story.addCharacter(
    {
      type: 'Line',
      id: `line_time`,
      zIndex: 3,
      position: { ...position },
      options: {
        graphic: {
          ...graphic(),
          lineDash: [1, 0],
          stroke: activeColor,
          clipRange: 0
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        },
        {
          action: 'style',
          startTime: playStartTime,
          payload: {
            animation: {
              duration: yearTime * (data.length - 1)
            },
            graphic: {
              clipRange: 1
            }
          }
        }
      ]
    }
  );
}

function addFull(story) {
  story.addCharacter(
    {
      type: 'Image',
      id: `qjf`,
      zIndex: 5,
      position: {
        top: 50,
        left: 120,
        width: 785,
        height: 1250
      },
      options: {
        graphic: {
          fill: 'rgba(0, 0, 0, 0.5)',
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/ultraman/qjf.png',
          cornerRadius: 10
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: playStartTime + yearTime * data.length,
          payload: {
            animation: {
              effect: 'fadeIn',
              duration: 3000
            }
          }
        }
      ]
    }
  );
}

function addBg(story) {
  // 背景
  story.addCharacter(
    {
      type: 'Image',
      id: `bg`,
      zIndex: 0,
      position: {
        top: 0,
        left: 0,
        width: 1500,
        height: 1500
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/ultraman/bg.png',
          opacity: 0.2
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        }
      ]
    }
  );
}

function addTV(story) {
  // 背景
  story.addCharacter(
    {
      type: 'Image',
      id: `tv`,
      zIndex: 1,
      position: {
        top: 500,
        left: 90,
        width: 720 * 1.2,
        height: 660 * 1.2
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/ultraman/tv.png'
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        },
        {
          action: 'disappear',
          startTime: playStartTime + yearTime * data.length,
          payload: {
            animation: {
              duration: 200
            }
          }
        }
      ]
    }
  );

  // 文字背景
  story.addCharacter(
    {
      type: 'Rect',
      id: `tv_text_bg`,
      zIndex: 1,
      position: {
        top: 120,
        left: 150,
        width: 720,
        height: 320
      },
      options: {
        panel: {
          fill: 'red',
          cornerRadius: 20
        },
        graphic: {
          fill: 'white',
          cornerRadius: 20
        }
      }
    },
    {
      sceneId: 'defaultScene',
      actions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              duration: 0
            }
          }
        },
        {
          action: 'disappear',
          startTime: playStartTime + yearTime * data.length,
          payload: {
            animation: {
              duration: 1000
            }
          }
        }
      ]
    }
  );

  // 增加电视下方的柱图
  story.addCharacter(
    {
      id: '0',
      type: 'VChart',
      zIndex: 3,
      position: {
        x: 230,
        y: 960,
        width: 600,
        height: 220,
        angle: 0
      },
      options: {
        panel: {
          fill: 'white',
          cornerRadius: 20
        },
        spec: {
          type: 'bar',
          data: [
            {
              id: 'data',
              values: [
                { type: Multilingual.height, value: +data[0].height_m / 60 },
                { type: Multilingual.weight, value: +data[0].weight_t / 60000 },
                { type: Multilingual.flight_speed, value: +data[0].flight_speed_mach / 20 }
              ]
            }
          ],
          xField: 'type',
          yField: 'value',
          seriesField: 'type',
          color: [
            {
              gradient: 'linear',
              x0: 0,
              y0: 0,
              x1: 1,
              y1: 1,
              stops: [
                {
                  offset: 0,
                  color: '#a8e063'
                },
                {
                  offset: 1,
                  color: '#56ab2f'
                }
              ]
            },
            {
              gradient: 'linear',
              x0: 0,
              y0: 0,
              x1: 1,
              y1: 1,
              stops: [
                {
                  offset: 0,
                  color: '#f6d365'
                },
                {
                  offset: 1,
                  color: '#fda085'
                }
              ]
            },
            {
              gradient: 'linear',
              x0: 0,
              y0: 0,
              x1: 1,
              y1: 1,
              stops: [
                {
                  offset: 0,
                  color: '#a1c4fd'
                },
                {
                  offset: 1,
                  color: '#c2e9fb'
                }
              ]
            }
          ],
          axes: [
            {
              orient: 'left',
              visible: false
            },
            {
              orient: 'bottom',
              paddingOuter: [0.4],
              paddingInner: [0.7]
            }
          ],
          tooltip: {
            visible: false
          }
        }
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
                duration: 500,
                easing: 'linear'
              }
            }
          ]
        },
        ...data.map((item, index) => {
          return {
            action: 'update',
            startTime: playStartTime + index * yearTime,
            payload: {
              id: 'data',
              duration: 1000,
              values: [
                { type: Multilingual.height, value: isFinite(+item.height_m) ? +item.height_m / 60 : 1 },
                { type: Multilingual.weight, value: isFinite(+item.weight_t) ? +item.weight_t / 60000 : 1 },
                {
                  type: Multilingual.flight_speed,
                  value: isFinite(+item.flight_speed_mach) ? +item.flight_speed_mach / 20 : 1
                }
              ]
            }
          };
        })
      ]
    }
  );

  // 增加电视播放的gif
  data.forEach((item, index) => {
    story.addCharacter(
      {
        type: 'Image',
        id: 'gif_' + index,
        zIndex: 0,
        position: {
          top: 500,
          left: 100,
          width: 800,
          height: 572
        },
        options: {
          graphic: {
            subType: 'gif',
            gifImage: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/ultraman/gif/${item.year}.gif`
          }
        }
      },
      {
        sceneId: 'defaultScene',
        actions: [
          {
            action: 'appear',
            startTime: playStartTime + index * yearTime,
            payload: [
              {
                animation: {
                  duration: 10
                }
              }
            ]
          },
          {
            action: 'style',
            startTime: playStartTime + (index + 1) * yearTime,
            payload: [
              {
                animation: {
                  duration: 1
                },
                graphic: {
                  visible: false
                }
              }
            ]
          },
          {
            action: 'disappear',
            startTime: playStartTime + (index + 1) * yearTime,
            payload: [
              {
                animation: {
                  duration: 1
                }
              }
            ]
          }
        ]
      }
    );
  });
}

const story = new VStory.Story(null, {
  dom: CONTAINER_ID,
  scaleX: 'auto',
  scaleY: 'auto',
  width: 1500,
  height: 1359,
  background: 'white'
});
const player = new VStory.Player(story);
story.init(player);

addBg(story);
addTV(story);
addTimeLine(story);
addFull(story);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
