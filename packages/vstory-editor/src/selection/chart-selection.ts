import { CharacterType } from '@visactor/vstory-core';
import type { IEditActionInfo, IEditSelection } from '../interface';
import { BaseSelection } from './base-selection';

export class ChartSelection extends BaseSelection implements IEditSelection {
  readonly level = 3;
  readonly type: string = CharacterType.VCHART;
  readonly editCharacterType: string = CharacterType.VCHART;
  readonly supportedCharacterType: string[] = [CharacterType.VCHART];

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.addEventListener('pointerdown', this.handlerContentClick);
  }
  endEdit() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.removeEventListener('pointerdown', this.handlerContentClick);
    super.endEdit();
  }

  handlerContentClick = (e: any) => {
    this._layoutController.handleDragMouseDown(e);
    // this.endRichTextEdit();
  };
}
