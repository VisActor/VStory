export const enum StoryVisactorType {
  VCHART = 'VChart',
  VTABLE = 'VTable',
  WEATHERTABLE = 'WeatherTable',
  RANKINGBAR = 'RankingBar',
  PROGRESS_PIE = 'ProgressPie'
}

export enum StoryComponentType {
  RECT = 'Rect',
  SHAPE = 'Shape',
  LINE = 'Line',
  ARC = 'Arc',
  // AREA = 'AreaComponent',
  PATH = 'Path',
  TEXT = 'Text',
  // RICH_TEXT = 'RichText',
  QIPAO = 'Qipao',
  IMAGE = 'Image',
  WEATHERBOX = 'WeatherBox',
  TIMELINE = 'Timeline',
  UNIT = 'Unit'
}

export const enum StoryChartComponentType {
  MARK_POINT = 'markPoint',
  TITLE = 'title'
}

export const DeletedAttr = Symbol('DeletedAttr');
