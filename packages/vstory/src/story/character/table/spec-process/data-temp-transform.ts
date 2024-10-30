import { DataTempTransformBase } from '../../visactor/data-temp-transform-base';
import type { ITableTemp } from '../temp/interface';
import type { ITableDataTempTransform } from './interface';

export class TableDataTempTransform extends DataTempTransformBase implements ITableDataTempTransform {
  protected declare _specTemp: ITableTemp;
  get specTemp() {
    return this._specTemp;
  }

  protected declare _nextTemp: ITableTemp;
  get nextTemp() {
    return this._nextTemp;
  }
}
