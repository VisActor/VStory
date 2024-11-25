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
  symbolType: string;
  xField: string;
  yField: string;
}

export class ScatterBarCharacter extends CharacterChart<IWaveScatterChartGraphicAttribute> {
  static type = CharacterType.SCATTER_BAR;

  getDefaultAttribute(): Partial<IWaveScatterChartGraphicAttribute> {
    return {
      ...super.getDefaultAttribute(),
      spec: {
        type: 'scatter',
        point: {
          style: {
            _layoutHeight: (_: any, ctx: any) => {
              return ctx.getRegion().getLayoutRect().height;
            }
          }
        }
      }
    };
  }
}
