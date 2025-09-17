import { IChartCharacterConfig } from '../../../../../../vstory-core/src';

export const progress: IChartCharacterConfig = {
  type: 'VChart',
  id: 'progress',
  zIndex: 1,
  position: {
    top: 629 / 2 + 80,
    left: 478 / 2 - 478 / 4,
    width: 478 / 2,
    height: 80
  },
  options: {
    panel: {
      fill: 'rgba(100, 76, 76, 0.5)'
    },

    spec: {
      type: 'linearProgress',
      data: [
        {
          id: 'progressData',
          values: [
            {
              type: 'Tradition Industries',
              value: 0.5,
              text: '0.5'
            }
          ]
        }
      ],
      direction: 'horizontal',
      xField: 'value',
      yField: 'type',
      seriesField: 'type',

      cornerRadius: 20,
      bandWidth: 30,
      extensionMark: [
        {
          type: 'rule',
          dataId: 'progressData',
          visible: true,
          style: {
            x: (datum, ctx, elements, dataView) => {
              return ctx.valueToX([0.3]);
            },
            y: (datum, ctx, elements, dataView) => {
              return ctx.valueToY([datum.type]) - 15;
            },
            x1: (datum, ctx, elements, dataView) => {
              return ctx.valueToX([0.3]);
            },
            y1: (datum, ctx, elements, dataView) => {
              return ctx.valueToY([datum.type]) + 15;
            },
            stroke: '#fff',
            lineWidth: 4,
            zIndex: 1
          }
        },
        {
          type: 'rule',
          dataId: 'progressData',
          visible: true,
          style: {
            x: (datum, ctx, elements, dataView) => {
              return ctx.valueToX([0.5]);
            },
            y: (datum, ctx, elements, dataView) => {
              return ctx.valueToY([datum.type]) - 15;
            },
            x1: (datum, ctx, elements, dataView) => {
              return ctx.valueToX([0.5]);
            },
            y1: (datum, ctx, elements, dataView) => {
              return ctx.valueToY([datum.type]) + 15;
            },
            stroke: '#fff',
            lineWidth: 4,
            zIndex: 1
          }
        }
      ],
      axes: [
        {
          orient: 'bottom',
          type: 'linear',
          visible: true,
          grid: {
            visible: false
          },
          label: {
            flush: true,
            style: {
              fill: 'white'
            }
          }
        }
      ]
    }
  }
};

export const progressAction = {
  characterId: 'progress',
  characterActions: [
    {
      action: 'appear',
      startTime: 20000,
      payload: [
        {
          animation: { duration: 0 }
        }
      ]
    },

    {
      action: 'update',
      startTime: 21000,
      payload: {
        id: 'progressData',
        values: [
          {
            type: 'Tradition Industries',
            value: 0.3,
            text: '0.3'
          }
        ],

        animation: { duration: 2000 }
      }
    },
    {
      action: 'disappear',
      startTime: 23000,
      payload: {
        animation: { duration: 400 }
      }
    }
  ]
};
