import type { FormatContentType, IFormatConfig } from '../../../interface/dsl/common';
import type { Unit } from '../../../constants/format';
import { DataFormatUnit, unionContentTypeMap } from '../../../constants/format';
import { isArray, isNil, isString } from '@visactor/vutils/es/common';
import { getTimeFormatter, isValidNumber } from '@visactor/vutils';

export type FormatValueFunction = (
  content: FormatContentType,
  value: number | string,
  formatConfig: IFormatConfig,
  language: string,
  percentage?: boolean
) => string;

// if (formatConfig.unit === 'CN_K') {
//   unit = { ratio: 1000, symbol: '千' };
// } else if (formatConfig.unit === 'CN_W') {
//   unit = { ratio: 10000, symbol: '万' };
// } else if (formatConfig.unit === 'CN_BW') {
//   unit = { ratio: 1000000, symbol: '百万' };
// } else if (formatConfig.unit === 'CN_QW') {
//   unit = { ratio: 10000000, symbol: '千万' };
// } else if (formatConfig.unit === 'CN_Y') {
//   unit = { ratio: 1e8, symbol: '亿' };
// } else if (formatConfig.unit === 'K') {
//   unit = { ratio: 1e3, symbol: 'K' };
// } else if (formatConfig.unit === 'M') {
//   unit = { ratio: 1e6, symbol: 'M' };
// } else if (formatConfig.unit === 'B') {
//   unit = { ratio: 1e9, symbol: 'B' };
// }
export const UnitMap: { [key in IFormatConfig['unit']]?: Unit } = {
  CN_K: { ratio: 1000, symbol: '千' },
  CN_W: { ratio: 10000, symbol: '万' },
  CN_BW: { ratio: 1000000, symbol: '百万' },
  CN_QW: { ratio: 10000000, symbol: '千万' },
  CN_Y: { ratio: 1e8, symbol: '亿' },
  K: { ratio: 1e3, symbol: 'K' },
  M: { ratio: 1e6, symbol: 'M' },
  B: { ratio: 1e9, symbol: 'B' }
};

export type getContentValueFunction = (opt: any, content: FormatContentType) => string;

export function textFormatWithFix(text: string, config: { prefix?: string; postfix?: string }) {
  return normalizeFormatResult(`${config.prefix ?? ''}${text}${config.postfix ?? ''}`.split('\n'));
}
export function normalizeFormatResult(str: string | string[]): string | string[] {
  if (isArray(str)) {
    if (str.length === 0) {
      return '';
    }
    // extract string from array to make sure that the render result of [str] and str is same
    if (str.length === 1) {
      return str[0];
    }
    return str;
  }
  return str;
}

export function formatValue(
  content: FormatContentType,
  value: number | string,
  formatConfig: IFormatConfig,
  language: string,
  percentage?: boolean
) {
  if (content === 'date') {
    return formatDate(value, formatConfig, language, percentage);
  }
  if (content === 'text') {
    return value;
  }
  return formatNumber(value, formatConfig, language, percentage);
}

export function formatDate(
  value: number | string,
  formatConfig: IFormatConfig,
  language: string,
  percentage?: boolean
) {
  return getTimeFormatter(formatConfig.dateFormat)(`${value}`);
}

export function formatNumber(
  value: number | string,
  formatConfig: IFormatConfig,
  language: string,
  percentage?: boolean
): string | number {
  // 字符串类型的处理
  if (value && isString(value) && !isValidNumber(+value)) {
    return value;
  }

  if (Number.isNaN(value) || isNil(value) || value === '') {
    return '';
  }

  // 先计算 unit
  let unit: Unit;
  // 优先百分比和千分比
  if (formatConfig.dataType === 'percent') {
    unit = { ratio: 1e-2, symbol: '%' };
  } else if (formatConfig.dataType === 'permil') {
    unit = { ratio: 1e-3, symbol: '‰' };
  } else if (formatConfig.unit === 'auto') {
    unit = getNumFormatAuto(
      value,
      language.includes('zh') ? DataFormatUnit.ZH_CN : DataFormatUnit.EN_US,
      language as 'zh_CN' | 'en_US'
    );
  } else {
    // 使用固定匹配
    unit = UnitMap[formatConfig.unit] ?? { ratio: 0, symbol: '' };
  }

  // 处理缩放 考虑超大数值的字符串场景
  if (typeof value === 'string') {
    const [integerPart, decimalPart = ''] = value.split('.');
    const combinedNumber = integerPart + decimalPart;
    const decimalShift = decimalPart.length - unit.ratio;

    // 计算缩放后的整数和小数部分
    if (decimalShift > 0) {
      value = combinedNumber.slice(0, decimalShift) + '.' + combinedNumber.slice(decimalShift);
    } else {
      value = combinedNumber + '0'.repeat(-decimalShift);
    }
  } else {
    value *= Math.pow(10, unit.ratio);
    value = value.toString();
  }

  // 分割整数部分和小数部分
  const [integerPart, decimalPart = ''] = value.toString().split('.');

  // 使用正则表达式添加千位分隔符
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let formattedDecimalPart = '';

  if (formatConfig.fixed !== undefined && formatConfig.fixed !== 'auto') {
    // 如果提供了fixed值，则格式化小数部分
    const roundedNumber = parseFloat(`0.${decimalPart}`).toFixed(formatConfig.fixed);
    formattedDecimalPart = roundedNumber.split('.')[1];
  } else if (decimalPart) {
    // 如果没有提供fixed值，且原始数字有小数部分
    formattedDecimalPart = decimalPart;
  }

  // 拼接整数部分和小数部分
  const numberString = formattedDecimalPart ? `${formattedIntegerPart}.${formattedDecimalPart}` : formattedIntegerPart;
  return `${numberString}${unit.symbol}${percentage ? '%' : ''}`;
}

