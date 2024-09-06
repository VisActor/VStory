import { type IEditActionInfo, type IEditComponent } from '../interface';

import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';

export class TextSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'textSelection',
      actionInfo: this._actionInfo,
      updateCharacter: (params: any) => {
        // nothing 不支持任何修改
      }
    });
  }
}
