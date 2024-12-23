import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';

export class RankingBarRuntime implements IChartCharacterRuntime {
  type = 'RankingBar';

  applyConfigToAttribute(character: ICharacterChart): void {
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    // 关掉player显示
    spec.player = {
      visible: false
    };
    spec.animation = true;
    spec.animationAppear = false;
    spec.animationEnter = false;
  }
}

export const RankingBarRuntimeInstance = new RankingBarRuntime();
