import { createGroup, type IGroup } from '@visactor/vrender-core';
import type { IEditActionInfo } from '../../../interface';
import type { Edit } from '../../../edit';

export interface IMarkControlConstructor {
  new (edit: Edit): BaseMarkControl;
}

// Todo 修改柱宽度，柱高度
export class BaseMarkControl {
  protected _actionInfo: IEditActionInfo;
  protected _graphicGroup: IGroup;

  constructor(public readonly edit: Edit) {
    this._graphicGroup = createGroup({ visible: false });
    this.edit.getEditGroup().add(this._graphicGroup);
  }

  startWithActionInfo(actionInfo: IEditActionInfo) {
    this._actionInfo = actionInfo;
  }

  release() {
    this._actionInfo = null;
    this.edit.getEditGroup().removeChild(this._graphicGroup);
    this._graphicGroup = null;
  }
}
