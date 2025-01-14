import { CharacterChart } from '@visactor/vstory-core';
import { DYNAMIC_LINE } from './constant';
import type { IDynamicLineChartGraphicAttribute } from './dynamic-line-interface';
import './dynamic-line-runtime';
export class DynamicLineCharacter extends CharacterChart<IDynamicLineChartGraphicAttribute> {
  static type = DYNAMIC_LINE;

  static RuntimeMap: { [key: string]: any } = {
    [DYNAMIC_LINE]: true
  };

  getDefaultAttribute(): Partial<IDynamicLineChartGraphicAttribute> {
    return {
      ...super.getDefaultAttribute(),
      spec: {
        type: 'line',
        scrollBar: [
          {
            visible: false,
            orient: 'bottom',
            start: 0,
            end: 0.5,
            roam: true,
            filterMode: 'axis'
          }
        ]
      },
      bottomRange: [0, 0.5]
    };
  }
}
