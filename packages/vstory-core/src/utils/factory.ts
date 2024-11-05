import type { ICharacterConfig, ICharacterConstructor, ICharacterInitOption } from '../interface/dsl/dsl';

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
}
