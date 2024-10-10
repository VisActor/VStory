export const SHAPE_SELECT_COLOR = '#3073F2'; // 图元选中的颜色
export const SHAPE_OVER_COLOR = '#60A3F2'; // 图元over的颜色

export const PickEventType: { [key: string]: boolean } = {
  pointerup: true,
  click: true,
  pointerdown: true,
  dblclick: true
};

export const PickGraphicAttribute = {
  fill: false,
  stroke: SHAPE_SELECT_COLOR,
  lineWidth: 2,
  lineDash: [1, 0],
  pickable: false
};

export enum SeriesMarkMode {
  all = 'all',
  seriesGroup = 'seriesGroup',
  single = 'single'
}

export enum EditEditingState {
  continuingEditing = 'continuingEditing',
  normal = 'normal'
}

export const VCHART_DATA_INDEX = '__VCHART_DEFAULT_DATA_INDEX';

export const MaxAxisPaddingOuter = 0.9;
