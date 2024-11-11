import { CharacterType } from '../../../constants/character';
import { CharacterChart } from '../character-chart';
import type { IChartGraphicAttribute } from '../graphic/vchart-graphic';
import { WaveScatterRuntime } from '../runtime/wave-scatter';

function waterDrop(ctx: any, size: number, topX: number, topY: number) {
  ctx.beginPath();
  const centerX = topX;
  const centerY = topY - size / 2;
  ctx.moveTo(centerX, centerY);
  ctx.quadraticCurveTo(centerX + size / 2, centerY + size, centerX, centerY + size);
  ctx.quadraticCurveTo(centerX - size / 2, centerY + size, centerX, centerY);
}

interface IWaveScatterChartGraphicAttribute extends IChartGraphicAttribute {
  waveDuration: number;
  waveRatio: number;
  waveColor: string;
  background: string;
  amplitude: number;
  frequency: number;
  categoryField: string;
  valueField: string;
}

export class WaveScatterCharacter extends CharacterChart<IWaveScatterChartGraphicAttribute> {
  static type = CharacterType.WAVE_SCATTER;

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(new WaveScatterRuntime(this));
  }

  getDefaultAttribute(): Partial<IWaveScatterChartGraphicAttribute> {
    return {
      ...super.getDefaultAttribute(),
      spec: {
        type: 'circlePacking',
        drill: true,
        layoutPadding: 5,
        circlePacking: {
          customShape: (data: any, attrs: any, path: any) => {
            waterDrop(path, attrs.outerRadius * 2, 0, 0);
            return path;
          },
          style: {
            // fill: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
            // fillOpacity: (datum: any, _: any) => {
            //   return datum.temperature / 40;
            // },
            // texture: 'wave',
            // textureColor: '#0099ff',
            // textureOptions: (datum: any) => {
            //   return {
            //     amplitude: 6,
            //     frequency: 2,
            //     percent: datum.temperature / 80,
            //   }
            // },
          }
        },
        animationEnter: {
          easing: 'cubicInOut'
        }
      }
    };
  }
}
