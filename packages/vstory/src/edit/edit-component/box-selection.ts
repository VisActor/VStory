import type { IEditActionInfo, IEditComponent } from './../interface';
import { StoryEvent } from '../../story/interface/runtime-interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';

export class BoxSelection extends BaseSelection implements IEditComponent {
  readonly level = 1;

  constructor(public readonly edit: Edit) {
    super(edit);
  }
  editEnd(): void {
    super.editEnd();
    return;
  }
  checkAction(actionInfo: IEditActionInfo): boolean {
    if (this._isSelection) {
      if (actionInfo.type === 'pointerup') {
        // 这一次框选逻辑已经结束了。它只产生框选结果
        this.edit.stopEdit();
        // 需要触发新一次的选中 action ，可以对框选结果进行操作
        this.edit.editAction.dispatchAction({
          type: 'multiSelection',
          characterId: [], // TODO:框选逻辑等待补充
          event: actionInfo.event
        });
      } else {
        // 其他情况下认为继续框选
        return true;
      }
      return true;
    }
    if (actionInfo.type === 'pointerdown') {
      return true;
    }
    return false;
  }

  // startEdit(actionInfo: IEditActionInfo) {
  //   super.startEdit(actionInfo);
  //   // this.edit.startEdit({
  //   //   type: 'boxSelection',
  //   //   actionInfo: this._actionInfo,
  //   //   updateCharacter: (params: any) => {
  //   //     // nothing 不支持任何修改
  //   //   }
  //   // });
  // }
}
