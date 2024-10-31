import { CharacterComponentQipao } from './character/component/characters/character-qipao';
import { CharacterComponentRect } from './character/component/characters/character-rect';
import { StoryFactory } from './factory/factory';
import { AutoEnablePlugins, ContainerModule, GraphicRender, RichTextEditPlugin, container } from '@visactor/vrender';
import { CanvasPickerContribution, PickServiceInterceptor } from '@visactor/vrender';
import { ChartRender, VChartRender } from './character/chart/graphic/vrender/vchart-graphic-render';
import { CharacterComponentText } from './character/component/characters/character-text';
// import { CharacterComponentRichText } from './character/component/characters/character-richtext';
import { VChartPicker } from './character/chart/graphic/vrender/vchart-graphic-picker';
import { StoryComponentType } from '../constants/character';
import { CharacterComponentLine } from './character/component/characters/character-line';
import { CharacterComponentImage } from './character/component/characters/character-image';
import { CharacterComponentShape } from './character/component/characters/character-shape';
import { VChartCharacter } from './character/chart/characters/vchart';
import { ComponentGroupRender } from './character/component/character-group/component-group-graphic-render';
import { CharacterComponentTimeline } from './character/component/characters/character-timeline';
import { RankingBarCharacter } from './character/chart/characters/rankingBar';
import { CharacterComponentUnit } from './character/component/characters/character-unit';
import { VChartPickServiceInterceptorContribution } from './character/chart/graphic/vrender/picker-interceptor';
import { TableRender, VTableRender } from './character/table/graphic/vtable/vtable-graphic-render';
import { VTablePicker } from './character/table/graphic/vtable/vchart-graphic-picker';
import { VTableCharacter } from './character/table/characters/vtable';
import { WeatherTableCharacter } from './character/table/characters/weatherTable';
import { CharacterComponentWeatherBox } from './character/component/characters/character-weatherBox';
import { lottieCanvasPickModule, lottieModule } from '@visactor/vrender-kits';

const splitModule = new ContainerModule(bind => {
  // chart渲染器注入
  bind(VChartRender).toSelf().inSingletonScope();
  bind(ChartRender).toService(VChartRender);
  bind(GraphicRender).toService(ChartRender);

  bind(VChartPicker).toSelf().inSingletonScope();
  bind(CanvasPickerContribution).toService(VChartPicker);
  bind(VChartPickServiceInterceptorContribution).toSelf().inSingletonScope();
  bind(PickServiceInterceptor).toService(VChartPickServiceInterceptorContribution);

  // table渲染器注入
  bind(VTableRender).toSelf().inSingletonScope();
  bind(TableRender).toService(VTableRender);
  bind(GraphicRender).toService(TableRender);

  bind(VTablePicker).toSelf().inSingletonScope();
  bind(CanvasPickerContribution).toService(VTablePicker);

  // component渲染器注入
  bind(ComponentGroupRender).toSelf().inSingletonScope();
  bind(GraphicRender).toService(ComponentGroupRender);
});

const editPlugin = new ContainerModule(bind => {
  bind(RichTextEditPlugin).toSelf();
  bind(AutoEnablePlugins).toService(RichTextEditPlugin);
});

let _register = false;
export function registerCharacter() {
  if (_register) {
    return;
  }
  _register = true;
  StoryFactory.registerCharacter(VChartCharacter.type, VChartCharacter);
  StoryFactory.registerCharacter(VTableCharacter.type, VTableCharacter);
  StoryFactory.registerCharacter(WeatherTableCharacter.type, WeatherTableCharacter);
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
  StoryFactory.registerCharacter(StoryComponentType.WEATHERBOX, CharacterComponentWeatherBox);
  StoryFactory.registerCharacter(StoryComponentType.SHAPE, CharacterComponentShape);
  StoryFactory.registerCharacter(StoryComponentType.TIMELINE, CharacterComponentTimeline);
  StoryFactory.registerCharacter(StoryComponentType.UNIT, CharacterComponentUnit);

  container.load(splitModule);
  container.load(editPlugin);
  container.load(lottieModule);
  container.load(lottieCanvasPickModule);
}

registerCharacter();

export * from './story';
