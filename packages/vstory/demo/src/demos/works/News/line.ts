import { IChartCharacterConfig } from '../../../../../../vstory-core/src';

export const line: IChartCharacterConfig = {
  type: 'VChart',
  id: 'line',
  zIndex: 1,
  position: {
    top: 629 / 2 - 100,
    left: 478 / 2 - 100,
    width: 200,
    height: 200
  },
  options: {
    panel: {
      fill: 'rgba(100, 76, 76, 0.5)'
    },

    spec: {
      type: 'line',
      data: {
        id: 'data',
        values: [
          {
            time: '2:00',
            value: 0.1
          },
          {
            time: '2:10',
            value: 0.2
          },
          {
            time: '2:20',
            value: 0.3
          },
          {
            time: '2:30',
            value: 0.4
          },
          {
            time: '2:40',
            value: 0.5
          },
          {
            time: '2:50',
            value: 0.6
          },
          {
            time: '3:00',
            value: 0.7
          },
          {
            time: '3:10',
            value: 0.8
          },
          {
            time: '3:20',
            value: 0.9
          },
          {
            time: '3:30',
            value: 1.0
          },
          {
            time: '3:40',
            value: 1.1
          },
          {
            time: '3:50',
            value: 1.2
          },
          {
            time: '4:00',
            value: 1.3
          },
          {
            time: '4:10',
            value: 1.4
          },
          {
            time: '4:20',
            value: 1.5
          },
          {
            time: '4:30',
            value: 1.6
          },
          {
            time: '4:40',
            value: 1.7
          },
          {
            time: '4:50',
            value: 1.8
          },
          {
            time: '5:00',
            value: 1.9
          },
          {
            time: '5:10',
            value: 2.0
          },
          {
            time: '5:20',
            value: 2.1
          },
          {
            time: '5:30',
            value: 2.2
          },
          {
            time: '5:40',
            value: 2.3
          },
          {
            time: '5:50',
            value: 2.4
          },
          {
            time: '6:00',
            value: 2.5
          },
          {
            time: '6:10',
            value: 2.6
          },
          {
            time: '6:20',
            value: 2.7
          },
          {
            time: '6:30',
            value: 2.8
          },
          {
            time: '6:40',
            value: 2.9
          },
          {
            time: '6:50',
            value: 3.0
          }
        ]
      },
      xField: 'time',
      yField: 'value',
      //隐藏x轴
      axes: [
        {
          orient: 'bottom',
          visible: false
        }
      ],

      line: {
        style: {
          curveType: 'monotone'
        }
      }
    }
  }
};

export const lineAction = {
  characterId: 'line',
  characterActions: [
    {
      action: 'appear',
      startTime: 1000,
      payload: [
        {
          animation: { duration: 1500 }
        }
      ]
    },

    {
      // action: 'disappear',
      // startTime:2000,
      // payload: {
      //         animation: { duration: 400,   }
      //   }
    }
  ]
};
