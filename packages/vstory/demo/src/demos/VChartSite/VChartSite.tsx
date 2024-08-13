import React, { act, useEffect } from 'react';
import { IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
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
    // 准备一个图表
    const tempSpec: IStorySpec = {
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
            scene1,
            scene2,
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
    // console.log('dsl', tempSpec);
    const story = new Story(tempSpec, { dom: id, playerOption: { scaleX: 1, scaleY: 1 } });
    window.story = story;
    story.play(false);
    const btn1 = document.createElement('button');
    btn1.innerText = 'replay';
    btn1.addEventListener('click', () => {
      story.play();
    });

    {
      let paused = false;
      let actIndex: string | number = 0;
      document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
          if (paused) {
            story.play(actIndex);
            paused = false;
            console.log(111111, 'continue', actIndex);
          } else {
            actIndex = story.pause();
            paused = true;
            console.log(111111, 'pause', actIndex);
          }
        }
      });
    }

    const btn2 = document.createElement('button');
    btn2.innerText = 'export';
    btn2.addEventListener('click', () => {
      story
        .encodeToVideo(0, 5000, 15)
        .then(objUrl => {
          const video = document.createElement('video');
          (video as any).muted = 'muted';
          video.controls = true;
          video.src = objUrl;
          video.play();
          video.style.width = '500px';
          video.style.height = '300px';
          document.body.appendChild(video);
        })
        .catch(err => {
          console.log(err);
        });
    });
    document.body.appendChild(btn1);
    document.body.appendChild(btn2);

    // let i = 0;
    // story.getPlayer().setCurrentChapter(0);
    // setInterval(() => {
    //   story.getPlayer().tickTo(300 * i++);
    // }, 300);
  }, []);
  /** 视频 1920*1080, 等比例缩小 0.75 */
  return <div style={{ width: '1440px', height: '810px' }} id={id}></div>;
};
