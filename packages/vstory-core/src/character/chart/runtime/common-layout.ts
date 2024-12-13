import { merge } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import type { ICharacterChart } from '../interface/character-chart';
export class CommonLayoutRuntime implements IChartCharacterRuntime {
  type = 'CommonLayout';

  applyConfigToAttribute(character: ICharacterChart): void {
    const rawAttribute = character.getAttribute();
    const config = character.config;
    const layoutData = getLayoutFromWidget(config.position);
    const layout = getLayoutFromWidget(config.position);
    const viewBox = {
      x1: 0,
      x2: layout.width,
      y1: 0,
      y2: layout.height
    };
    rawAttribute.viewBox = viewBox;
    rawAttribute.renderCanvas = character.canvas.getNativeCanvas();

    merge(rawAttribute, layoutData);

    // panel 样式
    const { panel } = config.options;
    merge(rawAttribute.panel, panel, layoutData);
  }
}

export const CommonLayoutRuntimeInstance = new CommonLayoutRuntime();
