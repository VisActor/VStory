import { ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import data from '../../../../data/gun-death-data.json' assert { type: 'json' };

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
    // id: string; //TODO: delete, use template + id
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
      fill: '#f78ae0'
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
    width: 1500,
    height: 600,
    title: {
      backgroundColor: '#f1f1f0',
      height: 150
    },
    viz: {
      backgroundColor: '#e3e2e0'
    }
  },
  // TODO: remove slice data, 性能问题
  data: (data as Record<string, any>[]).slice(0, 1000),
  scenes: [
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'In America, nearly '
        },
        {
          text: 'two-thirds',
          fontWeight: 'bold'
        },
        {
          text: 'of gun deaths are Bala bla, Bala bala Bala bala Bala bala '
        },
        { text: 'suicides', fontWeight: 'bold' }
      ],
      nodes: [
        {
          style: {
            fill: '#4e8ae0'
          }
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'In 2019, there were '
        },
        {
          text: '39,707',
          fontWeight: 'bold'
        },
        {
          text: ' gun deaths in the United States, according to data from the Centers for Disease Control and Prevention.'
        }
      ],
      nodes: [
        {
          query: datum => datum.race === 'Black',
          style: {
            fill: '#4af2a1'
          }
        }
      ]
    }
  ]
};

export const input = initialInput(userInput);

console.log('input', input);
