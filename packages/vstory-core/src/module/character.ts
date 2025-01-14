import { RankingBarCharacter, registerRankingBarTemp } from '../character/chart/character/rankingBar';
import { ScatterBarCharacter } from '../character/chart/character/scatter-bar';
import { VChartCharacter, registerAllVChart } from '../character/chart/character/vchart';
import { WaveScatterCharacter } from '../character/chart/character/wave-scatter';
import { ArcCharacter } from '../character/component/character/arc';
import { ImageCharacter } from '../character/component/character/image';
import { LineCharacter } from '../character/component/character/line';
import { PolygonCharacter } from '../character/component/character/polygon';
import { RectCharacter } from '../character/component/character/rect';
import { ShapeCharacter } from '../character/component/character/shape';
import { TextCharacter } from '../character/component/character/text';
import { TimelineCharacter } from '../character/component/character/timeline';
import { UnitCharacter } from '../character/component/character/unit';
import { StoryFactory } from '../utils/factory';
import { VTableCharacter } from '../character/table/character/vtable';
import { PivotChartCharacter } from '../character/table/character/pivot-chart';
import { RuntimeStore } from '../store';
import { CommonSpecRuntimeInstance as ChartCommonSpecRuntimeInstance } from '../character/chart/runtime/common-spec';
import { RankingBarRuntimeInstance } from '../character/chart/runtime/ranking-bar';
import { WaveScatterRuntimeInstance } from '../character/chart/runtime/wave-scatter';
import { TextRuntimeInstance } from '../character/component/runtime/text';
import { LineRuntimeInstance } from '../character/component/runtime/line';
import { BaseGraphicRuntimeInstance } from '../character/component/runtime/base';
import { SeriesSpecRuntimeInstance } from '../character/chart/runtime/series-spec';
import { MarkStyleRuntimeInstance } from '../character/chart/runtime/mark-style';
import { LabelStyleRuntimeInstance } from '../character/chart/runtime/label-style';
import { TotalLabelRuntimeInstance } from '../character/chart/runtime/total-label';
import { CommonLayoutRuntimeInstance } from '../character/common/runtime/common-layout';

import { CommonSpecRuntimeInstance as TableCommonSpecRuntimeInstance } from '../character/table/runtime/common-spec';
import { CellStyleRuntimeInstance } from '../character/table/runtime/cell-style';
import { ColWidthRuntimeInstance } from '../character/table/runtime/col-width';
import { RowHeightRuntimeInstance } from '../character/table/runtime/row-height';
import { TableTypeRuntimeInstance } from '../character/table/runtime/table-type';
import { TableThemeRuntimeInstance } from '../character/table/runtime/table-theme';
import { ShowHeaderRuntimeInstance } from '../character/table/runtime/show-header';
import { ColVisibleRuntimeInstance } from '../character/table/runtime/col-visible';
import { RowVisibleRuntimeInstance } from '../character/table/runtime/row-visible';
import { ColStyleRuntimeInstance } from '../character/table/runtime/col-style';
import { RowStyleRuntimeInstance } from '../character/table/runtime/row-style';
import { ContentColStyleRuntimeInstance } from '../character/table/runtime/content-col-style';
import { ContentRowStyleRuntimeInstance } from '../character/table/runtime/content-row-style';

let _register = false;
export function registerCharacters() {
  if (_register) {
    return;
  }
  _register = true;
  // chart
  StoryFactory.registerCharacter(VChartCharacter.type, VChartCharacter);
  registerRankingBarTemp();
  registerAllVChart();
  StoryFactory.registerCharacter(RankingBarCharacter.type, RankingBarCharacter);
  StoryFactory.registerCharacter(WaveScatterCharacter.type, WaveScatterCharacter);
  StoryFactory.registerCharacter(ScatterBarCharacter.type, ScatterBarCharacter);
  // component
  StoryFactory.registerCharacter(TextCharacter.type, TextCharacter);
  StoryFactory.registerCharacter(RectCharacter.type, RectCharacter);
  StoryFactory.registerCharacter(ImageCharacter.type, ImageCharacter);
  StoryFactory.registerCharacter(LineCharacter.type, LineCharacter);
  StoryFactory.registerCharacter(ShapeCharacter.type, ShapeCharacter);
  StoryFactory.registerCharacter(PolygonCharacter.type, PolygonCharacter);
  StoryFactory.registerCharacter(ArcCharacter.type, ArcCharacter);

  StoryFactory.registerCharacter(TimelineCharacter.type, TimelineCharacter);
  StoryFactory.registerCharacter(UnitCharacter.type, UnitCharacter);
  // table
  StoryFactory.registerCharacter(VTableCharacter.type, VTableCharacter);
  // table
  StoryFactory.registerCharacter(PivotChartCharacter.type, PivotChartCharacter);

  registerRuntime();
}

export function registerRuntime() {
  // 基础运行时
  RuntimeStore.register(CommonLayoutRuntimeInstance);

  // 基础图表运行时
  RuntimeStore.register(ChartCommonSpecRuntimeInstance);
  RuntimeStore.register(SeriesSpecRuntimeInstance);
  RuntimeStore.register(MarkStyleRuntimeInstance);
  RuntimeStore.register(LabelStyleRuntimeInstance);
  RuntimeStore.register(TotalLabelRuntimeInstance);

  // 图表相关运行时
  RuntimeStore.register(RankingBarRuntimeInstance);
  RuntimeStore.register(WaveScatterRuntimeInstance);

  // 组件相关运行时
  RuntimeStore.register(BaseGraphicRuntimeInstance);
  RuntimeStore.register(TextRuntimeInstance);
  RuntimeStore.register(LineRuntimeInstance);

  // 表格相关运行时
  RuntimeStore.register(TableCommonSpecRuntimeInstance);
  RuntimeStore.register(TableTypeRuntimeInstance);
  RuntimeStore.register(TableThemeRuntimeInstance);
  RuntimeStore.register(ShowHeaderRuntimeInstance);
  RuntimeStore.register(ColWidthRuntimeInstance);
  RuntimeStore.register(RowHeightRuntimeInstance);
  RuntimeStore.register(ColVisibleRuntimeInstance);
  RuntimeStore.register(RowVisibleRuntimeInstance);
  RuntimeStore.register(ColStyleRuntimeInstance);
  RuntimeStore.register(RowStyleRuntimeInstance);
  RuntimeStore.register(ContentColStyleRuntimeInstance);
  RuntimeStore.register(ContentRowStyleRuntimeInstance);
  RuntimeStore.register(CellStyleRuntimeInstance);
}
