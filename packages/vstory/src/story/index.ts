import { CharacterComponentQipao } from './character/component/characters/character-qipao';
import { CharacterComponentRect } from './character/component/characters/character-rect';
import { StoryFactory } from './factory/factory';
import { ContainerModule, GraphicRender, container } from '@visactor/vrender';
import { CanvasPickerContribution } from '@visactor/vrender';
import { ChartRender, VChartRender } from './character/chart/graphic/vchart-graphic-render';
import { CharacterComponentText } from './character/component/characters/character-text';
// import { CharacterComponentRichText } from './character/component/characters/character-richtext';
import { VChartPicker } from './character/chart/graphic/vchart-graphic-picker';
import { StoryComponentType } from '../constants/character';
import { CharacterComponentLine } from './character/component/characters/character-line';
import { CharacterComponentImage } from './character/component/characters/character-image';
import { CharacterComponentShape } from './character/component/characters/character-shape';
import { VChartCharacter } from './character/chart/characters/vchart';
import { ComponentGroupRender } from './character/component/character-group/component-group-graphic-render';
import { CharacterComponentTimeline } from './character/component/characters/character-timeline';
import { RankingBarCharacter } from './character/chart/characters/rankingBar';
import { CharacterComponentUnit } from './character/component/characters/character-unit';

const splitModule = new ContainerModule(bind => {
  // chart渲染器注入
  bind(VChartRender).toSelf().inSingletonScope();
  bind(ChartRender).toService(VChartRender);
  bind(GraphicRender).toService(ChartRender);
  bind(VChartPicker).to(VChartPicker).inSingletonScope();
  bind(CanvasPickerContribution).toService(VChartPicker);

  // component渲染器注入
  bind(ComponentGroupRender).toSelf().inSingletonScope();
  bind(GraphicRender).toService(ComponentGroupRender);
});

let _register = false;
export function registerCharacter() {
  if (_register) {
    return;
  }
  _register = true;
  StoryFactory.registerCharacter(VChartCharacter.type, VChartCharacter);
  StoryFactory.registerCharacter(RankingBarCharacter.type, RankingBarCharacter);

  // StoryFactory.registerCharacter('BarChart', CharacterChart);
  // StoryFactory.registerCharacter('CharacterChart', CharacterChart);
  // StoryFactory.registerCharacter('LineChart', CharacterChart);
  StoryFactory.registerCharacter(StoryComponentType.RECT, CharacterComponentRect);
  StoryFactory.registerCharacter(StoryComponentType.TEXT, CharacterComponentText);
  // StoryFactory.registerCharacter(StoryComponentType.RICH_TEXT, CharacterComponentRichText);
  StoryFactory.registerCharacter(StoryComponentType.QIPAO, CharacterComponentQipao);
  StoryFactory.registerCharacter(StoryComponentType.LINE, CharacterComponentLine);
  StoryFactory.registerCharacter(StoryComponentType.IMAGE, CharacterComponentImage);
  StoryFactory.registerCharacter(StoryComponentType.SHAPE, CharacterComponentShape);
  StoryFactory.registerCharacter(StoryComponentType.TIMELINE, CharacterComponentTimeline);
  StoryFactory.registerCharacter(StoryComponentType.UNIT, CharacterComponentUnit);

  container.load(splitModule);
}

registerCharacter();

export * from './story';
