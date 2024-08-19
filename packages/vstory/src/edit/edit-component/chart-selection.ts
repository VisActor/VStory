import { type IEditActionInfo, type IEditComponent } from '../interface';

import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';
import type { ICharacter } from '../../story/character';

export class ChartSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;
  type = 'chart';

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  enableEditCharacter(character: ICharacter) {
    return character.visActorType === this.type;
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'chartSelection',
      actionInfo: this._actionInfo,
      updateCharacter: (params: any) => {
        // nothing 不支持任何修改
      }
    });
  }
}