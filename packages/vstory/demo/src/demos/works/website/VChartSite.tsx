import React, { act, useEffect } from 'react';
import { IStoryDSL, Player, Story } from '../../../../../../vstory-core/src';
import { scene1, scene1Characters } from './scene1';
import { scene2, scene2Characters } from './scene2';
import { scene3, scene3Characters } from './scene3';
import { scene4, scene4Characters } from './scene4';
import { scene5, scene5Characters } from './scene5';
import { scene6, scene6Characters } from './scene6';
import { scene7, scene7Characters } from './scene7';
import { scene8, scene8Characters } from './scene8';
import { scene9, scene9Characters } from './scene9';
import { scene10, scene10Characters } from './scene10';
import { scene11, scene11Characters } from './scene11';
import { scene12, scene12Characters } from './scene12';
import { scene12_2, scene12_2_Characters } from './scene12-2';
import { scene13, scene13Characters } from './scene13';
export const VChartSiteDemo = () => {
  const id = 'storyBar';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    // 准备一个图表
    const dsl: IStoryDSL = {
      characters: [
        ...scene1Characters,
        ...scene2Characters,
        ...scene3Characters,
        ...scene4Characters,
        ...scene5Characters,
        ...scene6Characters,
        ...scene7Characters,
        ...scene8Characters,
        ...scene9Characters,
        ...scene10Characters,
        ...scene11Characters,
        ...scene12Characters,
        ...scene12_2_Characters,
        ...scene13Characters
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            // scene1,
            // scene2,
            scene3,
            scene4,
            scene5,
            scene6,
            scene7,
            scene8,
            scene9,
            scene10,
            scene11,
            scene12,
            scene12_2,
            scene13
          ]
        }
      ]
    };
    console.log('dsl', dsl);
    const story = new Story(dsl, { canvas, width: 670, height: 400, background: 'white', scaleX: 0.5, scaleY: 0.5 });
    const player = new Player(story);
    story.init(player);
    (window as any).story = story;
    player.play(1);
    return () => {
      story.release();
    };
  }, []);
  /** 视频 1920*1080, 等比例缩小 0.75 */
  return <div style={{ width: '1440px', height: '810px' }} id={id}></div>;
};
