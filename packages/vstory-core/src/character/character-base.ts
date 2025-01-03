import type { ICharacterRuntimeConfig } from './../interface/character';
import type { IGraphic } from '@visactor/vrender-core';
import { Generator, IGroup } from '@visactor/vrender-core';
import type { ICharacter } from '../interface/character';
import type { ICharacterConfig, ICharacterInitOption } from '../interface/dsl/dsl';
import { cloneDeep, isValid } from '@visactor/vutils';
import type { ICharacterPickInfo, IStoryEvent } from '../interface/event';
import type { IStory } from '../interface/story';
import type { IStoryCanvas } from '../interface/canvas';
import type { IConfigProcess } from './config-transform/interface';
import type { IUpdateConfigParams } from './chart/interface/runtime';

export abstract class CharacterBase<T> implements ICharacter {
  readonly id: string;
  declare readonly visActorType: 'chart' | 'component' | 'table' | 'common';
  readonly type: string;
  protected declare _config: ICharacterConfig;
  protected declare _graphic: IGraphic;
  protected _story: IStory;
  protected _canvas: IStoryCanvas;
  declare configProcess: IConfigProcess;
  declare _attribute: T;
  // 是否锁定，不可被编辑
  declare locked?: boolean;
  // declare attributeProcess: IAttributeProcess;

  get config() {
    return this._config;
  }
  get graphic() {
    return this._graphic;
  }

  get story() {
    return this._story;
  }

  get canvas() {
    return this._canvas;
  }

  get theme() {
    return this._config.theme;
  }

  constructor(config: ICharacterConfig, option: ICharacterInitOption) {
    this.id = config.id ?? `c_${Generator.GenAutoIncrementId()}`;
    this.type = config.type;
    this._config = config;
    this._story = option.story;
    this._canvas = option.canvas;
  }

  setConfig(config: Partial<IUpdateConfigParams>) {
    const diffConfig = this.diffConfig(config);
    this.configProcess.updateConfig(diffConfig, config, this._config);
    this.applyConfigToAttribute(diffConfig, this._config);
    this._setAttributes(this._attribute);
  }

  init(): void {
    this._initRuntime();
    this._initGraphic();
  }

  abstract tickTo(t: number): void;

  toDSL(): ICharacterConfig {
    return cloneDeep(this._config);
  }

  getGraphic() {
    return this._graphic;
  }

  show(): void {
    this._graphic.setAttribute('visible', true);
  }
  hide(): void {
    this._graphic.setAttribute('visible', false);
  }

  abstract checkEvent(event: IStoryEvent): false | ICharacterPickInfo;
  release() {
    this.clearCharacter();
  }

  reset() {
    this.clearCharacter();
    this.init();
  }

  protected diffConfig(config: IUpdateConfigParams): IUpdateConfigParams {
    return config;
  }

  protected clearCharacter() {
    this._clearRuntime();
    this._clearGraphic();
  }

  protected _clearGraphic(): void {
    // 卸载group，卸载graphic和text
    this._graphic.release();
    this.canvas.removeGraphic(this._graphic);
    this._graphic = null;
  }

  protected abstract getDefaultAttribute(): Partial<T>;
  getAttribute() {
    return this._attribute;
  }
  getRuntimeConfig() {
    return this as ICharacterRuntimeConfig;
  }

  protected abstract applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void;

  protected abstract _initRuntime(): void;
  protected abstract _clearRuntime(): void;
  protected abstract _initGraphic(): void;

  protected _setAttributes(attr: T): void {
    this._graphic.setAttributes(attr);
  }
}
