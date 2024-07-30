import type { ICharacter, ICharacterSpec } from '../character';
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

  getCharactersById(key: string) {
    return this._characters[key] || null;
  }

  addCharacter(spec: ICharacterSpec) {
    const option = {
      story: this._story,
      canvas: this._story.canvas,
      graphicParent: this._story.canvas.getStage().defaultLayer
    };
    if ((<ICharacterSpec>spec).id) {
      if (!this._characters[(<ICharacterSpec>spec).id]) {
        this._characters[(<ICharacterSpec>spec).id] = StoryFactory.createCharacter(<ICharacterSpec>spec, option);
      }
      return this._characters[(<ICharacterSpec>spec).id];
    }
    return null;
  }

  initCharacters(specs: ICharacterSpec[]): void {
    const option = {
      story: this._story,
      canvas: this._story.canvas,
      graphicParent: this._story.canvas.getStage().defaultLayer
    };

    specs.forEach(spec => {
      if ((<ICharacterSpec>spec).id) {
        if (!this._characters[(<ICharacterSpec>spec).id]) {
          this._characters[(<ICharacterSpec>spec).id] = StoryFactory.createCharacter(<ICharacterSpec>spec, option);
        }
        return this._characters[(<ICharacterSpec>spec).id];
      }
    });
  }
}
