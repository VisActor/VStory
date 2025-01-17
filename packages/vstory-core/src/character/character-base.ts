import type { ICharacterRuntimeConfig, ILayoutLine } from './../interface/character';
import type { IGraphic } from '@visactor/vrender-core';
import { Generator } from '@visactor/vrender-core';
import type { ICharacter } from '../interface/character';
import type { ICharacterConfig, ICharacterInitOption, IUpdateConfigParams } from '../interface/dsl/dsl';
import { cloneDeep, isArray } from '@visactor/vutils';
import type { ICharacterPickInfo, IStoryEvent } from '../interface/event';
import type { IStory } from '../interface/story';
import type { IStoryCanvas } from '../interface/canvas';
import type { IConfigProcess } from './config-transform/interface';
import { getLayoutLine } from '../utils/layout';
import { foreachAllConstructor } from '../utils/type';
import { ThemeManager } from '../theme/theme-manager';
import { RuntimeStore } from '../store';
import { Events } from '../constants/events';

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
  protected declare _runtime: { type: string }[];
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

  setConfig(
    config: Partial<IUpdateConfigParams>,
    params: {
      forceMergeOption?: boolean;
      mode?: number;
    } = {}
  ) {
    const { forceMergeOption = true } = params;
    this.story.emit(Events.BEFORE_SET_CONFIG, { config, character: this, params });
    if (!forceMergeOption) {
      const { options, ...rest } = config;
      this.configProcess.updateConfig(rest, config, this._config);
      this._config.options = options;
      this.applyConfigToAttribute(config, this._config);
    } else {
      const diffConfig = this.diffConfig(config);
      this.configProcess.updateConfig(diffConfig, config, this._config);
      this.applyConfigToAttribute(diffConfig, this._config);
    }
    this._setAttributes(this._attribute);
    this.story.emit(Events.AFTER_SET_CONFIG, { config, character: this, params });
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

  diffConfig(config: IUpdateConfigParams): IUpdateConfigParams {
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

  getLayoutGuideLine(): ILayoutLine[] {
    const bounds = this._graphic.AABBBounds;
    return getLayoutLine(bounds, {
      id: this.id
    });
  }

  protected _initRuntime(): void {
    const keyMap: Record<string, boolean> = {};
    const themeRuntimeKeyList: string[] = [];
    const tempKeyMap: Record<string, boolean> = {};
    foreachAllConstructor(this, (constructor, _currentProto) => {
      if (constructor && constructor.RuntimeMap) {
        Object.assign(keyMap, constructor.RuntimeMap);
      }
      const runtimeList = ThemeManager.getAttribute(
        [this.theme, this.story.theme],
        `character.${constructor.type}.runtime.list`
      );
      if (isArray(runtimeList)) {
        const tempList: string[] = [];
        runtimeList.forEach(r => {
          if (!tempKeyMap[r]) {
            tempKeyMap[r] = true;
            tempList.push(r);
          }
        });
        themeRuntimeKeyList.splice(0, 0, ...tempList);
      }
    });

    this._runtime = RuntimeStore.getList(keyMap, themeRuntimeKeyList);
  }

  protected abstract applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void;
  protected abstract _clearRuntime(): void;
  protected abstract _initGraphic(): void;

  protected _setAttributes(attr: T): void {
    this._graphic.setAttributes(attr);
  }
}
