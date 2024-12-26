import type { IChartCharacterConfig } from './chart';
import type { ICharacterConfigBase } from './dsl';

interface ITableCharacterConfigOptionsType {
  // 表格spec
  spec?: any;
  records: any;
  columns: any;
  widthMode?: 'standard' | 'adaptive' | 'autoWidth';
  defaultRowHeight: number;
  theme: any;
  // 数据源
  data?: any;

  panel?: any;
  padding?: number | [number, number] | [number, number, number, number];

  // 单个单元格样式，框选也会应用到这里
  // 使用 map 不用数组的原因。减少写入是的反复遍历
  cellStyle?: {
    // col_row
    [key: string]: {
      col: number;
      row: number;
      style?: any;
    };
  };

  // 列宽
  colWidth?: {
    [key: number]: number;
  };
  // 行高
  rowHeight?: {
    [key: number]: number;
  };
}

export interface ITableCharacterConfig extends ICharacterConfigBase {
  options: ITableCharacterConfigOptionsType;
}
export interface IWeatherTableCharacterConfig extends ITableCharacterConfig {
  options: ITableCharacterConfigOptionsType & {
    leftTitleStyle?: any;
    topTitleStyle?: any;
  };
}

/**
 * pivot chart 配置
 */
interface IPivotChartCharacterConfigOptionsType extends ITableCharacterConfigOptionsType {
  // 单个单元格样式，框选也会应用到这里
  // 使用 map 不用数组的原因。减少写入是的反复遍历
  cellStyle?: {
    // col_row
    [key: string]: {
      col: number;
      row: number;
      style?: any;
      chartOptions?: IChartCharacterConfig['options'];
    };
  };
}

export interface IPivotChartCharacterConfig extends ICharacterConfigBase {
  options: IPivotChartCharacterConfigOptionsType;
}
