---
category: examples
group: infographic
title: Bar Chart Infographic
keywords: templates, visualization, bar
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory-infographic/preview/hiv-chart.png
---

# Bar Chart Infographic: HIV Treatment Access

## Code Demo

```javascript livedemo template=vstory
VStory.registerAll();
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
                'bg0',
                'bg1',
                'bg2',
                'icon-yes',
                'icon-no',
                'text0',
                'text1',
                'text3',
                'text4',
                'text5',
                'text6',
                'line',
                'icon-hiv',
                'icon-ins',
                'icon-fb',
                'icon-tw',
                'text7',
                'text8',
                'text9'
              ],
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 200
                    }
                  }
                }
              ]
            },
            {
              characterId: ['chart'],
              characterActions: [
                {
                  action: 'appear',
                  startTime: 200,
                  payload: {
                    animation: {
                      duration: 500
                    }
                  }
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
      id: 'bg0',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 0,
        width: 1056,
        height: 350
      },
      options: {
        graphic: {
          fill: '#DA454F',
          fillOpacity: 1
        }
      }
    },
    {
      id: 'bg1',
      type: 'Rect',
      zIndex: 0,
      position: {
        x: 0,
        y: 350,
        width: 1056,
        height: 464
      },
      options: {
        graphic: {
          fill: '#222A5A',
          fillOpacity: 1
        }
      }
    },
    {
      id: 'bg2',
      type: 'Rect',
      zIndex: 1,
      position: {
        x: 346,
        y: 37,
        width: 674,
        height: 581
      },
      options: {
        graphic: {
          fill: 'white',
          fillOpacity: 1,
          cornerRadius: 10
        }
      }
    },
    {
      id: 'chart',
      type: 'VChart',
      zIndex: 2,
      position: {
        x: 444,
        y: 215,
        width: 484,
        height: 245
      },
      options: {
        spec: {
          type: 'common',
          animation: true,
          series: [
            {
              type: 'bar',
              xField: ['state'],
              yField: 'value',
              seriesField: 'state',
              direction: 'vertical',
              stack: true,
              dataId: '0',
              barWidth: 100,
              label: {
                visible: true,
                formatter: '{value}M',
                offset: 10,
                overlap: {
                  clampForce: false
                },
                style: {
                  stroke: false,
                  fill: 'black',
                  fontWeight: 'bold',
                  fontSize: 18
                }
              }
            }
          ],
          data: [
            {
              id: '0',
              values: [
                {
                  state: 'access',
                  value: 28.7
                },
                {
                  state: 'waiting',
                  value: 9.7
                }
              ]
            }
          ],
          color: ['#222A5A', '#DA454F'],
          axes: [
            {
              orient: 'bottom',
              visible: true,
              paddingOuter: [0.1],
              label: {
                visible: false
              },
              grid: {
                visible: false
              },
              tick: {
                visible: false
              },
              domainLine: {
                visible: true,
                style: {
                  strokeOpacity: 1,
                  stroke: 'black'
                }
              }
            },
            {
              label: {
                visible: true
              },
              domainLine: {
                visible: true,
                style: {
                  strokeOpacity: 1,
                  stroke: 'black'
                }
              },
              tick: {
                visible: false,
                tickStep: 10
              },
              range: {
                max: 36
              },
              orient: 'left'
            }
          ],
          animationAppear: false
        }
      }
    },
    {
      id: 'icon-yes',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 536,
        y: 424,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733985293232" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="989" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M511.8848 959.7056c-247.1296-0.0192-447.84-200.9088-447.6928-448.096 0.1408-247.2576 200.896-448.192 447.5392-447.936 248.352 0.256 448.6464 200.5824 448.4928 448.5824-0.1536 247.1424-200.8704 447.4688-448.3392 447.4496z m-38.8672-341.4272c-0.8384-0.6528-1.3504-1.0304-1.8304-1.4336-17.4784-14.6752-34.9504-29.3504-52.4288-44.0256-15.1936-12.7552-30.2464-25.6704-45.6256-38.1888-10.5728-8.608-22.5344-10.0032-34.7136-3.8464-12.1856 6.1568-18.0032 16.64-17.504 30.2592 0.3776 10.3488 5.6512 18.1696 13.5232 24.6976 21.2608 17.6256 42.3424 35.4752 63.4944 53.2352 20.0896 16.8704 40.2176 33.696 60.2432 50.6368 6.144 5.1968 12.992 8.64 21.0688 8.9088 13.0944 0.4352 22.9056-5.312 29.7472-16.4352C563.8784 592.8768 618.7904 503.68 673.6896 414.4768c8.4352-13.7024 17.0304-27.3088 25.248-41.1392 6.4832-10.8992 6.5152-22.24-0.0384-33.0752-6.4832-10.7264-16.448-15.9744-28.9856-15.3664-11.7376 0.5696-20.3456 6.5472-26.4896 16.5312-55.872 90.8544-111.8016 181.6768-167.712 272.512-0.832 1.344-1.6704 2.688-2.6944 4.3392z" fill="#1afa29" p-id="990"></path></svg>'
        }
      }
    },
    {
      id: 'icon-no',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 739,
        y: 427,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733974715010" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2055" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M511.232 0c140.8 0 261.12 49.92 361.216 150.016 99.968 99.968 150.016 220.416 150.016 361.216s-49.92 261.12-150.016 361.216c-99.968 99.968-220.416 150.016-361.216 150.016s-261.12-49.92-361.216-150.016C50.048 772.48 0 652.032 0 511.232s49.92-261.12 150.016-361.216C249.984 50.048 370.432 0 511.232 0z" fill="#FFFFFF" p-id="2056"></path><path d="M768 695.936L583.296 511.232 768 326.4l-71.936-71.936L511.232 439.04 326.528 254.464l-72.064 71.936 184.832 184.832-184.832 184.704 72.064 72.064 184.704-184.832L696.064 768 768 695.936zM511.232 0c140.8 0 261.12 49.92 361.216 150.016 99.968 99.968 150.016 220.416 150.016 361.216s-49.92 261.12-150.016 361.216c-99.968 99.968-220.416 150.016-361.216 150.016s-261.12-49.92-361.216-150.016C50.048 772.48 0 652.032 0 511.232s49.92-261.12 150.016-361.216C249.984 50.048 370.432 0 511.232 0z" fill="#FF4A47" p-id="2057"></path></svg>'
        }
      }
    },
    {
      id: 'text0',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 69,
        y: 83,
        width: 280,
        height: 300
      },
      options: {
        graphic: {
          text: [
            'HIV Treatment',
            'Access is Key to',
            'the Global Effort',
            'to End AIDS',
            'as a Public',
            'Health Threat'
          ],
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 30,
          fill: 'white'
        }
      }
    },
    {
      id: 'text1',
      type: 'Text',
      zIndex: 0,
      position: {
        x: 69,
        y: 383,
        width: 280,
        height: 300
      },
      options: {
        graphic: {
          text: [
            'People with HIV who are',
            'aware of their status, take',
            'Antiretroviral therapy (ART)',
            'as prescribed, and maintain',
            'an undetectable viral load',
            'can live long and healthy',
            'lives and will not transmit',
            'HIV to their HIV-negative',
            'partners through sex.'
          ],
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 18,
          fill: 'white'
        }
      }
    },
    {
      id: 'text3',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 464,
        y: 86,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: 'Global Access to HIV Treatment in 2021',
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 26,
          fill: 'black'
        }
      }
    },
    {
      id: 'text4',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 704,
        y: 140,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: [
            'People Living with HIV (PLHIV) who had access vs.',
            'were still waiting to access Antiretroviral Therapy (ART)'
          ],
          textAlign: 'center',
          textBaseline: 'top',
          fontSize: 18,
          fill: 'black'
        }
      }
    },
    {
      id: 'text5',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 606,
        y: 549,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: 'PLHIV had access',
          textAlign: 'center',
          textBaseline: 'middle',
          fontSize: 16,
          fill: 'black'
        }
      }
    },
    {
      id: 'text6',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 808,
        y: 550,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: 'PLHIV will still waiting',
          textAlign: 'center',
          textBaseline: 'middle',
          fontSize: 16,
          fill: 'black'
        }
      }
    },
    {
      id: 'line',
      type: 'Line',
      zIndex: 1,
      position: {
        x: 36,
        y: 656,
        width: 984,
        height: 2
      },
      options: {
        graphic: {
          stroke: 'white',
          points: [
            {
              x: 0,
              y: 0
            },
            {
              x: 984,
              y: 0
            }
          ]
        }
      }
    },
    {
      id: 'icon-hiv',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 37,
        y: 651,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733988047231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="991" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M601.6 533.333333C716.8 401.066667 768 294.4 768 213.333333c0-123.733333-170.666667-170.666667-268.8-170.666666S234.666667 89.6 234.666667 213.333333c0 81.066667 29.866667 166.4 149.333333 298.666667l-315.733333 362.666667L179.2 981.333333l315.733333-375.466666 349.866667 375.466666 110.933333-93.866666-354.133333-354.133334zM332.8 230.4c0-81.066667 76.8-98.133333 157.866667-98.133333 81.066667 0 157.866667 17.066667 157.866666 98.133333s-157.866667 217.6-157.866666 217.6-157.866667-136.533333-157.866667-217.6z" fill="#DA454F" p-id="992" data-spm-anchor-id="a313x.manage_type_myprojects.0.i0.d08c3a81rx525G" class="selected"></path></svg>'
        }
      }
    },
    {
      id: 'icon-ins',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 127,
        y: 675,
        width: 18,
        height: 18
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733974703118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1597" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M 874.004 835.062 v -394.946 h -82.281 q 12.19 38.398 12.19 79.842 q 0 76.795 -39.007 141.706 t -106.05 102.698 t -146.276 37.788 q -120.068 0 -205.396 -82.586 t -85.328 -199.606 q 0 -41.445 12.19 -79.842 h -85.937 v 394.946 q 0 15.846 10.666 26.513 t 26.513 10.666 h 651.539 q 15.237 0 26.208 -10.666 t 10.971 -26.513 Z M 700.911 510.207 q 0 -75.577 -55.158 -128.906 t -133.172 -53.33 q -77.405 0 -132.563 53.33 t -55.158 128.906 t 55.158 128.906 t 132.563 53.33 q 78.014 0 133.172 -53.33 t 55.158 -128.906 Z M 874.004 290.793 v -100.565 q 0 -17.066 -12.19 -29.561 t -29.865 -12.494 h -106.05 q -17.675 0 -29.865 12.494 t -12.19 29.561 v 100.565 q 0 17.675 12.19 29.865 t 29.865 12.19 h 106.05 q 17.675 0 29.865 -12.19 t 12.19 -29.865 Z M 980.054 164.019 v 696.032 q 0 49.369 -35.35 84.718 t -84.718 35.35 h -696.032 q -49.369 0 -84.718 -35.35 t -35.35 -84.718 v -696.032 q 0 -49.369 35.35 -84.718 t 84.718 -35.35 h 696.032 q 49.369 0 84.718 35.35 t 35.35 84.718 Z" fill="#ffffff" p-id="1598"></path></svg>'
        }
      }
    },
    {
      id: 'icon-fb',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 157,
        y: 676,
        width: 18,
        height: 18
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733974707467" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1748" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M965.7344 2.7648c14.848 0 28.2624 5.5296 40.2432 16.6912C1017.9584 30.5152 1024 43.52 1024 58.2656l0 910.2336c0 14.848-6.0416 27.7504-18.0224 38.8096C993.8944 1018.4704 980.48 1024 965.7344 1024L704.9216 1024 704.9216 629.9648l133.2224 0 19.456-155.4432-152.576 0L705.024 373.0432c0-50.688 25.9072-76.0832 77.7216-76.0832l80.4864 0L863.232 163.5328c-27.7504-5.4272-67.4816-8.192-119.296-8.192-59.1872 0-106.8032 18.0224-142.9504 54.0672C564.736 245.5552 546.7136 296.0384 546.7136 360.7552l0 113.7664L413.4912 474.5216l0 155.4432 133.2224 0L546.7136 1024 55.5008 1024c-14.848 0-27.7504-5.5296-38.8096-16.6912C5.5296 996.2496 0 983.3472 0 968.4992L0 58.2656C0 43.52 5.5296 30.5152 16.6912 19.456c11.0592-11.0592 24.064-16.6912 38.8096-16.6912L965.7344 2.7648z" fill="#ffffff" p-id="1749"></path></svg>'
        }
      }
    },
    {
      id: 'icon-tw',
      type: 'Shape',
      zIndex: 2,
      position: {
        x: 185,
        y: 675,
        width: 18,
        height: 18
      },
      options: {
        graphic: {
          fill: 'white',
          symbolType:
            '<svg t="1733974688539" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1287" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z" fill="#ffffff" p-id="1288"></path></svg>'
        }
      }
    },
    {
      id: 'text7',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 135,
        y: 728,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: ['#HIVAwarenessMonth', '#PLHIV #EndAids'],
          textAlign: 'left',
          textBaseline: 'middle',
          fontSize: 12,
          fill: 'white'
        }
      }
    },
    {
      id: 'text8',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 430,
        y: 690,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: 'Support HIV / AIDS Awareness Month',
          textAlign: 'left',
          textBaseline: 'middle',
          fontSize: 24,
          fill: 'red',
          fillOpacity: 0.6
        }
      }
    },
    {
      id: 'text9',
      type: 'Text',
      zIndex: 2,
      position: {
        x: 430,
        y: 728,
        width: 800,
        height: 300
      },
      options: {
        graphic: {
          text: [
            'Sources: https://www.who.int/data/gho/data/themes/hiv-aids',
            'https://www.hiv.gov/hiv-basics/overview/data-and-trends/global-statistics'
          ],
          textAlign: 'left',
          textBaseline: 'middle',
          fontSize: 10,
          fill: 'white'
        }
      }
    }
  ]
};
const story = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  scaleX: 0.7,
  scaleY: 0.7
});
const player = new VStory.Player(story);
story.init(player);

player.play(-1);

window['story'] = story;
window['vstory'] = story;
```
