import { CommonEditComponent } from './common';
import { BoxSelection } from './box-selection';
import { ImageSelection } from './image-selection';
import { TextSelection } from './text-selection';
import { RichTextSelection } from './richtext-selection';
import { RectSelection } from './rect-selection';
import { Edit } from '../edit';

export function loadAllSelection() {
  Edit.registerEditComponent('common', CommonEditComponent);
  Edit.registerEditComponent('text', TextSelection);
  Edit.registerEditComponent('richtext', RichTextSelection);
  Edit.registerEditComponent('rect', RectSelection);
  Edit.registerEditComponent('box-selection', BoxSelection);
  Edit.registerEditComponent('image-selection', ImageSelection);
}
