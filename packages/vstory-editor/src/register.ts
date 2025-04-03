import { CharacterType } from '@visactor/vstory-core';
import { Edit } from './edit';
import { RectSelection } from './selection/rect-selection';
import { AutoEnablePlugins, container, ContainerModule, RichTextEditPlugin } from '@visactor/vrender-core';
import { ShapeSelection } from './selection/shape-selection';
import { ImageSelection } from './selection/image-selection';
import { ChartSelection } from './selection/chart-selection';
import { TextSelection } from './selection/text-selection';

const editPlugin = new ContainerModule((bind, unbind, isBound, rebind) => {
  if (!isBound(RichTextEditPlugin)) {
    bind(RichTextEditPlugin).toSelf();
    bind(AutoEnablePlugins).toService(RichTextEditPlugin);
  }
});

export function registerAllSelection() {
  container.load(editPlugin);
  // Edit.registerEditSelection('common', CommonEditComponent);
  // Edit.registerEditSelection(CharacterType.TEXT, TextSelection);
  Edit.registerEditSelection(CharacterType.TEXT, TextSelection);
  Edit.registerEditSelection(CharacterType.RECT, RectSelection);
  Edit.registerEditSelection(CharacterType.IMAGE, ImageSelection);
  Edit.registerEditSelection(CharacterType.SHAPE, ShapeSelection);
  Edit.registerEditSelection(CharacterType.VCHART, ChartSelection);
  // Edit.registerEditSelection('box-selection', BoxSelection);
  // Edit.registerEditSelection('series-mark-selection', SeriesMarkSelection);
  // Edit.registerEditSelection('series-label-selection', SeriesLabelSelection);
}
