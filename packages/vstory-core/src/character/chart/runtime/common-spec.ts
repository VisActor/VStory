import { merge } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChartRuntimeConfig } from '../interface/character-chart';

export class CommonSpecRuntime implements IChartCharacterRuntime {
  type = 'CommonSpec';

  applyConfigToAttribute(character: ICharacterChartRuntimeConfig): void {
    const rawAttribute = character.getAttribute();
    const { spec } = rawAttribute;
    const options = character.config.options;
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
    // TODO 这个先不关闭，ADD的时候会调用
    // spec.animationEnter = false;
    merge(spec, { ...rootConfig });
  }
}

export const CommonSpecRuntimeInstance = new CommonSpecRuntime();
