import type { FormatContentType, FormatDate } from '../interface/dsl/common';

export enum FormatType {
  NONE = 'none',
  DIGIT = 'digit',
  PERCENT = 'percent',
  PERMIL = 'permil'
}

export type FormatTypeValue = `${FormatType}`;

/**
 * 数值单位
 */
export interface Unit {
  ratio: number;
  symbol: string;
}
export enum PrecisionType {
  DECIMAL_DIGITS = 'decimalDigits',
  SIGNIFICANT_DECIMAL = 'significantDecimal',
  SIGNIFICANT_FIGURES = 'significantFigures'
}
export enum DataFormatUnit {
  AUTO = 'auto',
  ZH_CN = 'zh_CN',
  EN_US = 'en_US'
}
/**
 * 数据格式化
 */
export type NumFormat = {
  /** 自动类型推导 */
  auto?: boolean;
  /** 数值类型 */
  type: FormatTypeValue;
  /** 数值单位 */
  unit?: Unit | 'auto' | null;
  /** 千位分隔符 */
  kSep?: boolean;
  /** 数字前缀 */
  prefix?: string | string[];
  /** 数字后缀 */
  suffix?: string | string[];
  /** 数位精度 */
  precision?: number | null;
  /** 数位精度类型 */
  precisionType?: `${PrecisionType}` | null;
  /** 数据格式单位 */
  dataFormatUnit?: `${DataFormatUnit}`;
  /** @deprecated 有效数字，为空时表示原始值 */
  significantDigits?: number | null;
  /** @deprecated 小数位数，为空时表示原始值 */
  decimalDigits?: number | null;
};

export const formatConfigKey = 'formatConfig';

export const unionContentTypeMap: { [key in FormatContentType]?: boolean } = {
  'value(percentage)': true,
  'percentage(value)': true,
  'series(CAGR)': true,
  'CAGR(series)': true,
  'series(percentage)': true,
  'percentage(series)': true
};

export const unionContentTypes: (keyof typeof unionContentTypeMap)[] = Object.keys(
  unionContentTypeMap
) as (keyof typeof unionContentTypeMap)[];

export enum SpecialValueType {
  BRACKET_TXT = 'bracketTxt',
  NULL = 'null',
  DASH = 'dash',
  ZERO = 'zero',
  TrueNull = 'true-null'
}

// 用以标记原始值
export const OriginalValueFlag = 'aeolus-null';

/**
 * 特殊值
 */
export const INVALID_VALUE_MAP = {
  [SpecialValueType.BRACKET_TXT]: ' ', //放入一个空格显示真实空白
  [SpecialValueType.NULL]: 'NULL',
  [SpecialValueType.ZERO]: '0',
  [SpecialValueType.DASH]: '--',
  [SpecialValueType.TrueNull]: OriginalValueFlag
};
