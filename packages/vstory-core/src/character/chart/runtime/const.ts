// vchart 内置的数据序号
export const VCHART_DATA_INDEX = '__VCHART_DEFAULT_DATA_INDEX';

export const EDITOR_SERIES_MARK_STYLE_LEVEL = 90;
export const EDITOR_SERIES_MARK_SINGLE_LEVEL = 100;

const CommonMarkAttribute = ['visible', 'stroke', 'strokeOpacity', 'lineWidth', 'lineDash', 'curveType', 'zIndex'];
export const fillMarkAttribute = [...CommonMarkAttribute, 'fill', 'fillOpacity'];
export const rectMarkAttribute = [...fillMarkAttribute, 'cornerRadius'];
export const arcMarkAttribute = [...fillMarkAttribute, 'cornerRadius', 'centerOffset', 'innerRadius', 'outerRadius'];
export const pointMarkAttribute = [...CommonMarkAttribute, 'fill', 'fillOpacity', 'size', 'shape', 'symbolType'];
export const UseDefaultSeriesStyle = '_story_series_style_default';
export const CommonLabelStyleMap = {
  style: [...fillMarkAttribute, 'font', 'fontSize', 'fontStyle', 'fontWeight', 'underline', 'background'],
  attribute: ['position', 'offset', 'overlap', 'smartInvert']
};

export const CommonMarkAttributeMap: { [key: string]: string[] } = {
  arc: arcMarkAttribute,
  rect: rectMarkAttribute,
  symbol: pointMarkAttribute,
  text: CommonLabelStyleMap.style
};

export const SeriesMarkStyleMap: {
  // 系列 类型
  [key: string]: {
    // 系列内的 mark name ｜ 或者某种系列层属性
    [key: string]: {
      style: string[]; // mark 的可编辑样式 key 的数组
      attribute: string[]; // mark 的可编辑属性 key 的数组
    };
  };
} = {
  bar: {
    bar: {
      style: [...rectMarkAttribute],
      attribute: []
    },
    label: CommonLabelStyleMap
  },
  line: {
    line: {
      style: [...CommonMarkAttribute],
      attribute: []
    },
    point: {
      style: pointMarkAttribute,
      attribute: []
    },
    label: CommonLabelStyleMap
  },
  area: {
    line: {
      style: [...CommonMarkAttribute],
      attribute: []
    },
    area: {
      style: [...fillMarkAttribute],
      attribute: []
    },
    point: {
      style: pointMarkAttribute,
      attribute: []
    },
    label: CommonLabelStyleMap
  },
  waterfall: {
    bar: {
      style: [...rectMarkAttribute],
      attribute: []
    },
    label: CommonLabelStyleMap
  },
  pie: {
    pie: {
      style: [...arcMarkAttribute],
      attribute: []
    },
    label: CommonLabelStyleMap
  },
  funnel: {
    funnel: {
      style: [...rectMarkAttribute],
      attribute: []
    },
    label: CommonLabelStyleMap
  }
};

export const FieldLink = '_filedLink_';
export const ValueLink = '_valueLink_';

export enum LineSymbolType {
  none = 'none',
  arrow = 'arrow',
  solidArrow = 'solidArrow',
  hollowArrow = 'hollowArrow',
  solidCircle = 'solidCircle',
  hollowCircle = 'hollowCircle'
}

export const lineSymbolPathMap = {
  [LineSymbolType.none]: '',
  [LineSymbolType.arrow]: 'M -1 1 L 0 0 L 1 1',
  [LineSymbolType.solidArrow]: 'M -1 1.5 L 0 0 L 1 1.5 Z',
  [LineSymbolType.hollowArrow]: 'M -1 1.5 L 0 0 L 1 1.5 Z',
  [LineSymbolType.solidCircle]: 'M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0',
  [LineSymbolType.hollowCircle]: 'M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0'
};

// 不支持标注的图表
export const MARKER_NOT_SUPPORT_CHARTS = [
  'pie',
  'rose',
  'radar',
  'sequence',
  'map',
  'circularProgress',
  'linearProgress',
  'wordCloud',
  'wordCloud3d',
  'funnel',
  'funnel3d',
  'boxPlot',
  'gauge',
  'sankey',
  'treemap',
  'sunburst',
  'circlePacking',
  'heatmap',
  'correlation'
];

export enum MarkerTypeEnum {
  horizontalLine = 'h-line', // 水平值线
  verticalLine = 'v-line', // 垂直值线
  horizontalArea = 'h-area', // 水平区域标注
  verticalArea = 'v-area', // 垂直区域标注
  growthLine = 'growth-line', // 复合增长标注
  totalDiffLine = 'total-diff-line', // 总计差异标注
  hierarchyDiffLine = 'hierarchy-diff-line', // 层级差异标记
  point = 'mark-point', // 点标注
  trendLine = 'trend-line', // 趋势线
  partitionLine = 'partition-line', // 分区标注线
  partitionArea = 'partition-area' // 分区标注面
}
