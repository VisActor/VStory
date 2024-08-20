import type { IEditSelectionInfo } from '../interface';
import { type IEditActionInfo, type IEditComponent } from '../interface';

import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';
import type { ICharacter } from '../../story/character';
import type { Chart } from '../../story/character/chart/graphic/vchart-graphic';

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

    const viewBox = (actionInfo.character.graphic as Chart).vchart.getStage().viewBox;
    const group = actionInfo.character.getGraphicParent();
    const { angle, x, y } = group.attribute;
    this._layoutComponent.updateBoundsAndAngle(
      {
        x1: viewBox.x1 + x,
        y1: viewBox.y1 + y,
        x2: viewBox.x2 + x,
        y2: viewBox.y2 + y
      },
      angle
    );
    // this._layoutComponent.updateBoundsAndAngle(actionInfo.character.getGraphicParent().AABBBounds, 0);
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
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.addEventListener('pointerdown', this.handlerChartClick);
  }

  editEnd() {
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.removeEventListener('pointerdown', this.handlerChartClick);
    super.editEnd();
  }

  handlerChartClick = (e: any) => {
    this._layoutComponent.handleDragMouseDown(e);
  };
}
