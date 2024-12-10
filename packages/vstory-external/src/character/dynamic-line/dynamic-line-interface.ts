import type { IChartGraphicAttribute } from '@visactor/vstory-core';

export interface IDynamicLineChartGraphicAttribute extends IChartGraphicAttribute {
  bottomRange: [number, number];
}
