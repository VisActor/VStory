---
category: examples
group: works-show
title: national-memorial
keywords: national-memorial
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/national-memorial.png
---

# `National Memorial` Works Showcase

Remember history, cherish peace

## Code Demo

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

// 2018 http://www.81.cn/2018njdts81zn/2018-12/12/content_9376268.htm
// 2019 http://www.legaldaily.com.cn/gallery/content/2019-12/13/content_8073861.html
// 2020 https://photo.cctv.com/2020/12/12/PHOA4uUqqopn5Ya9eDCu8u7U201212.shtml#O0RgZnlNmfkz201212_1
// 2021 http://www.news.cn/politics/2021-12/12/c_1128156191.htm
// 2022 http://www.news.cn/photo/2022-12/12/c_1129202736_2.htm
// 2023 http://www.mod.gov.cn/gfbw/gfjy_index/16272859.html
// 2024 https://www.news.cn/photo/20241212/bbf958bbe701456c9c259612d2db0f6c/c.html?page=1
const data = [
  {
    name: "孙富祥",
    year: []
  },
  {
      name: "管光镜",
      year: []
  },
  {
      name: "祝四孜",
      year: []
  },
  {
      name: "刘庭玉",
      year: []
  },
  {
      name: "陈玉兰",
      year: []
  },
  {
      name: "李素芬",
      year: []
  },
  {
      name: "易翠兰",
      year: []
  },
  {
      name: "李素云",
      year: []
  },
  {
      name: "吕金宝",
      year: []
  },
  {
      name: "陈广顺",
      year: []
  },
  {
      name: "顾秀兰",
      year: []
  },
  {
      name: "沈淑静",
      year: []
  },
  {
      name: "赵金华",
      year: []
  },
  {
      name: "李高山",
      year: []
  },
  {
      name: "王秀英",
      year: []
  },
  {
      name: "张秀红",
      year: []
  },
  {
      name: "马淑勤",
      year: []
  },
  {
      name: "林玉红",
      year: []
  },
  {
      name: "张福智",
      year: []
  },
  {
      name: "沈桂英",
      year: []
  },
  {
      name: "张兰英",
      year: []
  },
  {
      name: "仇秀英",
      year: []
  },
  {
      name: "王翠英",
      year: []
  },
  {
      name: "佘子清",
      year: []
  },
  {
    name: '马秀英',
    year: [2018, 2019, 2020]
  },
  {
    name: '濮业良',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '马继武',
    year: [2018, 2019, 2020]
  },
  {
    name: '王义隆',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '王长发',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '蒋淑萍',
    year: [2018, 2019]
  },
  {
    name: '薛玉娟',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '巫吉英',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '谢桂英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '黄桂兰',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '岑洪桂',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '陈桂香',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '徐家庆',
    year: [2018, 2019, 2020]
  },
  {
    name: '杨翠英',
    year: [2018, 2019, 2020]
  },
  {
    name: '黄刘氏',
    year: [2018, 2019, 2020]
  },
  {
    name: '关舜华',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '陈文英',
    year: [2018, 2019, 2020]
  },
  {
    name: '周智林',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '蔡丽华',
    year: [2018, 2019, 2020]
  },
  {
    name: '魏桂如',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '易兰英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '石秀英',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '高恒发',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '王福义',
    year: [2018]
  },
  {
    name: '李美兰',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '葛道荣',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '马月华',
    year: [2018]
  },
  {
    name: '李长富',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '余昌祥',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '金茂芝',
    year: [2018]
  },
  {
    name: '常志强',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '郑锦阳',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '万秀英',
    year: [2018]
  },
  {
    name: '艾义英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '龚德年',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '向远松',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '朱惟平',
    year: [2018]
  },
  {
    name: '经智珍',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '朱秀英',
    year: [2018, 2019]
  },
  {
    name: '贺孝和',
    year: [2018, 2019, 2020]
  },
  {
    name: '陈素华',
    year: [2018]
  },
  {
    name: '夏淑琴',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '杨静秋',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '张惠霞',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '周湘萍',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '蒋树珍',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '徐德明',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '刘贵祥',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '郭林大',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '张仕翔',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '马承年',
    year: [2018]
  },
  {
    name: '姚秀英',
    year: [2018, 2019]
  },
  {
    name: '王津',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '熊淑兰',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '刘素珍',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '潘巧英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '郭秀兰',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '祝再强',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '陈德寿',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '王子华',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '程福保',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '伍秀英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '路洪才',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '阮秀英',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '高如琴',
    year: [2018, 2019, 2020, 2021, 2022, 2023]
  },
  {
    name: '马庭禄',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '袁桂龙',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '岑洪兰',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '刘民生',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '方素霞',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '唐复龙',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '刘兴铭',
    year: [2018]
  },
  {
    name: '王素明',
    year: [2018, 2019, 2020, 2021]
  },
  {
    name: '程文英',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '马庭宝',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '陶承义',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '傅兆增',
    year: [2018, 2019, 2020]
  },
  {
    name: '阮定东',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    name: '苏承祺',
    year: [2018, 2019, 2020, 2021, 2022]
  },
  {
    name: '周文彬',
    year: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  }
];

