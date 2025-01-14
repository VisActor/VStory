import { registerRankingBarChart } from '@visactor/vchart-extension';
import VChart from '@visactor/vchart';
import { CharacterChart } from '../character-chart';
import type { IChartGraphicAttribute } from '../graphic/vchart-graphic';

export function registerRankingBarTemp() {
  registerRankingBarChart({ VChart });
}

export class RankingBarCharacter extends CharacterChart<IChartGraphicAttribute> {
  static type = 'RankingBar';

  tickTo(t: number): void {
    // console.log(t);
    const vchart = this._graphic.vchart;
    const player = vchart.getComponents().filter((d: any) => d.type === 'player')[0];
    const interval = vchart.getSpec()?.interval ?? 0;
    const count = vchart.getSpec()?.player?.specs?.length ?? 0;
    const totalTime = interval * count;
    const specs = player.getSpec().specs;
    const currSlice = Math.min(Math.floor(t / (totalTime / specs.length) + 1), specs.length - 1);
    if (currSlice !== (player as any)._activeIndex) {
      (player as any)._activeIndex = currSlice;
      specs[currSlice].data.forEach((datum: any) => {
        vchart.updateDataSync(datum.id, datum.values);
      });
    }
    super.tickTo(t);
  }
}
