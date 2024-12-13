import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { encodeToVideo } from '../../../../../vstory-player/src/encode';
import { registerAll } from '../../../../src';

registerAll();
initVR();

// 2018 http://www.81.cn/2018njdts81zn/2018-12/12/content_9376268.htm
// 2019 http://www.legaldaily.com.cn/gallery/content/2019-12/13/content_8073861.html
// 2020 https://photo.cctv.com/2020/12/12/PHOA4uUqqopn5Ya9eDCu8u7U201212.shtml#O0RgZnlNmfkz201212_1
// 2021 http://www.news.cn/politics/2021-12/12/c_1128156191.htm
// 2022 http://www.news.cn/photo/2022-12/12/c_1129202736_2.htm
// 2023 http://www.mod.gov.cn/gfbw/gfjy_index/16272859.html
// 2024 https://www.news.cn/photo/20241212/bbf958bbe701456c9c259612d2db0f6c/c.html?page=1

const data = [
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

const data2018 = data.map(item => ({ ...item, death: false, value: 100 }));
const data2019 = data.map(item => ({ ...item, death: !item.year.includes(2019), value: 100 }));
const data2020 = data.map(item => ({ ...item, death: !item.year.includes(2020), value: 100 }));
const data2021 = data.map(item => ({ ...item, death: !item.year.includes(2021), value: 100 }));
const data2022 = data.map(item => ({ ...item, death: !item.year.includes(2022), value: 100 }));
const data2023 = data.map(item => ({ ...item, death: !item.year.includes(2023), value: 100 }));
const data2024 = data.map(item => ({ ...item, death: !item.year.includes(2024), value: 100 }));

export const NanJinWordCloud = () => {
  const id = 'NanJinWordCloud';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      // canvas的宽高，设置后仅对canvas大小生效，不影响内容，如果内容过大会被裁剪
      width: 2000 / 2,
      height: 800 / 2,
      background: 'black',
      // 对内容的缩放，不影响canvas的宽高
      scaleX: 0.5,
      scaleY: 0.5
    });
    const player = new Player(story);
    story.init(player);

    const spec = {
      type: 'wordCloud',
      wordCloudShapeConfig: {
        fillingTimes: 0
      },
      background: 'transparent',
      fontSizeRange: [30, 30],
      random: false,
      nameField: 'name',
      valueField: 'value',
      seriesField: 'name',
      // maskShape: {
      //   type: 'text',
      //   text: '南京',
      //   fill: '#eee',
      //   fontWeight: 'bolder'
      // },
      // wordMask: {
      //   visible: true
      // },
      word: {
        style: {
          fill: 'black',
          opacity: (datum: any) => (datum.death ? 0.2 : 1),
          fontWeight: 'bolder'
        }
      }
    };

    story.addCharacter(
      {
        type: 'VChart',
        id: 'radar1',
        zIndex: 3,
        position: {
          top: 50,
          left: 50,
          width: 900,
          height: 600
        },
        options: {
          padding: { left: 0, right: 0, top: 0, bottom: 0 },
          spec,
          data: [
            {
              id: 'data',
              values: data2018
            }
          ],
          panel: {
            fill: 'grey',
            shadowColor: 'rgba(0, 0, 0, 0.05)',
            shadowBlur: 10,
            shadowOffsetX: 4,
            shadowOffsetY: 4,
            cornerRadius: 20
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
                  duration: 1000,
                  easing: 'linear'
                }
              }
            ]
          },
          ...[data2019, data2020, data2021, data2022, data2023, data2024].map((data, index) => {
            return {
              action: 'update',
              startTime: 1000 + index * 2000,
              payload: {
                duration: 1000,
                id: 'data',
                values: data
              }
            } as any;
          })
        ]
      }
    );

    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
