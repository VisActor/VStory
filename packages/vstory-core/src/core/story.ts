import { Generator, vglobal } from '@visactor/vrender-core';
import type { IActionParams, IStory } from '../interface/story';
import type { ICharacterConfig, IStoryDSL } from '../interface/dsl/dsl';
import { StoryCanvas } from './canvas';
import type { IStoryCanvas } from '../interface/canvas';
import type { IAABBBoundsLike } from '@visactor/vutils';
import { EventEmitter, isString } from '@visactor/vutils';
import type { ICharacter } from '../interface/character';
import type { IPlayer } from '../interface/player';
import type { ICharacterTree } from '../interface/character-tree';
import { CharacterTree } from './character-tree';
import type { IPluginService } from '../interface/plugin-service';
import { DefaultPluginService } from './plugin-service';

type NodeCanvas = any;

export interface IStoryInitOption {
  dom?: string | HTMLDivElement; // dom id
  canvas?: string | HTMLCanvasElement | NodeCanvas; // canvas id
  width?: number;
  height?: number;
  background?: string;
  layerBackground?: string;
  layerViewBox?: IAABBBoundsLike;
  dpr?: number;
  // 对画面的缩放
  scaleX?: number | 'auto';
  scaleY?: number | 'auto';
  theme?: string;
  dslOptions?: Omit<IStoryDSL, 'characters' | 'acts'>;
}

export class Story extends EventEmitter implements IStory {
  readonly id: string;
  protected _canvas: IStoryCanvas;
  protected _dsl: IStoryDSL | null;
  protected _player: IPlayer;
  protected _characterTree: ICharacterTree;
  protected _theme: string;
  protected _dslOptions: Omit<IStoryDSL, 'characters' | 'acts'>;
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

  get dslOptions(): Omit<IStoryDSL, 'characters' | 'acts'> {
    return this._dslOptions;
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
      dpr = vglobal.devicePixelRatio,
      scaleX = 1,
      scaleY = 1,
      dslOptions = { version: '0.0.2', width: option.width, height: option.height }
    } = option;
    if (!(dom || canvas)) {
      throw new Error('dom or canvas is required');
    }
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
      scaleY
    });
    this._characterTree = new CharacterTree(this);
    this._dsl = dsl;
    if (dsl) {
      const options = { ...dsl };
      delete options.characters;
      delete options.acts;
      this._dslOptions = options;
    } else {
      this._dslOptions = dslOptions;
    }
    this._theme = theme;
    this.pluginService = new DefaultPluginService();
    this.pluginService.active(this, {
      pluginList: []
    });

    // TODO 兼容历史版本，后续版本删除
    if (!(this._dslOptions.width && this._dslOptions.height)) {
      console.warn('width and height is required in dslOptions');
    }
    this._dslOptions.width = this._dslOptions.width ?? this._canvas.getStage().width;
    this._dslOptions.height = this._dslOptions.height ?? this._canvas.getStage().height;
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
      ...this._dslOptions,
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
