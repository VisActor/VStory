import { formatValue } from '../../character/common/utils/format';
import type { ITheme } from '../interface';

export const DefaultTheme: {
  name: string;
  theme: ITheme;
} = {
  name: 'default',
  theme: {
    character: {
      VTable: {
        runtime: {
          list: ['CommonLayout', 'TableType', 'TableCommonSpec', 'CellStyle', 'ColWidth', 'RowHeight']
        }
      },
      PivotChart: {
        runtime: {
          list: []
        }
      },
      VChart: {
        runtime: {
          list: ['ChartCommonSpec', 'CommonLayout', 'MarkStyle', 'LabelStyle', 'TotalLabel'],
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
          list: ['Line']
        }
      },
      Arc: {
        runtime: {
          list: ['Arc']
        }
      },
      Polygon: {
        runtime: {
          list: ['Polygon']
        }
      },
      Timeline: {
        runtime: {
          list: ['Timeline']
        }
      },
      Unit: {
        runtime: {
          list: ['Unit']
        }
      },
      Rect: {
        runtime: {
          list: ['Rect']
        }
      },
      Shape: {
        runtime: {
          list: ['Shape']
        }
      }
    }
  }
};
