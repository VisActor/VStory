import { IChartCharacterConfig } from '../../../../../../vstory-core/src';
export const bar1: IChartCharacterConfig = {
  type: 'VChart',
  id: 'bar1',
  zIndex: 1,
  options: {
    panel: {
      fill: 'rgba(100, 76, 76, 0.5)'
    },
    spec: {
      type: 'bar',
      xField: 'name',
      yField: 'value',

      label: {
        visible: true,
        position: 'middle',
        style: {
          fill: 'black',
          fontSize: 12
        }
      },
      data: {
        id: 'bar1Data',
        values: [
          {
            name: '2006',
            value: 2.3
          },
          {
            name: '2007',
            value: 0
          }
        ]
      },
      axes: [
        {
          orient: 'bottom',
          label: {
            style: {
              fill: 'yellow'
            }
          }
        }
      ]
    }
  },
  position: {
    top: 478 / 2 + 100,
    left: 629 / 2 - 200,
    width: 210,
    height: 210
  }
};

export const bar1Action = {
  characterId: 'bar1',
  characterActions: [
    {
      action: 'appear',
      startTime: 7100,
      payload: [
        {
          animation: { duration: 200 }
        }
      ]
    },

    {
      action: 'update',
      startTime: 7200,
      payload: {
        id: 'bar1Data',
        values: [
          {
            name: '2006',
            value: 2.3
          },
          {
            name: '2007',
            value: 2.5
          }
        ],

        animation: { duration: 2800 }
      }
    },
    {
      action: 'disappear',
      startTime: 10000,
      payload: {
        animation: { duration: 400 }
      }
    }
  ]
};
