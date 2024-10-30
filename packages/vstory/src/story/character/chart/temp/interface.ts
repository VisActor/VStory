import type { StandardData, DataInfo } from '../data/interface';
import type { ISpec } from '@visactor/vchart';
import type { IVisactorTemp } from '../../visactor/interface';
import type { CharacterChart } from '../character';
import type { ITableTemp } from '../../table/temp/interface';

export interface IChartTemp extends IVisactorTemp {
  type: string;
  /**
   * 根据数据得到原始 vchartSpec
   * @param data 数据
   * @param info 数据信息
   * @param opt 透传参数
   * @returns
   */
  getSpec: (data: StandardData, ctx: { character: CharacterChart }) => ISpec | null;

  afterInitialize: (ctx: { character: CharacterChart }) => void;

  getType: () => string;
  checkDataEnable: (data: StandardData, opt?: any) => boolean;
  getTempInfo?: () => any;
  clear: () => void;
}

export interface IChartTempConstructor {
  type: string;
  new (option: any): IChartTemp;
}
export interface ITableTempConstructor {
  type: string;
  new (option: any): ITableTemp;
}
