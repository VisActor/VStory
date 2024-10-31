import { merge } from '@visactor/vutils';
import type { CharacterChart } from '../character';
import type { IChartCharacterRuntime } from './interface';

export class CommonSpecRuntime implements IChartCharacterRuntime {
  type = 'CommonSpec';

  protected declare _character: CharacterChart;

  constructor(character: CharacterChart) {
    this._character = character;
  }

  onConfigReady() {
    const rawSpec = this._character.specProcess.getVisSpec();
    const options = this._character.specProcess.getCharacterConfig().options as any;
    if (!options) {
      return;
    }
    if (options.title) {
      merge(rawSpec, { title: Array.from(Object.values(options.title)) });
    }
    if (options.legends) {
      merge(rawSpec, { legends: Array.from(Object.values(options.legends)) });
    }
    if (options.data) {
      merge(rawSpec, {
        data: options.data
      });
    }
    if (options.color) {
      merge(rawSpec, { color: options.color });
    }
    if (options.axes) {
      merge(rawSpec, { axes: Array.from(Object.values(options.axes)) });
    }
    merge(rawSpec, { ...options.rootConfig });
    // merge(rawSpec, { title: options.title, legends: options.legends, data: options.data, color: options.color });
  }
}
