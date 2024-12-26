import type { IChartCharacterRuntime } from '../interface/runtime';

export class SeriesSpecRuntime implements IChartCharacterRuntime {
  type = 'SeriesSpec';
}

export const SeriesSpecRuntimeInstance = new SeriesSpecRuntime();
