import React, { useEffect } from 'react';
import { IChartCharacterConfig, IStoryDSL, Player, Story } from '../../../../../../vstory-core/src';
import { registerAll } from '../../../../../src';
import { bar1, bar1Action } from './bar1';
import { arrow, arrowAction } from './arrow';
import { NumberScroll } from './NumberScroll';
import { progress, progressAction } from './progress';

registerAll();

async function loadDSL(): Promise<IStoryDSL> {
  const dsl: IStoryDSL = {
    characters: [bar1, arrow, progress],
    acts: [
      {
        id: 'default-chapter',
        scenes: [
          {
            id: 'scene0',
            actions: [bar1Action, arrowAction, progressAction]
          }
        ]
      }
    ]
  };

  return new Promise(resolve => {
    const video = document.getElementById('news-video');
    if (video) {
      video.addEventListener('canplay', () => {
        console.log('canplay');
        resolve(dsl);
      });
    } else {
      resolve(dsl); // 如果没有找到视频元素，直接返回 DSL
    }
  });
}

export const News = () => {
  const id = 'news';
  const videoUrl = 'https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/vstory/20250312-163446.mp4';
  const [showPlayButton, setShowPlayButton] = React.useState(true);
  const [isRunning, setIsRunning] = React.useState(false);

  useEffect(() => {
    const canvas = document.getElementById('news-canvas');
    const story = new Story(null, {
      canvas,
      width: 478,
      height: 629,
      background: 'rgba(0, 0, 0, 0)'
    });

    const player = new Player(story);
    story.init(player);

    loadDSL().then(dsl => {
      story.load(dsl);
      const video: HTMLVideoElement = document.getElementById('news-video') as HTMLVideoElement;

      video.addEventListener('play', () => {
        player.tickTo(0);
        player.play(-1);
        setTimeout(() => {
          setIsRunning(true);
        }, 12000);
      });

      // 添加视频结束事件监听
      video.addEventListener('ended', () => {
        video.currentTime = 0; // 回到第一帧
        setShowPlayButton(true); // 显示播放按钮
      });
    });

    return () => {
      story.release();
    };
  }, []);

  return (
    <div style={{ width: '478px', height: '629px', position: 'relative' }} id={id}>
      <canvas id="news-canvas" style={{ width: 478, height: 629, position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
      <video
        id="news-video"
        src={videoUrl}
        autoPlay
        width={478}
        height={629}
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <NumberScroll
        startNumber={13000000000}
        endNumber={13400000000}
        duration={3000}
        isRunning={isRunning}
        onEnd={() => {
          setTimeout(() => {
            setIsRunning(false);
          }, 1000);
        }}
      />

      {showPlayButton && (
        <button
          onClick={() => {
            const video = document.getElementById('news-video') as HTMLVideoElement;
            video?.play();
            setShowPlayButton(false);
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          播放
        </button>
      )}
    </div>
  );
};
