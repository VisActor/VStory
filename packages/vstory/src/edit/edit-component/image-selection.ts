import { type IEditActionInfo, type IEditComponent } from '../interface';
import { RectSelection } from './rect-selection';

export class ImageSelection extends RectSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'image';
}
