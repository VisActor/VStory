import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';

export class RankingBarRuntime implements IChartCharacterRuntime {
  type = 'RankingBar';

  protected declare _character: ICharacterChart;

  constructor(character: ICharacterChart) {
    this._character = character;
  }

  applyConfigToAttribute(): void {
    const rawAttribute = this._character.getAttribute();
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