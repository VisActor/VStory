import { merge } from '@visactor/vutils';
import { ACustomAnimate } from '@visactor/vrender-core';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';

export class WaveAnimate extends ACustomAnimate<any> {
  static label: string = 'WaveAnimate';

  declare valid: boolean;

  constructor(from: any, to: any, duration: number, easing: any, params: any) {
    super(from, to, duration, easing, params);
  }

  getEndProps(): Record<string, any> {
    return this.to;
  }

  getFromProps(): void | Record<string, any> {
    return this.from;
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    out.textureRatio = ratio;
  }
}

export class WaveScatterRuntime implements IChartCharacterRuntime {
  type = 'WaveScatter';

  applyConfigToAttribute(character: ICharacterChart): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    const config = character.getRuntimeConfig().config as any;
    const {
      waveDuration = 1000,
      categoryField,
      valueField,
      waveRatio = 0.0125,
      waveColor = '#0099ff',
      background = 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
      amplitude = 6,
      frequency = 2
    } = config.options;
    const { viewBox } = rawAttribute;
    const width = viewBox.x2 - viewBox.x1;
    const height = viewBox.y2 - viewBox.y1;
    rawAttribute.waveAnimate = {
      duration: waveDuration,
      customParameters: () => ({
        width,
        height
      }),
      custom: WaveAnimate,
      easing: 'linear',
      loop: true
    };
    merge(spec, {
      categoryField,
      valueField,
      circlePacking: {
        style: {
          fill: background,
          texture: 'wave',
          textureColor: waveColor,
          textureOptions: (datum: any) => {
            return {
              amplitude,
              frequency,
              percent: datum[valueField] * waveRatio
            };
          }
        }
      }
    });
  }
}

export const WaveScatterRuntimeInstance = new WaveScatterRuntime();
