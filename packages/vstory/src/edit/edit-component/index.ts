// import { CommonEditComponent } from './common';
import { BoxSelection } from './box-selection';
import { ImageSelection } from './image-selection';
import { RectSelection } from './rect-selection';
import { ChartSelection } from './chart-selection';
import { Edit } from '../edit';
import { ShapeSelection } from './shape-selection';
import { TextSelection } from './text-selection';
// import { RichTextSelection } from './richtext-selection';

export function loadAllSelection() {
  // Edit.registerEditComponent('common', CommonEditComponent);
  Edit.registerEditComponent('text', TextSelection);
  // Edit.registerEditComponent('richtext', RichTextSelection);
  Edit.registerEditComponent('rect', RectSelection);
  Edit.registerEditComponent('image', ImageSelection);
  Edit.registerEditComponent('shape', ShapeSelection);
  Edit.registerEditComponent('chart', ChartSelection);
  Edit.registerEditComponent('box-selection', BoxSelection);
}
