import { formatValue } from '../../character/common/utils/format';
import type { ITheme } from '../interface';

export const DefaultTheme: {
  name: string;
  theme: ITheme;
} = {
  name: 'default',
  theme: {
    character: {
      Table: {
        runtime: {
          list: ['CommonLayout', 'TableType', 'TableCommonSpec', 'CellStyle', 'ColWidth', 'RowHeight']
        }
      },
      PivotChart: {
        runtime: {
          list: []
        }
      },
      Chart: {
        runtime: {
          list: ['ChartCommonSpec', 'CommonLayout', 'MarkStyle', 'LabelStyle', 'TotalLabel'],
          functions: {
            formatValue: formatValue
          }
        }
      },
      VTable: {
        runtime: {
          list: []
        }
      },
      VChart: {
        runtime: {
          list: [],
          functions: {
            formatValue: formatValue
          }
        }
      },
      RankingBar: {
        runtime: {
          list: ['RankingBar']
        }
      },
      ScatterBar: {
        runtime: {
          list: []
        }
      },
      WaveScatter: {
        runtime: {
          list: ['WaveScatter']
        }
      },
      Text: {
        runtime: {
          list: ['Text']
        }
      },
      Line: {
        runtime: {
          list: ['BaseGraphic', 'Line']
        }
      },
      Arc: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Polygon: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Timeline: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Unit: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Rect: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Shape: {
        runtime: {
          list: ['BaseGraphic']
        }
      },
      Image: {
        runtime: {
          list: ['BaseGraphic']
        }
      }
    }
  }
};
