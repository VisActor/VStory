import type { IEditActionInfo, IEditSelection } from '../interface';
import { BaseSelection } from './base-selection';
import type { IRichText } from '@visactor/vrender-core';
import { mixin } from '@visactor/vutils';
import { RichTextMixin } from './mixin/richtext';

export interface RichTextSelectionCommon
  extends Pick<RichTextMixin, '_richTextControl' | '_createRichControl' | '_releaseRichControl'>,
    IEditSelection {}

export class RichTextSelectionCommon extends BaseSelection implements IEditSelection {
  readonly level = 3;
  readonly type: string;
  readonly editCharacterType: string;

  protected _getRichText() {
    // @ts-ignore
    const character = this._actionInfo.character;
    const text = character.graphic as IRichText;
    return { character, text };
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    const { character, text } = this._getRichText();
    this._createRichControl(character, text);
  }
  endEdit() {
    const { character, text } = this._getRichText();
    this._releaseRichControl(character, text);
    super.endEdit();
  }

  endRichTextEdit = () => {
    this._richTextControl?.endEdit();
  };
}

mixin(RichTextSelectionCommon, RichTextMixin);
