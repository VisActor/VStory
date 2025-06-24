import { array, isArray, isNil, isNumber, isString } from '@visactor/vutils';
import type { IStyleConditionFormat } from '../../../interface/dsl/table';

export function transformStyleFormatToTableStyle(conditionFormat: IStyleConditionFormat['format']) {
  const { fontSize, bold, italic, underline, fill, stroke, backgroundColor } = conditionFormat;
  const style: any = {};
  if (!isNil(fontSize)) {
    style.fontSize = fontSize;
  }
  if (!isNil(bold)) {
    style.fontWeight = bold ? 'bold' : 'normal';
  }
  if (!isNil(italic)) {
    style.fontStyle = italic ? 'italic' : 'normal';
  }
  if (!isNil(underline)) {
    style.underline = underline;
  }
  if (!isNil(fill)) {
    style.color = fill;
  }
  if (!isNil(stroke)) {
    style.borderColor = stroke;
  }
  if (!isNil(backgroundColor)) {
    style.bgColor = backgroundColor;
  }
  return style;
}

function parseTableCellNumber(cellValue: any) {
  if (isArray(cellValue)) {
    cellValue = cellValue[0];
  }
  if (isNumber(cellValue)) {
    return cellValue;
  }
  if (isString(cellValue)) {
    return Number.parseFloat(cellValue.trim().replace(/,/g, ''));
  }
  return NaN;
}

export function checkStyleCondition(cellValue: any, condition: IStyleConditionFormat['condition']) {
  const { operator, value: conditionValue } = condition;
  const value = parseTableCellNumber(cellValue);
  const arrayConditionValue = array(conditionValue);
  const conditionValue0 = parseTableCellNumber(arrayConditionValue[0]);
  const conditionValue1 = parseTableCellNumber(arrayConditionValue[1]);
  if (Number.isNaN(value) || Number.isNaN(conditionValue0)) {
    return false;
  }
  if ((operator === 'BETWEEN' || operator === 'NOT_BETWEEN') && Number.isNaN(conditionValue1)) {
    return false;
  }
  switch (operator) {
    case 'EQUAL':
      return value === conditionValue0;
    case 'NOT_EQUAL':
      return value !== conditionValue0;
    case 'GREATER':
      return value > conditionValue0;
    case 'LESS':
      return value < conditionValue0;
    case 'GREATER_EQUAL':
      return value >= conditionValue0;
    case 'LESS_EQUAL':
      return value <= conditionValue0;
    case 'BETWEEN':
      return value >= conditionValue0 && value <= conditionValue1;
    case 'NOT_BETWEEN':
      return value < conditionValue0 || value > conditionValue1;
  }
  return false;
}
