import type { IDataTempTransform, ISpecProcess } from '../../visactor/interface';
import type { ITableTemp } from '../temp/interface';

export interface ITableDataTempTransform extends IDataTempTransform {
  readonly specTemp: ITableTemp;
  readonly nextTemp: ITableTemp;
}

export interface ITableSpecProcess extends ISpecProcess {
  getSpecTemp: () => any;

  release: () => void;
}
