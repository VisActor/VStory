// import { StoryGraphicType } from '../../dsl/constant';
import { StoryComponentType } from '../../constants/character';
import type { VRenderPointerEvent } from '../../interface/type';
import type { IEditSelectionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import { BaseSelection } from './base-selection';
import type { ITransformControl, IUpdateParams, TransformAttributes } from './edit-control/transform-control';
import { TransformControl } from './edit-control/transform-control';
import { RectSelection } from './rect-selection';

export class ShapeSelection extends RectSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'shape';
  readonly editCharacterType: string = StoryComponentType.SHAPE;

  // protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl {
  //   return new TransformControl(this, attributes);
  // }

  updateComponent() {
    const actionInfo = this._actionInfo as IEditSelectionInfo;
    if (!(actionInfo && actionInfo.character)) {
      return;
    }
    const symbol = actionInfo.character.graphic.graphic;
    const { width, height } = symbol.attribute;
    const group = actionInfo.character.getGraphicParent();
    const { angle, x, y } = group.attribute;
    this._layoutComponent.updateBoundsAndAngle(
      {
        x1: x,
        y1: y,
        x2: x + width,
        y2: y + height
      },
      angle
    );
  }

  protected handlerTransformChange(data: IUpdateParams, event?: VRenderPointerEvent): void {
    if (this._activeCharacter) {
      const { x, y, width, height } = data;
      this._activeCharacter.setAttributes({
        ...data,
        x: x + width / 2,
        y: y + height / 2
      });
    }
  }
}
