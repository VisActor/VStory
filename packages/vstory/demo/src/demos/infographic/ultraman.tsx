import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { IActionSpec, registerAll } from '../../../../src';
import { IPointLike } from '@visactor/vutils';
import qjf from '../../assets/infographic/ultraman/qjf.png';
import img_bg from '../../assets/infographic/ultraman/bg.png';
import img_tv from '../../assets/infographic/ultraman/tv.png';
// gifs
import gif_1966 from '../../assets/infographic/ultraman/gif/1966.gif';
import gif_1967 from '../../assets/infographic/ultraman/gif/1967.gif';
import gif_1971 from '../../assets/infographic/ultraman/gif/1971.gif';
import gif_1972 from '../../assets/infographic/ultraman/gif/1972.gif';
import gif_1973 from '../../assets/infographic/ultraman/gif/1973.gif';
import gif_1974 from '../../assets/infographic/ultraman/gif/1974.gif';
import gif_1980 from '../../assets/infographic/ultraman/gif/1980.gif';
import gif_1990 from '../../assets/infographic/ultraman/gif/1990.gif';
import gif_1996 from '../../assets/infographic/ultraman/gif/1996.gif';
import gif_1997 from '../../assets/infographic/ultraman/gif/1997.gif';
import gif_1998 from '../../assets/infographic/ultraman/gif/1998.gif';
import gif_2001 from '../../assets/infographic/ultraman/gif/2001.gif';
import gif_2004 from '../../assets/infographic/ultraman/gif/2004.gif';
import gif_2006 from '../../assets/infographic/ultraman/gif/2006.gif';
import gif_2013 from '../../assets/infographic/ultraman/gif/2013.gif';
import gif_2015 from '../../assets/infographic/ultraman/gif/2015.gif';
import gif_2016 from '../../assets/infographic/ultraman/gif/2016.gif';
import gif_2019 from '../../assets/infographic/ultraman/gif/2019.gif';
import gif_2020 from '../../assets/infographic/ultraman/gif/2020.gif';
import gif_2023 from '../../assets/infographic/ultraman/gif/2023.gif';

registerAll();

