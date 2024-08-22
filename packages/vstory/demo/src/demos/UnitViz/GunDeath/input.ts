import { ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import data from '../../../../data/sorted-gun-death-data.json' assert { type: 'json' };

export interface Input {
  layout?: {
    width?: number;
    height?: number;
    title?: {
      height?: number;
      backgroundColor?: string;
      padding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    };
    viz?: {
      backgroundColor?: string;
      padding?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      };
    };
  };
  unit?: {
    gap?: [number, number];
    aspect?: number;
    defaultStyle?: ISymbolGraphicAttribute | ((index: number) => ISymbolGraphicAttribute);
  };
  data: Record<string, any>[];
  scenes: {
    // TODO: how to support fill, textAlign etc.?
    title: ITextGraphicAttribute[];
    sceneDuration?: number;
    animationDuration?: number;
    nodes: QueryNode[];
  }[];
}

export interface QueryNode {
  query?: (datum: any) => boolean;
  style?: ISymbolGraphicAttribute;
  children?: QueryNode[];
}

export interface UnitNode {
  style?: ISymbolGraphicAttribute;
  count: number;
  children?: UnitNode[];
}

type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

export type RequiredInput = DeepRequired<Input>;

export const defaultInput: Input = {
  layout: {
    width: 1920,
    height: 1080,
    title: {
      height: 250,
      backgroundColor: '#ffffff',
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 0
      }
    },
    viz: {
      backgroundColor: '#ffffff',
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
      }
    }
  },
  unit: {
    gap: [0.5, 0.5],
    aspect: 1,
    defaultStyle: {
      symbolType: 'circle',
      fill: '#ffffff'
    }
  },
  data: [],
  scenes: []
};

export function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep<T>(target: T, ...sources: T[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

function initialInput(input: Input): RequiredInput {
  return mergeDeep(defaultInput, input) as RequiredInput;
}

export const userInput: Input = {
  layout: {
    width: 1600,
    height: 800,
    title: {
      backgroundColor: '#f1f1f0',
      height: 150
    }
  },
  unit: {
    gap: [0.2, 0.2],
    defaultStyle: {
      fill: '#222222'
    }
  },
  // TODO: remove slice data, 性能问题
  data: (data as Record<string, any>[]).filter(record => record.year === 2014),
  scenes: [
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'More than '
        },
        {
          text: '33,000',
          fontWeight: 'bold'
        },
        {
          text: ' people are fatally shot in the U.S. each year.'
        }
      ],
      nodes: [
        {
          style: {
            fill: '#dedede'
          }
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'Nearly two-third of gun deaths are '
        },
        {
          text: 'suicides',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#e3662e'
          }
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'More than 85 percent of suicide victims are '
        },
        {
          text: 'male',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#f4cfbb'
          },
          children: [
            {
              query: datum => datum.sex === 'M',
              style: {
                fill: '#e3662e'
              }
            }
          ]
        }
      ]
    }
  ]
};

export const input = initialInput(userInput);
