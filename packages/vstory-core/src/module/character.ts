import { VChartCharacter } from '../character/chart/character/vchart';
import { TextCharacter } from '../character/component/character/text';
import { StoryFactory } from '../utils/factory';

let _register = false;
export function registerCharacters() {
  if (_register) {
    return;
  }
  _register = true;
  StoryFactory.registerCharacter(VChartCharacter.type, VChartCharacter);
  StoryFactory.registerCharacter(TextCharacter.type, TextCharacter);
}
