import type { IGraphic } from '@visactor/vrender-core';
import { IGraphicAttribute } from '@visactor/vrender-core';
import { CharacterBase } from '../character-base';
import type { IComponentCharacterConfig } from '../../interface/dsl/component';
import type { IComponentCharacterRuntime, IUpdateConfigParams } from './interface/runtime';
import type { ICharacterInitOption } from '../../interface/dsl/dsl';
import { ComponentConfigProcess } from './component-config-process';
import type { ICharacterComponent } from './interface/character-component';
import type { IStoryEvent, ICharacterPickInfo } from '../../interface/event';

export abstract class CharacterComponent<T extends IGraphic, T1>
  extends CharacterBase<T1>
  implements ICharacterComponent
{
  visActorType: 'chart' | 'component' | 'table' | 'common' = 'component';
  protected declare _graphic: T;
  protected declare _config: IComponentCharacterConfig;

  protected _runtime: IComponentCharacterRuntime[] = [];

  constructor(config: IComponentCharacterConfig, option: ICharacterInitOption) {
    super(config, option);
    this.configProcess = new ComponentConfigProcess(this);
  }

  get config() {
    return this._config;
  }

  tickTo(t: number): void {
    return;
  }

  checkEvent(event: IStoryEvent): false | ICharacterPickInfo {
    return false;
  }

  protected _initGraphic(): void {
    this.applyConfigToAttribute(this._config, this._config);
    const attribute = this.getAttribute();

    this.createAndAddGraphic(attribute);
  }

  protected abstract createAndAddGraphic(attribute: T1): void;

  protected _initRuntime(): void {
    return;
  }

  protected _clearRuntime(): void {
    this._runtime.length = 0;
  }

  protected getDefaultAttribute(): Partial<T1> {
    return {};
  }

  protected applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void {
    this._attribute = this.getDefaultAttribute() as any;
    this._runtime.forEach(r => r.applyConfigToAttribute?.());
  }
}