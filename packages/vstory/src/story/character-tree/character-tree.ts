import type { ICharacter, ICharacterConfig } from '../character';
import { StoryFactory } from '../factory/factory';
import type { ICharacterTree, IStory } from '../interface';

export class CharacterTree implements ICharacterTree {
  protected _characters: { [key: string]: ICharacter } = {};
  protected _story: IStory;

  constructor(story: IStory) {
    this._story = story;
  }

  getCharacters(): { [key: string]: ICharacter } {
    return this._characters;
  }

  getCharacterById(key: string) {
    return this._characters[key] || null;
  }

  removeCharacter(cId: string) {
    const c = this._characters[cId];
    // TODO 先直接release掉，后续如果需要复用再说
    c && c.release();
    delete this._characters[cId];
  }

  addCharacter(config: ICharacterConfig) {
    const option = {
      story: this._story,
      canvas: this._story.canvas,
      graphicParent: this._story.canvas.getStage().defaultLayer
    };
    if ((<ICharacterConfig>config).id) {
      if (!this._characters[(<ICharacterConfig>config).id]) {
        this._characters[(<ICharacterConfig>config).id] = StoryFactory.createCharacter(
          <ICharacterConfig>config,
          option
        );
      }
      return this._characters[(<ICharacterConfig>config).id];
    }
    return null;
  }

  initCharacters(specs: ICharacterConfig[]): void {
    this.releaseOldCharacters();
    this._characters = {};
    const option = {
      story: this._story,
      canvas: this._story.canvas,
      graphicParent: this._story.canvas.getStage().defaultLayer
    };

    specs.forEach(spec => {
      if ((<ICharacterConfig>spec).id) {
        if (!this._characters[(<ICharacterConfig>spec).id]) {
          this._characters[(<ICharacterConfig>spec).id] = StoryFactory.createCharacter(<ICharacterConfig>spec, option);
        }
        // return this._characters[(<ICharacterConfig>spec).id];
      }
    });
  }

  releaseOldCharacters() {
    Object.keys(this._characters).forEach(k => {
      const c = this._characters[k];
      c.release();
    });
  }

  toDSL() {
    return Object.keys(this._characters).map(k => {
      return this._characters[k].toJSON();
    });
  }
}
