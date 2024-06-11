import type { IEditSelectionInfo } from '../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../interface';
import { StoryEvent } from '../../story/interface/runtime-interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';

export class TextSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;

  constructor(public readonly edit: Edit) {
    super(edit);
  }
  editEnd(): void {
    super.editEnd();
    return;
  }
  checkAction(actionInfo: IEditSelectionInfo): boolean {
    if (actionInfo.type !== EditActionEnum.singleSelection) {
      return false;
    }
    if (!actionInfo.detail) {
      return false;
    }
    if (actionInfo.detail.graphicType !== 'text') {
      return false;
    }
    this.startEdit(actionInfo);
    return true;
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'boxSelection',
      actionInfo: this._actionInfo,
      updateCharacter: (params: any) => {
        // nothing 不支持任何修改
      }
    });
  }
}
