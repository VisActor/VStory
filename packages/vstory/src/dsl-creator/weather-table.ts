export interface IWeatherTableTemplateParams {
  effectMap: {
    [name: string]: {
      type: 'weather-box' | 'weather-lottie';
      rain?: number;
      wind?: number;
      snow?: number;
      rainStyle?: any;
      snowStyle?: any;
      rainSnowStyle?: any;
      defaultStyle?: any;
      windEffect?: 'fade' | 'pathGrow';
      [key: string]: any;
    };
  };
  data: { city: string; date: string; effectName: string }[];
  backgroundEffect: {
    [key: string]: any;
  };
  panelStyle: any;
  backgroundImage: string;
  icon: string;
  title: {
    text: string;
    style: any;
  };
  subTitle: {
    text: string;
    style: any;
  };
  iconTitle: {
    text: string;
    style: any;
  };
  annotate: {
    text: string;
    style: any;
  };
}

export interface IWeatherTableDataItem {
  effectName: string;
  windAnimateEffect: string;
  city: string;
  date: string;
  weather: string;
}

export const createWeatherTableDSL = (data: IWeatherTableDataItem[], params: IWeatherTableTemplateParams) => {
  const { backgroundImage, icon, effectMap, backgroundEffect, panelStyle, title, subTitle, annotate, iconTitle } =
    params;
  const tableOptions = {
    data: data.map(item => ({ ...item, ...effectMap[item.effectName] })),
    spec: {
      widthMode: 'adaptive',
      heightMode: 'adaptive'
    }
  };
  const dsl = {
    acts: [
      {
        id: 'defaultAct',
        scenes: [
          {
            id: 'defaultScene',
            actions: [
              { characterId: 'bg-weather-box', characterActions: [{ action: 'appear' }] },
              { characterId: '0', characterActions: [{ action: 'appear' }] },
              { characterId: '1', characterActions: [{ action: 'appear' }] },
              { characterId: '2', characterActions: [{ action: 'appear' }] },
              { characterId: '4', characterActions: [{ action: 'appear' }] },
              { characterId: '5', characterActions: [{ action: 'appear' }] },
              { characterId: 'test-table-0', characterActions: [{ action: 'appear' }] },
              { characterId: 'annotation', characterActions: [{ action: 'appear' }] }
            ]
          }
        ]
      }
    ],
    characters: [
      {
        id: '0',
        type: 'Image',
        zIndex: 0,
        position: {
          x: 0,
          y: 0,
          width: 450,
          height: 800,
          angle: 0,
          anchor: [203.3288683479214, 360.4016139654462]
        },
        options: {
          graphic: {
            image: backgroundImage
          }
        }
      },
      {
        id: 'bg-weather-box',
        type: 'WeatherBox',
        zIndex: 0,
        position: {
          x: 0,
          y: 0,
          width: 450,
          height: 800
        },
        options: {
          graphic: {
            ...backgroundEffect
          }
        }
      },
      {
        id: '1',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 43,
          y: 28,
          width: 410,
          height: 96
        },
        options: {
          graphic: {
            text: title.text,
            innerTextAlign: 'left',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'left',
            textBaseline: 'top',
            verticalDirection: 'top',
            fill: 'rgb(68, 66, 147)',
            stroke: 'white',
            lineWidth: 3,
            ...title.style
          }
        }
      },
      {
        id: '2',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 82,
          y: 72,
          width: 327,
          height: 116
        },
        options: {
          graphic: {
            text: subTitle.text,
            innerTextAlign: 'left',
            fontSize: 40,
            fontWeight: 'bold',
            verticalDirection: 'top',
            textAlign: 'left',
            textBaseline: 'top',
            fill: 'linear-gradient(270deg, red 0%, blue 100%)',
            stroke: 'white',
            lineWidth: 3,
            ...subTitle.style
          }
        }
      },
      {
        id: '4',
        type: 'Image',
        zIndex: 0,
        position: {
          x: 155,
          y: 130,
          width: 40,
          height: 40
        },
        options: {
          graphic: {
            image: icon
          }
        }
      },
      {
        id: '5',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 210,
          y: 137,
          width: 92,
          height: 31,
          angle: 0,
          anchor: [235.49615365487648, 162.08723845305272]
        },
        options: {
          graphic: {
            text: iconTitle.text,
            innerTextAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            verticalDirection: 'top',
            fill: 'black',
            textAlign: 'left',
            textBaseline: 'top',
            ...iconTitle.style
          }
        }
      },
      {
        type: 'WeatherTable',
        id: 'test-table-0',
        zIndex: 9,
        position: {
          top: 200,
          left: 25,
          width: 400,
          height: 470
          // angle: 0.3
        },
        options: {
          panel: {
            background: 'white',
            opacity: 0.6,
            blur: 3,
            cornerRadius: 8,
            ...panelStyle
          },
          padding: [0, 10, 10, 6],
          leftTitleStyle: {
            color: 'rgb(100, 101, 163)',
            fontSize: 18,
            fontWeight: 'bold'
          },
          topTitleStyle: {
            color: 'rgb(100, 101, 163)',
            fontSize: 16,
            fontWeight: 'normal'
          },
          ...tableOptions
        }
      },
      {
        id: 'annotation',
        type: 'Text',
        zIndex: 0,
        position: {
          x: 12,
          y: 760,
          width: 420,
          height: 36,
          angle: 0,
          anchor: [206.89705280342503, 701.8472074258225]
        },
        options: {
          graphic: {
            text: annotate.text,
            textAlign: 'left',
            textBaseline: 'top',
            ...annotate.style
          },
          group: {
            lineWidth: 0,
            opacity: 1,
            background: false,
            color: 'black',
            cornerRadius: 0
          }
        }
      }
    ]
  };

  return dsl;
};
