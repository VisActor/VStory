import type { IEditActionInfo, IEditComponent, IEditSelectionInfo } from './../interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';

export class CommonEditComponent extends BaseSelection implements IEditComponent {
  readonly level = 2;

  constructor(public readonly edit: Edit) {
    super(edit);
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
