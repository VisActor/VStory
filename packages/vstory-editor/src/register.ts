import { CharacterType } from '@visactor/vstory-core';
import { Edit } from './edit';
import { RectSelection } from './selection/rect-selection';
import { AutoEnablePlugins, container, ContainerModule, RichTextEditPlugin } from '@visactor/vrender-core';
import { ShapeSelection } from './selection/shape-selection';
import { ImageSelection } from './selection/image-selection';

const editPlugin = new ContainerModule(bind => {
  bind(RichTextEditPlugin).toSelf();
  bind(AutoEnablePlugins).toService(RichTextEditPlugin);
});

export function registerAllSelection() {
  container.load(editPlugin);
  // Edit.registerEditSelection('common', CommonEditComponent);
  // Edit.registerEditSelection(CharacterType.TEXT, TextSelection);
  // Edit.registerEditSelection('richtext', RichTextSelection);
  Edit.registerEditSelection(CharacterType.RECT, RectSelection);
  Edit.registerEditSelection(CharacterType.IMAGE, ImageSelection);
  Edit.registerEditSelection(CharacterType.SHAPE, ShapeSelection);
  // Edit.registerEditSelection('chart', ChartSelection);
  // Edit.registerEditSelection('box-selection', BoxSelection);
  // Edit.registerEditSelection('series-mark-selection', SeriesMarkSelection);
  // Edit.registerEditSelection('series-label-selection', SeriesLabelSelection);
}
