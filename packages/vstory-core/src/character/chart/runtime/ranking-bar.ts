import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChartRuntimeConfig } from '../interface/character-chart';

export class RankingBarRuntime implements IChartCharacterRuntime {
  type = 'RankingBar';

  applyConfigToAttribute(character: ICharacterChartRuntimeConfig): void {
    const rawAttribute = character.getAttribute();
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