const data2018 = data.map(item => ({ ...item, death: !item.year.includes(2018), value: 100 }));
const data2019 = data.map(item => ({ ...item, death: !item.year.includes(2019), value: 100 }));
const data2020 = data.map(item => ({ ...item, death: !item.year.includes(2020), value: 100 }));
const data2021 = data.map(item => ({ ...item, death: !item.year.includes(2021), value: 100 }));
const data2022 = data.map(item => ({ ...item, death: !item.year.includes(2022), value: 100 }));
const data2023 = data.map(item => ({ ...item, death: !item.year.includes(2023), value: 100 }));
const data2024 = data.map(item => ({ ...item, death: !item.year.includes(2024), value: 100 }));

const names = [
  '佘培庚',
  '张华亮',
  '刘茂清',
  '刘茂源',
  '易周氏',
  '崔正桂',
  '殷玉汉',
  '夏赵氏',
  '吴三根',
  '姚小姗',
  '苏义华',
  '李秀华',
  '杨福杨',
  '刘寿金',
  '夏路氏',
  '刘贵宝',
  '刘文光',
  '炒文迎',
  '刘寿银',
  '徐江氏',
  '徐带娣',
  '徐毛七',
  '徐兆荣',
  '徐吕氏',
  '戎金寿',
  '戎陈氏',
  '赵民',
  '商广礼',
  '方正廉',
  '冯永渭',
  '傅锦山',
  '高恒保',
  '高祁氏:',
  '高庆浩',
  '方志山',
  '冯兴棠',
  '傅克忠',
  '高恒法',
  '宵瑞伯',
  '高流渊',
  '方子友',
  '傅奎年',
  '高恒云',
  '费长华',
  '冯学才',
  '傅理奇',
  '殷玉汉',
  '孙道树',
  '王阿富',
  '汪江氏',
  '朱庭财',
  '张外三',
  '朱启兴',
  '石永祥',
  '谢道清',
  '周庆财',
  '卞朝镛',
  '刘永贵',
  '杨嘉敬',
  '王长富',
  '孙俊武',
  '梁传炳',
  '许泽林',
  '王家龄',
  '郭声楠',
  '朱瑞庭',
  '任自先',
  '韩德顺',
  '张桥生',
  '朱文泉',
  '白庆增',
  '吴少洪',
  '汪世清',
  '钱延模',
  '韩少停',
  '张济山',
  '汪四盲',
  '王进财',
  '小九子',
  '徐良生',
  '你孝文',
  '许嘉盛',
  '韦明发',
  '小扣子',
  '徐长喜',
  '徐金尧',
  '王逵昆',
  '徐京生',
  '徐辛氏',
  '许嘉兴',
  '汪太炳',
  '魏大',
  '徐长银',
  '徐新潮',
  '王老九',
  '小来子',
  '徐俊田',
  '许江生',
  '魏丙昆',
  '徐长英',
  '徐兴祥',
  '汪汪氏',
  '小六子',
  '徐昆发',
  '许老汉',
  '徐成春',
  '徐徐氏',
  '徐老三',
  '许老太',
  '汪小掌',
  '徐成林',
  '徐宣氏',
  '徐老四',
  '许老五',
  '徐丫头',
  '徐成要',
  '许礼和',
  '汪兴德'
];

