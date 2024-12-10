import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';
import { registerDynamicLine, registerDynamicLineAction } from '@visactor/vstory-external';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerDynamicLine();
registerDynamicLineAction();
initVR();

const data = [
  { year: '2008年6月10日', name: 'iPhone 3G', price: 4193, bg: 'iphone3G.png' },
  { year: '2009年6月9日', name: 'iPhone 3GS', price: 4193, bg: 'iphone3G.png' },
  { year: '2010年6月9日', name: 'iPhone 4', price: 4999, bg: 'iphone4.png' },
  { year: '2011年10月5日', name: 'iPhone 4S', price: 4988, bg: 'iphone4.png' },
  { year: '2012年9月13日', name: 'iPhone 5', price: 5288, bg: 'iphone5.png' },
  { year: '2013年9月10日', name: 'iPhone 5S', price: 5288, bg: 'iphone5.png' },
  { year: '2014年9月10日', name: 'iPhone 6', price: 4488, bg: 'iphone6.png' },
  { year: '2015年9月10日', name: 'iPhone 6S', price: 5288, bg: 'iphone6.png' },
  { year: '2016年9月8日', name: 'iPhone 7', price: 5388, bg: 'iphone7.png' },
  { year: '2017年9月12日', name: 'iPhone 8', price: 5888, bg: 'iphone8.png' },
  { year: '2018年9月13日', name: 'iPhone Xs', price: 8699, bg: 'iphonex.png' },
  { year: '2019年9月11日', name: 'iPhone 11', price: 5499, bg: 'iphone11.png' },
  { year: '2020年10月14日', name: 'iPhone 12', price: 6299, bg: 'iphone12.png' },
  { year: '2021年9月15日', name: 'iPhone 13', price: 5999, bg: 'iphone13.png' },
  { year: '2022年9月8日', name: 'iPhone 14', price: 5999, bg: 'iphone14.png' },
  { year: '2022年9月15日', name: 'iPhone 15', price: 5999, bg: 'iphone15.png' },
  { year: '2022年9月13日', name: 'iPhone 16', price: 5999, bg: 'iphone16.png' }
].map(item => ({ ...item, bg: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/demo/${item.bg}` }));

export const DynamicLine = () => {
  const id = 'DynamicLine';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    story.addCharacter(
      {
        type: 'DynamicLine',
        id: 'title1',
        zIndex: 1,
        position: {
          top: 100,
          left: 200,
          width: 400,
          height: 300
        },
        options: {
          data: [
            {
              id: 'id0',
              values: data
            }
          ],
          rootConfig: {
            xField: 'year',
            yField: 'price',
            label: {
              visible: true
            },
            point: {
              style: {
                size: [35, 60],
                symbolType: 'rect',
                fill: 'transparent',
                background: (datum: any) => datum.bg ?? 'green'
              }
            }
          },
          bottomRange: [0, 0.15]
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
                } as any
              }
            ]
          },
          {
            startTime: 1000,
            action: 'play',
            payload: {
              animation: {
                duration: 16000,
                easing: 'linear'
              } as any
            }
          }
        ]
      }
    );
    player.play(0);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};

// import { useEffect } from "react";
// import { createWaveScatter } from "../../../../../vstory-core/src";
// export const WaveScatter = () => {

//   useEffect (() => {
//     createWaveScatter('container', [
//       {
//           "city": "北京",
//           "temperature": 35
//       },
//       {
//           "city": "上海",
//           "temperature": 30
//       },
//       {
//           "city": "广州",
//           "temperature": 27
//       },
//       {
//           "city": "深圳",
//           "temperature": 26
//       },
//       {
//           "city": "成都",
//           "temperature": 15
//       },
//       {
//           "city": "杭州",
//           "temperature": 12
//       },
//       {
//           "city": "南京",
//           "temperature": 8
//       }
//   ])
//   }, []);

//   return (
//     <div style={{ width: 800, height: 500 }} id="container">
//     </div>
//   );
// };
