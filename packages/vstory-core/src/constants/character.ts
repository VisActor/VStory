import { VSTORY_PREFIX } from './config';

export const enum CharacterType {
  VCHART = 'VChart',
  VTABLE = 'VTable',
  WEATHERTABLE = 'WeatherTable',
  RANKINGBAR = 'RankingBar',
  WAVE_SCATTER = 'WaveScatter',
  SCATTER_BAR = 'ScatterBar',
  PROGRESS_PIE = 'ProgressPie',
  PIVOT_CHART = 'PivotChart',

  // component
  TEXT = 'Text',
  RECT = 'Rect',
  SHAPE = 'Shape',
  IMAGE = 'Image',
  LINE = 'Line',
  POLYGON = 'Polygon',
  ARC = 'Arc',
  TIMELINE = 'Timeline',
  UNIT = 'Unit',

  // 通用的类型，一般在查找effect的时候所有类型都可以匹配
  COMMON = 'Common'
}

export const SeriesAxisOrientKey = `${VSTORY_PREFIX}_seriesAxisOrient`;