const aliveSpec = {
  type: 'wordCloud',
  background: 'transparent',
  fontSizeRange: [18, 18],
  random: false,
  nameField: 'name',
  valueField: 'value',
  seriesField: 'name',
  animationAppear: false,
  // maskShape: {
  //   type: 'text',
  //   text: text,
  //   fill: 'red',
  //   fontWeight: 'bolder'
  // },
  // animationAppear: false,
  // wordMask: {
  //   visible: false,
  //   style: {
  //     backgroundOpacity: 0
  //   }
  // },
  word: {
    style: {
      fill: 'white',
      opacity: (datum) => (datum.death ? 0.2 : 1),
      fontWeight: 'bolder'
    }
  }
};

const spec = (text) => ({
  type: 'wordCloud',
  background: 'transparent',
  fontSizeRange: [6, 12],
  random: false,
  nameField: 'name',
  valueField: 'value',
  seriesField: 'name',
  maskShape: {
    type: 'text',
    text: text,
    fill: 'red',
    fontWeight: 'bolder'
  },
  // animationAppear: false,
  wordMask: {
    visible: false,
    style: {
      backgroundOpacity: 0
    }
  },
  word: {
    style: {
      fill: 'white',
      // opacity: (datum: any) => (datum.death ? 0.2 : 1),
      fontWeight: 'bolder'
    }
  }
});

// function merge(target, source) {
//     // 确保目标是一个对象
//     if (typeof target !== 'object' || target === null) {
//         target = {};
//     }

//     // 遍历源对象的每个属性
//     for (const key in source) {
//         if (source.hasOwnProperty(key)) {
//             const value = source[key];

//             // 如果值是对象，则递归合并
//             if (typeof value === 'object' && value !== null) {
//                 // 如果目标对象中没有这个键，初始化为一个空对象
//                 if (!target[key]) {
//                     target[key] = Array.isArray(value) ? [] : {};
//                 }
//                 // 递归调用
//                 merge(target[key], value);
//             } else {
//                 // 直接赋值
//                 target[key] = value;
//             }
//         }
//     }

//     return target;
// }

const merge = VStory.VUtils.merge;

const width = 1280 / 2;
const height = 1960 / 2;
const defaultAppearAction = {
  action: 'appear',
  payload: {
    animation: {
      duration: 1000,
      easing: 'linear'
    }
  }
};
const defaultDisappearAction = (startTime, duration = 1000) => {
  return {
    action: 'disappear',
    startTime,
    payload: {
      animation: {
        duration,
        easing: 'linear'
      }
    }
  };
};
const moveInEasing = VStory.generatorPathEasingFunc('M0,0,C0.46,0,0.496,0.014,0.616,0.088,0.734,0.161,0.884,0.4,1,1');
VStory.Easing['powerIn'] = moveInEasing;

