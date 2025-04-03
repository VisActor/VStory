import React, { Component, useCallback } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { createRoot } from 'react-dom/client';
import { useLocalStorage } from './hooks/useLocalStorage';
import { API } from './demos/API';
import { BarChart1 } from './demos/BarChart1';
import { TextAnimate } from './demos/Text';
import { Bounce } from './demos/animate/Bounce';
import { Leap } from './demos/animate/Leap';
import { WaveScatter } from './demos/story-chart/wave-scatter';
import { ScatterBarSwing } from './demos/story-chart/scatter-bar-swing';
import { ScatterBarThrow } from './demos/story-chart/scatter-bar-throw';
import { RankingBar } from './demos/story-chart/ranking-bar';
import { UnitInfographic } from './demos/works/unit-infographic';
import { VChartSiteDemo } from './demos/works/website/VChartSite';
import { TimelineAnimate } from './demos/component/timeline';
import { BasicUnit } from './demos/component/basic-unit';
import { BarChart2 } from './demos/arrange/BarChart2';
import { UnitTemplate1 } from './demos/templates/unit-template1';
import { VScreen } from './demos/works/vscreen';
import { Lottie } from './demos/component/lottie';
import { Infographic } from './demos/infographic/infographic';
import { SomeCharts } from './demos/works/some-charts';
import {
  QuickSort,
  BubbleSort,
  InsertSort,
  SelectionSort,
  MergeSort,
  HeapSort,
  ShellSort
} from './demos/infographic/data-structure-algorithms';

import { BaseChart } from './demos/vchart-editor/base-chart';
import { Dapanji } from './demos/infographic/dapanji';
import { Insta } from './demos/infographic/insta';
import { CancerUSA } from './demos/infographic/cancer-usa';
import { SinglePie } from './demos/component/single-pie';
import { DynamicLine } from './demos/story-chart/dynamic-line';
import { Pie1 } from './demos/arrange/Pie1';
import { UnitTemplate2 } from './demos/templates/unit-template2';
import { ReadyToEat } from './demos/infographic/ready-to-eat';
import { FamousTravel } from './demos/infographic/famous-travel';
import { PopTipAnimate } from './demos/component/poptip';
import { LabelItemAnimate } from './demos/component/label-item';
import { BarHIV } from './demos/infographic/bar-hiv';
import { LabelWorks } from './demos/works/label';
import { NanJinWordCloud } from './demos/works/nanjin-wordcloud';
import { NationalMemorial } from './demos/works/NationalMemorial';
import { BarWorkingInSameIndustry } from './demos/infographic/bar-work-in-same-industry';
import { ProjectGoal } from './demos/infographic/project-goal';
import { BigDataWordCloud } from './demos/infographic/big-data-wordcloud';
import { AreaChart } from './demos/infographic/source-of-new-contacts-area-chart';
import { MarketingWordcloud } from './demos/infographic/marking-wordcloud';
import { NoStackArea } from './demos/infographic/market-share';
import { Top10Podcast } from './demos/infographic/top10_podcast';
import { FilmAnalysis } from './demos/infographic/film_analyze';

// VchartEditor Runtime
import { LineChartArrange } from './demos/arrange/LineChart';
import { PieChart } from './demos/arrange/PieChart';
import { RuntimeSeriesMark } from './demos/chart/runtime/series-mark';
import { RuntimeLabelStyle } from './demos/chart/runtime/label-style';
import { TableBase } from './demos/table/base';
import { CellStyle } from './demos/table/runtime/cell-style';
import { ColWidth } from './demos/table/runtime/col-width';
import { RowHeight } from './demos/table/runtime/row-height';
import { PivotChartBase } from './demos/table/runtime/pivot-chart-base';
import { TextComponent } from './demos/component/text';
import { SpecAxes } from './demos/chart/runtime/spec-axes';
import { RuntimeTotalLabel } from './demos/chart/runtime/total-label';
import { RectComponent } from './demos/component/rect';
import { TableInfographic } from './demos/infographic/infographic-table';
import { ComponentsEdit } from './demos/edit/components';
import { ImageComponent } from './demos/component/image';
import { ShapeComponent } from './demos/component/shape';
import { ShowHeader } from './demos/table/runtime/show-header';
import { TableTheme } from './demos/table/runtime/theme';
import { TableStyle } from './demos/table/runtime/style';
import { TableVisible } from './demos/table/runtime/visible';
import { SpecMarker } from './demos/chart/runtime/spec-marker';
import { Playground } from './demos/edit/playground';

