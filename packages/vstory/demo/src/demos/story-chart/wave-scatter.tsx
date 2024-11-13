import React, { createRef, useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction } from '../../../../../vstory-player/src';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
initVR();

export const WaveScatter = () => {
  const id = 'WaveScatter';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    story.addCharacterWithAppear({
      type: 'WaveScatter',
      id: 'title1',
      zIndex: 1,
      position: {
        top: 100,
        left: 200,
        width: 300,
        height: 300
      },
      options: {
        data: [
          {
            id: 'id0',
            values: [
              {
                city: '北京',
                temperature: 35,
                value: 35
              },
              {
                city: '上海',
                temperature: 30,
                value: 30
              },
              {
                city: '广州',
                temperature: 27,
                value: 27
              },
              {
                city: '深圳',
                temperature: 26,
                value: 26
              },
              {
                city: '成都',
                temperature: 15,
                value: 15
              },
              {
                city: '杭州',
                temperature: 12,
                value: 12
              },
              {
                city: '南京',
                temperature: 8,
                value: 8
              }
            ]
          }
        ],
        categoryField: 'city',
        valueField: 'value',
        waveDuration: 2000,
        waveRatio: 0.0125,
        waveColor: '#0099ff',
        background: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
        amplitude: 6,
        frequency: 2
      } as any
    });
    player.play(-1);

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
