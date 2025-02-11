import type { ICharacterConfigBase } from '../interface/dsl/dsl';
import type { ICharacter, ILayoutLine } from '../interface/character';
import type { IAABBBounds } from '@visactor/vutils';

export interface ILayoutAttribute {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  anchor?: [number | string, number | string];
  dx?: number;
  dy?: number;
  // shapePoints?: IPointLike[];
}

export function getLayoutFromWidget(config: ICharacterConfigBase, character: ICharacter): Partial<ILayoutAttribute> {
  const { position = {} } = config;
  let x: number;
  let y: number;
  let width: number;
  let height: number;
  const { gridConfig, width: boxWidth, height: boxHeight } = character.story.dslOptions;

  const { columnSpan, rowSpan } = position;
  if (position.columnSpan && position.rowSpan && position.columnSpan.length === 2 && position.rowSpan.length === 2) {
    const { columns, rows, gutterColumn, gutterRow } = gridConfig;
    const columnWidth = (boxWidth - (columns - 1) * gutterColumn) / columns;
    const rowHeight = (boxHeight - (rows - 1) * gutterRow) / rows;
    x = columnSpan[0] * columnWidth + columnSpan[0] * gutterColumn;
    y = rowSpan[0] * rowHeight + rowSpan[0] * gutterRow;
    const deltaColumn = columnSpan[1] - columnSpan[0];
    const deltaRow = rowSpan[1] - rowSpan[0];
    width = deltaColumn * columnWidth + Math.max(0, deltaColumn - 1) * gutterColumn;
    height = deltaRow * rowHeight + Math.max(0, deltaRow - 1) * gutterRow;
  } else {
    // 兼容旧版的xy
    if ((position as any).x || (position as any).y) {
      console.warn('布局将不再支持x、y属性，请尽快改为使用left、top属性');
    }
    x = position.left ?? (position as any).x;
    y = position.top ?? (position as any).y;
    width = position.width;
    height = position.height;

    if (!isFinite(width) && isFinite(position.right)) {
      width = boxWidth - x - position.right;
    }
    if (!isFinite(height) && isFinite(position.bottom)) {
      height = boxHeight - y - position.bottom;
    }
  }

  return {
    x,
    y,
    width: isFinite(width) ? width : void 0,
    height: isFinite(height) ? height : void 0,
    angle: position.angle ?? 0,
    anchor: [x + width / 2, y + height / 2].map(item => (isFinite(item) ? item : 0)) as [number, number]
  };
}

export function getLayoutLine(b: IAABBBounds, opt: any, orient: 'x' | 'y' | 'xy' = 'xy') {
  const result: ILayoutLine[] = [];
  if (orient === 'y' || orient === 'xy') {
    const commonInY: Omit<ILayoutLine, 'value' | 'type'> = {
      orient: 'y',
      start: b.x1,
      end: b.x1 + b.width(),
      bounds: b.clone(),
      ...opt
    };
    // top
    result.push({
      value: b.y1,
      type: 'start',
      ...commonInY
    });
    // bottom
    result.push({
      value: b.y2,
      type: 'end',
      ...commonInY
    });
    // middle
    result.push({
      value: (b.y1 + b.y2) * 0.5,
      type: 'middle',
      ...commonInY
    });
  }

  if (orient === 'x' || orient === 'xy') {
    const commonInX: Omit<ILayoutLine, 'value' | 'type'> = {
      orient: 'x',
      start: b.y1,
      end: b.y2,
      bounds: b.clone(),
      ...opt
    };
    // left
    result.push({
      value: b.x1,
      type: 'start',
      ...commonInX
    });
    // right
    result.push({
      value: b.x2,
      type: 'end',
      ...commonInX
    });
    // middle
    result.push({
      value: (b.x1 + b.x2) * 0.5,
      type: 'middle',
      ...commonInX
    });
  }
  return result;
}
