import { IStorySpec } from '../../../../../src/story/interface';
import { Story } from '../../../../../src/story/story';
import React, { useEffect } from 'react';
import { input } from './input';
import { generateSpec } from './process';

export const UnitVizSimple = () => {
  const id = 'unit-viz-simple';

  useEffect(() => {
    // 准备一个图表
    const spec: IStorySpec = generateSpec(input);
    const story = new Story(spec, { dom: id, playerOption: { scaleX: 0.5, scaleY: 0.5 } });
    // const story = new Story(spec, { dom: id, playerOption: {} });
    story.play();
    window.story = story;
  }, []);

  return <div style={{ width: '1920px', height: '1080px' }} id={id}></div>;
};
