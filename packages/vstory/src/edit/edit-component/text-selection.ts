import { type IEditActionInfo, type IEditComponent } from '../interface';

import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';
import { StoryComponentType } from '../../constants/character';

export class TextSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'text';
  readonly editCharacterType: string = StoryComponentType.TEXT;

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'textSelection',
      actionInfo: this._actionInfo,
      selection: this
    });
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerContentClick);
  }

  endEdit() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    super.endEdit();
  }

  handlerContentClick = (e: any) => {
    this._layoutComponent.handleDragMouseDown(e);
  };
}
