import React, { useEffect } from 'react';
import { IStorySpec } from '../../../src/story/interface';
import { Story } from '../../../src/story/story';
import '../../../src/story/index';

const data0 = {
  type: 'standard',
  value:
    '{"data":[{"State":"WY","Under 5 Years":25635,"5 to 13 Years":1890,"14 to 17 Years":9314},{"State":"DC","Under 5 Years":30352,"5 to 13 Years":20439,"14 to 17 Years":10225},{"State":"VT","Under 5 Years":38253,"5 to 13 Years":42538,"14 to 17 Years":15757},{"State":"ND","Under 5 Years":51896,"5 to 13 Years":67358,"14 to 17 Years":18794},{"State":"AK","Under 5 Years":72083,"5 to 13 Years":85640,"14 to 17 Years":22153}],"columns":["State","Under 5 Years","5 to 13 Years","14 to 17 Years"],"rows":["State","WY","DC","VT","ND","AK"]}'
};

const data1 = {
  type: 'standard',
  value:
    '{"data":[{"2017":20,"year":"2017"},{"2017":18,"year":"2018"},{"2017":22,"year":"2019"},{"2017":23,"year":"2020"},{"2017":43,"year":"2021"},{"2017":21,"year":"2022"}],"columns":["year","2017"],"rows":["year","2017","2018","2019","2020","2021","2022"],"originData":[{"2017":"20","year":"2017"},{"2017":"18","year":"2018"},{"2017":"22","year":"2019"},{"2017":"23","year":"2020"},{"2017":"43","year":"2021"},{"2017":"21","year":"2022"}],"invalidCells":[]}'
};

export const StorySceneDemo = () => {
  const id = 'storyBar';

  useEffect(() => {
    // 准备一个图表
    const tempSpec: IStorySpec = {
      characters: [
        {
          type: 'Rect',
          id: 'background-top',
          zIndex: 2,
          position: {
            top: 0,
            left: 0,
            width: 200,
            height: 200
          },
          options: {
            graphic: {
              fill: '#2D6BA0',
              stroke: false
            }
          }
        }
      ],
      acts: [
        {
          id: 'page1',
          scenes: [
            {
              id: '1',
              actions: [
                {
                  characterId: 'background-top',
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: {
                        animation: {
                          duration: 100
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              id: '2',
              actions: [
                {
                  characterId: 'background-top',
                  characterActions: [
                    {
                      action: 'style',
                      startTime: 1000, // FIXME
                      payload: {
                        graphic: { fill: 'red' },
                        animation: {
                          duration: 1000
                        }
                      }
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
    story.play();
    const btn1 = document.createElement('button');
    btn1.innerText = 'replay';
    btn1.addEventListener('click', () => {
      story.play();
    });
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

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
