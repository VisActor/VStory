import type { IBoundsLike } from '@visactor/vutils';
import { cloneDeep, isValid, merge } from '@visactor/vutils';
import type { ICharacterInitOption, ICharacterPickInfo } from '../runtime-interface';
import type { ICharacter, ICharacterConfig } from '..';
import type { IGroup } from '@visactor/vrender';
import type { StoryEvent } from '../../interface';
import { deepMergeWithDeletedAttr } from '../../../util/merge';

export abstract class CharacterBase implements ICharacter {
  readonly id: string;
  readonly visActorType: string;
  readonly type: string;
  protected _config: ICharacterConfig;
  get config() {
    return this._config;
  }
  protected declare _graphic: any;
  get graphic() {
    return this._graphic;
  }

  protected _option: ICharacterInitOption;
  get option() {
    return this._option;
  }

  constructor(config: ICharacterConfig, option: ICharacterInitOption) {
    this.type = config.type;
    this.id = config.id;
    this._config = config;
    this._option = option;
  }
  // 设置position、zIndex和options
  setConfig(config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>): void {
    const diffConfig = this.diffConfig(config);

    this.mergeConfig(diffConfig);

    this.applyConfig(diffConfig);
  }

  protected mergeConfig(config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>) {
    if (config.position) {
      this._config.position = config.position;
    }
    if (isValid(config.zIndex)) {
      this._config.zIndex = config.zIndex;
    }
    if (config.options) {
      this._config.options = deepMergeWithDeletedAttr(this._config.options ?? {}, config.options);
    }
  }

  protected diffConfig(
    config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>
  ): Omit<Partial<ICharacterConfig>, 'id' | 'type'> {
    return config;
  }

  protected applyConfig(config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>) {
    this.onConfigReady(config);
    return;
  }

  protected onConfigReady(config: Omit<Partial<ICharacterConfig>, 'id' | 'type'>) {
    return;
  }

  tickTo(t: number): void {
    throw new Error('Method not implemented.');
  }

  init() {
    this._initRuntime();
    this._parseConfig();
    this._initGraphics();
  }

  reset() {
    this.clearCharacter();
    this.init();
  }

  toJSON(): ICharacterConfig {
    return this._config;
  }

  protected abstract _initRuntime(): void;
  protected abstract _parseConfig(): void;
  protected abstract _initGraphics(): void;

  abstract show(): void;
  abstract hide(): void;

  getPositionData() {
    return;
  }

  abstract getGraphicParent(): IGroup;
  abstract getLayoutBounds(): IBoundsLike;

  abstract clearCharacter(): void;

  abstract checkEvent(event: StoryEvent): false | ICharacterPickInfo;
  release() {
    this.graphic && this.graphic.release && this.graphic.release();
  }
}
