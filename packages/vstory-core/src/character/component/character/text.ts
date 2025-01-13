import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import type { ITextComponentAttributes } from '../interface/character-text';
import { TextComponent } from '../graphic/TextComponent';
import { TextRuntimeInstance } from '../runtime/text';

export class TextCharacter extends CharacterComponent<TextComponent, ITextComponentAttributes> {
  static type = CharacterType.TEXT;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: ITextComponentAttributes): void {
    this._graphic = new TextComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected getDefaultAttribute(): Partial<ITextComponentAttributes> {
    return {
      ...super.getDefaultAttribute(),
      textStyle: {
        textAlign: 'center',
        textBaseline: 'top',
        text: 'input your text',
        fontSize: 16,
        ignoreBuf: true
      }
    };
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
  }

  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
