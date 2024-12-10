import { CharacterChart, IChartGraphicAttribute } from '@visactor/vstory-core';
import { DYNAMIC_LINE } from './constant';
import type { IDynamicLineChartGraphicAttribute } from './dynamic-line-interface';
import { DynamicLineRuntime } from './dynamic-line-runtime';

export class DynamicLineCharacter extends CharacterChart<IDynamicLineChartGraphicAttribute> {
  static type = DYNAMIC_LINE;

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(new DynamicLineRuntime(this));
  }

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