const data = [
  {
    year: 1966,
    gif: gif_1966,
    text: '《初代奥特曼》',
    desc: '《初代奥特曼》\n开山之作，首位来自M78星云的奥特英雄，其经典形象和配乐影响了一代又一代人。',
    height_m: 40, // 身高 (米) [1]
    weight_t: 35000, // 体重 (吨) [1]
    flight_speed_mach: 5, // 飞行速度 (马赫) [1]
    grip_strength_t: null // 握力 (吨) - 官方未提供 [1]，仅有臂力描述 [2]
  },
  {
    year: 1967,
    gif: gif_1967,
    text: '《赛文奥特曼》',
    desc: '《赛文奥特曼》\n世界观独立，剧情更具科幻深度，探讨了人类与宇宙、战争与和平等深刻议题。',
    height_m: 40, // 身高 (米) [3]
    weight_t: 35000, // 体重 (吨) [3]
    flight_speed_mach: 7, // 飞行速度 (马赫) [3]
    grip_strength_t: null // 握力 (吨) - 官方未提供 [3]，仅有臂力描述 [4]
  },
  {
    year: 1971,
    gif: gif_1971,
    text: '《归来的奥特曼》',
    desc: '《归来的奥特曼》\n 《杰克奥特曼》昭和系列重启之作，首次引入"奥特兄弟"概念，展现了地球防卫队与怪兽的殊死搏斗。',
    height_m: 40, // 身高 (米) [5]
    weight_t: 35000, // 体重 (吨) [5]
    flight_speed_mach: 5, // 飞行速度 (马赫) [5]
    grip_strength_t: null // 握力 (吨) - 官方未提供 [5]，仅有臂力描述 [6]
  },
  {
    year: 1972,
    gif: gif_1972,
    text: '《艾斯奥特曼》',
    desc: '《艾斯奥特曼》\n首位双人合体变身奥特曼，强化兄弟情设定，其独特的超能力和光线技能令人印象深刻。',
    height_m: 40, // 身高 (米) [7, 8]
    weight_t: 45000, // 体重 (吨) [7, 8]
    flight_speed_mach: 20, // 飞行速度 (马赫) [8]
    grip_strength_t: null // 握力 (吨) - 维基百科描述为臂力 [8]
  },
  {
    year: 1973,
    gif: gif_1973,
    text: '《泰罗奥特曼》',
    desc: '《泰罗奥特曼》\n圆谷成立10周年纪念作，风格轻松幽默，主角泰罗的成长故事充满了热血与勇气。',
    height_m: 53, // 身高 (米) [7]
    weight_t: 55000, // 体重 (吨) [7]
    flight_speed_mach: 20, // 飞行速度 (马赫) - 外部维基确认
    grip_strength_t: null // 握力 (吨) - 外部维基确认无明确握力值
  },
  {
    year: 1974,
    gif: gif_1974,
    text: '《雷欧奥特曼》',
    desc: '《雷欧奥特曼》\n首次非M78星云战士，剧情偏暗黑写实，讲述了雷欧在严酷的战斗中不断磨练变强的故事。',
    height_m: 52, // 身高 (米) [9]
    weight_t: 48000, // 体重 (吨) [9]
    flight_speed_mach: 7, // 飞行速度 (马赫) [9]
    grip_strength_t: null // 握力 (吨) - 官方未提供 [9]，仅有臂力描述 [10]
  },
  {
    year: 1980,
    gif: gif_1980,
    text: '《爱迪奥特曼》',
    desc: '《爱迪奥特曼》\n昭和系列收官作，主角无败绩，强调了人类自身力量的重要性以及对环境的保护。',
    height_m: 50, // 身高 (米) [11]
    weight_t: 44000, // 体重 (吨) [11]
    flight_speed_mach: 9, // 飞行速度 (马赫) [11]
    grip_strength_t: null // 握力 (吨) - 官方及维基均未提供 [11, 12]
  },
  {
    year: 1990,
    gif: gif_1990,
    text: '《葛雷奥特曼》',
    desc: '《葛雷奥特曼》\n澳大利亚合作拍摄，首次国际版奥特曼，其粗犷的造型和独特的变身方式给观众留下了深刻印象。',
    height_m: 60, // 身高 (米) [13]
    weight_t: 58000, // 体重 (吨) [13]
    flight_speed_mach: 26, // 飞行速度 (马赫) [13]
    grip_strength_t: null // 握力 (吨) - 官方及其他来源均未提供 [13]
  },
  {
    year: 1996,
    gif: gif_1996,
    text: '《迪迦奥特曼》',
    desc: '《迪迦奥特曼》\n平成三部曲开篇，引入"形态转换"设定，以其精良的制作和深刻的剧情赢得了广泛赞誉。',
    height_m: 53, // 身高 (米) - 外部维基确认 [14]
    weight_t: 44000, // 体重 (吨) - 外部维基确认 [14]
    flight_speed_mach: 5, // 飞行速度 (马赫) - 外部维基确认 [14]
    grip_strength_t: 50000 // 握力 (吨) - 外部维基确认 [15]
  },
  {
    year: 1997,
    gif: gif_1997,
    text: '《戴拿奥特曼》',
    desc: '《戴拿奥特曼》\n延续迪迦世界观，背景拓展至宇宙，主角飞鸟信的乐观精神感染了无数观众。',
    height_m: 55, // 身高 (米) - 外部维基确认
    weight_t: 45000, // 体重 (吨) - 外部维基确认
    flight_speed_mach: 8, // 飞行速度 (马赫) - 外部维基确认
    grip_strength_t: 60000 // 握力 (吨) - 外部维基确认
  },
  {
    year: 1998,
    gif: gif_1998,
    text: '《盖亚奥特曼》',
    desc: '《盖亚奥特曼》\n首次双奥特曼对抗设定，探讨了地球自身意志与人类共存的主题。',
    height_m: 50, // 身高 (米) - 外部维基确认 (V2形态)
    weight_t: 42000, // 体重 (吨) - 外部维基确认 (V2形态)
    flight_speed_mach: 20, // 飞行速度 (马赫) - 外部维基确认 (V2形态)
    grip_strength_t: 70000 // 握力 (吨) - 外部维基确认 (V2形态)
  },
  {
    year: 2001,
    gif: gif_2001,
    text: '《高斯奥特曼》',
    desc: '《高斯奥特曼》\n最长TV剧集（65集），主题强调和平，展现了通过沟通和理解来解决问题的理念。',
    height_m: 47, // 身高 (米) [16]
    weight_t: 42000, // 体重 (吨) [16]
    flight_speed_mach: 7, // 飞行速度 (马赫) [16]
    grip_strength_t: 60000 // 握力 (吨) [16]
  },
  {
    year: 2004,
    gif: gif_2004,
    text: '《奈克瑟斯奥特曼》',
    desc: '《奈克瑟斯奥特曼》\n成人向作品，因收视率腰斩至38集，但其深刻的剧情和压抑的氛围在粉丝中拥有极高评价。',
    height_m: 49, // 身高 (米) - 外部维基确认 (Anphans形态)
    weight_t: 40000, // 体重 (吨) - 外部维基确认 (Anphans形态)
    flight_speed_mach: 3, // 飞行速度 (马赫) - 外部维基确认 (Anphans形态)
    grip_strength_t: 55000 // 握力 (吨) - 外部维基确认 (Anphans形态)
  },
  {
    year: 2006,
    gif: gif_2006,
    text: '《梦比优斯奥特曼》',
    desc: '《梦比优斯奥特曼》\n昭和世界观回归，纪念系列40周年，致敬了初代奥特曼等经典作品。',
    height_m: 49, // 身高 (米) [17, 18]
    weight_t: 35000, // 体重 (吨) [17, 18]
    flight_speed_mach: 10, // 飞行速度 (马赫) [17, 18]
    grip_strength_t: 90000 // 握力 (吨) [19]
  },
  {
    year: 2013,
    gif: gif_2013,
    text: '《银河奥特曼》',
    desc: '《银河奥特曼》\n新生代系列开端，引入"火花人偶"设定，开启了奥特曼系列的新篇章。',
    height_m: 'Micro - Infinity', // 身高 (米) - 特殊设定 [20]
    weight_t: '0 - Infinity', // 体重 (吨) - 特殊设定 [20]
    flight_speed_mach: 'Immeasurable', // 飞行速度 (马赫) - 特殊设定 [20]
    grip_strength_t: null // 握力 (吨) - 维基确认缺失 [20]
  },
  {
    year: 2015,
    gif: gif_2015,
    text: '《艾克斯奥特曼》',
    desc: '《艾克斯奥特曼》\n首次结合"数据装甲"战斗，展现了科技与奥特力量的融合。',
    height_m: 45, // 身高 (米) [21]
    weight_t: 45000, // 体重 (吨) [21]
    flight_speed_mach: 9, // 飞行速度 (马赫) [21]
    grip_strength_t: 82000 // 握力 (吨) [21]
  },
  {
    year: 2016,
    gif: gif_2016,
    text: '《欧布奥特曼》',
    desc: '《欧布奥特曼》\n融合前辈力量的"借债"模式，让观众重温了历代奥特曼的经典形象。',
    height_m: 50, // 身高 (米) - 官方查询确认 [22] (Spacium Zeperion形态)
    weight_t: 50000, // 体重 (吨) - 官方查询确认 [22] (Spacium Zeperion形态)
    flight_speed_mach: 6.5, // 飞行速度 (马赫) [23] (Spacium Zeperion形态)
    grip_strength_t: 65000 // 握力 (吨) [23] (Spacium Zeperion形态)
  },
  {
    year: 2019,
    gif: gif_2019,
    text: '《泰迦奥特曼》',
    desc: '《泰迦奥特曼》\n赛罗后首位"奥特之子"主角，讲述了新生代奥特曼三人小队的故事。',
    height_m: 50, // 身高 (米) [24]
    weight_t: 50000, // 体重 (吨) [24] (采用官方数据)
    flight_speed_mach: 10, // 飞行速度 (马赫) [25]
    grip_strength_t: 45000 // 握力 (吨) [25]
  },
  {
    year: 2020,
    gif: gif_2020,
    text: '《泽塔奥特曼》',
    desc: '《泽塔奥特曼》\n高口碑作品，获日本星云奖，其紧凑的剧情和精彩的打斗场面深受观众喜爱。',
    height_m: 52, // 身高 (米) [26] (Original形态)
    weight_t: 33000, // 体重 (吨) [26] (Original形态)
    flight_speed_mach: 7, // 飞行速度 (马赫) [27, 28] (Original形态)
    grip_strength_t: 62000 // 握力 (吨) [27, 28] (Original形态)
  },
  {
    year: 2023,
    gif: gif_2023,
    text: '《布莱泽奥特曼》',
    desc: '《布莱泽奥特曼》\n回归原始野性战斗风格，以其独特的叙事方式和怪兽设计吸引了大量关注。',
    height_m: 47, // 身高 (米) - 外部官方确认
    weight_t: 33000, // 体重 (吨) - 外部官方确认
    flight_speed_mach: 20, // 飞行速度 (马赫) - 外部官方确认缺失
    grip_strength_t: null // 握力 (吨) - 外部官方确认缺失
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

function addTimeLine(story: Story) {
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

function addYearComponent(
  story: Story,
  year: number,
  index: number,
  text: string,
  startPos: IPointLike,
  direction: 'horizontal' | 'vertical',
  revertLayoutSide: boolean
) {
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

function addLine(story: Story, startPos: IPointLike, total: number) {
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

function addFull(story: Story) {
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
          image: qjf,
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

function addBg(story: Story) {
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
          image: img_bg,
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

function addTV(story: Story) {
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
          image: img_tv
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
                { type: '身高', value: +data[0].height_m / 60 },
                { type: '体重', value: +data[0].weight_t / 60000 },
                { type: '飞行速度', value: +data[0].flight_speed_mach / 20 }
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
              } as any
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
                { type: '身高', value: isFinite(+item.height_m) ? +item.height_m / 60 : 1 },
                { type: '体重', value: isFinite(+item.weight_t) ? +item.weight_t / 60000 : 1 },
                { type: '飞行速度', value: isFinite(+item.flight_speed_mach) ? +item.flight_speed_mach / 20 : 1 }
              ]
            }
          } as IActionSpec;
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
            gifImage: item.gif
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

export const Ultraman = () => {
  const id = 'Tiga';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    canvas.width = 1500;
    canvas.height = 1359;
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      scaleX: 'auto',
      scaleY: 'auto',
      width: 1500,
      height: 1359
    });
    const player = new Player(story);
    story.init(player);
    addBg(story);
    addTV(story);
    addTimeLine(story);
    addFull(story);
    player.play(-1);
    window.story = story;

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
