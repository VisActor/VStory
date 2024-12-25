import { injectable } from '@visactor/vrender';
import type { IGraphicPicker, IPickParams } from '@visactor/vrender';
import type { VTableGraphic } from './vtable-graphic';
import { TABLE_NUMBER_TYPE } from './vtable-graphic';

@injectable()
export class VTablePicker implements IGraphicPicker {
  type = 'table';
  numberType: number = TABLE_NUMBER_TYPE;

  contains(table: any, point: any, params?: IPickParams): boolean | any {
    // 将当前的point转化到global
    const matrix = table.parent.globalTransMatrix.clone();
    const stageMatrix = table.stage.window.getViewBoxTransform();
    matrix.multiply(stageMatrix.a, stageMatrix.b, stageMatrix.c, stageMatrix.d, stageMatrix.e, stageMatrix.f);
    const toGlobalMatrix = matrix.getInverse();
    const nextP = { x: 0, y: 0 };
    toGlobalMatrix.transformPoint(point, nextP);

    // 得到 vtable stage
    const vTable = (table as VTableGraphic).vTable;
    const vtableStage = vTable.scenegraph.stage;
    vtableStage.dirtyBounds?.clear();
    const toTableMatrix = vtableStage.window.getViewBoxTransform();
    toTableMatrix.transformPoint(nextP, nextP);
    const pick = vtableStage.pick(nextP.x, nextP.y);
    // @ts-ignore
    if (pick.graphic === null && pick.group.name === 'root') {
      return false;
    }
    return pick;
  }
}
