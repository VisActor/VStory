import type { IChartCharacterConfig } from '../interface/dsl/chart';
import type { IComponentCharacterConfig } from '../interface/dsl/component';
import type { ICharacterConfigBase } from '../interface/dsl/dsl';
import type { IPivotChartCharacterConfig, ITableCharacterConfig } from '../interface/dsl/table';

export interface IThemeCharacterBase {
  runtime?: {
    // 运行时配置
    // runtime type : runtime ability
    [key: string]: any;
  };
  position?: ICharacterConfigBase['position'];
}

export interface IThemeCharacterChart extends IThemeCharacterBase {
  options?: Omit<IChartCharacterConfig['options'], 'spec'>;
}

export interface IThemeCharacterComponent extends IThemeCharacterBase {
  options?: IComponentCharacterConfig['options'];
}
export interface IThemeCharacterTable extends IThemeCharacterBase {
  options?: ITableCharacterConfig['options'];
}

export interface IThemeCharacterPivotChart extends IThemeCharacterBase {
  options?: IPivotChartCharacterConfig['options'];
}

export interface ITheme {
  character?: {
    // character type
    [key: string]: IThemeCharacterChart | IThemeCharacterComponent | IThemeCharacterTable | IPivotChartCharacterConfig;
  };
}
