import { Generator, vglobal } from '@visactor/vrender-core';
import type { IActionParams, IStory, IStoryInitOption } from '../interface/story';
import type { ICharacterConfig, IStoryDSL } from '../interface/dsl/dsl';
import { StoryCanvas } from './canvas';
import type { IStoryCanvas } from '../interface/canvas';
import { EventEmitter, isString } from '@visactor/vutils';
import type { ICharacter } from '../interface/character';
import type { IPlayer } from '../interface/player';
import type { ICharacterTree } from '../interface/character-tree';
import { CharacterTree } from './character-tree';
import type { IPluginService } from '../interface/plugin-service';
import { DefaultPluginService } from './plugin-service';

export class Story extends EventEmitter implements IStory {
  readonly id: string;
  protected _canvas: IStoryCanvas;
  protected _dsl: IStoryDSL | null;
  protected _player: IPlayer;
  protected _characterTree: ICharacterTree;
  protected _theme: string;
  protected _option: IStoryInitOption;
  pluginService: IPluginService;

  get canvas(): IStoryCanvas {
    return this._canvas;
  }

  get player(): IPlayer {
    return this._player;
  }

  get theme(): string {
    return this._theme;
  }

  get option(): IStoryInitOption {
    return this._option;
  }

  constructor(dsl: IStoryDSL | null, option: IStoryInitOption) {
    super();
    this.id = `test-mvp_${Generator.GenAutoIncrementId()}`;
    const {
      dom,
      canvas,
      width,
      height,
      theme,
      background = 'transparent',
      layerBackground = 'transparent',
      layerViewBox,
      layerClip,
      dpr = option.dpr ?? vglobal.devicePixelRatio,
      scaleX = 1,
      scaleY = 1,
      pluginList = option.pluginList ?? []
    } = option;
    if (!(dom || canvas)) {
      throw new Error('dom or canvas is required');
    }
    this._option = option;
    this._option.mode = option.mode ?? 'desktop-browser';
    this._canvas = new StoryCanvas(this, {
      container: isString(dom) ? (vglobal.getElementById(dom) as HTMLDivElement) : dom,
      canvas: isString(canvas) ? (vglobal.getElementById(canvas) as any) : canvas,
      width,
      height,
      background,
      dpr,
      layerBackground,
      layerViewBox,
      scaleX,
      scaleY,
      pluginList,
      layerClip
    });
    this._characterTree = new CharacterTree(this);
    this._dsl = dsl;
    this._theme = theme;
    this.pluginService = new DefaultPluginService();
    this.pluginService.active(this, {
      pluginList: []
    });
  }

  init(player: IPlayer) {
    this._player = player;
    this.load(this._dsl);
  }

  reset() {
    this._characterTree.reset();
    this.player.reset();
  }

  load(dsl: IStoryDSL) {
    this._dsl = dsl;
    if (!dsl) {
      return;
    }
    // 初始化characterTree
    this._characterTree.initCharacters(this._dsl.characters);
    // 初始化Actions
    this.player.initActions(this._dsl.acts);
  }
  toDSL(): IStoryDSL {
    return {
      acts: this._player.toDSL(),
      characters: this._characterTree.toDSL()
    };
  }
  getCharacters(): { [key: string]: ICharacter } {
    return this._characterTree.getCharacters();
  }
  getCharacterList(): ICharacter[] {
    return this._characterTree.getCharacterList();
  }
  getCharacterById(id: string): ICharacter | null {
    return this._characterTree.getCharacterById(id);
  }
  getCharactersByType(type: string): ICharacter[] {
    return this._characterTree.getCharactersByType(type);
  }
  addCharacter(config: ICharacterConfig, actionParams?: IActionParams): ICharacter {
    const c = this._characterTree.addCharacter(config);
    actionParams && this.addAction(c.id, actionParams);
    return c;
  }
  addCharacterWithAppear(config: ICharacterConfig): ICharacter {
    const c = this._characterTree.addCharacter(config);
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

  release(): void {
    this._player.release();
    this._canvas.release();
  }
}
