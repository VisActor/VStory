import React, { useEffect } from 'react';
import { IStoryDSL, Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';
import 哪吒 from '../../assets/infographic/Film_analysis/哪吒.png';

registerAll();
export const FilmAnalysis = () => {
  const id = 'FilmAnalysis';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    container?.appendChild(canvas);

    const dsl: IStoryDSL = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  // 给所有元素都先给一展示动作，不设置具体动画属性的话，它们会直接展示
                  characterId: ['background', 'title', 'subTitle', 'describe', 'chart'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1000, // 开始动画的时间
                      payload: [
                        {
                          animation: {
                            duration: 800, // 持续时间
                            easing: 'linear', // 差值方法
                            effect: 'wipe' // 效果
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      characters: [
        // background
        {
          id: 'background', // 元素 id 后面会用到
          type: 'Image', // 类型
          zIndex: 0, // 层级
          position: {
            // 元素的位置大小
            x: 0,
            y: 0,
            width: 1024,
            height: 700
          },
          options: {
            graphic: {
              image: 哪吒,
              fillOpacity: 0.7 // 透明度
            }
          }
        },
        //chart
        {
          id: 'chart',
          type: 'VChart',
          zIndex: 1,
          position: {
            //先随便给一位置吧
            x: 60,
            y: 50,
            width: 600, // 注意要给宽高
            height: 600
          },
          options: {
            spec: {
              type: 'radar',
              data: [
                {
                  values: [
                    { key: '票房(万)', value: 813471134.08 },
                    { key: '观影人次', value: 19629300 },
                    { key: '场均人次', value: 77 },
                    { key: '上座率(%)', value: 56.03 },
                    { key: '黄金场票房占比(%)', value: 22.87 },
                    { key: '黄金场场次占比(%)', value: 20.85 },
                    { key: '黄金场人次占比(%)', value: 21.9 },
                    { key: '黄金场上座率(%)', value: 57.75 }
                  ]
                }
              ],
              categoryField: 'key',
              valueField: 'value',
              innerRadius: 0.4,
              outerRadius: 0.9,
              label: {
                visible: true
              },
              axes: [
                {
                  orient: 'radius',
                  zIndex: 100,
                  grid: {
                    style: (data, index) => {
                      if (index === 0) {
                        return {
                          lineDash: [0]
                        };
                      }
                      return {
                        visible: false
                      };
                    }
                  }
                },
                {
                  orient: 'angle',
                  tick: {
                    visible: false
                  },
                  domainLine: {
                    visible: true
                  },
                  grid: {
                    alignWithLabel: false,
                    style: {
                      lineDash: [0]
                    },
                    alternateColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }
              ],
              indicator: {
                visible: true,
                trigger: 'hover',
                limitRatio: 0.4,
                title: {
                  visible: true,
                  autoFit: true,
                  style: {
                    fontWeight: 'bolder',
                    fontFamily: 'Times New Roman',
                    fill: '#888',
                    text: '哪吒之魔童闹海 表现分析'
                  }
                }
              }
            }
          }
        },
        // title
        {
          id: 'title',
          type: 'Text',
          zIndex: 1,
          position: { x: 512, y: 0, width: 1024, height: 100 },
          options: {
            graphic: {
              text: `春节档票房传奇：《哪吒之魔童闹海》`,
              fill: '#de1c31',
              fontSize: 48,
              textAlign: 'center',
              fontWeight: 'bolder'
            }
          }
        },
        // subtitle
        {
          id: 'subtitle',
          type: 'Text',
          zIndex: 1,
          position: { x: 20, y: 0, width: 200, height: 100 },
          options: {
            graphic: {
              text: `《哪吒之魔童闹海》-票房表现分布`,
              fontSize: 20,
              fontWeight: 'bolder'
            }
          }
        },
        //describe
        {
          id: 'describe',
          type: 'Text',
          zIndex: 1,
          position: { x: 850, y: 250, width: 300, height: 550 },
          options: {
            graphic: {
              text: [
                `《哪吒之魔童闹海》在春节档凭借其出色的表现，成为票房和口碑双丰收的影片`,
                `\r`,
                `其在票房、观影人次、上座率等多个维度上的优异表现充分展示了其在观众中的受欢迎程度和市场影响力。`
              ],
              fontSize: 25,
              fontWeight: 'bolder'
            }
          }
        }
      ]
    };

    const story = new Story(dsl, {
      canvas,
      width: 1024,
      height: 700,
      scaleX: 'auto',
      scaleY: 'auto'
    });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
