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
import { RectRuntimeInstance } from '../character/component/runtime/rect';
import { ImageRuntimeInstance } from '../character/component/runtime/image';
import { LineRuntimeInstance } from '../character/component/runtime/line';
import { ShapeRuntimeInstance } from '../character/component/runtime/shape';
import { PolygonRuntimeInstance } from '../character/component/runtime/polygon';
import { ArcRuntimeInstance } from '../character/component/runtime/arc';
import { TimelineRuntimeInstance } from '../character/component/runtime/timeline';
import { UnitRuntimeInstance } from '../character/component/runtime/unit';
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
  RuntimeStore.register(TextRuntimeInstance);
  RuntimeStore.register(RectRuntimeInstance);
  RuntimeStore.register(ImageRuntimeInstance);
  RuntimeStore.register(LineRuntimeInstance);
  RuntimeStore.register(ShapeRuntimeInstance);
  RuntimeStore.register(PolygonRuntimeInstance);
  RuntimeStore.register(ArcRuntimeInstance);
  RuntimeStore.register(TimelineRuntimeInstance);
  RuntimeStore.register(UnitRuntimeInstance);

  // 表格相关运行时
  RuntimeStore.register(TableCommonSpecRuntimeInstance);
  RuntimeStore.register(CellStyleRuntimeInstance);
  RuntimeStore.register(ColWidthRuntimeInstance);
  RuntimeStore.register(RowHeightRuntimeInstance);
  RuntimeStore.register(TableTypeRuntimeInstance);
}
