import { merge, normalizePadding } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import { getLayoutFromWidget } from '../../../utils/layout';
import { parsePadding } from '@visactor/vrender-core';
import type { ICharacterChart } from '../interface/character-chart';

export class CommonLayoutRuntime implements IChartCharacterRuntime {
  type = 'CommonLayout';

  protected declare _character: ICharacterChart;

  constructor(character: ICharacterChart) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const rawAttribute = this._character.getAttribute();
    const config = this._character.config;
    const layoutData = getLayoutFromWidget(config.position);
    const layout = getLayoutFromWidget(config.position);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    rawAttribute.viewBox = viewBox;
    rawAttribute.renderCanvas = this._character.canvas.getNativeCanvas();

    merge(rawAttribute, layoutData);

    // panel 样式
    const { panel } = config.options;
    merge(rawAttribute.panel, panel, layoutData);
  }
}
