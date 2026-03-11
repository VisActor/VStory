import type { IVChart } from '@visactor/vchart';
import type { IChartCharacterConfig } from './chart';
import type { ICharacterConfigBase } from './dsl';
import type { ICharacterTable } from '../../character/table/interface/character-table';

export interface IBaseConditionFormat {
  type: string;
  condition: any;
  format: any;
  range:
    | 'all'
    | {
        startRow: number;
        startCol: number;
        endRow: number;
        endCol: number;
      };
}

export interface IStyleConditionFormat extends IBaseConditionFormat {
  type: 'style';
  // TODO: unite the filter type with DataFilter
  condition: {
    operator: 'EQUAL' | 'NOT_EQUAL' | 'GREATER' | 'LESS' | 'GREATER_EQUAL' | 'LESS_EQUAL' | 'BETWEEN' | 'NOT_BETWEEN';
    value: number | string | [number | string, number | string];
  };
  format: {
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    fill?: string;
    stroke?: string;
    backgroundColor?: string;
  };
}

interface ITableCharacterConfigOptionsType {
  // 表格spec
  spec?: any;
  records: any;
  columns: any;
  widthMode?: 'standard' | 'adaptive' | 'autoWidth';
  defaultRowHeight: number;
  showHeader?: boolean;
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
  // 列样式（包括列头）
  colStyle?: {
    [key: number]: any;
  };
  // 行样式（包括行头）
  rowStyle?: {
    [key: number]: any;
  };
  // 列隐藏
  colVisible?: {
    [key: number]: boolean;
  };
  // 行隐藏
  rowVisible?: {
    [key: number]: boolean;
  };
  // 内容列样式
  contentColStyle?: {
    [key: number]: any;
  };
  // 内容行样式
  contentRowStyle?: {
    [key: number]: any;
  };
  // 条件格式
  conditionFormat?: IStyleConditionFormat[];
  // 启用条件格式 default is true
  enableConditionFormat?: boolean;

  // 透视图透传给vchart的option
  chartOption?: any;
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
  chartOptions?: {
    // col_row
    [key: string]: {
      col: number;
      row: number;
      options?: Partial<IChartCharacterConfig['options']>;
    };
  };
}

export interface IPivotChartCharacterConfig extends ICharacterConfigBase {
  options: IPivotChartCharacterConfigOptionsType;
  hooks?: {
    beforeRuntimeInitializeChart?: (character: ICharacterTable, vchart: IVChart) => void;
    afterRuntimeInitializeChart?: (character: ICharacterTable, vchart: IVChart) => void;
    beforeRuntimeDoRender?: (character: ICharacterTable, vchart: IVChart) => void;
    afterRuntimeDoRender?: (character: ICharacterTable, vchart: IVChart) => void;
  };
}
