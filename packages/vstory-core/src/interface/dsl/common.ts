import type { FormatType, FormatTypeValue } from '../../constants/format';

export type Include<T> = {
  [K in keyof T]: T[K];
} & {
  [K in Exclude<string, keyof T>]: unknown;
};

export type FormatContentType =
  | 'dimension'
  | 'value'
  | 'abs'
  | 'percentage'
  | 'value(percentage)'
  | 'percentage(value)'
  | 'CAGR'
  | 'pp'
  // | 'abs-pp'
  | 'percentdiff'
  | 'series'
  | 'series(CAGR)'
  | 'CAGR(series)'
  | 'series(percentage)'
  | 'percentage(series)'
  | 'date'
  | 'text' // scatter 使用，表示文本字段
  | 'x' // scatter 使用，表示 x 轴字段
  | 'y' // scatter 使用，表示 y 轴字段
  | 'size'; // scatter 使用，表示大小值;

export type FormatDate =
  | 'Auto'
  | 'YMD'
  | 'YMD_Slash'
  | 'MDY'
  | 'YMD_CN'
  | 'YMD_CN_E'
  | 'DMY_AbbrM'
  | 'YMD_AbbrM'
  | 'MDY_EN'
  | 'MD_E_CN'
  | 'MD'
  | 'MD_CN'
  | 'MD_AbbrM'
  | 'MD_EN'
  | 'Hm'
  | 'HmA'
  | 'Hms'
  | 'HmsA'
  | string;

export interface IFormatConfig {
  /**
   * 前缀
   */
  prefix?: string;
  /**
   * 后缀
   */
  postfix?: string;
  /**
   * 单位
   */
  unit?: 'none' | 'auto' | 'CN_K' | 'CN_W' | 'CN_BW' | 'CN_QW' | 'CN_Y' | 'K' | 'M' | 'B';
  /**
   * 小数点位置
   */
  fixed?: number | 'auto';
  /**
   * 当前包含的内容
   */
  content?: FormatContentType | FormatContentType[];
  /**
   * 标签内容是否换行展示
   */
  contentWrap?: boolean;
  /**
   * 是否显示千分位分隔符
   */
  separator?: boolean;
  /**
   * 格式化为哪种类型：
   * 1. 'digit' 数值类型
   * 2. 'percent' 百分比
   * 3. 'permil' 千分比
   * 默认为 digit
   */
  dataType?: FormatTypeValue;
  /**
   * 日期格式化形式
   */
  dateFormat?: FormatDate;
}
