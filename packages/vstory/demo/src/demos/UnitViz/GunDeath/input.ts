import { ISymbolGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender-core';
import data from '../../../../data/sorted-gun-death-data.json' assert { type: 'json' };
import { merge } from '@visactor/vutils';

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
      direction?: 'horizontal' | 'vertical';
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

// type DeepRequired<T> = T extends object
//   ? {
//       [P in keyof T]-?: DeepRequired<T[P]>;
//     }
//   : T;

// export type RequiredInput = DeepRequired<Input>;

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
      direction: 'horizontal',
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

function initialInput(input: Input): Input {
  return merge({}, defaultInput, input);
}

export const userInput: Input = {
  layout: {
    width: 1550,
    height: 800,
    viz: {
      padding: {
        top: 0
      }
    },
    title: {
      // backgroundColor: '#f1f1f0',
      height: 150
    }
  },
  unit: {
    gap: [0.2, 0.2],
    defaultStyle: {
      fill: '#222222'
    }
  },
  data: (data as Record<string, any>[]).filter(record => record.year === 2014),
  scenes: [
    {
      // ? how to default
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
          text: ' people are fatally shot in the U.S. each year. This is for test. This is f test. This is for test'
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
          text: 'Nearly two-third of gun deaths are'
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
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: '... and more than half of all suicides are '
        },
        {
          text: 'men age 45 older',
          fontWeight: 'bold'
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
              query: datum => datum.sex === 'M' && datum.age >= 45,
              style: {
                fill: '#e3662e'
              }
            }
          ]
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'Another third of all gun deaths — about 12,000 in total each year — are '
        },
        {
          text: 'homicides',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent !== 'Homicide',
          style: {
            fill: '#dedede'
          }
        },
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'More than half of homicide victims are '
        },
        {
          text: 'young men',
          fontWeight: 'bold'
        },
        {
          text: '...'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
              style: {
                fill: '#5D76A3'
              }
            }
          ]
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: '… two-thirds of whom are '
        },
        {
          text: 'black',
          fontWeight: 'bold'
        },
        {
          text: '.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'M' && datum.age > 15 && datum.age < 34,
              style: {
                fill: '#A6B3CC'
              },
              children: [
                {
                  query: datum => datum.race === 'Black',
                  style: {
                    fill: '#5D76A3'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'Women',
          fontWeight: 'bold'
        },
        {
          text: ' are far less likely to be gun homicide victims — about 1,700 of them are killed each year, many in '
        },
        {
          text: 'domestic violence',
          fontWeight: 'bold'
        },
        {
          text: ' incidents.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#C6CEDF'
          },
          children: [
            {
              query: datum => datum.sex === 'F',
              style: {
                fill: '#5D76A3'
              }
            }
          ]
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'The remaining gun deawths are '
        },
        {
          text: 'accidents',
          fontWeight: 'bold'
        },
        {
          text: 'or are classified as undetermined.',
          fontWeight: 'bold'
        }
      ],
      nodes: [
        {
          style: {
            fill: '#dedede'
          }
        },
        {
          query: datum => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: datum => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    },
    {
      sceneDuration: 5000,
      animationDuration: 1000,
      title: [
        {
          text: 'The common element in all these deaths is a gun. But the causes are very different, and that means the solutions must be, too.'
        }
      ],
      nodes: [
        {
          query: datum => datum.intent === 'Suicide',
          style: {
            fill: '#e3662e'
          }
        },
        {
          query: datum => datum.intent === 'Homicide',
          style: {
            fill: '#5D76A3'
          }
        },
        {
          query: datum => datum.intent === 'Accidental',
          style: {
            fill: '#D4BC45'
          }
        },
        {
          query: datum => datum.intent === 'Undetermined',
          style: {
            fill: '#999999'
          }
        }
      ]
    }
  ]
};

export const input = initialInput(userInput);
