import { CharacterType } from '@visactor/vstory-core';
import type { IEditActionInfo, IEditSelection } from '../interface';
import { RichTextSelectionCommon } from './richtext-selection-common';
import type { ITransformController } from './edit-control/transform-control';

export class ImageSelection extends RichTextSelectionCommon implements IEditSelection {
  readonly level = 3;
  readonly type: string = 'image';
  readonly editCharacterType: string = CharacterType.IMAGE;
  readonly supportedCharacterType: string[] = [CharacterType.IMAGE];

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

  protected createLayoutController(): ITransformController | undefined {
    const controller = super.createLayoutController();
    controller.proportionalScaling = true;
    return controller;
  }

  protected keyDown = (event: any) => {
    if (!(this._layoutController && event)) {
      return;
    }
    if (event.shiftKey || event.key === 'Shift') {
      this._layoutController.defaultProportionalScaling = this._layoutController.proportionalScaling;
      this._layoutController.proportionalScaling = false;
    }
  };
  protected keyUp = (event: any) => {
    if (!(this._layoutController && event)) {
      return;
    }
    if (event.shiftKey || event.key === 'Shift') {
      this._layoutController.proportionalScaling = this._layoutController.defaultProportionalScaling;
    }
  };
}
