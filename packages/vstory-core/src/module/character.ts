import { RankingBarCharacter, registerRankingBarTemp } from '../character/chart/character/rankingBar';
import { ScatterBarCharacter } from '../character/chart/character/scatter-bar';
import { VChartCharacter } from '../character/chart/character/vchart';
import { WaveScatterCharacter } from '../character/chart/character/wave-scatter';
import { ImageCharacter } from '../character/component/character/image';
import { LineCharacter } from '../character/component/character/line';
import { RectCharacter } from '../character/component/character/rect';
import { ShapeCharacter } from '../character/component/character/shape';
import { TextCharacter } from '../character/component/character/text';
import { TimelineCharacter } from '../character/component/character/timeline';
import { StoryFactory } from '../utils/factory';

let _register = false;
export function registerCharacters() {
  if (_register) {
    return;
  }
  _register = true;
  StoryFactory.registerCharacter(VChartCharacter.type, VChartCharacter);
  registerRankingBarTemp();
  StoryFactory.registerCharacter(RankingBarCharacter.type, RankingBarCharacter);
  StoryFactory.registerCharacter(WaveScatterCharacter.type, WaveScatterCharacter);
  StoryFactory.registerCharacter(ScatterBarCharacter.type, ScatterBarCharacter);
  StoryFactory.registerCharacter(TextCharacter.type, TextCharacter);
  StoryFactory.registerCharacter(RectCharacter.type, RectCharacter);
  StoryFactory.registerCharacter(ImageCharacter.type, ImageCharacter);
  StoryFactory.registerCharacter(LineCharacter.type, LineCharacter);
  StoryFactory.registerCharacter(ShapeCharacter.type, ShapeCharacter);
  StoryFactory.registerCharacter(TimelineCharacter.type, TimelineCharacter);
}
