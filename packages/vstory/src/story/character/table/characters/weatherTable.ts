import { StoryVisactorType } from '../../../../constants';
import { StoryFactory } from '../../../factory/factory';
import type { IWeatherTableCharacterConfig } from '../../dsl-interface';
import { CharacterTable } from '../character';
import { WeatherTableRuntime } from '../runtime/weather-table-spec';
import { WeatherTableTemp } from '../temp/templates/weather-table-temp';

StoryFactory.registerTableTemp(WeatherTableTemp.type, WeatherTableTemp);

export class WeatherTableCharacter extends CharacterTable {
  static type = StoryVisactorType.WEATHERTABLE;

  protected declare _config: IWeatherTableCharacterConfig;

  protected _initRuntime(): void {
    super._initRuntime();
    this._runtime.push(new WeatherTableRuntime(this));
  }
}
