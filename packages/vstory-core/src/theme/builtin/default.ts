import { formatValue } from '../../character/common/utils/format';
import type { ITheme } from '../interface';

export const DefaultTheme: {
  name: string;
  theme: ITheme;
} = {
  name: 'default',
  theme: {
    character: {
      VChart: {
        runtime: {
          formatValue: formatValue
        }
      }
    }
  }
};