/**
 * unit = auto 时，获取当前合适的 unit
 * @param value
 * @param dataFormatUnit
 * @param lang
 * @returns
 */
function getNumFormatAuto(
  value: number | string,
  dataFormatUnit?: `${DataFormatUnit}`,
  lang?: 'zh_CN' | 'en_US'
): { ratio: number; symbol: string } {
  // TODO: i18N
  const locale = isNil(dataFormatUnit) || dataFormatUnit === 'auto' ? lang ?? 'zh_CN' : dataFormatUnit;
  const valueAbs = Math.abs(Number(value));
  switch (locale) {
    case 'zh_CN':
      if (valueAbs >= 1e8) {
        return { ratio: 1e8, symbol: '亿' };
      }

      if (valueAbs >= 1e4) {
        return { ratio: 1e4, symbol: '万' };
      }
      break;
    case 'en_US':
      if (valueAbs >= 1e9) {
        return { ratio: 1e9, symbol: 'B' };
      }
      if (valueAbs >= 1e6) {
        return { ratio: 1e6, symbol: 'M' };
      }
      if (valueAbs >= 1e3) {
        return { ratio: 1e3, symbol: 'K' };
      }
      break;
  }
  return { ratio: 1, symbol: '' };
}

// 得到标签经过 format 处理后的值
export function getTextWithFormat(
  formatConfig: IFormatConfig,
  formatContents: FormatContentType[],
  getContentValue: getContentValueFunction,
  formatValue: FormatValueFunction,
  opt?: any
) {
  // 得到每一个 content 的内容
  const contentLabels = (formatContents.length === 0 ? (['value'] as FormatContentType[]) : formatContents).map(
    content => {
      return getLabelContentWithUnion(formatConfig, content, getContentValue, formatValue, opt);
    }
  );
  // 拼接
  const labelText: string = contentLabels.join(!!formatConfig.contentWrap ? '\n' : ' ');

  // 最后添加前后缀
  return textFormatWithFix(labelText, formatConfig);
}

// 得到标签一个 content 的 format 值，含复合类型
export function getLabelContentWithUnion(
  formatConfig: IFormatConfig,
  content: FormatContentType,
  getContentValue: getContentValueFunction,
  formatValue: FormatValueFunction,
  opt: any
) {
  if (unionContentTypeMap[content]) {
    const matchResult = content.match(/(.*)\((.*)\)/);
    const firstContent = matchResult[1] as FormatContentType;
    const secondContent = matchResult[2] as FormatContentType;
    return `${getLabelContent(formatConfig, firstContent, getContentValue, formatValue, opt)}(${getLabelContent(
      formatConfig,
      secondContent,
      getContentValue,
      formatValue,
      opt
    )})`;
  }
  return getLabelContent(formatConfig, content, getContentValue, formatValue, opt);
}

// 得到标签一个 content 的 format 值
export function getLabelContent(
  formatConfig: IFormatConfig,
  content: FormatContentType,
  getContentValue: getContentValueFunction,
  formatValue: FormatValueFunction,
  opt: any
): string {
  const datumValue = getContentValue(opt, content);
  // number / date 类型的数值处理
  const labelContent = formatValue(
    content,
    datumValue,
    formatConfig,
    // TODO: i18n
    'chinese',
    content === 'percentage' || content === 'CAGR' || content === 'percentdiff'
  );
  return labelContent as string;
}
