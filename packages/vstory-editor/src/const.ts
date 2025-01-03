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
  continuingEditing = 'continuingEditing', // 持续交互状态，比如拖拽/文本输入
  normal = 'normal' // 非持续的普通的点击选中之类
}

export const VCHART_DATA_INDEX = '__VCHART_DEFAULT_DATA_INDEX';

export const MaxAxisPaddingOuter = 0.9;

// 特殊图表只有部分系列mark选中模式
export const SpecialSeriesMarkSelectMode: { [key: string]: SeriesMarkMode } = {
  circularProgress: SeriesMarkMode.single
};

export enum EditActionEnum {
  singleSelection = 'singleSelect', // 单选
  multipleSelection = 'multipleSelect', // 多选
  unSelection = 'unSelect', // 为选中

  pointerOverCharacter = 'pointerOverCharacter', // 悬浮到角色上
  pointerOutCharacter = 'pointerOutCharacter', // 从角色上悬浮出去，从角色的 a子模块到 b子模块也会触发

  richTextPluginEdit = 'richTextPluginEdit' // 富文本插件的编辑消息
}
