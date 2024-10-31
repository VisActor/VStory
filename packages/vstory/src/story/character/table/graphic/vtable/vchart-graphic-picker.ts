import { injectable } from '@visactor/vrender';
import type { IGraphicPicker, IPickParams } from '@visactor/vrender';
import { TABLE_NUMBER_TYPE } from './vtable-graphic';

@injectable()
export class VTablePicker implements IGraphicPicker {
  type = 'table';
  numberType: number = TABLE_NUMBER_TYPE;

  contains(table: any, point: any, params?: IPickParams): boolean | any {
    return true;
  }
}
