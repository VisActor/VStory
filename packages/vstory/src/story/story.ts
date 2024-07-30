import type { ICharacterSpec } from './character/dsl-interface';
import { isString } from '@visactor/vutils';
import type { ICharacterTree, IStory, IStoryCanvas, IStoryInitOption } from './interface/runtime-interface';
import type { ICharacter } from './character/runtime-interface';
import { StoryCanvas } from './canvas/canvas';
import type { IStorySpec, IActSpec } from './interface';
import { StoryFactory } from './factory/factory';
import { defaultTicker, defaultTimeline } from '@visactor/vrender';
import { CharacterTree } from './character-tree/character-tree';
import type { IPlayer } from '../player/interface/player';
import { Player } from '../player/player';

defaultTicker.remTimeline(defaultTimeline);

export class Story implements IStory {
  static _id_ = 0;

  protected _player: IPlayer;

  readonly id: string;

  protected _canvas: IStoryCanvas;

  protected _characterTree: ICharacterTree;
  get canvas() {
    return this._canvas;
  }

  constructor(spec: IStorySpec, option: IStoryInitOption) {
    this.id = 'test-mvp_' + Story._id_++;
    this._canvas = new StoryCanvas(
      this,
      isString(option.dom) ? (document.getElementById(option.dom) as HTMLDivElement) : option.dom
    );
    this._player = new Player(this, option.playerOption);

    this._characterTree = new CharacterTree(this);
    if (spec) {
      this.load(spec);
    }
  }

  load(spec: IStorySpec) {
    this._characterTree.initCharacters(spec.characters);
    this._player.initActs(spec.acts);
  }

  getCharacters(): { [key: string]: ICharacter } {
    return this._characterTree.getCharacters();
  }

  getCharactersById(key: string) {
    return this._characterTree.getCharactersById(key);
  }

  // private _createAct(spec: IActSpec) {
  //   this._player.addAct(spec, this._characters);
  // }

  play(actIndexOrId: string | number = 0) {
    // player 开始播放
    this._player.play();
  }

  pause() {
    this._player.pause();
    return;
  }

  async encodeToVideo(actIndexOrId: number, millsecond: number, fps: number) {
    return this._player.encodeToVideo(millsecond, fps);
  }

  getPlayer() {
    return this._player;
  }

  release() {
    this._player.release();
    this._canvas.release();
  }
}
