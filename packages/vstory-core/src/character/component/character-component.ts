import type { IGraphic } from '@visactor/vrender-core';
import { CharacterBase } from '../character-base';
import type { IComponentCharacterConfig } from '../../interface/dsl/component';
import type { IComponentCharacterRuntime, IUpdateConfigParams } from './interface/runtime';
import type { ICharacterInitOption } from '../../interface/dsl/dsl';
import { ComponentConfigProcess } from './component-config-process';
import type { ICharacterComponent } from './interface/character-component';
import type { IStoryEvent, ICharacterPickInfo } from '../../interface/event';
import { isArray } from '@visactor/vutils';

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

  getGraphicBySelector(selector: string | string[]) {
    if (isArray(selector)) {
      const graphics: Set<IGraphic> = new Set();
      selector.forEach(s => {
        this._getGraphicBySelector(s).forEach(g => {
          graphics.add(g);
        });
      });
      return Array.from(graphics.values());
    }
    return this._getGraphicBySelector(selector);
  }

  _getGraphicBySelector(selector: string) {
    const g = this._graphic;
    if (!selector) {
      return [g];
    }
    const selectorList = selector.split(' ');
    let graphics: IGraphic[] = [];
    selectorList.forEach(subSelector => {
      if (subSelector === '*') {
        graphics.push(g);
      } else if (/:not\(([^)]+)\)/.test(subSelector)) {
        const match = /:not\(([^)]+)\)/.exec(subSelector)[1];
        graphics = graphics.filter(g => `#${g.name}` !== match && g.type !== match);
      } else {
        let g1: IGraphic[] = [];
        if (subSelector[0] === '#') {
          const name = subSelector.substring(1);
          g1 = g.getElementsByName(name) as IGraphic[];
        } else {
          g1 = g.getElementsByType(subSelector) as IGraphic[];
        }
        graphics = graphics.concat(g1);
      }
    });
    return graphics;
  }

  checkEvent(event: IStoryEvent): false | ICharacterPickInfo {
    if (!(event.detailPath ?? event.path).some(g => g === this._graphic)) {
      return false;
    }
    return {
      part: event.path[event.path.length - 1] === this._graphic.mainGraphic ? 'graphic' : 'text',
      graphicType: this._graphic.type
    };
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
    return {
      zIndex: this._config.zIndex ?? 0,
      visibleAll: true,
      x: 0,
      y: 0,
      textStyle: {}
    } as any;
  }

  protected applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void {
    this._attribute = this.getDefaultAttribute() as any;
    this._runtime.forEach(r => r.applyConfigToAttribute?.(this));
  }
}
