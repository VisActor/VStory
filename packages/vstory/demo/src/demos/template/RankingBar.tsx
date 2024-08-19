import React, { useEffect } from 'react';
import { IStorySpec } from '../../../../src/story/interface';
import { Story } from '../../../../src/story/story';
import '../../../../src/story/index';
import { yearsData, countryImage } from './rankingBar-data';

const allData: any[] = [];
yearsData.forEach(value => {
  allData.push(...value);
});
const spec = {
  type: 'rankingBar',
  data: allData,
  timeField: 'Year',
  xField: 'Value',
  yField: 'CountryName',
  icon: Array.from(countryImage).reduce((obj: any, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {}),
  // iconPosition: 'axis',
  interval: 300,
  // iconShape: 'rect',
  color: {
    China: 'red',
    USA: 'rgb(0,43,127)',
    India: '#FF9933',
    Russia: '#D52B1E',
    Japan: 'rgb(79,66,95)',
    Brazil: ' #009B3A',
    Mexico: 'rgb(1,101,69)',
    Indonesia: '#CE1126',
    Italy: '#009246',
    UK: 'rgb(27,63,126)',
    Germany: '#000000',
    France: '#0055A4',
    Pakistan: '#006600',
    Nigeria: '#008000'
  },
  timeLabel: {
    visible: true,
    style: {
      // fontSize: 120
    }
  },
  nameLabel: {
    visible: true,
    position: 'bar-start',
    style: {
      // fill: 'white'
    }
  }
};

export const RankingBar = () => {
  const id = 'rankingBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'RankingBar',
          id: 'bar',
          zIndex: 10,
          position: {
            top: 100,
            left: 100,
            width: 800,
            height: 500
          },
          options: {
            spec
          }
        }
      ],
      acts: [
        {
          id: 'default-chapter',
          scenes: [
            {
              id: 'scene0',
              actions: [
                {
                  characterId: 'bar',
                  characterActions: [
                    { action: 'appear', payload: { animation: { duration: 1000, effect: 'fade' } } },
                    {
                      action: 'bounce',
                      payload: {
                        customEase:
                          'M0,0 C0,0 0,0 0.047,0 0.047,0 0.103,1 0.236,1 0.368,1 0.424,0 0.424,0 0.424,0 0.443,0 0.443,0 0.443,0 0.471,0.49 0.553,0.49 0.619,0.49 0.668,0 0.668,0 0.668,0 0.677,0 0.677,0 0.677,0 0.699,0.216 0.743,0.216 0.778,0.216 0.811,0 0.811,0 0.811,0 0.815,0 0.815,0 0.815,0 0.828,0.086 0.854,0.086 0.875,0.086 0.895,0 0.895,0 0.895,0 0.896,0 0.896,0 0.896,0 0.904,0.031 0.92,0.031 0.932,0.031 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.944,0 0.948,0.01 0.958,0.01 0.966,0.01 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.973,0 0.975,0.002 0.981,0.002 0.986,0.002 0.989,0 0.989,0 0.989,0 0.99,0 0.99,0 0.99,0 0.99,0 0.994,0 0.998,0 1,0 1,0 ',
                        animation: {
                          duration: 2000
                        }
                      }
                    },
                    {
                      action: 'play',
                      startTime: 1000
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    const story = new Story(tempSpec, { dom: id });
    window.story = story;
    story.play();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
