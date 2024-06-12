import { type IEditActionInfo, type IEditComponent } from '../interface';
import type { ITransformControl, TransformAttributes } from './edit-control/transform-control';
import { TransformControl } from './edit-control/transform-control';
import { RectSelection } from './rect-selection';

export class ImageSelection extends RectSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'image';

  protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl {
    return new TransformControl(this, attributes);
  }
}
