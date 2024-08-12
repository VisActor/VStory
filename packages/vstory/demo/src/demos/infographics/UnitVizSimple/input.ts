import { DataSet, csvParser } from '@visactor/vdataset';
import type { ITextGraphicAttribute, ISymbolGraphicAttribute } from '@visactor/vrender';

const dataSet = new DataSet();
// dataSet.registerParser('csv', csvParser);
// const dataView = new DataView(dataSet, { name: 'data' });
// dataView.parse(`year,group,value
//   1990,18-34,16.9
//   1990,35-49,12.2
//   1990,50-64,10.2
//   1990,65+,5.2
//   1991,18-34,17
//   1991,35-49,17.8
//   1991,50-64,10
//   1991,65+,4.8
//   1993,18-34,26.5
//   1993,35-49,23.8
//   1993,50-64,16.8
//   1993,65+,6.6
//   `, {
//       type: 'csv',
//       option: {
//         delimiter: ','
//       }
//     });

import data from './sample.json' assert { type: 'json' };

// interface
export type QueryNode = {
  query?: (datum: any) => boolean;
  label: string; //TODO: delete
  style?: ISymbolGraphicAttribute;
  children?: QueryNode[];
};

// TODO: rename this type, use interface
export type Input = {
  layout?: {
    width?: number;
    height?: number;
    color?: string;
    title?: {
      // TODO: color
      height?: number;
      // TODO: define padding type, left, right, top, bottom
      padding?: {
        x: number;
        y: number;
      };
    };
    viz?: {
      padding: {
        x: number;
        y: number;
      };
    };
    titleHeight: number;
    titlePadding: {
      x: number;
      y: number;
    };
    vizPadding: {
      x: number;
      y: number;
    };
  };
  unit: {
    scale?: number;
    gap?: [number, number]; //50%
    aspect?: number;
    // TODO: move style to node style
    style: ISymbolGraphicAttribute;
  };
  data: object[];
  scene: {
    id: string; //TODO: delete, use template + id
    // TODO: how to support fill, textAlign etc.?
    title: ITextGraphicAttribute[];
    sceneDuration?: number;
    animationDuration?: number;
    nodes: QueryNode[];
  }[];
};

export const input: Input = {
  layout: {
    width: 1920,
    height: 1080,
    color: '#2D6BA0',
    title: {
      height: 254, //TODO: make sure < height
      padding: {
        x: 100,
        y: 100
      }
    },
    viz: {
      padding: {
        x: 100,
        y: 100
      }
    },
    titleHeight: 254,
    titlePadding: {
      x: 100,
      y: 100
    },
    vizPadding: {
      x: 100,
      y: 100
    }
  },
  unit: {
    scale: 1,
    gap: [1, 1],
    aspect: 0.5,
    style: {
      symbolType: 'M0,0 L32,0 L32,64 L0,64 Z'
    }
  },
  data: data,
  scene: [
    {
      id: 'scene-1',
      sceneDuration: 3200,
      animationDuration: 800,
      title: [
        {
          text: 'In America, nearly '
        },
        {
          text: 'two-thirds',
          fontWeight: 'bold'
        },
        {
          text: ' of gun deaths are '
        },
        { text: 'suicides', fontWeight: 'bold' }
      ],
      nodes: [
        {
          query: datum => datum['intent'] === 'Suicide',
          label: 'suicide',
          style: {
            fill: '#3164b4',
            opacity: 0.5
          }
        },
        {
          query: datum => datum['intent'] !== 'Suicide',
          label: 'not-suicide'
        }
      ]
    },
    {
      id: 'scene-2',
      sceneDuration: 3200,
      animationDuration: 800,
      title: [
        {
          text: 'More than '
        },
        {
          text: '85 percent',
          fontWeight: 'bold'
        },
        {
          text: ' of suicide victims are'
        },
        { text: 'male', fontWeight: 'bold' }
      ],
      nodes: [
        {
          query: datum => datum['intent'] === 'Suicide',
          label: 'suicide',
          style: {
            fill: '#86b1ea'
          },
          children: [
            {
              query: datum => datum['sex'] === 'M',
              label: 'male',
              style: {
                fill: '#3164b4'
              }
            },
            {
              query: datum => datum['sex'] !== 'M',
              label: 'not-male'
            }
          ]
        },
        {
          query: datum => datum['intent'] !== 'Suicide',
          label: 'not-suicide'
        }
      ]
    }
  ]
};

export type UnitNode = {
  label: string;
  style?: ISymbolGraphicAttribute;
  count: number;
  children?: UnitNode[];
};

export type InputData = (typeof input.data)[number];
