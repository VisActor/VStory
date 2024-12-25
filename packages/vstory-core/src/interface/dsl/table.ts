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
