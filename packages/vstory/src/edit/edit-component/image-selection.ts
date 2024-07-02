import { StoryGraphicType } from '../../dsl/constant';
import { type IEditComponent } from '../interface';
import { BaseSelection } from './base-selection';
import type { ITransformControl, TransformAttributes } from './edit-control/transform-control';
import { TransformControl } from './edit-control/transform-control';

export class ImageSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'image';
  editCharacterType = StoryGraphicType.IMAGE;

  protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl {
    return new TransformControl(this, attributes);
  }
}
