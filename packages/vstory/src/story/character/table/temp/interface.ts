import type { IVisactorTemp, StandardData } from '../../visactor/interface';
import type { CharacterTable } from '../character';

export interface ITableTemp extends IVisactorTemp {
  type: string;
  /**
   * 根据数据得到原始 vchartSpec
   * @param data 数据
   * @param info 数据信息
   * @param opt 透传参数
   * @returns
   */
  getSpec: (data: StandardData, ctx: { character: CharacterTable }) => any | null;

  afterInitialize: (ctx: { character: CharacterTable }) => void;

  getType: () => string;
  checkDataEnable: (data: StandardData, opt?: any) => boolean;
  getTempInfo?: () => any;
  clear: () => void;
}
