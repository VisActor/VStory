import type { IChartTemp } from '../temp/interface';
import type { IDataTempTransform, ISpecProcess } from '../../visactor/interface';
import type { IComponentMatch } from '../../dsl-interface';

export interface IMarkStyle {
  seriesMatch: { type: string } & IComponentMatch;
  markName: string;
  id: string; // 唯一id，避免单个元素有多个匹配样式
  itemKeys: string[]; // 数据匹配维度
  itemKeyMap: { [key: string]: any }; // 匹配维度值
  style: any; // 样式
}

export interface IChartDataTempTransform extends IDataTempTransform {
  readonly specTemp: IChartTemp;
  readonly nextTemp: IChartTemp;
}

export interface IChartSpecProcess extends ISpecProcess {
  dataTempTransform: IChartDataTempTransform;

  getSpecTemp: () => any;

  release: () => void;
}
