import { StoryVisactorType } from '../../../constants';
import type { StoryEvent } from '../../interface';
import { getLayoutFromWidget } from '../../utils/layout';
import type { ITableCharacterConfig } from '../dsl-interface';
import type { ICharacterPickInfo } from '../runtime-interface';
import { CharacterVisactor } from '../visactor/character';
import { Table } from './graphic/table';
import type { ITableCharacterRuntimeConstructor } from './runtime/interface';
import { ITableCharacterRuntime } from './runtime/interface';
import { WeatherTableRuntime } from './runtime/weather-table-spec';
import { TableDataTempTransform } from './spec-process/data-temp-transform';
import { SpecProcess } from './spec-process/spec-process';

export class CharacterTable extends CharacterVisactor {
  static type = 'CharacterTable';
  static RunTime: ITableCharacterRuntimeConstructor[] = [];

  declare _graphic: Table;

  protected declare _specProcess: SpecProcess;

  protected declare _config: ITableCharacterConfig;
  get config() {
    return this._config;
  }

  protected _initRuntime(): void {
    CharacterTable.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected _initGraphics(): void {
    this.onConfigReady(this._config);
    this._graphic = new Table(StoryVisactorType.VTABLE, this, {
      canvas: this._option.canvas.getCanvas(),
      ...getLayoutFromWidget(this._config.position),
      ...(this._config.options.panel ?? {}),
      ...this._specProcess.getVisSpec()
    });

    this._graphic.init();
    this.hide();
    this.option.graphicParent.add(this._graphic.graphic);
  }

  protected _initSpecProcess(): void {
    this._specProcess = new SpecProcess(this as any, TableDataTempTransform, this.onConfigReady);
  }

  protected _updateVisactorSpec(): void {
    this._graphic?.setAttributes({
      spec: this._specProcess.getVisSpec()
    });
  }

  protected _parseConfig(): void {
    this._specProcess.updateConfig(this._config);
  }

  checkEvent(event: StoryEvent): false | ICharacterPickInfo {
    return false;
  }
}
