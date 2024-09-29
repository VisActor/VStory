import type { IEditSelectionInfo } from '../interface';
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

  updateComponent() {
    const actionInfo = this._actionInfo as IEditSelectionInfo;
    if (!(actionInfo && actionInfo.character)) {
      return;
    }

    const group = actionInfo.character.getGraphicParent();
    const { angle } = group.attribute;
    this._layoutComponent.updateBoundsAndAngle(actionInfo.character.getLayoutBounds(), angle);
    // this._layoutComponent.updateBoundsAndAngle(actionInfo.character.getGraphicParent().AABBBounds, 0);
  }

  enableEditCharacter(character: ICharacter) {
    return character.visActorType === this.type;
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo, false);
    this.edit.emitter.emit('startEdit', {
      type: 'chartSelection',
      actionInfo,
      selection: this
    });
    // this.edit.startEdit({
    //   type: 'chartSelection',
    //   actionInfo: this._actionInfo,
    //   selection: this
    // });
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', this.handlerChartClick);
  }

  endEdit() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', this.handlerChartClick);
    super.endEdit();
  }

  handlerChartClick = (e: any) => {
    this._layoutComponent.handleDragMouseDown(e);
  };
}
