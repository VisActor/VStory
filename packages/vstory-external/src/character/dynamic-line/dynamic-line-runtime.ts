import { DYNAMIC_LINE } from './constant';
import type { IDynamicLineChartGraphicAttribute } from './dynamic-line-interface';
import type { IChartCharacterRuntime } from '@visactor/vstory-core/es/character/chart/interface/runtime';
import type { ICharacterChart } from '@visactor/vstory-core/es/character/chart/interface/character-chart';

export class DynamicLineRuntime implements IChartCharacterRuntime {
  type = DYNAMIC_LINE;

  protected declare _character: ICharacterChart;

  constructor(character: ICharacterChart) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const { bottomRange } = this._character.config.options as any;
    const rawAttribute = this._character.getAttribute() as IDynamicLineChartGraphicAttribute;
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
