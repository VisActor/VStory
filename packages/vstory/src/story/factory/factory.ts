import type { IDataParserConstructor } from '../character/visactor/interface';
import type { IGraphicConstructor } from '../character/component/graphic/graphic';
import type { ICharacterConstructor, ICharacterInitOption } from '../character/runtime-interface';
import type { ICharacterConfig } from '../character/dsl-interface';
import type { IChartTempConstructor } from '../character/chart/temp/interface';

export class StoryFactory {
  static characterMap: { [key: string]: ICharacterConstructor } = {};
  static registerCharacter(type: string, c: ICharacterConstructor) {
    StoryFactory.characterMap[type] = c;
  }
  static createCharacter(config: ICharacterConfig, opt: ICharacterInitOption) {
    const classC = StoryFactory.characterMap[config.type];
    if (!classC) {
      console.error('获取模板失败', config);
      return null;
    }
    const el = new classC(config, opt);
    el.init();
    return el;
  }

  static graphicMap: { [key: string]: IGraphicConstructor } = {};
  static registerGraphic(type: string, c: IGraphicConstructor) {
    StoryFactory.graphicMap[type] = c;
  }
  static createGraphic(type: string, opt: any) {
    const classC = StoryFactory.graphicMap[type];
    if (!classC) {
      return null;
    }
    return new classC(type, opt);
  }

  static dataParserMap: { [key: string]: IDataParserConstructor } = {};
  static registerDataParser(type: string, c: IDataParserConstructor) {
    StoryFactory.dataParserMap[type] = c;
  }
  static createDataParser(type: string, opt: any) {
    const classC = StoryFactory.dataParserMap[type];
    if (!classC) {
      return null;
    }
    return new classC(type, opt);
  }

  static chartTempMap: { [key: string]: IChartTempConstructor } = {};
  static registerChartTemp(type: string, c: IChartTempConstructor) {
    StoryFactory.chartTempMap[type] = c;
  }
  static createChartTemp(type: string, opt: any) {
    const classC = StoryFactory.chartTempMap[type];
    if (!classC) {
      return null;
    }
    return new classC(opt);
  }
}
