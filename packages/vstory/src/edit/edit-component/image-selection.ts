import { StoryComponentType } from '../../constants/character';
import type { IEditActionInfo } from '../interface';
import { type IEditComponent } from '../interface';
import { BaseSelection } from './base-selection';
import type { ITransformControl, TransformAttributes } from './edit-control/transform-control';
import { TransformControl } from './edit-control/transform-control';
import { RectSelection } from './rect-selection';

export class ImageSelection extends RectSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'image';
  readonly editCharacterType: string = StoryComponentType.IMAGE;

  checkOver(actionInfo: IEditActionInfo): void {
    return;
  }

  // protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl {
  //   return new TransformControl(this, attributes);
  // }
}
