import { merge } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';

export class CommonSpecRuntime implements IChartCharacterRuntime {
  type = 'CommonSpec';

  protected declare _character: ICharacterChart;

  constructor(character: ICharacterChart) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const rawAttribute = this._character.getAttribute();
    const { spec } = rawAttribute;
    const options = this._character.config.options;
    const { title, legends, data, color, axes, rootConfig = {}, padding } = options;

    if (title) {
      merge(spec, { title: Array.from(Object.values(title)) });
    }
    if (legends) {
      merge(spec, { legends: Array.from(Object.values(legends)) });
    }
    if (data) {
      merge(spec, {
        data
      });
    }
    if (color) {
      merge(spec, { color });
    }
    if (axes) {
      merge(spec, { axes: Array.from(Object.values(axes)) });
    }
    if (padding) {
      merge(spec, { padding });
    }
    spec.animation = true;
    // 关闭默认的入场动画
    spec.animationAppear = false;
    spec.animationEnter = false;
    merge(spec, { ...rootConfig });
  }
}
