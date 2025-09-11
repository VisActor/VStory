import VChart from '@visactor/vchart';
import { StoryFactory } from '@visactor/vstory-core';
import { registerRankingBarChart } from '@visactor/vchart-extension';
import { RankingBarCharacter } from './ranking-bar';

export function registerRankingBarCharacter() {
  registerRankingBarChart({ VChart });
  StoryFactory.registerCharacter(RankingBarCharacter.type, RankingBarCharacter);
}
