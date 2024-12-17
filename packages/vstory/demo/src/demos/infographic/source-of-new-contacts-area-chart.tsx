import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../../vstory/src';

registerAll();
export const AreaChart = () => {
  const id = 'AreaChart';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: [
                    'background-top',
                    'background-bottom',
                    'title-icon',
                    'title-text-1',
                    'title-text-2',
                    'chart-background',
                    'chart',
                    'legend-1-circle',
                    'legend-1-text',
                    'legend-2-circle',
                    'legend-2-text',
                    'legend-3-circle',
                    'legend-3-text',
                    'legend-4-circle',
                    'legend-4-text'
                  ],
                  characterActions: [
                    {
                      action: 'appear'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      characters: [
        {
          id: 'background-top',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 1280,
            height: 180
          },
          options: {
            graphic: {
              fill: 'rgb(251,87,56)'
            }
          }
        },
        {
          id: 'background-bottom',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 0,
            y: 180,
            width: 1280,
            height: 540
          },
          options: {
            graphic: {
              fill: 'rgb(0,41,107)'
            }
          }
        },
        {
          id: 'title-icon',
          type: 'Image',
          zIndex: 0,
          position: {
            x: 220,
            y: 60,
            width: 60,
            height: 60
          },
          options: {
            graphic: {
              image: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="8" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            }
          }
        },
        {
          id: 'title-text-1',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 290,
            y: 50,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'Source of',
              textAlign: 'left',
              fontSize: 70,
              fontWeight: 'bold',
              fill: 'white'
            }
          }
        },
        {
          id: 'title-text-2',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 630,
            y: 50,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'New Contacts',
              textAlign: 'left',
              fontSize: 70,
              fontWeight: 'bold',
              fill: 'rgb(244,211,94)'
            }
          }
        },
        {
          id: 'chart-background',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 200,
            y: 140,
            width: 900,
            height: 450
          },
          options: {
            graphic: {
              fill: '#FFF',
              cornerRadius: 20
            }
          }
        },
        {
          id: 'chart',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 200,
            y: 140,
            width: 900,
            height: 450
          },
          options: {
            spec: {
              type: 'area',
              data: {
                values: [
                  { type: 'Organic search', year: '2019', value: 14000 },
                  { type: 'Organic search', year: '2020', value: 25000 },
                  { type: 'Organic search', year: '2021', value: 20000 },
                  { type: 'Organic search', year: '2022', value: 23000 },
                  { type: 'Organic search', year: '2023', value: 28 },
                  { type: 'Referral links', year: '2019', value: 8000 },
                  { type: 'Referral links', year: '2020', value: 6500 },
                  { type: 'Referral links', year: '2021', value: 12000 },
                  { type: 'Referral links', year: '2022', value: 15000 },
                  { type: 'Referral links', year: '2023', value: 18 },
                  { type: 'Paid ads', year: '2019', value: 24000 },
                  { type: 'Paid ads', year: '2020', value: 20000 },
                  { type: 'Paid ads', year: '2021', value: 20000 },
                  { type: 'Paid ads', year: '2022', value: 15000 },
                  { type: 'Paid ads', year: '2023', value: 13 },
                  { type: 'Social media', year: '2019', value: 30000 },
                  { type: 'Social media', year: '2020', value: 20000 },
                  { type: 'Social media', year: '2021', value: 33000 },
                  { type: 'Social media', year: '2022', value: 28000 },
                  { type: 'Social media', year: '2023', value: 6 }
                ]
              },
              stack: true,
              xField: 'year',
              yField: 'value',
              seriesField: 'type',
              background: '#FFF',
              color: ['rgb(244,211,94)', 'rgb(249,87,56)', 'rgb(91,192,235)', 'rgb(155,197,61)'],
              area: {
                style: {
                  curveType: 'monotone',
                  fillOpacity: 0.6
                }
              }
            }
          }
        },
        {
          id: 'legend-1-circle',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 200,
            y: 640,
            width: 30,
            height: 30
          },
          options: {
            graphic: {
              shape: 'circle',
              fill: 'rgb(244,211,94)'
            }
          }
        },
        {
          id: 'legend-1-text',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 233,
            y: 643,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'Organic search',
              textAlign: 'left',
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#FFF'
            }
          }
        },
        {
          id: 'legend-2-circle',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 450,
            y: 640,
            width: 30,
            height: 30
          },
          options: {
            graphic: {
              shape: 'circle',
              fill: 'rgb(249,87,56)'
            }
          }
        },
        {
          id: 'legend-2-text',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 483,
            y: 640,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'Referral links',
              textAlign: 'left',
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#FFF'
            }
          }
        },
        {
          id: 'legend-3-circle',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 690,
            y: 640,
            width: 30,
            height: 30
          },
          options: {
            graphic: {
              shape: 'circle',
              fill: 'rgb(91,192,235)'
            }
          }
        },
        {
          id: 'legend-3-text',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 723,
            y: 640,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'Paid ads',
              textAlign: 'left',
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#FFF'
            }
          }
        },
        {
          id: 'legend-4-circle',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 900,
            y: 640,
            width: 30,
            height: 30
          },
          options: {
            graphic: {
              shape: 'circle',
              fill: 'rgb(155,197,61)'
            }
          }
        },
        {
          id: 'legend-4-text',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 933,
            y: 640,
            width: 600,
            height: 200
          },
          options: {
            graphic: {
              text: 'Social media',
              textAlign: 'left',
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#FFF'
            }
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 1280, height: 720, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