const scene1Characters = [
  {
    character: {
      id: 'scene1-bg',
      type: 'Image',
      position: {
        x: 0,
        y: 0,
        width,
        height
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/nationalMemory/dark.jpeg'
        }
      }
    },
    appearAction: {
      action: 'appear',
      payload: {
        animation: {
          duration: 1000,
          easing: 'easeInOut'
        }
      }
    },
    disappearAction: false
  },
  {
    character: {
      id: 'scene1-candle',
      type: 'Image',
      position: {
        x: 0,
        y: 600,
        width,
        height: 400
      },
      options: {
        graphic: {
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/nationalMemory/candle.png'
        }
      }
    }
  },
  {
    character: {
      id: 'scene1-monument',
      type: 'Image',
      position: {
        x: 0,
        y: 440,
        width,
        height: 360
      },
      options: {
        graphic: {
          opacity: 0.3,
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/nationalMemory/monument.png'
        }
      }
    }
  },
  {
    character: {
      id: 'scene1-title',
      type: 'Text',
      position: {
        x: width / 2,
        y: 200,
        width,
        height
      },
      options: {
        graphic: {
          text: '南 京',
          fill: 'rgb(92, 20, 14)',
          fontSize: 150,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
          // shadowBlur: 300,
          // shadowColor: 'blue',
          // shadowOffsetX: 30,
          // shadowOffsetY: 30
        }
      }
    },
    appearAction: {
      action: 'appear',
      payload: {
        animation: {
          effect: 'wipe'
        }
      }
    }
  },
  {
    character: {
      id: 'scene1-title-date',
      type: 'Text',
      position: {
        x: width / 2,
        y: 350,
        width,
        height
      },
      options: {
        graphic: {
          text: '12.13',
          fill: 'white',
          fontSize: 150,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold',
          shadowBlur: 200
        }
      }
    },
    appearAction: {
      action: 'appear',
      payload: {
        animation: {
          effect: 'wipe'
        }
      }
    }
  },
  {
    character: {
      id: 'scene1-subtitle',
      type: 'Text',
      position: {
        x: width / 2,
        y: 460,
        width,
        height
      },
      options: {
        graphic: {
          text: '国 家 公 祭 日',
          fill: 'white',
          fontSize: 40,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 300
        }
      }
    },
    appearAction: {
      action: 'appear',
      payload: {
        animation: {
          effect: 'wipe'
        }
      }
    }
  },
  {
    character: {
      id: 'scene1-leftText',
      type: 'Text',
      position: {
        x: width - 30,
        y: 260,
        width: height,
        height,
        anchor: [width - 60, 200],
        angle: (Math.PI / 2) * 3
      },
      options: {
        graphic: {
          text: '铭记历史 祭奠同胞',
          fill: 'white',
          fontSize: 60,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 600,
          opacity: 0.2
        }
      }
    },
    appearAction: {
      action: 'appear',
      payload: {
        animation: {
          duration: 2000,
          effect: 'typewriter'
        }
      }
    }
  }
];
const scene1 = {
  id: 'scene1',
  actions: scene1Characters.map(({ character, appearAction, disappearAction }) => {
    const characterId = character.id;
    const characterActions = [];
    if (appearAction !== false) {
      characterActions.push(merge({}, defaultAppearAction, appearAction));
    }

    if (disappearAction !== false) {
      characterActions.push(merge({}, defaultDisappearAction(2000), disappearAction));
    }

    return {
      characterId,
      characterActions
    };
  })
};
const scene2Characters = [
  {
    character: {
      id: 'scene2-title',
      type: 'Text',
      position: {
        x: width / 2,
        y: 160,
        width,
        height
      },
      options: {
        graphic: {
          text: '遇难同胞',
          fill: 'white',
          fontSize: 40,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 300
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 200,
      payload: {
        animation: {
          duration: 1200,
          effect: 'typewriter'
        }
      }
    },
    actions: [
      {
        action: 'moveTo',
        startTime: 2400,
        payload: {
          destination: {
            x: 120,
            y: 120
          },
          animation: {
            duration: 800,
            easing: 'quadInOut'
          }
        }
      }
    ]
  },
  {
    character: {
      id: 'scene2-title-count',
      type: 'Text',
      position: {
        x: width / 2,
        y: 280,
        width,
        height
      },
      options: {
        graphic: {
          text: '300000',
          fill: 'white',
          fontSize: 100,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 700,
      payload: {
        animation: {
          duration: 2000,
          effect: 'move',
          pos: 'top',
          easing: 'powerIn'
        }
      }
    },
    actions: [
      {
        action: 'moveTo',
        startTime: 4000,
        payload: {
          destination: {
            x: 400,
            y: 120
          },
          animation: {
            duration: 400,
            easing: 'quadInOut'
          }
        }
      }
    ]
  },
  {
    character: {
      id: 'scene2-title-2',
      type: 'Text',
      position: {
        x: width / 2,
        y: 220,
        width,
        height
      },
      options: {
        graphic: {
          text: '其中',
          fill: 'white',
          fontSize: 60,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 4500,
      payload: {
        animation: {
          duration: 200,
          effect: 'typewriter'
        }
      }
    }
  },
  {
    character: {
      id: 'scene2-title-3',
      type: 'Text',
      position: {
        x: width / 2,
        y: 320,
        width,
        height
      },
      options: {
        graphic: {
          text: '枪杀占比达到惊人的 32%',
          fill: 'white',
          fontSize: 44,
          textAlign: 'center',
          textBaseline: 'middle',
          fontWeight: 'bold'
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 5000,
      payload: {
        animation: {
          duration: 1000,
          effect: 'typewriter'
        }
      }
    }
  },
  {
    character: {
      id: '1',
      type: 'VChart',
      zIndex: 0,
      position: {
        x: 72,
        y: 400,
        width: 500,
        height: 500
      },
      options: {
        initOption: { animation: true, interactive: true, disableTriggerEvent: true },
        spec: {
          type: 'pie',
          data: [
            {
              id: 'id0',
              values: [
                { name: '开枪', value: '32' },
                { name: '刺刀', value: '20' },
                { name: '打死', value: '16' },
                { name: '烧死', value: '9' },
                { name: '强奸', value: '8' },
                { name: '其他', value: '15' }
              ]
            }
          ],

          outerRadius: 0.9,
          valueField: 'value',
          categoryField: 'name',
          color: ['#1F1F1F', '#383838', '#505050', '#686868', '#909090', '#B8B8B8'],
          animationNormal: {
            pie: {
              loop: 1,
              partitioner: data => {
                return data.name === '开枪';
              },
              timeSlices: [
                {
                  effects: {
                    channel: {
                      outerRadius: { to: 240 },
                      fill: { to: 'rgb(92, 20, 14)' }
                    },
                    easing: 'elasticInOut'
                  },
                  delay: 8800,
                  duration: 2000
                }
              ]
            }
          },
          label: {
            visible: true,
            position: 'inside',
            offsetRadius: -40,
            smartInvert: true,
            rotate: false,
            formatMethod: (label, data) => {
              return {
                type: 'rich',
                text: [
                  {
                    text: `${data.name}\n`,
                    fontSize: 16,
                    fontWeight: 500,
                    stroke: false
                  },
                  {
                    text: `${data.value}%`,
                    fontSize: 16,
                    fontWeight: 500,
                    stroke: false
                  }
                ]
              };
            }
          }
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 2800,
      payload: {
        animation: {
          duration: 1200
        }
      }
    }
  }
];
const scene2 = {
  id: 'scene2',
  actions: scene2Characters.map(({ character, appearAction, disappearAction, actions }) => {
    const characterId = character.id;
    const characterActions = [];
    if (appearAction !== false) {
      characterActions.push(merge({}, defaultAppearAction, appearAction));
    }
    if (actions) {
      characterActions.push(...actions);
    }
    if (disappearAction !== false) {
      characterActions.push(merge({}, defaultDisappearAction(11000), disappearAction));
    }

    return {
      characterId,
      characterActions
    };
  })
};
const scene3Characters = [
  {
    character: {
      id: 'scene3-content',
      type: 'Text',
      position: {
        x: width / 2,
        y: 300,
        width: width - 60,
        height
      },
      options: {
        graphic: {
          textConfig: [
            {
              text: '87年岁月流逝，截至2024年12月13日，南京侵华日军受害者援助协会登记在册的在世幸存者仅剩',
              fontSize: 22
            },
            { text: '32人', fontWeight: 'bolder' }
          ],
          fill: 'white',
          fontSize: 40,
          textAlign: 'center',
          textBaseline: 'top',
          fontWeight: 300
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 200,
      payload: {
        animation: {
          duration: 2000,
          easing: 'linear',
          effect: 'typewriter'
        }
      }
    },
    actions: [
      {
        action: 'disappear',
        startTime: 6000,
        payload: {
          animation: {
            duration: 1200,
            easing: 'quadInOut',
            effect: 'fade'
          }
        }
      }
    ]
  },
  {
    character: {
      id: 'scene3-desc',
      type: 'Text',
      position: {
        x: width / 2,
        y: 80,
        width,
        height
      },
      options: {
        graphic: {
          text: '部分幸存者名录',
          fill: 'white',
          fontSize: 40,
          textAlign: 'center',
          textBaseline: 'top',
          fontWeight: 300
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 7200,
      payload: {
        animation: {
          duration: 300,
          effect: 'wipe'
        }
      }
    },
  },
  {
    character: {
      id: 'scene3-year',
      type: 'Text',
      position: {
        x: width / 2,
        y: 160,
        width,
        height
      },
      options: {
        graphic: {
          text: `2018年 - ${data.filter(item => item.year.includes(2018)).length}人`,
          fill: 'white',
          fontSize: 80,
          fontWeight: 'bolder',
          textAlign: 'center',
          textBaseline: 'top'
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 7200,
      payload: {
        animation: {
          duration: 300,
          effect: 'fade'
        }
      }
    },
    actions: [2019, 2020, 2021, 2022, 2023, 2024].map((year, index) => {
      return {
        action: 'style',
        startTime: 10000 + index * 2000,
        payload: {
          animation: {
            duration: 0,
            easing: 'quadInOut'
          },
          text: {
            text: `${year}年 - ${data.filter(item => item.year.includes(year)).length}人`
          }
        }
      }
    }).concat([2019, 2020, 2021, 2022, 2023, 2024].map((year, index) => {
      return {
        action: 'style',
        startTime: 10000 + index * 2000 - 100,
        payload: {
          animation: {
            duration: 100,
            easing: 'quadInOut'
          },
          graphic: {
            opacity: 0
          },
        }
      }
    })).concat([2019, 2020, 2021, 2022, 2023, 2024].map((year, index) => {
      return {
        action: 'style',
        startTime: 10000 + index * 2000,
        payload: {
          animation: {
            duration: 100,
            easing: 'quadInOut'
          },
          graphic: {
            opacity: 1
          },
        }
      }
    })),
  },
  {
    character: {
      id: 'alive-wordcloud',
      type: 'VChart',
      position: {
        x: 0,
        y: 300,
        width,
        height: height - 300
      },
      options: {
        spec: aliveSpec,
        data: [
          {
            id: 'data',
            values: data2018
          }
        ]
        // panel: {
        //   fill: 'grey',
        //   shadowColor: 'rgba(0, 0, 0, 0.05)',
        //   shadowBlur: 10,
        //   shadowOffsetX: 4,
        //   shadowOffsetY: 4,
        //   cornerRadius: 20
        // }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 8000,
      payload: [
        {
          // 关闭所有动画
          selector: '',
          animation: {
            duration: 200,
          }
        },
        {
          // 一个整体做动画
          selector: '*',
          animation: {
            oneByOne: false,
            duration: 200,
            effect: 'fade'
          }
        }
      ]
    },
    actions: [
      ...[data2019, data2020, data2021, data2022, data2023, data2024].map((data, index) => {
        return {
          action: 'update',
          startTime: 8000 + (index + 1) * 2000,
          payload: {
            duration: 1000,
            id: 'data',
            values: data
          }
        };
      })
    ]
  }
];
const scene3 = {
  id: 'scene3',
  actions: scene3Characters.map(({ character, appearAction, disappearAction, actions }) => {
    const characterId = character.id;
    const characterActions = [];
    if (appearAction !== false) {
      characterActions.push(merge({}, defaultAppearAction, appearAction));
    }
    if (actions) {
      characterActions.push(...actions);
    }
    if (disappearAction !== false) {
      characterActions.push(merge({}, defaultDisappearAction(26000, 100), disappearAction));
    }

    return {
      characterId,
      characterActions
    };
  })
};
const scene4Characters = [
  {
    character: {
      id: 'scene4-content',
      type: 'Text',
      position: {
        x: width / 2,
        y: 300,
        width: width - 60,
        height
      },
      options: {
        graphic: {
          textConfig: [
            {
              text: '1937年12月13日，日军攻破南京城，制造了惨绝人寰的南京大屠杀惨案，日军屠杀中国战俘与难民总计',
              fontSize: 22
            },
            { text: '30余万人', fontWeight: 'bolder' }
          ],
          fill: 'white',
          fontSize: 40,
          textAlign: 'center',
          textBaseline: 'top',
          fontWeight: 300
        }
      }
    },
    appearAction: {
      action: 'appear',
      startTime: 200,
      payload: {
        animation: {
          duration: 2000,
          easing: 'linear',
          effect: 'typewriter'
        }
      }
    },
    actions: [
      {
        action: 'disappear',
        startTime: 6000,
        payload: {
          animation: {
            duration: 1200,
            easing: 'quadInOut',
            effect: 'fade'
          }
        }
      }
    ]
  },
  ...['三', '十', '萬'].map((t, index) => {
    return {
      character: {
        id: `name-wordcloud-${index}`,
        type: 'VChart',
        position: {
          x: 0,
          y: (index * height) / 3 - 50 + (index === 0 ? 10 : index === 2 ? 0 : 0),
          width,
          height: (height / 5) * 2
        },
        options: {
          padding: { top: 30, bottom: 30 },
          spec: spec(t),
          data: [
            {
              id: 'data',
              values: names.map(name => {
                return {
                  name,
                  value: 100
                };
              })
            }
          ]
          // panel: {
          //   fill: 'grey',
          //   shadowColor: 'rgba(0, 0, 0, 0.05)',
          //   shadowBlur: 10,
          //   shadowOffsetX: 4,
          //   shadowOffsetY: 4,
          //   cornerRadius: 20
          // }
        }
      },
      appearAction: {
        action: 'appear',
        startTime: 8000,
        payload: [
          // {
          //   // 关闭所有动画
          //   selector: '',
          //   animation: {
          //     duration: 200,
          //   }
          // },
          {
            // 一个整体做动画
            // selector: 'text',
            animation: {
              oneByOne: true,
              duration: 200,
              effect: 'fade'
            }
          }
        ]
      },
      disappearAction: false
      // actions: [
      //   ...[data2019, data2020, data2021, data2022, data2023, data2024].map((data, index) => {
      //     return {
      //       action: 'update',
      //       startTime: 4000 + (index + 1) * 2000,
      //       payload: {
      //         duration: 1000,
      //         id: 'data',
      //         values: data
      //       }
      //     };
      //   })
      // ]
    };
  })
];
const scene4 = {
  id: 'scene4',
  actions: scene4Characters.map(({ character, appearAction, disappearAction, actions }) => {
    const characterId = character.id;
    const characterActions = [];
    if (appearAction !== false) {
      characterActions.push(merge({}, defaultAppearAction, appearAction));
    }
    if (actions) {
      characterActions.push(...actions);
    }
    if (disappearAction !== false) {
      characterActions.push(merge({}, defaultDisappearAction(6000), disappearAction));
    }

    return {
      characterId,
      characterActions
    };
  })
};
const dsl = {
  acts: [
    {
      id: 'defaultAct',
      scenes: [scene1, scene2, scene3, scene4]
    }
  ],
  characters: [
    ...scene1Characters.map(({ character }) => character),
    ...scene2Characters.map(({ character }) => character),
    ...scene3Characters.map(({ character }) => character),
    ...scene4Characters.map(({ character }) => character),
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, width: width / 2, height: height / 2, background: '#ebecf0', scaleX: 0.5, scaleY: 0.5 });
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
