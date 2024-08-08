import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene11BgDecoration from '../../assets/scene11/bg-decoration.png';
import scene11TextEn from '../../assets/scene11/text-en.png';
import scene11TextZh from '../../assets/scene11/text-zh.png';
import scene11Title from '../../assets/scene11/title.png';
import scene11Chart from '../../assets/scene11/chart.png';

import { easeInOutQuad } from './util';

// TODO: 原 demo 是 3D 词云，目前显示有问题。
const chartSpec = {
  background: 'transparent',
  type: 'wordCloud',
  // 待申请新外网可访问的存储空间后更换
  maskShape: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/log.jpeg',
  nameField: 'challenge_name',
  valueField: 'sum_count',
  seriesField: 'challenge_name',
  padding: 0,
  data: [
    {
      name: 'data',
      values: [
        {
          challenge_name: '刘浩存',
          sum_count: 957
        },
        {
          challenge_name: '刘昊然',
          sum_count: 942
        },
        {
          challenge_name: '喜欢',
          sum_count: 842
        },
        {
          challenge_name: '真的',
          sum_count: 828
        },
        {
          challenge_name: '四海',
          sum_count: 665
        },
        {
          challenge_name: '好看',
          sum_count: 627
        },
        {
          challenge_name: '评论',
          sum_count: 574
        },
        {
          challenge_name: '好像',
          sum_count: 564
        },
        {
          challenge_name: '沈腾',
          sum_count: 554
        },
        {
          challenge_name: '不像',
          sum_count: 540
        },
        {
          challenge_name: '多少钱',
          sum_count: 513
        },
        {
          challenge_name: '韩寒',
          sum_count: 513
        },
        {
          challenge_name: '不知道',
          sum_count: 499
        },
        {
          challenge_name: '感觉',
          sum_count: 499
        },
        {
          challenge_name: '尹正',
          sum_count: 495
        },
        {
          challenge_name: '不看',
          sum_count: 487
        },
        {
          challenge_name: '奥特之父',
          sum_count: 484
        },
        {
          challenge_name: '阿姨',
          sum_count: 482
        },
        {
          challenge_name: '支持',
          sum_count: 482
        },
        {
          challenge_name: '父母',
          sum_count: 479
        },
        {
          challenge_name: '一条',
          sum_count: 462
        },
        {
          challenge_name: '女主',
          sum_count: 456
        },
        {
          challenge_name: '确实',
          sum_count: 456
        },
        {
          challenge_name: '票房',
          sum_count: 456
        },
        {
          challenge_name: '无语',
          sum_count: 443
        },
        {
          challenge_name: '干干净净',
          sum_count: 443
        },
        {
          challenge_name: '为啥',
          sum_count: 426
        },
        {
          challenge_name: '爱情',
          sum_count: 425
        },
        {
          challenge_name: '喜剧',
          sum_count: 422
        },
        {
          challenge_name: '春节',
          sum_count: 414
        },
        {
          challenge_name: '剧情',
          sum_count: 414
        },
        {
          challenge_name: '人生',
          sum_count: 409
        },
        {
          challenge_name: '风格',
          sum_count: 408
        },
        {
          challenge_name: '演员',
          sum_count: 403
        },
        {
          challenge_name: '成长',
          sum_count: 403
        },
        {
          challenge_name: '玩意',
          sum_count: 402
        },
        {
          challenge_name: '文学',
          sum_count: 397
        }
      ]
    }
  ],
  word: {
    style: {
      keepDirIn3d: false
    }
  },
  fillingWord: {
    style: {
      keepDirIn3d: false
    }
  },
  depth_3d: 200,
  colorList: ['#325AB4'],
  wordCloudShapeConfig: {
    fillingColorList: ['#5BB5BF', '#92C8C6']
  }
};

export const scene11Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene11-background`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#FAFAFA'
      }
    }
  },
  {
    type: 'Image',
    id: `scene11-bg-decoration`,
    zIndex: 0,
    position: {
      top: 180,
      left: 170,
      width: 1125,
      height: 562
    },
    options: {
      graphic: {
        image: scene11BgDecoration
      }
    }
  },
  {
    type: 'Image',
    id: `scene11-title`,
    zIndex: 0,
    position: {
      top: 158,
      left: 766,
      width: 516,
      height: 168
    },
    options: {
      graphic: {
        image: scene11Title
      }
    }
  },
  {
    type: 'Image',
    id: `scene11-text-en`,
    zIndex: 0,
    position: {
      top: 394,
      left: 842,
      width: 440,
      height: 110
    },
    options: {
      graphic: {
        image: scene11TextEn
      }
    }
  },
  {
    type: 'Image',
    id: `scene11-text-zh`,
    zIndex: 0,
    position: {
      top: 595,
      left: 156,
      width: 270,
      height: 117
    },
    options: {
      graphic: {
        image: scene11TextZh
      }
    }
  },
  {
    type: 'Image',
    id: `scene11-chart-image`,
    zIndex: 0,
    position: {
      top: 150,
      left: 156,
      width: 450,
      height: 269
    },
    options: {
      graphic: {
        image: scene11Chart
      }
    }
  },
  {
    type: 'VChart',
    id: `scene11-wordcloud-chart`,
    zIndex: 0,
    position: {
      top: 150,
      left: 156,
      width: 450,
      height: 269
    },
    options: {
      panel: { fill: '#eeeeee' },
      spec: chartSpec
    }
  }
];

export const scene11: ISceneSpec = {
  id: 'scene11',
  delay: -1000,
  actions: [
    {
      characterId: 'scene11-background',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-bg-decoration',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-title',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-text-en',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-text-zh',
      characterActions: [
        {
          action: 'appear',
          startTime: 1,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-chart-image',
      characterActions: [
        {
          action: 'appear',
          startTime: 500,
          duration: 500,
          payload: {
            animation: {
              duration: 500,
              easing: easeInOutQuad,
              move: {
                from: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene11-wordcloud-chart',
      characterActions: [
        {
          action: 'appear',
          startTime: 2000,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              easing: easeInOutQuad,
              fade: {
                isBaseOpacity: true
              }
            }
          }
        },
        {
          action: 'disappear',
          startTime: 4500,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              easing: easeInOutQuad,
              fade: {
                opacity: 0,
                isBaseOpacity: true
              }
            }
          }
        }
      ]
    }
  ]
};

scene11.actions.forEach(({ characterId, characterActions }) => {
  if (characterId.includes('background') || characterId.includes('decoration')) {
    characterActions.push({
      action: 'disappear',
      startTime: 7000,
      duration: 1000,
      payload: {
        animation: {
          duration: 1000,
          easing: easeInOutQuad,
          effect: 'fade'
        }
      }
    });
  } else {
    const character = scene11Characters.find(character => character.id === characterId);
    if (character) {
      const { top, left } = character.position;
      characterActions.push({
        action: 'style',
        startTime: 7000,
        duration: 1000,
        payload: {
          graphic: {
            x: 960 - left,
            y: 480 - top,
            width: 2,
            height: 2,
            opacity: 0
          },
          animation: {
            duration: 1000,
            easing: easeInOutQuad
          }
        }
      });
    }
  }
});
