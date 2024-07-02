import type { IEditActionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import { BaseSelection } from './base-selection';
import type { IRichText } from '@visactor/vrender-core';
import { mixin } from '@visactor/vutils';
import { RichTextMixin } from './mixin/richtext';

export interface RichTextSelectionCommon
  extends Pick<RichTextMixin, '_richTextControl' | '_createRichControl' | '_releaseRichControl'>,
    IEditComponent {}

export class RichTextSelectionCommon extends BaseSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'rect';
  readonly editCharacterType = 'RectComponent';

  protected _getRichText() {
    // @ts-ignore
    const character = this._actionInfo.character;
    const text = character.textGraphic as IRichText;
    return { character, text };
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    const { character, text } = this._getRichText();
    this._createRichControl(character, text);
  }
  editEnd() {
    const { character, text } = this._getRichText();
    this._releaseRichControl(character, text);
    super.editEnd();
  }

  endRichTextEdit = () => {
    this._richTextControl?.endEdit();
  };
}

mixin(RichTextSelectionCommon, RichTextMixin);