type MenuItem = {
  name: string;
  component?: () => React.JSX.Element;
  subMenus?: MenuItem[];
};

const App = () => {
  const [activeName, setActiveName] = useLocalStorage('menuName', '');

  const menus = [
    {
      name: 'Base',
      subMenus: [
        {
          name: 'API Demo',
          component: API
        }
      ]
    },
    {
      name: 'Animate',
      subMenus: [
        {
          name: 'Bounce',
          component: Bounce
        },
        {
          name: 'Leap',
          component: Leap
        }
      ]
    },
    {
      name: 'Arrange',
      subMenus: [
        {
          name: 'BarChart1',
          component: BarChart1
        },
        {
          name: 'LineChartArrange',
          component: LineChartArrange
        },
        {
          name: 'PieChart',
          component: PieChart
        },
        {
          name: 'BarChart2',
          component: BarChart2
        },
        {
          name: 'Text',
          component: TextAnimate
        },
        {
          name: 'Pie1',
          component: Pie1
        }
      ]
    },
    {
      name: 'Story Chart',
      subMenus: [
        {
          name: 'Wave Scatter',
          component: WaveScatter
        },
        {
          name: 'Scatter Bar Throw',
          component: ScatterBarThrow
        },
        {
          name: 'Scatter Bar Swing',
          component: ScatterBarSwing
        },
        {
          name: 'Dynamic Bar Chart',
          component: RankingBar
        },
        {
          name: 'Dynamic Line Chart',
          component: DynamicLine
        }
      ]
    },
    {
      name: 'Works',
      subMenus: [
        {
          name: 'Unit Infographic',
          component: UnitInfographic
        },
        {
          name: 'VChart Demo',
          component: VChartSiteDemo
        },
        {
          name: 'VScreen',
          component: VScreen
        },
        {
          name: 'LabelComponent',
          component: LabelWorks
        },
        {
          name: 'SomeCharts',
          component: SomeCharts
        },
        {
          name: 'NanJinWordCloud',
          component: NanJinWordCloud
        },
        {
          name: 'NationalMemorial',
          component: NationalMemorial
        }
      ]
    },
    {
      name: 'template',
      subMenus: [
        {
          name: 'Unit Template1',
          component: UnitTemplate1
        },
        {
          name: 'Unit Template2',
          component: UnitTemplate2
        }
      ]
    },
    {
      name: 'Component',
      subMenus: [
        {
          name: 'Timeline',
          component: TimelineAnimate
        },
        {
          name: 'BasicUnit',
          component: BasicUnit
        },
        {
          name: 'Lottie',
          component: Lottie
        },
        {
          name: 'SinglePie',
          component: SinglePie
        },
        {
          name: 'PopTip',
          component: PopTipAnimate
        },
        {
          name: 'LabelItemAnimate',
          component: LabelItemAnimate
        },
        {
          name: 'TextComponent',
          component: TextComponent
        },
        {
          name: 'RectComponent',
          component: RectComponent
        },
        {
          name: 'ImageComponent',
          component: ImageComponent
        },
        {
          name: 'ShapeComponent',
          component: ShapeComponent
        }
      ]
    },
    {
      name: 'Infographic',
      subMenus: [
        {
          name: 'Data Structure Algorithms',
          subMenus: [
            { name: 'Quick Sort', component: QuickSort },
            { name: 'Bubble Sort', component: BubbleSort },
            { name: 'Insertion Sort', component: InsertSort },
            { name: 'Selection Sort', component: SelectionSort },
            { name: 'Merge Sort', component: MergeSort },
            { name: 'Heap Sort', component: HeapSort },
            { name: 'Shell Sort', component: ShellSort }
          ]
        },
        {
          name: 'infographic',
          component: Infographic
        },
        {
          name: 'table',
          component: TableInfographic
        },
        {
          name: 'Dapanji',
          component: Dapanji
        },
        {
          name: 'Insta',
          component: Insta
        },
        {
          name: 'CancerUSA',
          component: CancerUSA
        },
        {
          name: 'ReadyToEat',
          component: ReadyToEat
        },
        {
          name: 'FamouseTravel',
          component: FamousTravel
        },
        {
          name: 'BarHIV',
          component: BarHIV
        },
        {
          name: 'WorkingInSameIndustry',
          component: BarWorkingInSameIndustry
        },
        {
          name: 'ProjectGoal',
          component: ProjectGoal
        },
        {
          name: 'BigDataWordCloud',
          component: BigDataWordCloud
        },
        {
          name: 'Source of New Contacts Area Chart',
          component: AreaChart
        },
        {
          name: 'Marketing WordCloud',
          component: MarketingWordcloud
        },
        {
          name: 'Market Share',
          component: NoStackArea
        },
        {
          name: 'Top 10 Podcast Publishers in US',
          component: Top10Podcast
        },
        {
          name: 'FilmAnalysis',
          component: FilmAnalysis
        }
      ]
    },
    {
      name: 'Editor',
      subMenus: [
        {
          name: 'Components',
          component: ComponentsEdit
        },
        {
          name: 'Playground',
          component: Playground
        },
        {
          name: 'Base Chart',
          component: BaseChart
        }
      ]
    },
    {
      name: 'ChartRuntime',
      subMenus: [
        {
          name: 'Common Spec Axes',
          component: SpecAxes
        },
        {
          name: 'Series Mark',
          component: RuntimeSeriesMark
        },
        {
          name: 'Label Style',
          component: RuntimeLabelStyle
        },
        {
          name: 'Total Label',
          component: RuntimeTotalLabel
        },
        {
          name: 'Marker',
          component: SpecMarker
        }
      ]
    },
    {
      name: 'TableRuntime',
      subMenus: [
        {
          name: 'Base Table',
          component: TableBase
        },
        {
          name: 'Cell Style',
          component: CellStyle
        },
        {
          name: 'Col Width',
          component: ColWidth
        },
        {
          name: 'Row Height',
          component: RowHeight
        },
        {
          name: 'Pivot Chart Base',
          component: PivotChartBase
        },
        {
          name: 'Show Header',
          component: ShowHeader
        },
        {
          name: 'Theme',
          component: TableTheme
        },
        {
          name: 'Style',
          component: TableStyle
        },
        {
          name: 'Visible',
          component: TableVisible
        }
      ]
    }
  ];
  const getSelectedMenu = useCallback<(menus: MenuItem[]) => any>(
    (menus: MenuItem[]) => {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.name === activeName) {
          console.log(menu);
          return menus[i];
        }
        if (menu.subMenus) {
          const data = getSelectedMenu(menu.subMenus);
          if (data) {
            return data;
          }
        }
      }
    },
    [activeName]
  );
  const selectedMenu = getSelectedMenu(menus);

  // 修改渲染部分为递归函数
  const renderMenu = (items: MenuItem[], level: number) =>
    items.map(item => {
      if (item.subMenus) {
        return (
          <Nav.Sub level={level} key={item.name} itemKey={item.name} text={item.name}>
            {renderMenu(item.subMenus, level + 1)}
          </Nav.Sub>
        );
      }
      return <Nav.Item level={level} key={item.name} itemKey={item.name} text={item.name} />;
    });

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: '0 0 300px', height: '90vh', overflowY: 'auto', border: '1px solid #eee' }}>
        <Nav
          level={1}
          limitIndent={false}
          style={{ width: '100%' }}
          onSelect={(data: any) => setActiveName(data.itemKey)}
          selectedKeys={[activeName]}
          footer={{
            collapseButton: false
          }}
        >
          {renderMenu(menus, 0)}
        </Nav>
      </div>

      <div style={{ flexGrow: 1, border: '1px solid #eee', height: '90vh' }}>
        {selectedMenu && <selectedMenu.component />}
      </div>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
