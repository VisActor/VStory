import type { IGroup } from '@visactor/vrender-core';
import { CharacterType } from '../../../constants/character';
import { CharacterComponent } from '../character-component';
import { PathComponent } from '../graphic/PathComponent';
import type { IPathComponentAttributes } from '../interface/character-path';

export class PathCharacter extends CharacterComponent<PathComponent, IPathComponentAttributes> {
  static type = CharacterType.PATH;

  protected _group: IGroup;

  protected createAndAddGraphic(attribute: IPathComponentAttributes): void {
    this._graphic = new PathComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  show() {
    this._graphic.setAttribute('visibleAll', true);
  }

  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
