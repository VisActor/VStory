import React, { useEffect, useRef } from 'react';
import { IStoryDSL, Player, Story } from '../../../../../../../vstory-core/src';
import { registerAll } from '../../../../../../src';

registerAll();
// 排序算法
export const Sort = () => {
  const id = 'Sort';
  const ref = useRef<Story>();

  useEffect(() => {
    const run = async () => {
      const dsl = await import('./data.json');
      const container = document.getElementById(id);
      const canvas = document.createElement('canvas');
      canvas.width = 2000;
      canvas.height = 1000;
      container?.appendChild(canvas);

      const story = new Story(dsl.default as IStoryDSL, {
        canvas,
        width: 1280,
        height: 720,
        scaleX: 'auto',
        scaleY: 'auto'
      });
      const player = new Player(story);
      story.init(player);
      player.play(-1);

      ref.current = story;
    };

    run();
    return () => {
      if (ref.current) {
        ref.current.release();
      }
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
