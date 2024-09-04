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
import { logger } from '../util/output';

defaultTicker.remTimeline(defaultTimeline);

export class Story implements IStory {
  static _id_ = 0;

  protected _player: IPlayer;

  readonly id: string;

  protected _canvas: IStoryCanvas;

  protected _characterTree: ICharacterTree;

  protected _spec: IStorySpec;

  get canvas() {
    return this._canvas;
  }

  get player(): IPlayer {
    return this._player;
  }

  get characterTree() {
    return this._characterTree;
  }

  constructor(spec: IStorySpec | null, option: IStoryInitOption) {
    this.id = 'test-mvp_' + Story._id_++;
    this._canvas = new StoryCanvas(this, {
      container: isString(option.dom) ? (document.getElementById(option.dom) as HTMLDivElement) : option.dom,
      canvas: isString(option.canvas) ? (document.getElementById(option.canvas) as HTMLCanvasElement) : option.canvas,
      width: option.width,
      height: option.height
    });
    this._player = new Player(this, option.playerOption);

    this._characterTree = new CharacterTree(this);
    spec && this.load(spec);
  }

  load(spec: IStorySpec) {
    this._spec = spec;
    if (!spec) {
      return;
    }
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

  play(loop: boolean = true) {
    // player 开始播放
    this._spec && this.load(this._spec);
    this._player.play();
    if (loop) {
      this._player.once('onstop', () => {
        this.play(loop);
      });
    }
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
