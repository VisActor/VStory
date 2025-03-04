import { DYNAMIC_LINE } from './constant';
import type { IDynamicLineChartGraphicAttribute } from './dynamic-line-interface';
import type { IChartCharacterRuntime } from '@visactor/vstory-core';
import type { ICharacterChart } from '@visactor/vstory-core';
import { RuntimeStore } from '@visactor/vstory-core';

export class DynamicLineRuntime implements IChartCharacterRuntime {
  type = DYNAMIC_LINE;

  applyConfigToAttribute(character: ICharacterChart): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute() as IDynamicLineChartGraphicAttribute;
    const config = character.getRuntimeConfig().config;
    const { bottomRange } = config.options as any;
    const { spec } = rawAttribute;

    const bottom = spec.scrollBar.find((item: any) => item.orient === 'bottom');
    if (bottom) {
      bottom.start = bottomRange[0];
      bottom.end = bottomRange[1];
    }
    spec.animation = true;
    spec.animationAppear = false;
    spec.animationEnter = false;

    // 不允许采样，否则轴动画很奇怪
    if (!spec.axes) {
      spec.axes = [];
    }
    let bottomAxis = spec.axes.find((item: any) => item.orient === 'bottom');
    if (!bottomAxis) {
      bottomAxis = {
        orient: 'bottom'
      };
      spec.axes.push(bottomAxis);
    }
    bottomAxis.sampling = false;

    if (!bottomAxis.label) {
      bottomAxis.label = {};
    }
    bottomAxis.label.autoHide = false;
  }
}

export const DynamicLineRuntimeInstance = new DynamicLineRuntime();
RuntimeStore.register(DynamicLineRuntimeInstance);
