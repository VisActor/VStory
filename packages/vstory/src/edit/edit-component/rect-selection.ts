import { StoryComponentType } from '../../constants/character';
import type { IEditActionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import { RichTextSelectionCommon } from './richtext-selection-common';

export class RectSelection extends RichTextSelectionCommon implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'rect';
  readonly editCharacterType = StoryComponentType.RECT;

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerRectClick);
  }
  editEnd() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerRectClick);
    super.editEnd();
  }

  handlerRectClick = (e: any) => {
    this._layoutComponent.handleDragMouseDown(e);
    this.endRichTextEdit();
  };
}
