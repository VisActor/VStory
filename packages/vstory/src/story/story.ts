import type { ICharacterConfig } from './character/dsl-interface';
import { isString } from '@visactor/vutils';
import type { ICharacterTree, IStory, IStoryCanvas, IStoryInitOption } from './interface/runtime-interface';
import type { ICharacter } from './character/runtime-interface';
import { StoryCanvas } from './canvas/canvas';
import type { IStoryDSL, IActionParams } from './interface';
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

  protected _dsl: IStoryDSL;

  get canvas() {
    return this._canvas;
  }

  get player(): IPlayer {
    return this._player;
  }

  get characterTree() {
    return this._characterTree;
  }

  constructor(spec: IStoryDSL | null, option: IStoryInitOption) {
    this.id = 'test-mvp_' + Story._id_++;
    this._canvas = new StoryCanvas(this, {
      container: isString(option.dom) ? (document.getElementById(option.dom) as HTMLDivElement) : option.dom,
      canvas: isString(option.canvas) ? (document.getElementById(option.canvas) as HTMLCanvasElement) : option.canvas,
      width: option.width,
      height: option.height,
      background: option.background ?? 'transparent',
      layerBackground: option.layerBackground ?? 'transparent'
    });
    this._player = new Player(this, option.playerOption);

    this._characterTree = new CharacterTree(this);
    spec && this.load(spec);
  }

  load(dsl: IStoryDSL) {
    this._dsl = dsl;
    if (!dsl) {
      return;
    }
    this._characterTree.initCharacters(dsl.characters);
    this._player.initActs(dsl.acts);
  }

  addCharacter(spec: ICharacterConfig, actionParams?: IActionParams): ICharacter {
    const c = this._characterTree.addCharacter(spec);
    actionParams && this.addAction(c.id, actionParams);
    return c;
  }
  addCharacterWithAppear(spec: ICharacterConfig): ICharacter {
    const c = this._characterTree.addCharacter(spec);
    this.addAction(c.id, { sceneId: '', actions: [{ action: 'appear' }] });
    return c;
  }
  removeCharacter(cId: string): void {
    this._characterTree.removeCharacter(cId);
    this._player.removeCharacterActions(cId);
  }

  addAction(cId: string, actionParams: IActionParams): void {
    this._player.addAction(actionParams.sceneId, cId, actionParams.actions);
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
    this._dsl && this.load(this._dsl);
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

  toDSL(): IStoryDSL {
    return {
      acts: this._player.toDSL(),
      characters: this._characterTree.toDSL()
    };
  }

  release() {
    this._player.release();
    this._canvas.release();
  }
}
