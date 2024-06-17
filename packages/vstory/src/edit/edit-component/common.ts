import type { IEditActionInfo, IEditComponent, IEditSelectionInfo } from './../interface';
import { EditActionEnum } from './../interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';

export class CommonEditComponent extends BaseSelection implements IEditComponent {
  readonly level = 2;

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  editEnd(): void {
    super.editEnd();
    return;
  }
  checkAction(actionInfo: IEditSelectionInfo | IEditActionInfo): boolean {
    if (actionInfo.type !== EditActionEnum.singleSelection) {
      return false;
    }
    if (!(actionInfo as IEditSelectionInfo).detail) {
      return false;
    }
    this.startEdit(actionInfo);
    return true;
  }

  startEdit(actionInfo: IEditSelectionInfo | IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'commonEdit',
      actionInfo: this._actionInfo,
      updateCharacter: (params: any) => {
        (this._actionInfo as any).character.updateSpec(params);
      }
    });
  }
}
